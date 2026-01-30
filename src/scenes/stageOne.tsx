// React
import { View, Dimensions } from "react-native";
// Gesture handler
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
// Reanimated
import { useSharedValue, clamp } from "react-native-reanimated";

// Entities
import Biker, { BikerData } from "@/src/entities/biker/biker";
import Obstacle, { ObstacleData } from "@/src/entities/obstacle/obstacle";
import Cursor, { CursorData } from "@/src/entities/cursor/cursor";
import MapOne, { MapOneData } from "@/src/entities/maps/mapOne";

// Entities animated
import { AnimatedBiker } from "@/src/entities/biker/animatedBiker";
import { AnimatedCursor } from "@/src/entities/cursor/animatedCursor";
import { AnimatedObstacle } from "@/src/entities/obstacle/animatedObstacle";
import { AnimatedMap } from "@/src/entities/maps/animatedMap";

// StyleSheet
import { styleSheetObstacle } from "@/src/entities/obstacle/styleSheetObstacle";
import { styleSheetMap } from "../entities/maps/styleSheetMap";
import { styleSheetCursor } from "../entities/cursor/styleSheetCursor";
import { styleSheetBiker } from "../entities/biker/styleSheetBiker";

// Obstacle actions
import { movementAndReset } from "@/src/entities/obstacle/obstacleActions/movResetObstacle";

// Scripts
import { isColliding } from "@/src/scripts/isColliding";

