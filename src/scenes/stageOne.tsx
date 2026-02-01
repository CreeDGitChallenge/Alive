// React native
import { View, Dimensions } from "react-native";
// Gesture handler
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
// Reanimated
import { useSharedValue, clamp, useFrameCallback} from "react-native-reanimated";

// UI screens
import GameOver from "@/src/ui/screens/gameOver";

// Entities
import Biker, { BikerData } from "@/src/entities/biker/biker";
import Obstacle, { ObstacleData } from "@/src/entities/obstacle/obstacle";
import Cursor, { CursorData } from "@/src/entities/cursor/cursor";
import MapOne, { MapOneData } from "@/src/entities/maps/mapOne";
import BicylePath, { BicyclePatchData } from "@/src/entities/bicyclePath/bicylePath";

// Entities animated
import { AnimatedGlobal } from "../animated/animatedGlobal";
import { AnimatedCursor } from "@/src/entities/cursor/animatedCursor";

// StyleSheet
import { styleSheetObstacle } from "@/src/entities/obstacle/styleSheetObstacle";
import { styleSheetMap } from "@/src/entities/maps/styleSheetMap";
import { styleSheetCursor } from "@/src/entities/cursor/styleSheetCursor";
import { styleSheetBiker } from "@/src/entities/biker/styleSheetBiker";
import { styleSheetBicycle } from "../entities/bicyclePath/styleSheetBicycle";

// Obstacle actions
import { movementAndResetObst } from "@/src/entities/obstacle/obstacleActions/movResetObstacle";
// Maps Actions
import { movementAndResetMap } from "@/src/entities/maps/mapsActions/mapsActions";
// Scripts
import { isColliding } from "@/src/scripts/isColliding";
// import { scheduleOnRN } from "react-native-worklets";

