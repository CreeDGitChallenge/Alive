// Reanimated
import { useAnimatedStyle, SharedValue } from "react-native-reanimated";

export const AnimatedCursor = (
    translateCursorX: SharedValue<number>, 
    translateCursorY: SharedValue<number>,
    BIKERDATA: { x: number, y: number, width: number, height: number }
) => {

    const animatedStyleCursor = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateCursorX.value - BIKERDATA.width / 2},
            { translateY: translateCursorY.value + BIKERDATA.height}
        ]
    }));

    return animatedStyleCursor;
}