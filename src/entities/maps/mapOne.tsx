// React native
import { StyleSheet, Dimensions } from "react-native";
// Animated
import Animated from "react-native-reanimated";

export default function MapOne (props: {animatedStyle: AnimatedStyleType }) {
    const { animatedStyle } = props

    return (
        <Animated.Image
            source={require('@/assets/game/maps/map-one.png')}
            style={
                [
                    styleMap.map,
                    animatedStyle
                ]
            }
        />
    );
}

// Obstacle data
export const MAP = {
    x: 0,
    y: 0,
    width: 1024,
    height: 1536
};

// Sreen dimension
const { width: SREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

// Style
const styleMap = StyleSheet.create({
    map: {
        position: 'absolute',
        width: SREEN_WIDTH,
        height: SCREEN_HEIGHT,
    }
});