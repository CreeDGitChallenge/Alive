// React native
import {View, StyleSheet } from "react-native";
// React-native-gesture-handler
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

export default function Biker () {
    const tapGesture = Gesture.Tap().onStart(() => {
    console.log('Tape');
    })

    return (
        <GestureDetector gesture={tapGesture}>
            {/* Test object */}
            {/* <View style = {newColor ? style.ballNewDesign : style.ball}></View> */}
            <View style = {style.ball}></View>
            {/* <View style = {style.ballNewDesign}></View> */}
        </GestureDetector>
    );
}

// Style
const style = StyleSheet.create({
  ball: {
    width: 50,
    height: 100,
    backgroundColor: 'green'
  },
  ballNewDesign: {
    width: 50,
    height: 100,
    backgroundColor: 'blue'
  }
})