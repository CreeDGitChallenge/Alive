// React
import { View, Dimensions } from "react-native";
// Gesture handler
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
// Reanimed
import Animated, { useSharedValue, useAnimatedStyle, clamp } from "react-native-reanimated";

// Entities
import { BIKER, styleBiker } from '@/src/entities/biker'
import { OBSTACLE, styleObstacle } from "@/src/entities/obstacle"

// Scripts
import { isColliding } from "../scripts/isColliding";

export default function StageOne () {
    // Sreen dimensions
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

    // Object position
    const translateX = useSharedValue(SCREEN_WIDTH / 2 - BIKER.width / 2);
    const translateY = useSharedValue(SCREEN_HEIGHT / 2 - BIKER.height / 2);
    const offsetX = useSharedValue(translateX.value);
    const offsetY = useSharedValue(translateY.value);
    const bikerIsColliding = useSharedValue(false);

    // Define position
    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            const nextX = offsetX.value + event.translationX;
            const nextY = offsetY.value + event.translationY;

            // Define biker new position
            BIKER.x = nextX
            BIKER.y = nextY

            // Update position if the object is not colliding
            if (!isColliding(BIKER, OBSTACLE) && !bikerIsColliding.value) {
                // Change the value on X only if not higher than the max screen width
                translateX.value = clamp(nextX, 0, SCREEN_WIDTH - BIKER.width);
                // Change the value on Y only if not higher than the max screen width
                translateY.value = clamp(nextY, 0, SCREEN_HEIGHT - BIKER.height)

            // Reset Biker position
            } else {
                translateX.value = SCREEN_WIDTH / 2 - BIKER.width / 2
                translateY.value = SCREEN_HEIGHT / 2 - BIKER.height / 2
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
                <Animated.Image
                    source={require('@/assets/game/biker/Biker.png')}
                    style={
                        [
                            styleBiker.biker,
                            animatedStyle
                        ]
                    }
                    resizeMode={'contain'}
                />
            </GestureDetector>
            

            {/* Obstacle */}
            <Animated.View 
                style={
                    [
                        styleObstacle.obstacle,
                        {
                            top: 0,
                            left: 0,
                            width: OBSTACLE.width,
                            height: OBSTACLE.height
                        }
                    ]
                }
            />
        </View>
    );
}