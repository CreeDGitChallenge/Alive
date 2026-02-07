// Reanimated
import { SharedValue } from "react-native-reanimated";

type ObjectsType = {
    x: SharedValue<number>;
    y: SharedValue<number>;
    width: SharedValue<number>;
    height: SharedValue<number>;
}
// - MAPS: RESET / MOVEMENT -
export const movementAndResetMap = (
    map: ObjectsType,
    mapTwo: ObjectsType,
    bicyclePath: ObjectsType,
    bicyclePathTwo: ObjectsType,
    screenHeight: number,
    SPEED: SharedValue<number>,
    delta: number,
    playerScore: SharedValue<number>
) => {
    'worklet';
    // - MAP AND BICYCLE PATH: RESET / MOVEMENT -
    // Maps reset
    if (map.y.value >= screenHeight) {
        // Define the gap
        const gap = map.y.value - screenHeight;

        // Apply Reset on map
        mapTwo.y.value = (-screenHeight) + (SPEED.value * delta) + gap;
        map.y.value = (SPEED.value * delta) + gap;

        // Apply Reset on bicycle path
        bicyclePathTwo.y.value = (-screenHeight) +(SPEED.value * delta) + gap;
        bicyclePath.y.value = (SPEED.value * delta) + gap;

        // Up game SPEED.value
        if (SPEED.value < 1600) {
            // SPEED.value += 20;
        }
        // Up player score
        playerScore.value += 1

    // Maps movements
    } else {
        // Apply scroll
        // Map
        map.y.value += SPEED.value * delta;
        mapTwo.y.value += SPEED.value * delta;
        // Bicycle path
        bicyclePath.y.value += SPEED.value * delta;
        bicyclePathTwo.y.value += SPEED.value * delta;
    }
}