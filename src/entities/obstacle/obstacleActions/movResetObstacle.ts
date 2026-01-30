// Reanimated
import { SharedValue } from "react-native-reanimated";

type ObstacleType = {
    x: SharedValue<number>;
    y: SharedValue<number>;
    width: SharedValue<number>;
    height: SharedValue<number>;
}
type obstaclePositionType = {
    x: number;
    y: number;
}[];
// - OBSTACLE: RESET / MOVEMENT -
export const movementAndReset = (
    obstacle: ObstacleType,
    screenHeight: number,
    obstaclePosition: obstaclePositionType,
    SPEED: number
) => {
    'worklet';
    // Obstacle one reset
    if (obstacle.y.value >= screenHeight) {
        // Define random number
        // const randNumb = randomNumber(3); 
        const randNumb = Math.floor(Math.random() * obstaclePosition.length)// Min 0, Max 2
        // Reset
        obstacle.x.value = obstaclePosition[randNumb].x;
        obstacle.y.value = -obstacle.height.value;
    // Obstacle one movements
    } else {
        obstacle.y.value += SPEED;
    }
}