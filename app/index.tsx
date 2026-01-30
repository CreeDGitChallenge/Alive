// React native
import { View } from "react-native";
// Gesture handler
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Scenes
import StageOne from "@/src/scenes/stageOne";

export default function Index() {
  return (
    <GestureHandlerRootView>
      <View
        style={{
          flex: 1,
        }}
      >
        <StageOne />
      </View>
    </GestureHandlerRootView>
  );
}
