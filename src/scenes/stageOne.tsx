// React
import { View, Dimensions } from "react-native";
// Gesture handler
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
// Reanimated
import { useSharedValue, clamp, useFrameCallback } from "react-native-reanimated";

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
    
    // Game loop default value
    // ...
    const gameState = useSharedValue(1); // 1 -> Start the loop, 0 -> stop the loop
    const lastFrameTime = useSharedValue<number | null>(null); // Needed for calculate deltaTime
    const SPEED = 400; // Game speed

    // Initialization Biker 
    // ...
    const bikerOneObj = BikerData();
    const bikerStyle = styleSheetBiker(bikerOneObj);
    // Redefine Biker X and Y
    bikerOneObj.x.value = SCREEN_WIDTH / 2 - bikerOneObj.width.value / 2;
    bikerOneObj.y.value = SCREEN_HEIGHT / 2 - bikerOneObj.height.value / 2;
    const offsetX = useSharedValue(SCREEN_WIDTH / 2 - bikerOneObj.width.value / 2);
    const offsetY = useSharedValue(SCREEN_HEIGHT / 2 - bikerOneObj.height.value / 2);
    // Initialization Cursor
    const cursorObj = CursorData();
    const cusrsorStyle = styleSheetCursor(cursorObj);

    // Initialization Maps
    // ...
    const mapOneObj = MapOneData(undefined, undefined, SCREEN_WIDTH, SCREEN_HEIGHT);
    const mapOneStyle = styleSheetMap(mapOneObj);
    const mapTwoObj = MapOneData(undefined, -SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT);
    const mapTwoStyle = styleSheetMap(mapTwoObj);
    const mapTreeObj = MapOneData(undefined, -SCREEN_HEIGHT * 2, SCREEN_WIDTH, SCREEN_HEIGHT);
    const mapTreeStyle = styleSheetMap(mapTreeObj);

    // Initialization Obstacles
    // ...
    // Obstacle 1
    const obstacleOneObj = ObstacleData();
    const obstacleOneStyle = styleSheetObstacle(obstacleOneObj); // Style

    // Define some positions (used for reposition random obstacles)
    const OBSTACLEPOSITION = [
        { x: 0, y: 0 },
        { x: (SCREEN_WIDTH / 2) - (obstacleOneObj.width.value / 2), y: 0 },
        { x: SCREEN_WIDTH - obstacleOneObj.width.value, y: 0 }
    ];
    // Obstacle 2
    const obstacleTwoObj = ObstacleData(OBSTACLEPOSITION[2].x, -400); // Positions and size
    const obstacleTwoStyle = styleSheetObstacle(obstacleTwoObj); // Style

    // Touch event (game player)
    // ...
    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            // Update positions
            const nextX = offsetX.value + event.translationX;
            const nextY = offsetY.value + event.translationY;

            // Change the value on X or Y only if not higher than the max screen width/height
            bikerOneObj.x.value = clamp(nextX, 0, SCREEN_WIDTH - bikerOneObj.width.value);
            bikerOneObj.y.value = clamp(nextY, 0, SCREEN_HEIGHT - bikerOneObj.height.value);
        })
        .onEnd(() => {
            // Get the bikerOneObj position to the end of touch
            offsetX.value = bikerOneObj.x.value;
            offsetY.value = bikerOneObj.y.value;
        });

    // Animated style
    // ...
    // Define the Biker position display
    const animatedStyleBiker = AnimatedBiker(bikerOneObj.x, bikerOneObj.y);
    // Define the Cursor position display
    const animatedStyleCursor = AnimatedCursor(bikerOneObj);
    // Define obstacle 1 position display
    const animatedObstacle = AnimatedObstacle(obstacleOneObj.x, obstacleOneObj.y);
    // Define obstacle 2 position display
    const animatedObstacleTwo = AnimatedObstacle(obstacleTwoObj.x, obstacleTwoObj.y);
    // Define Map 1 position display
    const animatedMap = AnimatedMap(mapOneObj.x, mapOneObj.y);
    // Define Map 2 position display
    const animatedMapTwo = AnimatedMap(mapTwoObj.x, mapTwoObj.y);
    // Define Map 3 position display
    const animatedMapTree = AnimatedMap(mapTreeObj.x, mapTreeObj.y);

    // Game loop
    useFrameCallback((frame) => {
        'worklet';

        // Condition for stop the game
        if (gameState.value === 0) return

         // Manual calculation of delta time
        if (lastFrameTime.value === null) {
            lastFrameTime.value = frame.timestamp;
            return;
        }
        // Delta time
        const delta = Math.min(
            (frame.timestamp - lastFrameTime.value) / 1000, 0.05 // max 50 ms
        );
        lastFrameTime.value = frame.timestamp;

        // - MAP: RESET / MOVEMENT -
        // Maps reset
        if (mapOneObj.y.value >= SCREEN_HEIGHT) {
            // Define the gap
            const gap = mapOneObj.y.value - SCREEN_HEIGHT;

            // Apply Reset
            mapTreeObj.y.value = (-SCREEN_HEIGHT) * 2 + (SPEED * delta) + gap;
            mapTwoObj.y.value = (-SCREEN_HEIGHT) + (SPEED * delta) + gap;
            mapOneObj.y.value = (SPEED * delta) + gap;

        // Maps movements
        } else {
            // Apply scroll
            mapOneObj.y.value += SPEED * delta;
            mapTwoObj.y.value += SPEED * delta;
            mapTreeObj.y.value += SPEED * delta;
        }

        // - OBSTACLE: RESET / MOVEMENT -
        // Movement and reset for obstacle 1
        movementAndReset(obstacleOneObj, SCREEN_HEIGHT, OBSTACLEPOSITION, SPEED * delta);
        // Movement and reset for obstacle 2
        movementAndReset(obstacleTwoObj, SCREEN_HEIGHT, OBSTACLEPOSITION, SPEED * delta);

        // Biker is collinding on obstacle one or obstacle two
        if (isColliding(bikerOneObj, obstacleOneObj) || isColliding(bikerOneObj, obstacleTwoObj)) {
            // Stop gameLoop
            gameState.value = 0;
        }
    });

    return (
        <View>
            {/* MAP ELEMENTS*/}
            <MapOne animatedStyle={animatedMap} styleSheet={mapOneStyle.map} />
            <MapOne animatedStyle={animatedMapTwo} styleSheet={mapTreeStyle.map} />
            <MapOne animatedStyle={animatedMapTree} styleSheet={mapTwoStyle.map} />

            {/* OBSTACLE ELEMENTS */}
            <Obstacle animatedStyle={animatedObstacle} styleSheet={obstacleOneStyle.obstacle} />
            <Obstacle animatedStyle={animatedObstacleTwo} styleSheet={obstacleTwoStyle.obstacle} />

            {/* PLAYER ELEMENTS */}
            {/* Biker */}
            <Biker animatedStyle={animatedStyleBiker} styleSheet={bikerStyle.biker} />
            {/* Cursor (makes the biker move) */}
            <GestureDetector gesture={panGesture}>
                <Cursor animatedStyle={animatedStyleCursor} styleSheet={cusrsorStyle.cursor} />
            </GestureDetector>
        </View>
    );
}