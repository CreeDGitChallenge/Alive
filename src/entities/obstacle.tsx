// React native
import { StyleSheet } from "react-native";
// Animated
import Animated from "react-native-reanimated";

export default function Obstacle () {
    return (
        <Animated.View
            style={
                [
                    styleObstacle.obstacle,
                    {
                        top: 0,
                        left: 0,
                        width: OBSTACLE.width,
                        height: OBSTACLE.height
                    }
                ]
            }
        />
    );
}

// Obstacle data
export const OBSTACLE = {
    x: 0,
    y: 0,
    width: 150,
    height: 100
};

// Style
const styleObstacle = StyleSheet.create({
    obstacle: {
        position: 'absolute',
        backgroundColor: 'green',
    }
});
