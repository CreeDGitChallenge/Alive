import { useAnimatedStyle, SharedValue } from "react-native-reanimated"

// Map
const AnimatedMap = (
    translateMapX: SharedValue<number>,
    translateMapY: SharedValue<number>
) => {
    const animatedStyleMap = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateMapX.value},
            { translateY: translateMapY.value}
        ]
    }));
    return animatedStyleMap;
}

// Export animatedStyle maps
export { AnimatedMap }