// React
import { StyleSheet } from "react-native"

// Reanimated
import Animated from "react-native-reanimated"

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

export default function Cursor (props: { animatedStyle: AnimatedStyleType }) {

    const { animatedStyle } = props

    return (
        <Animated.Image
            source={require('@/assets/game/cursor/cursor.png')}
            style={
                [
                    styleCursor.cursor,
                    animatedStyle
                ]
            }
            resizeMode={'contain'}
        />
    )
}

export const CURSORDATA = {
    x: 0,
    y: 0,
    width: 100,
    height: 100
}

const styleCursor = StyleSheet.create({
    cursor: {
        position: 'absolute',
        width: 70,
        height: 70
    }
})