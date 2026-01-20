// React native
import { StyleSheet } from "react-native"

// Biker data
export const BIKER = {
    x: 0,
    y: 0,
    width: 100,
    height: 100
}

// Style
export const styleBiker = StyleSheet.create({
    biker: {
        position: 'absolute',
        borderWidth: 3,
        width: BIKER.width,
        height: BIKER.height,
        borderColor: 'black',
        borderRadius: 10
    }
})

// // React native
// import { StyleSheet, Dimensions } from "react-native";
// // React native gesture handler
// import { GestureDetector, Gesture } from 'react-native-gesture-handler';
// // Reanimated
// import Animated, { useSharedValue, useAnimatedStyle, clamp } from 'react-native-reanimated';
// // Entities
// import { OBSTACLE } from "./obstacle";

// // Player size
// const BIKER_SIZE_X = 100
// const BIKER_SIZE_Y = 100

// // Types
// type React = {
//     x: number;
//     y: number;
//     width: number;
//     height: number;
// }

// const isColliding = (a: React, b: React) => {
//     "worklet";
//     return (
//         a.x < b.x + b.width &&
//         a.x + a.width > b.x &&
//         a.y < b.y + b.height &&
//         a.y + a.height > b.y
//     )
// }

// export default function Biker () {
//     // Sreen dimensions
//     const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

//     // Object position
//     const translateX = useSharedValue(SCREEN_WIDTH / 2 - BIKER_SIZE_X / 2);
//     const translateY = useSharedValue(SCREEN_HEIGHT / 2 - BIKER_SIZE_Y / 2);
//     const offsetX = useSharedValue(translateX.value);
//     const offsetY = useSharedValue(translateY.value);

//     // Define position
//     const panGesture = Gesture.Pan()
//         .onUpdate((event) => {
//             const nextX = offsetX.value + event.translationX;
//             const nextY = offsetY.value + event.translationY;

//             const BIKER:React = {
//                 x: nextX,
//                 y: nextY,
//                 width: BIKER_SIZE_X,
//                 height: BIKER_SIZE_Y
//             };

//             if (!isColliding(BIKER, OBSTACLE)) {
//                 // Change the value on X only if not higher than the max screen width
//                 translateX.value = clamp(nextX, 0, SCREEN_WIDTH - BIKER_SIZE_X);
//                 // Change the value on Y only if not higher than the max screen width
//                 translateY.value = clamp(nextY, 0, SCREEN_HEIGHT - BIKER_SIZE_Y)
//             } else {
//                 translateX.value = SCREEN_WIDTH / 2 - BIKER_SIZE_X / 2
//                 translateY.value = SCREEN_HEIGHT / 2 - BIKER_SIZE_Y / 2
//             }
//         })
//         .onEnd(() => {
//             offsetX.value = translateX.value;
//             offsetY.value = translateY.value;
//         });
    
//     // Update the display
//     const animatedStyle = useAnimatedStyle(() => ({
//         transform: [
//             { translateX: translateX.value },
//             { translateY: translateY.value }
//         ]
//     }));

//     return (
//         <GestureDetector gesture={panGesture}>
//             {/* Biker */}
//             <Animated.Image 
//                 source={require("../../assets/game/biker/Biker.png")}
//                 style = {[style.biker, animatedStyle]}
//                 resizeMode="contain"
//             /> 
//         </GestureDetector>
//     );
// }

// // Style
// const style = StyleSheet.create({
//   biker: {
//     position: 'absolute',
//     width: BIKER_SIZE_X,
//     height: BIKER_SIZE_Y,
//     borderWidth: 3,
//     borderColor: 'black',
//     borderRadius: 10
//   },
// })