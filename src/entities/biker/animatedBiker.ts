// Reanimated
import { SharedValue, useAnimatedStyle } from "react-native-reanimated";

export const AnimatedBiker = (
    translateBikerX: SharedValue<number>, 
    translateBikerY: SharedValue<number>
) => {

    const animatedStyleBiker = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateBikerX.value },
            { translateY: translateBikerY.value }
        ]
    }));

    return animatedStyleBiker
}