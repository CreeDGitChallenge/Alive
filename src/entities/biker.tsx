// React native
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

export default function Biker (props: { animatedStyle: AnimatedStyleType }) {
    const { animatedStyle } = props

    return (
        <Animated.Image
            source={require('@/assets/game/biker/biker.png')}
            style={
                [
                    styleBiker.biker,
                    animatedStyle
                ]
            }
            resizeMode={'contain'}
        />
    )
}

// Biker data
export const BIKERDATA = {
    x: 0,
    y: 0,
    width: 37,
    height: 70
}

// Style
const styleBiker = StyleSheet.create({
    biker: {
        position: 'absolute',
        width: BIKERDATA.width,
        height: BIKERDATA.height,
    }
})