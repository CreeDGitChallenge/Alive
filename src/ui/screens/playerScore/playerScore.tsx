// React
import { useState } from 'react';
// React Native
import { StyleSheet, TextInput, Text } from 'react-native'
// Reanimated
import Animated, { SharedValue, createAnimatedComponent, useAnimatedProps, useAnimatedReaction, runOnJS } from 'react-native-reanimated'

type Props = {
    score: SharedValue<number>;
}
const AnimatedTextInput = createAnimatedComponent(TextInput);

export default function PlayerScore ({ score }: Props) {
    // const [scoreDisplay, setScoreDisplay] = useState(score.value)

    // useAnimatedReaction(
    //     () => score.value,
    //     (value, prev) => {
    //         if (value !== prev) {
    //             runOnJS(setScoreDisplay)(value)
    //         }
    //     }
    // )
    const animatedScoreProps = useAnimatedProps(() => {
        return {
            value: String(score.value)
        }
    });

    return (
        <>
            {/* <AnimatedTextInput
                editable={false}
                pointerEvents="none"
                underlineColorAndroid="transparent"
                animatedProps={animatedScoreProps}
                style={styleSheetPlayerScore.playerScore}
            /> */}
            {/* Temporary Score */}
            {/* <Text style={{
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'center'
            }}>
                {scoreDisplay}
            </Text> */}
        </>
    )
};

// const styleSheetPlayerScore = StyleSheet.create({
//     playerScore: {
//         color: 'red', 
//         fontSize: 20, 
//         width: '100%', 
//         textAlign: 'center'
//     }
// });