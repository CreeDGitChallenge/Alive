// React native
import { View } from "react-native";
// Gesture handler
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Scenes
import Maps from "@/src/maps/init";
import StageOne from "@/src/scenes/stageOne";

// Entities
// import Biker from '@/src/entities/biker';
// import Obstacle from "@/src/entities/obstacle";

export default function Index() {
  return (
    <GestureHandlerRootView>
      <View
        style={{
          flex: 1,
        }}
      >
        <Maps />
        <StageOne />
        {/* <Biker /> */}
        {/* <Obstacle /> */}
      </View>
    </GestureHandlerRootView>
  );
}
