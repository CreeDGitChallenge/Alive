// React native
import { View } from "react-native";
// React-native-gesture-handler
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Entities
import Biker from '@/src/entities/biker';
import Obstacle from "@/src/entities/obstacle";

export default function Index() {

  return (
    <GestureHandlerRootView>
      <View
      style={{
        flex: 1,
      }}
    >
        <Biker />
        <Obstacle />
      </View>
    </GestureHandlerRootView>
  );
}