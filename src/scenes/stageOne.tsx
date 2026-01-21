// React
import { View, Dimensions } from "react-native";
// Gesture handler
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
// Reanimed
import { useSharedValue, useAnimatedStyle, clamp } from "react-native-reanimated";

// Entities
import Biker, { BIKERDATA } from '@/src/entities/biker'
import Obstacle, { OBSTACLE } from "@/src/entities/obstacle"

// Scripts
import { isColliding } from "../scripts/isColliding";

export default function StageOne () {
    // Sreen dimensions
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

    // Object position
    const translateX = useSharedValue(SCREEN_WIDTH / 2 - BIKERDATA.width / 2);
    const translateY = useSharedValue(SCREEN_HEIGHT / 2 - BIKERDATA.height / 2);
    const offsetX = useSharedValue(translateX.value);
    const offsetY = useSharedValue(translateY.value);
    const bikerIsColliding = useSharedValue(false);

    // Define position
    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            const nextX = offsetX.value + event.translationX;
            const nextY = offsetY.value + event.translationY;

            // Define biker new position
            BIKERDATA.x = nextX
            BIKERDATA.y = nextY

            // Update position if the object is not colliding
            if (!isColliding(BIKERDATA, OBSTACLE) && !bikerIsColliding.value) {
                // Change the value on X only if not higher than the max screen width
                translateX.value = clamp(nextX, 0, SCREEN_WIDTH - BIKERDATA.width);
                // Change the value on Y only if not higher than the max screen width
                translateY.value = clamp(nextY, 0, SCREEN_HEIGHT - BIKERDATA.height)

            // Reset Biker position
            } else {
                translateX.value = SCREEN_WIDTH / 2 - BIKERDATA.width / 2
                translateY.value = SCREEN_HEIGHT / 2 - BIKERDATA.height / 2
                bikerIsColliding.value = true
            }
        })
        .onEnd(() => {
            offsetX.value = translateX.value;
            offsetY.value = translateY.value;
            bikerIsColliding.value = false
        });

    // Update the display
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value }
        ]
    }));

    return (
        <View>
            <GestureDetector gesture={panGesture}>
                {/* Biker */}
                <Biker 
                    animatedStyle={animatedStyle}
                />
            </GestureDetector>

            {/* Obstacle */}
            <Obstacle />
        </View>
    );
}