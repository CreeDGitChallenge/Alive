// React
import { StyleProp, ImageStyle } from "react-native"

// Reanimated
import Animated, { useSharedValue } from "react-native-reanimated"

// Type
type PropsType = {
    animatedStyle: AnimatedStyleType,
    styleSheet: StyleProp<ImageStyle>
};
export default function Cursor ({ animatedStyle, styleSheet }: PropsType) {

    return (
        <Animated.Image
            source={require('@/assets/game/cursor/cursor.png')}
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

// Cursor data
export const CursorData = (
    setX = 0,
    setY = 0,
    setWidth = 70,
    setHeight = 70
) => {
    return {
        x: useSharedValue(setX),
        y: useSharedValue(setY),
        width: useSharedValue(setWidth),
        height: useSharedValue(setHeight)
    }
}