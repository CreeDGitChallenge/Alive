// Reanimated
import { useAnimatedStyle, SharedValue } from "react-native-reanimated";

export const AnimatedCursor = (
    bikerObj: { 
        x: SharedValue<number>,
        y: SharedValue<number>, 
        width: SharedValue<number>, 
        height: SharedValue<number> 
    }
) => {

    const animatedStyleCursor = useAnimatedStyle(() => ({
        transform: [
            { translateX: bikerObj.x.value - bikerObj.width.value / 2},
            { translateY: bikerObj.y.value + bikerObj.height.value}
        ]
    }));

    return animatedStyleCursor;
}