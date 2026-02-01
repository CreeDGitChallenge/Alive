// React
import { StyleSheet } from "react-native"

// Reanimated
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated"

type Props = {
    showGameOver: SharedValue<number>
}
export default function GameOver ({ showGameOver }: Props) {

    // Define an animated style
    const gameOverAnimated = useAnimatedStyle(() => ({
        opacity: showGameOver.value ? 1 : 0,
        pointerEvents: showGameOver.value ? "auto" : "none",
    }));

    return (
        <Animated.Image
            source={require('@/assets/game/gameOver/game-over.png')}
            style={
                [
                    styleSheet.gameOver,
                    gameOverAnimated
                ]
            }
            resizeMode={'contain'}
        />
    );
}

// Style
const styleSheet = StyleSheet.create({
    gameOver: {
        position: 'absolute',
        width: 400,
        height: 400
    }
})