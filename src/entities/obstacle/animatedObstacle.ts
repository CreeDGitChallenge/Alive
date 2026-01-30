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