// React Native
import { Dimensions, StyleSheet } from "react-native";
// Reanimated
import Animated from "react-native-reanimated";

// Types
type AnimatedStyle = {
  transform: ({ translateX: number } | { translateY: number })[];
};

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ⚠️ Use the REAL dimensions of your image
const MAP_ASPECT_RATIO = 1024 / 1536; // example only

export default function Map(props: { animatedStyle?: AnimatedStyle }) {
  const { animatedStyle } = props;

  return (
    <Animated.Image
      source={require("../../assets/game/maps/road_map.png")}
      style={[styles.map, animatedStyle ? animatedStyle : undefined]}
      resizeMode="contain"
    />
  );
}

// Map data
export const MAP_DATA = {
  width: SCREEN_WIDTH,
  height: SCREEN_WIDTH / MAP_ASPECT_RATIO,
};

// Styles
const styles = StyleSheet.create({
  map: {
    position: "absolute",
    width: MAP_DATA.width,
    height: MAP_DATA.height,
    bottom: 0,
  },
});
