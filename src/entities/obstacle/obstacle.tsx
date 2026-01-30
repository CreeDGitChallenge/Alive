// React native
import { StyleProp, ImageStyle } from "react-native";
// Animated
import Animated, { useSharedValue } from "react-native-reanimated";

type Props = {
    animatedStyle: AnimatedStyleType
    styleSheet: StyleProp<ImageStyle>
}

export default function Obstacle (
    { animatedStyle, styleSheet }: Props
) {
    return (
        <Animated.Image
            source={require('@/assets/game/obstacle/obstacle.png')}
            style={
                [
                    styleSheet,
                    animatedStyle
                ]
            }
            resizeMode={'contain'}
        />
    );
}

// Obstacle data
export const ObstacleData = (
    setX = 0,
    setY = 0,
    setWidth = 110,
    setHeight = 75
) => {
    return {
        x: useSharedValue(setX),
        y: useSharedValue(setY),
        width: useSharedValue(setWidth),
        height: useSharedValue(setHeight)
    }
}