export default function StageOne () {
    // Sreen dimensions
    // ...
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
    
    // Game loop default value
    // ...
    const restartState = useSharedValue(0)
    const gameState = useSharedValue(1); // 1 -> Start the loop, 0 -> Stop the loop
    const lastFrameTime = useSharedValue<number | null>(null); // Needed for deltaTime calculation
    const SPEED = useSharedValue(400); // Game speed

    // UI
    // ...
    const showGameOver = useSharedValue(0);

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
    // ...
    const cursorObj = CursorData();
    const cusrsorStyle = styleSheetCursor(cursorObj);

    // Initialization Maps
    // ...
    const mapOneObj = MapOneData(undefined, undefined, SCREEN_WIDTH, SCREEN_HEIGHT);
    const mapOneStyle = styleSheetMap(mapOneObj);
    const mapTwoObj = MapOneData(undefined, -SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT);
    const mapTwoStyle = styleSheetMap(mapTwoObj);

    // Initialize Bicycle path
    // ...
    // Bicycle path one
    const bicyclePathObj = BicyclePatchData(undefined, undefined, undefined, SCREEN_HEIGHT);
    bicyclePathObj.x.value = SCREEN_WIDTH - bicyclePathObj.width.value;
    const bicyclePathObjStyle = styleSheetBicycle(bicyclePathObj);
    // Bicycle path Two
    const bicyclePathTwoObj = BicyclePatchData(SCREEN_WIDTH - bicyclePathObj.width.value, -SCREEN_HEIGHT, undefined, SCREEN_HEIGHT);
    const bicyclePathTwoObjStyle = styleSheetBicycle(bicyclePathTwoObj);

    // Initialization Obstacles
    // ...
    // Obstacle 1
    const obstacleOneObj = ObstacleData(undefined, -SCREEN_HEIGHT / 3);
    const obstacleOneStyle = styleSheetObstacle(obstacleOneObj); // Style

    // Define some positions (used for reposition random obstacles)
    const OBSTACLEPOSITION = [
        { x: 0, y: 0 },
        { x: (SCREEN_WIDTH / 2) - (obstacleOneObj.width.value / 2), y: 0 },
        { x: SCREEN_WIDTH - obstacleOneObj.width.value, y: 0 }
    ];
    // Obstacle 2
    const obstacleTwoObj = ObstacleData(OBSTACLEPOSITION[2].x, (-SCREEN_HEIGHT / 3)*2); // Positions and size
    const obstacleTwoStyle = styleSheetObstacle(obstacleTwoObj); // Style
    // Obstacle 3
    const obstacleTreeObj = ObstacleData(OBSTACLEPOSITION[0].x, (-SCREEN_HEIGHT / 3)*3); // Positions and size
    const obstacleTreeStyle = styleSheetObstacle(obstacleTreeObj); // Style

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
    const animatedStyleBiker = AnimatedGlobal(bikerOneObj.x, bikerOneObj.y);
    // Define the Cursor position display
    const animatedStyleCursor = AnimatedCursor(bikerOneObj);
    // Define obstacle 1 position display
    const animatedObstacle = AnimatedGlobal(obstacleOneObj.x, obstacleOneObj.y);
    // Define obstacle 2 position display
    const animatedObstacleTwo = AnimatedGlobal(obstacleTwoObj.x, obstacleTwoObj.y);
    // Define obstacle 3 position display
    const animatedObstacleTree = AnimatedGlobal(obstacleTreeObj.x, obstacleTreeObj.y);
    // Define Map 1 position display
    const animatedMap = AnimatedGlobal(mapOneObj.x, mapOneObj.y);
    // Define Map 2 position display
    const animatedMapTwo = AnimatedGlobal(mapTwoObj.x, mapTwoObj.y);
    // Define Bicyle path 1 position display
    const animatedBicyclePath = AnimatedGlobal(bicyclePathObj.x, bicyclePathObj.y);
    // Define Bicyle path 2 position display
    const animatedBicycleTwoPath = AnimatedGlobal(bicyclePathTwoObj.x, bicyclePathTwoObj.y);

    // - GAME LOOP -
    // -------------
    useFrameCallback((frame) => {
        'worklet';

        if (restartState.value === 1) {
            showGameOver.value = 0;
            gameState.value = 1;
            lastFrameTime.value = null;
            SPEED.value = 400;
            restartState.value = 0;
        }

        // Condition for stop the game
        if (gameState.value === 0) {
            lastFrameTime.value = frame.timestamp;
            return;
        }
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

        // - MAP AND BICYCLE PATH: RESET / MOVEMENT -
        //  + Up speed value
        movementAndResetMap(
            mapOneObj, 
            mapTwoObj, 
            bicyclePathObj,
            bicyclePathTwoObj,
            SCREEN_HEIGHT,
            SPEED,
            delta
        );

        // - OBSTACLE: RESET / MOVEMENT -
        // Movement and reset for obstacle 1
        movementAndResetObst(obstacleOneObj, SCREEN_HEIGHT, OBSTACLEPOSITION, SPEED.value * delta);
        // Movement and reset for obstacle 2
        movementAndResetObst(obstacleTwoObj, SCREEN_HEIGHT, OBSTACLEPOSITION, SPEED.value * delta);
        // Movement and reset for obstacle 3
        movementAndResetObst(obstacleTreeObj, SCREEN_HEIGHT, OBSTACLEPOSITION, SPEED.value * delta);

        // Biker is collinding on obstacle one or obstacle two
        if (isColliding(bikerOneObj, obstacleOneObj) 
            || isColliding(bikerOneObj, obstacleTwoObj)
            || isColliding(bikerOneObj, obstacleTreeObj)
        ) {
            // Afficher game Over
            showGameOver.value = 1;
            // Stop gameLoop
            gameState.value = 0;
        }
    });
    // - END GAME LOOP -
    // -----------------
    const tapGesture = Gesture.Tap()
    .onStart(() => {
        restartState.value = 1;
    });

    return (
        <View>
            {/* MAP ELEMENTS*/}
            <MapOne animatedStyle={animatedMap} styleSheet={mapOneStyle.map} />
            <MapOne animatedStyle={animatedMapTwo} styleSheet={mapTwoStyle.map} />
            {/* <MapOne animatedStyle={animatedMapTree} styleSheet={mapTreeStyle.map} /> */}
            <BicylePath animatedStyle={animatedBicyclePath} styleSheet={bicyclePathObjStyle.bicycle} />
            <BicylePath animatedStyle={animatedBicycleTwoPath} styleSheet={bicyclePathTwoObjStyle.bicycle} />

            {/* OBSTACLE ELEMENTS */}
            <Obstacle animatedStyle={animatedObstacle} styleSheet={obstacleOneStyle.obstacle} />
            <Obstacle animatedStyle={animatedObstacleTwo} styleSheet={obstacleTwoStyle.obstacle} />
            <Obstacle animatedStyle={animatedObstacleTree} styleSheet={obstacleTreeStyle.obstacle} />

            {/* PLAYER ELEMENTS */}
            {/* Biker */}
            <Biker animatedStyle={animatedStyleBiker} styleSheet={bikerStyle.biker} />
            {/* Cursor (makes the biker move) */}
            <GestureDetector gesture={panGesture}>
                <Cursor animatedStyle={animatedStyleCursor} styleSheet={cusrsorStyle.cursor} />
            </GestureDetector>

            {/* UI SCREEN */}
            {/* Game over */}
            <GestureDetector gesture={tapGesture}>
                <GameOver showGameOver={showGameOver} />
            </GestureDetector>
        </View>
    );
}