// React native
import { StyleProp, ImageStyle } from "react-native"
// Reanimated
import Animated, { useSharedValue } from "react-native-reanimated"

// Type
type PropsType = {
    animatedStyle: AnimatedStyleType,
    styleSheet: StyleProp<ImageStyle>
};
export default function Biker ({ animatedStyle, styleSheet }: PropsType) {

    return (
        <Animated.Image
            source={require('@/assets/game/biker/biker.png')}
            style={
                [
                    styleSheet,
                    animatedStyle
                ]
            }
            resizeMode={'contain'}
        />
    )
}
// Biker data
export const BikerData = (
    setX = 0,
    setY = 0,
    setWidth = 37,
    setHeight = 70
) => {
    return {
        x: useSharedValue(setX),
        y: useSharedValue(setY),
        width: useSharedValue(setWidth),
        height: useSharedValue(setHeight)
    }
}