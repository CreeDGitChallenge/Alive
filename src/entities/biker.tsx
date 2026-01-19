// React native
import { StyleSheet, Dimensions } from "react-native";
// React native gesture handler
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
// Reanimated
import Animated, { useSharedValue, useAnimatedStyle, clamp } from 'react-native-reanimated';

// Player size
const PLAYER_SIZE_X = 100
const PLAYER_SIZE_Y = 100

export default function Biker () {
    // Sreen dimensions
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

    // Object position
    const translateX = useSharedValue(SCREEN_WIDTH / 2 - PLAYER_SIZE_X / 2);
    const translateY = useSharedValue(SCREEN_HEIGHT / 2 - PLAYER_SIZE_Y / 2);
    const offsetX = useSharedValue(translateX.value);
    const offsetY = useSharedValue(translateY.value);

    console.log(SCREEN_HEIGHT)
    console.log(SCREEN_WIDTH)
    // Define position
    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            const nextX = offsetX.value + event.translationX;
            const nextY = offsetY.value + event.translationY;

            // Change the value on X only if not higher than the max screen width
            translateX.value = clamp(nextX, 0, SCREEN_WIDTH - PLAYER_SIZE_X);
            // Change the value on Y only if not higher than the max screen width
            translateY.value = clamp(nextY, 0, SCREEN_HEIGHT - PLAYER_SIZE_Y)
        })
        .onEnd(() => {
            offsetX.value = translateX.value;
            offsetY.value = translateY.value;
        });
    
    // Update the display
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value }
        ]
    }));

    return (
        <GestureDetector gesture={panGesture}>
            {/* Biker */}
            <Animated.Image 
                source={require("../../assets/game/biker/Biker.png")}
                style = {[style.biker, animatedStyle]} 
                resizeMode="contain"
            /> 
        </GestureDetector>
    );
}

// Style
const style = StyleSheet.create({
  biker: {
    position: 'absolute',
    width: PLAYER_SIZE_X,
    height: PLAYER_SIZE_Y,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 10
  },
})