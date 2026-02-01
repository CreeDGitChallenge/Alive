// Reanimated
import { useAnimatedStyle, SharedValue } from "react-native-reanimated";

export const AnimatedGlobal= (
    translateX: SharedValue<number>,
    transleteY: SharedValue<number>
) => {
    // Animated style
    const animatedStyleGlobal = useAnimatedStyle(() => ({
        transform : [
            { translateX: translateX.value },
            { translateY: transleteY.value }
        ]
    }));
    return animatedStyleGlobal;
}