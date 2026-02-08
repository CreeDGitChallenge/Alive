// React native
import { StyleSheet } from "react-native";

// Reanimated
import { SharedValue } from "react-native-reanimated";

export const styleSheetScorePlayer = (
    width: SharedValue<number>,
    height: SharedValue<number>,
) => {

    const styleScorePlayer = StyleSheet.create({
        playerScore: {
            position: 'absolute',
            width: width.value,
            height: height.value
        }
    });
    return styleScorePlayer;
}