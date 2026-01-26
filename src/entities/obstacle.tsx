// React native
import { StyleSheet } from "react-native";
// Animated
import Animated from "react-native-reanimated";

// Types
type AnimatedStyleType = {
    transform: ({
        translateX: number;
        translateY?: undefined;
    } | {
        translateY: number;
        translateX?: undefined;
    })[];
}

export default function Obstacle (props: { animatedStyle:AnimatedStyleType }) {
    const { animatedStyle } = props

    return (
        <Animated.Image
            source={require('@/assets/game/obstacle/obstacle.png')}
            style={
                [
                    styleObstacle.obstacle,
                    animatedStyle
                ]
            }
            resizeMode={'contain'}
        />
    );
}

// Obstacle data
export const OBSTACLE = {
    x: 0,
    y: 0,
    width: 110,
    height: 75
    // width: 70,
    // height: 48
};

// Style
const styleObstacle = StyleSheet.create({
    obstacle: {
        position: 'absolute',
        width: OBSTACLE.width,
        height: OBSTACLE.height,
    }
});
