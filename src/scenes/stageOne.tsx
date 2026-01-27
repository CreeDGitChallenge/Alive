// React
import { View, Dimensions } from "react-native";
// Gesture handler
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
// Reanimated
import { useSharedValue, clamp } from "react-native-reanimated";

// Entities
import Biker, { BIKERDATA } from "@/src/entities/biker/biker";
import Obstacle, { OBSTACLE } from "@/src/entities/obstacle/obstacle";
import Cursor from "@/src/entities/cursor/cursor";
import MapOne from "@/src/entities/maps/mapOne";

// Entities animated
import { AnimatedBiker } from "../entities/biker/animatedBiker";
import { AnimatedCursor } from "../entities/cursor/animatedCursor";
import { AnimatedObstacle, AnimatedObstacleTwo } from "../entities/obstacle/animatedObstacle";
import { AnimatedMap, AnimatedMapTree, AnimatedMapTwo } from "../entities/maps/animatedMap";

// Scripts
import { isColliding } from "../scripts/isColliding";
import { randomNumber } from "../scripts/randomNumber";

export default function StageOne () {
    // Sreen dimensions
    // ...
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
    // Initialization Biker position 
    // ...
    const translateBikerX = useSharedValue(SCREEN_WIDTH / 2 - BIKERDATA.width / 2);
    const translateBikerY = useSharedValue(SCREEN_HEIGHT / 2 - BIKERDATA.height / 2);
    const offsetX = useSharedValue(translateBikerX.value);
    const offsetY = useSharedValue(translateBikerY.value);
    // Redefine Biker X and Y
    BIKERDATA.x = translateBikerX.value;
    BIKERDATA.y = translateBikerY.value;
    // Maps position
    // ...
    const translateMapX = useSharedValue(0);
    const translateMapY = useSharedValue(0);
    const translateMapTwoX = useSharedValue(0);
    const translateMapTwoY = useSharedValue(-SCREEN_HEIGHT);
    const translateMapTreeX = useSharedValue(0);
    const translateMapTreeY = useSharedValue(-SCREEN_HEIGHT * 2);
    // Obstacles position
    // ...
    const OBSTACLEPOSITION = [
        { x: 0, y: 0 },
        { x: (SCREEN_WIDTH / 2) - (OBSTACLE.width / 2), y: 0 },
        { x: SCREEN_WIDTH - OBSTACLE.width, y: 0 },
    ];
    const translateObstacleX = useSharedValue(0);
    const translateObstacleY = useSharedValue(0);
    const translateObstacleTwoX = useSharedValue(OBSTACLEPOSITION[2].x);
    const translateObstacleTwoY = useSharedValue(-400);
    const OBSTACLETWO = {
        x: OBSTACLEPOSITION[1].x,
        y: -400,
        width: OBSTACLE.width,
        height: OBSTACLE.height
    };

    // Touch event
    // ...
    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            // Update positions
            const nextX = offsetX.value + event.translationX;
            const nextY = offsetY.value + event.translationY;

            // Redefine x and y position's biker
            BIKERDATA.x = nextX;
            BIKERDATA.y = nextY;

            // Change the value on X only if not higher than the max screen width
            translateBikerX.value = clamp(nextX, 0, SCREEN_WIDTH - BIKERDATA.width);
            // Change the value on Y only if not higher than the max screen width
            translateBikerY.value = clamp(nextY, 0, SCREEN_HEIGHT - BIKERDATA.height);
        })
        .onEnd(() => {
            offsetX.value = translateBikerX.value;
            offsetY.value = translateBikerY.value;
        });

    // Animated style
    // ...
    // Update the Biker display
    const animatedStyleBiker = AnimatedBiker(translateBikerX, translateBikerY);
    // Update the Cursor display
    const animatedStyleCursor = AnimatedCursor(translateBikerX, translateBikerY, BIKERDATA);
    // Update obstacle 1 display
    const animatedObstacle = AnimatedObstacle(translateObstacleX, translateObstacleY);
    // Update obstacle 2 display
    const animatedObstacleTwo = AnimatedObstacleTwo(translateObstacleTwoX, translateObstacleTwoY);
    // Update Map 1 display
    const animatedMap = AnimatedMap(translateMapX, translateMapY);
    // Update Map 2 display
    const animatedMapTwo = AnimatedMapTwo(translateMapTwoX, translateMapTwoY);

    // Update Map 3 display
    const animatedMapTree = AnimatedMapTree(translateMapTreeX, translateMapTreeY);

    // Game loop "handmade"
    // ...
    function loop () {
        const SPEED = 70;

        // Maps reset
        if (translateMapY.value >= SCREEN_HEIGHT) {
            // Define a gap
            const gap = translateMapY.value - SCREEN_HEIGHT;

            // Reset
            translateMapTreeY.value = (-SCREEN_HEIGHT)*2 + gap + SPEED;
            translateMapTwoY.value = (-SCREEN_HEIGHT) + gap + SPEED;
            translateMapY.value = 0 + gap + SPEED;

        // Maps movements
        } else {
            translateMapTreeY.value = translateMapTreeY.value +SPEED;
            translateMapTwoY.value = translateMapTwoY.value +SPEED;
            translateMapY.value = translateMapY.value +SPEED;
        }
        // ---
        // Obstacle one reset
        if (translateObstacleY.value >= SCREEN_HEIGHT) {
            // Random number
            const randNumb = randomNumber(3); // Min 0, Max 2
            translateObstacleX.value = OBSTACLEPOSITION[randNumb].x;
            translateObstacleY.value = 0;
        // Obstacle one movements
        } else {
            translateObstacleY.value = translateObstacleY.value +SPEED;
        }
        // ---
        // Obstacle two reset
        if (translateObstacleTwoY.value >= SCREEN_HEIGHT) {
            // Random number
            const randNumbTwo = randomNumber(3); // Min 0, Max 2
            translateObstacleTwoX.value = OBSTACLEPOSITION[randNumbTwo].x;
            translateObstacleTwoY.value = 0;
        // Obstacle two movements
        } else {
            translateObstacleTwoY.value = translateObstacleTwoY.value +SPEED;
        }
        // ---
        // Redefine Obstacles new position
        OBSTACLE.x = translateObstacleX.value;
        OBSTACLE.y = translateObstacleY.value;
        OBSTACLETWO.x = translateObstacleTwoX.value;
        OBSTACLETWO.y = translateObstacleTwoY.value;

        // Get Biker data (we need this for the colliding detection)
        const GETBIKERDATA = {
            x: translateBikerX.value,
            y: translateBikerY.value,
            width: BIKERDATA.width,
            height: BIKERDATA.height
        };
        // Biker is collinding on obstacle one
        if (isColliding(GETBIKERDATA, OBSTACLE)) {
            // Stop gameLoop
            clearInterval(gameLoop);

        // Biker is collinding on obstacle two
        } else if (isColliding(GETBIKERDATA, OBSTACLETWO)) {
            clearInterval(gameLoop);
        }
    }

    // Game loop initialization
    const gameLoop = setInterval(loop, 100);

    return (
        <View>
            {/* MAP ELEMENTS*/}
            <MapOne animatedStyle={animatedMap} />
            <MapOne 
            animatedStyle={animatedMapTree}
            />
            <MapOne 
                animatedStyle={animatedMapTwo}
            />

            {/* BIKER ELEMENTS */}
            {/* Biker */}
            <Biker 
                animatedStyle={animatedStyleBiker}
            />
            {/* Cursor makes the biker move */}
            <GestureDetector gesture={panGesture}>
                <Cursor 
                    animatedStyle={animatedStyleCursor}
                />
            </GestureDetector>

            {/* OBSTACLE ELEMENTS */}
            <Obstacle 
                animatedStyle={animatedObstacle}
            />
            <Obstacle 
                animatedStyle={animatedObstacleTwo}
            />
        </View>
    );
}