export default function StageOne () {
    // Sreen dimensions
    // ...
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
    // Initialization Biker 
    // ...
    const bikerOneObj = BikerData();
    const bikerStyle = styleSheetBiker(bikerOneObj);
    const translateBikerX = useSharedValue(SCREEN_WIDTH / 2 - bikerOneObj.width.value / 2);
    const translateBikerY = useSharedValue(SCREEN_HEIGHT / 2 - bikerOneObj.height.value / 2);
    const offsetX = useSharedValue(translateBikerX.value);
    const offsetY = useSharedValue(translateBikerY.value);
    // Redefine Biker X and Y
    bikerOneObj.x.value = translateBikerX.value;
    bikerOneObj.y.value = translateBikerY.value;
    // Initialization Cursor
    const cursorObj = CursorData();
    const cusrsorStyle = styleSheetCursor(cursorObj);

    // Initialization Maps
    // ...
    const mapOneObj = MapOneData(undefined, undefined, SCREEN_WIDTH, SCREEN_HEIGHT);
    const mapOneStyle = styleSheetMap(mapOneObj);
    const mapTwoObj = MapOneData(undefined, undefined, SCREEN_WIDTH, SCREEN_HEIGHT);
    const mapTwoStyle = styleSheetMap(mapTwoObj);
    const mapTreeObj = MapOneData(undefined, undefined, SCREEN_WIDTH, SCREEN_HEIGHT);
    const mapTreeStyle = styleSheetMap(mapTreeObj);
    const translateMapX = useSharedValue(0);
    const translateMapY = useSharedValue(0);
    const translateMapTwoX = useSharedValue(0);
    const translateMapTwoY = useSharedValue(-SCREEN_HEIGHT);
    const translateMapTreeX = useSharedValue(0);
    const translateMapTreeY = useSharedValue(-SCREEN_HEIGHT * 2);
    // Initialization Obstacles
    // ...
    // Obstacle 1
    const obstacleOneObj = ObstacleData();
    const obstacleOneStyle = styleSheetObstacle(obstacleOneObj); // Style
    const translateObstacleX = useSharedValue(0);
    const translateObstacleY = useSharedValue(0);
    // Define some positions
    const OBSTACLEPOSITION = [
        { x: 0, y: 0 },
        { x: (SCREEN_WIDTH / 2) - (obstacleOneObj.width.value / 2), y: 0 },
        { x: SCREEN_WIDTH - obstacleOneObj.width.value, y: 0 }
    ];
    // Obstacle 2
    const obstacleTwoObj = ObstacleData(OBSTACLEPOSITION[2].x, -400); // Positions and size
    const obstacleTwoStyle = styleSheetObstacle(obstacleTwoObj); // Style
    const translateObstacleTwoX = useSharedValue(OBSTACLEPOSITION[2].x);
    const translateObstacleTwoY = useSharedValue(-400);

    // Touch event (game player)
    // ...
    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            // Update positions
            const nextX = offsetX.value + event.translationX;
            const nextY = offsetY.value + event.translationY;

            // Redefine position's biker (x and y)
            bikerOneObj.x.value = nextX;
            bikerOneObj.y.value = nextY;

            // Change the value on X only if not higher than the max screen width
            translateBikerX.value = clamp(nextX, 0, SCREEN_WIDTH - bikerOneObj.width.value);
            // Change the value on Y only if not higher than the max screen height
            translateBikerY.value = clamp(nextY, 0, SCREEN_HEIGHT - bikerOneObj.height.value);
        })
        .onEnd(() => {
            offsetX.value = translateBikerX.value;
            offsetY.value = translateBikerY.value;
        });

    // Animated style
    // ...
    // Define the Biker position display
    const animatedStyleBiker = AnimatedBiker(translateBikerX, translateBikerY);
    // Define the Cursor position display
    const animatedStyleCursor = AnimatedCursor(translateBikerX, translateBikerY, bikerOneObj);
    // Define obstacle 1 position display
    const animatedObstacle = AnimatedObstacle(translateObstacleX, translateObstacleY);
    // Define obstacle 2 position display
    const animatedObstacleTwo = AnimatedObstacle(translateObstacleTwoX, translateObstacleTwoY);
    // Define Map 1 position display
    const animatedMap = AnimatedMap(translateMapX, translateMapY);
    // Define Map 2 position display
    const animatedMapTwo = AnimatedMap(translateMapTwoX, translateMapTwoY);
    // Define Map 3 position display
    const animatedMapTree = AnimatedMap(translateMapTreeX, translateMapTreeY);

    // Game loop "handmade"
    // ...
    function loop () {
        // Scrolling speed
        const SPEED = 70;

        // - MAP: RESET / MOVEMENT -
        // Maps reset
        if (translateMapY.value >= SCREEN_HEIGHT) {
            // Define a gap
            const gap = translateMapY.value - SCREEN_HEIGHT;

            // Apply Reset
            translateMapTreeY.value = (-SCREEN_HEIGHT)*2 + gap + SPEED;
            translateMapTwoY.value = (-SCREEN_HEIGHT) + gap + SPEED;
            translateMapY.value = 0 + gap + SPEED;

        // Maps movements
        } else {
            // Apply movements
            translateMapTreeY.value = translateMapTreeY.value + SPEED;
            translateMapTwoY.value = translateMapTwoY.value + SPEED;
            translateMapY.value = translateMapY.value + SPEED;
        }

        // - OBSTACLE: RESET / MOVEMENT -
        // Movement and reset for obstacle 1
        movementAndReset(translateObstacleY, translateObstacleX, SCREEN_HEIGHT, OBSTACLEPOSITION, SPEED);
        // Movement and reset for obstacle 2
        movementAndReset(translateObstacleTwoY, translateObstacleTwoX, SCREEN_HEIGHT, OBSTACLEPOSITION, SPEED);

        // Redefine Obstacles position
        obstacleOneObj.x.value = translateObstacleX.value;
        obstacleOneObj.y.value = translateObstacleY.value;
        obstacleTwoObj.x.value = translateObstacleTwoX.value;
        obstacleTwoObj.y.value = translateObstacleTwoY.value;

        // Biker is collinding on obstacle one
        if (isColliding(bikerOneObj, obstacleOneObj)) {
            // Stop gameLoop
            clearInterval(gameLoop);

        // Biker is collinding on obstacle two
        } else if (isColliding(bikerOneObj, obstacleTwoObj)) {
            // Stop gameLoop
            clearInterval(gameLoop);
        }
    }
    // Game loop initialization
    const gameLoop = setInterval(loop, 100);

    return (
        <View>
            {/* MAP ELEMENTS*/}
            <MapOne animatedStyle={animatedMap} styleSheet={mapOneStyle.map} />
            <MapOne animatedStyle={animatedMapTree} styleSheet={mapTwoStyle.map} />
            <MapOne animatedStyle={animatedMapTwo} styleSheet={mapTreeStyle.map} />

            {/* PLAYER ELEMENTS */}
            {/* Biker */}
            <Biker animatedStyle={animatedStyleBiker} styleSheet={bikerStyle.biker} />
            {/* Cursor (makes the biker move) */}
            <GestureDetector gesture={panGesture}>
                <Cursor animatedStyle={animatedStyleCursor} styleSheet={cusrsorStyle.cursor} />
            </GestureDetector>

            {/* OBSTACLE ELEMENTS */}
            <Obstacle animatedStyle={animatedObstacle} styleSheet={obstacleOneStyle.obstacle} />
            <Obstacle animatedStyle={animatedObstacleTwo} styleSheet={obstacleTwoStyle.obstacle} />
        </View>
    );
}