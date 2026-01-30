// React
import { StyleSheet } from "react-native";

// Reanimated
import { SharedValue } from "react-native-reanimated";

// Types
type CursorType = {
    x: SharedValue<number>;
    y: SharedValue<number>;
    width: SharedValue<number>;
    height: SharedValue<number>;
};

export const styleSheetCursor = (cursor: CursorType) => {
    
    const styleCursor = StyleSheet.create({
        cursor: {
            position: 'absolute',
            width: cursor.width.value,
            height: cursor.height.value
        }
    });
    return styleCursor;
}