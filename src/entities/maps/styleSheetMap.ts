// React
import { StyleSheet } from "react-native";

// Reanimated
import { SharedValue } from "react-native-reanimated";

// Types
type MapType = {
    x: SharedValue<number>;
    y: SharedValue<number>;
    width: SharedValue<number>;
    height: SharedValue<number>;
}

export const styleSheetMap = (map: MapType) => {
    // Style
    const styleMap = StyleSheet.create({
        map: {
            position: 'absolute',
            width: map.width.value,
            height: map.height.value,
        }
    });
    return styleMap;
}