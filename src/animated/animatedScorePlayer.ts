// Reanimated
import { useAnimatedStyle,SharedValue } from "react-native-reanimated";

export const AnimatedGlobal = (
    translateX: SharedValue<number>,
    transleteY: SharedValue<number>,
    visibility: SharedValue<number>,
) => {
    // Animated style
    const animatedStylScore = useAnimatedStyle(() => ({
        transform : [
            { translateX: translateX.value },
            { translateY: transleteY.value }
        ],
        opacity: visibility.value ? 1 : 0,
        pointerEvents: visibility.value ? "auto" : "none",
    }));
    return animatedStylScore;
}