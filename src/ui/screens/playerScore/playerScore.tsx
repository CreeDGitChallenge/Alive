// React native
import { StyleSheet } from "react-native";

// Reanimated
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated"

type Props = {
    score: SharedValue<number>;
};

const DIGITS = {
  0: require('@/assets/game/score/zero.png'),
  1: require('@/assets/game/score/one.png'),
  2: require('@/assets/game/score/two.png'),
  3: require('@/assets/game/score/tree.png'),
  4: require('@/assets/game/score/for.png'),
  5: require('@/assets/game/score/five.png'),
  6: require('@/assets/game/score/six.png'),
  7: require('@/assets/game/score/seven.png'),
  8: require('@/assets/game/score/height.png'),
  9: require('@/assets/game/score/nine.png'),
}

const defaultPositionX = 300;
const defaultPositionY = 50;

export default function PlayerScore ({ score }: Props) {
    return (
        <GenerateNumber />
    );
}

function GenerateNumber () {
    const numberAnimated = useAnimatedStyle(() => ({
        transform: [
            { translateX: defaultPositionX },
            { translateY: defaultPositionY },
        ]
    }));

    return (
            <Animated.Image
                source={DIGITS[0]}
                style={
                    [
                        styleSheetPlayerScore.playerScore,
                        numberAnimated
                    ]
                }
            />
    );
}

const styleSheetPlayerScore = StyleSheet.create({
    playerScore: {
        position: 'absolute',
        width: 30,
        height: 31
    }
});