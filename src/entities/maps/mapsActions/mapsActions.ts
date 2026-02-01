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
    SPEED: number,
    delta: number
) => {
    'worklet';
    // - MAP AND BICYCLE PATH: RESET / MOVEMENT -
    // Maps reset
    if (map.y.value >= screenHeight) {
        // Define the gap
        const gap = map.y.value - screenHeight;

        // Apply Reset on map
        mapTwo.y.value = (-screenHeight) + (SPEED * delta) + gap;
        map.y.value = (SPEED * delta) + gap;

        // Apply Reset on bicycle path
        bicyclePathTwo.y.value = (-screenHeight) +(SPEED * delta) + gap;
        bicyclePath.y.value = (SPEED * delta) + gap;

    // Maps movements
    } else {
        // Apply scroll
        // Map
        map.y.value += SPEED * delta;
        mapTwo.y.value += SPEED * delta;
        // Bicycle path
        bicyclePath.y.value += SPEED * delta;
        bicyclePathTwo.y.value += SPEED * delta;
    }
}