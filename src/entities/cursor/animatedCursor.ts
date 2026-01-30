// Reanimated
import { useAnimatedStyle, SharedValue } from "react-native-reanimated";

export const AnimatedCursor = (
    translateCursorX: SharedValue<number>, 
    translateCursorY: SharedValue<number>,
    BIKERDATA: { x: SharedValue<number>, y: SharedValue<number>, width: SharedValue<number>, height: SharedValue<number> }
) => {

    const animatedStyleCursor = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateCursorX.value - BIKERDATA.width.value / 2},
            { translateY: translateCursorY.value + BIKERDATA.height.value}
        ]
    }));

    return animatedStyleCursor;
}