// React
import { View, Dimensions } from "react-native";
// Gesture handler
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
// Reanimed
import { useSharedValue, useAnimatedStyle, clamp } from "react-native-reanimated";

// Entities
import Biker, { BIKERDATA } from "@/src/entities/biker";
import Obstacle, { OBSTACLE } from "@/src/entities/obstacle";
import Cursor from "@/src/entities/cursor";
import MapOne from "@/src/maps/mapOne";

// Scripts
import { isColliding } from "../scripts/isColliding";

export default function StageOne () {
    // Sreen dimensions
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

    // Biker position
    const translateX = useSharedValue(SCREEN_WIDTH / 2 - BIKERDATA.width / 2);
    const translateY = useSharedValue(SCREEN_HEIGHT / 2 - BIKERDATA.height / 2);
    const offsetX = useSharedValue(translateX.value);
    const offsetY = useSharedValue(translateY.value);
    // Initialization Biker X and Y
    BIKERDATA.x = translateX.value
    BIKERDATA.y = translateY.value
    // Biker colliding state
    const bikerIsColliding = useSharedValue(false);
    // Map position
    const translateMapX = useSharedValue(0);
    const translateMapY = useSharedValue(0);
    const translateMapTwoX = useSharedValue(0);
    const translateMapTwoY = useSharedValue(-SCREEN_HEIGHT);
    const translateMapTreeX = useSharedValue(0);
    const translateMapTreeY = useSharedValue(-SCREEN_HEIGHT * 2);
    // Obstacle position
    const translateObstacleX = useSharedValue(0);
    const translateObstacleY = useSharedValue(0);
    const OBSTACLEPOSITION = [
        { x: 0, y: 0 },
        { x: (SCREEN_WIDTH / 2) - (OBSTACLE.width / 2), y: 0 },
        { x: SCREEN_WIDTH - OBSTACLE.width, y: 0 },
    ]

    // Define position
    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            const nextX = offsetX.value + event.translationX;
            const nextY = offsetY.value + event.translationY;

            // Define biker new position
            BIKERDATA.x = nextX
            BIKERDATA.y = nextY

            // Update position if the BIKER is not colliding
            if (!bikerIsColliding.value) {
                // Change the value on X only if not higher than the max screen width
                translateX.value = clamp(nextX, 0, SCREEN_WIDTH - BIKERDATA.width);
                // Change the value on Y only if not higher than the max screen width
                translateY.value = clamp(nextY, 0, SCREEN_HEIGHT - BIKERDATA.height)
            } else {
                translateX.value = (SCREEN_WIDTH / 2) - (BIKERDATA.width / 2)
                translateY.value = (SCREEN_HEIGHT / 2) - (BIKERDATA.height / 2)
                bikerIsColliding.value = false
            }
        })
        .onEnd(() => {
            offsetX.value = translateX.value;
            offsetY.value = translateY.value;
        });

    // Update the Biker display
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value }
        ]
    }));
    // Update the Cursor display
    const animatedStyleCursor = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value - BIKERDATA.width / 2},
            { translateY: translateY.value + BIKERDATA.height }
        ]
    }));
    // Update obstacle
    const animatedObstacle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateObstacleX.value},
            { translateY: translateObstacleY.value}
        ]
    }))
    // Update Map display
    const animatedMap = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateMapX.value},
            { translateY: translateMapY.value}
        ]
    }));
    // Update Map 2 display
    const animatedMapTwo = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateMapTwoX.value},
            { translateY: translateMapTwoY.value}
        ]
    }));
    // Update Map 3 display
    const animatedMapTree = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateMapTreeX.value},
            { translateY: translateMapTreeY.value}
        ]
    }));

    // Game loop "handmade"
    function loop () {
        const SPEED = 70

        // Map reset
        if (translateMapY.value >= SCREEN_HEIGHT) {
            // clearInterval(loop)
            // Define a gap
            const gap = translateMapY.value - SCREEN_HEIGHT

            // Reset
            translateMapTreeY.value = (-SCREEN_HEIGHT)*2 + gap + SPEED
            translateMapTwoY.value = (-SCREEN_HEIGHT) + gap + SPEED
            translateMapY.value = 0 + gap + SPEED

        // Map movements
        } else {
            translateMapTreeY.value = translateMapTreeY.value +SPEED
            translateMapTwoY.value = translateMapTwoY.value +SPEED
            translateMapY.value = translateMapY.value +SPEED
        }

        // Obstacle reset
        if (translateObstacleY.value >= SCREEN_HEIGHT) {
            // Random number
            const randomNumber = Math.floor(Math.random() * 3) // Min 0, Max 2
            translateObstacleX.value = OBSTACLEPOSITION[randomNumber].x
            translateObstacleY.value = 0
             

        // Obstacle movements
        } else {
            translateObstacleY.value = translateObstacleY.value +SPEED
        }

        // Define Obstacle new position
        OBSTACLE.x = translateObstacleX.value
        OBSTACLE.y = translateObstacleY.value

        // Get Biker data (we need this for the colliding detection)
        const GETBIKERDATA = {
            x: translateX.value,
            y: translateY.value,
            width: BIKERDATA.width,
            height: BIKERDATA.height
        }
        // Biker is collinding on an obstacle
        if (isColliding(GETBIKERDATA, OBSTACLE)) {
            // bikerIsColliding.value = true;
            // Stop gameLoop
            clearInterval(gameLoop)
        }
    }

    // Game loop initialization
    const gameLoop = setInterval(loop, 100);

    return (
        <View>
            {/* MAP ELEMENT*/}
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
                animatedStyle={animatedStyle}
            />
            {/* Cursor makes the biker move */}
            <GestureDetector gesture={panGesture}>
                {/* Cursor */}
                <Cursor 
                    animatedStyle={animatedStyleCursor}
                />
            </GestureDetector>

            {/* OBSTACLE ELEMENTS */}
            {/* Obstacle */}
            <Obstacle 
                animatedStyle={animatedObstacle}
            />
        </View>
    );
}