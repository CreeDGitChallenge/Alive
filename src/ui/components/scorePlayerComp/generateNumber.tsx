// React native
import { StyleProp, ImageStyle } from "react-native";

// Reanimated
import Animated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";

type Props = {
    id: number;
    pathImage: number;
    positionX: number;
    positionY: number;
    visibility: SharedValue<number>;
    styleSheet: StyleProp<ImageStyle>
}

export default function GenerateNumber ({ pathImage, positionX, positionY, visibility, styleSheet }: Props) {
    
    const numberAnimated = useAnimatedStyle(() => ({
        transform: [
            { translateX: positionX },
            { translateY: positionY },
        ],
        opacity: visibility.value ? 1 : 0,
        pointerEvents: visibility.value ? "auto" : "none",
    }));

    return (
        <Animated.Image
            source={pathImage}
            style={
                [
                    styleSheet,
                    numberAnimated
                ]
            }
        />
    );
}