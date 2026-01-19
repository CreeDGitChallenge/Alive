// React native
import { View } from "react-native";
// React-native-gesture-handler
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Entities
import Biker from '../src/entities/Biker'

export default function Index() {

  return (
    <GestureHandlerRootView>
      <View
      style={{
        flex: 1,
      }}
    >
        <Biker />
      </View>
    </GestureHandlerRootView>
  );
}