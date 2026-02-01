// React
import { StyleSheet } from "react-native"

// Reanimated
import Animated from "react-native-reanimated"

export default function GameOver () {
    return (
        <Animated.Image
            source={require('@/assets/game/gameOver/game-over.png')}
            style={
                [
                    styleSheet.gameOver,
                    // animatedStyle
                ]
            }
            resizeMode={'contain'}
        />
    )
}

const styleSheet = StyleSheet.create({
    gameOver: {
        position: 'absolute',
        width: 200,
        height: 200
    }
})