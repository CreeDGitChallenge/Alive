// React native
import { Text, View, StyleSheet } from "react-native";
// React-native-gesture-handler
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';

// Entities
import Biker from '../src/entities/biker'

export default function Index() {
  const tapGesture = Gesture.Tap().onStart(() => {
    console.log('Tape');
  })

  return (
    <GestureHandlerRootView>
      <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        {/* Title */}
        <Text>Test</Text>
        <Biker />

      </View>
    </GestureHandlerRootView>
  );
}