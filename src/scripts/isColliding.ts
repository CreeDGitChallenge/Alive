import { SharedValue } from "react-native-reanimated";

// Types
type Entities = {
    x: SharedValue<number>;
    y: SharedValue<number>;
    width: SharedValue<number>;
    height: SharedValue<number>;
}

export const isColliding = (a: Entities, b: Entities) => {
    "worklet";
    return (
        a.x.value < b.x.value + b.width.value &&
        a.x.value + a.width.value > b.x.value &&
        a.y.value < b.y.value + b.height.value &&
        a.y.value + a.height.value > b.y.value
    )
}