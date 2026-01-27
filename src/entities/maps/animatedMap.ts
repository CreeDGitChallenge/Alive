import { useAnimatedStyle, SharedValue } from "react-native-reanimated"

// Map 1
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

// Map 2
const AnimatedMapTwo = (
    translateMapTwoX: SharedValue<number>,
    translateMapTwoY: SharedValue<number>
) => {
    const animatedMapTwo = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateMapTwoX.value},
            { translateY: translateMapTwoY.value}
        ]
    }));
    return animatedMapTwo;
}

// Map 3
const AnimatedMapTree = (
    translateMapTreeX: SharedValue<number>,
    translateMapTreeY: SharedValue<number>
) => {
    const animatedMapTree = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateMapTreeX.value },
            { translateY: translateMapTreeY.value }
        ]
    }));
    return animatedMapTree;
}

// Export animatedStyle maps
export { AnimatedMap, AnimatedMapTwo, AnimatedMapTree }