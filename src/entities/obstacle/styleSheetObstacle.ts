// React
import { StyleSheet } from "react-native";
// Reanimated
import { SharedValue } from "react-native-reanimated";

// Types
type ObstacleType = {
    x: SharedValue<number>;
    y: SharedValue<number>;
    width: SharedValue<number>;
    height: SharedValue<number>;
}

export const styleSheetObstacle = (
    obstacle: ObstacleType
) => {
    const styleObstacle = StyleSheet.create({
        obstacle: {
            position: 'absolute',
            width: obstacle.width.value,
            height: obstacle.height.value,
        }
    });
    return styleObstacle
}
