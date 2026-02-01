// React
import { StyleSheet } from "react-native";

// Reanimated
import { SharedValue } from "react-native-reanimated";

// Types
type BicycleType = {
    x: SharedValue<number>;
    y: SharedValue<number>;
    width: SharedValue<number>;
    height: SharedValue<number>;
}

export const styleSheetBicycle = (bicyclePath: BicycleType) => {
    // Style
    const styleBicyclePath = StyleSheet.create({
        bicycle: {
            position: 'absolute',
            width: bicyclePath.width.value,
            height: bicyclePath.height.value,
        }
    });
    return styleBicyclePath;
};