// React
import { StyleSheet } from "react-native";

// Reanimated
import { SharedValue } from "react-native-reanimated";

// Types
type BikerType = {
    x: SharedValue<number>;
    y: SharedValue<number>;
    width: SharedValue<number>;
    height: SharedValue<number>;
};

export const styleSheetBiker = (biker: BikerType) => {
    
    const styleBiker = StyleSheet.create({
        biker: {
            position: 'absolute',
            width: biker.width.value,
            height: biker.height.value
        }
    });
    return styleBiker;
}