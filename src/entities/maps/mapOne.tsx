// React native
import { StyleProp, ImageStyle } from "react-native";
// Animated
import Animated, { useSharedValue } from "react-native-reanimated";

// Type
type PropsType = {
    animatedStyle: AnimatedStyleType,
    styleSheet: StyleProp<ImageStyle>
};
export default function MapOne ({ animatedStyle, styleSheet }: PropsType) {
    return (
        <Animated.Image
            source={require('@/assets/game/maps/map-one.png')}
            style={
                [
                    styleSheet,
                    animatedStyle
                ]
            }
        />
    );
}

// Obstacle data
export const MapOneData = (
    setX = 0,
    setY = 0,
    setWidth = 1024,
    setHeight = 1536
) => {
    return {
        x: useSharedValue(setX),
        y: useSharedValue(setY),
        width: useSharedValue(setWidth),
        height: useSharedValue(setHeight)
    }
}