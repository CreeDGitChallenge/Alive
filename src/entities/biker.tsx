// React native
import { StyleSheet } from "react-native"
// Reanimated
import Animated from "react-native-reanimated"

// Types
type AnimatedStyle = {
    transform: ({
        translateX: number;
        translateY?: undefined;
    } | {
        translateY: number;
        translateX?: undefined;
    })[];
}

export default function Biker (props: { animatedStyle: AnimatedStyle }) {
    const { animatedStyle } = props

    return (
        <Animated.Image
            source={require('@/assets/game/biker/Biker.png')}
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
    width: 100,
    height: 100
}

// Style
const styleBiker = StyleSheet.create({
    biker: {
        position: 'absolute',
        borderWidth: 3,
        width: BIKERDATA.width,
        height: BIKERDATA.height,
        borderColor: 'black',
        borderRadius: 10
    }
})