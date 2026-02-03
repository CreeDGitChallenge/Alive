// React
import { StyleProp, ImageStyle } from "react-native";

// Reanimated
import Animated, { SharedValue, useAnimatedStyle, useSharedValue } from "react-native-reanimated"

type Props = {
    showGameOver: SharedValue<number>,
    styleSheet: StyleProp<ImageStyle>
}
export default function GameOver ({ showGameOver, styleSheet }: Props) {

    // Define an animated style
    const gameOverAnimated = useAnimatedStyle(() => ({
        transform: [
            { translateX: 0},
            { translateY: 0}
        ],
        opacity: showGameOver.value ? 1 : 0,
        pointerEvents: showGameOver.value ? "auto" : "none",
    }));

    return (
        <Animated.Image
            source={require('@/assets/game/gameOver/game-over.png')}
            style={
                [
                    styleSheet,
                    gameOverAnimated
                ]
            }
            resizeMode={'contain'}
        />
    );
}

// Game over data
export const GameOverData = (
    setX = 0,
    setY = 0,
    setWidth = 400,
    setHeight = 400
) => {
    return {
        x: useSharedValue(setX),
        y: useSharedValue(setY),
        width: useSharedValue(setWidth),
        height: useSharedValue(setHeight)
    }
};