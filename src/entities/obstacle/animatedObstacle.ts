// Reanimated
import { useAnimatedStyle, SharedValue } from "react-native-reanimated";

// Obstacle 1
export const AnimatedObstacle = (
    translateObstacleX: SharedValue<number>,
    transleteObstacleY: SharedValue<number>
) => {
    // Animated style
    const animatedStyleObstacle = useAnimatedStyle(() => ({
        transform : [
            { translateX: translateObstacleX.value },
            { translateY: transleteObstacleY.value }
        ]
    }));
    return animatedStyleObstacle;
}

// Obstacle 2
export const AnimatedObstacleTwo = (
    translateObstacleTwoX: SharedValue<number>,
    translateObstacleTwoY: SharedValue<number>
) => {
    const animatedStyleObstacleTwo = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateObstacleTwoX.value },
            { translateY: translateObstacleTwoY.value }
        ]
    }));
    return animatedStyleObstacleTwo
}