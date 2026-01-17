// React native
import { StyleSheet } from "react-native";
// React native gesture handler
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
// Reanimated
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

export default function Biker () {
    // Object position
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);

    // Deplacements
    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = offsetX.value + event.translationX;
            translateY.value = offsetY.value + event.translationY;
        })
        .onEnd(() => {
        offsetX.value = translateX.value;
        offsetY.value = translateY.value;
  });
    
    // Animation
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value }
        ]
    }));

    return (
        <GestureDetector gesture={panGesture}>
            {/* Test object */}
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
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 10
  },
})