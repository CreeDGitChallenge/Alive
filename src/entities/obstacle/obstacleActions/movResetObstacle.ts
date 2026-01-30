// Reanimated
import { SharedValue } from "react-native-reanimated";

type obstaclePositionType = {
    x: number;
    y: number;
}[]
// - OBSTACLE: RESET / MOVEMENT -
export const movementAndReset = (
    translateObstacleY:SharedValue<number>, 
    translateObstacleX: SharedValue<number>,
    SCREEN_HEIGHT: number,
    OBSTACLEPOSITION: obstaclePositionType,
    SPEED: number
) => {
    // Obstacle one reset
    if (translateObstacleY.value >= SCREEN_HEIGHT) {
        // Define random number
        // const randNumb = randomNumber(3); 
        const randNumb = Math.floor(Math.random() * 3)// Min 0, Max 2
        // Reset
        translateObstacleX.value = OBSTACLEPOSITION[randNumb].x;
        translateObstacleY.value = 0;
    // Obstacle one movements
    } else {
        translateObstacleY.value = translateObstacleY.value + SPEED;
    }
}