// React native
import { StyleProp, ImageStyle } from "react-native"
// Reanimated
import Animated, { useSharedValue } from "react-native-reanimated"

// Type
type PropsType = {
    animatedStyle: AnimatedStyleType,
    styleSheet: StyleProp<ImageStyle>
};

export default function BicylePath ({ animatedStyle, styleSheet }: PropsType) {
    return (
        <Animated.Image
            source={require('@/assets/game/maps/bicycle-path.jpg')}
            style={
                [
                    styleSheet,
                    animatedStyle
                ]
            }
        />
    )
}

// BicyclePatch data
export const BicyclePatchData = (
    setX = 0,
    setY = 0,
    // setWidth = 140,
    setWidth = 80,
    setHeight = 1536
) => {
    return {
        x: useSharedValue(setX),
        y: useSharedValue(setY),
        width: useSharedValue(setWidth),
        height: useSharedValue(setHeight)
    }
}