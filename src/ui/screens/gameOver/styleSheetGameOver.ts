// React Native
import { StyleSheet } from "react-native";

export const styleSheetGameOver = (screenWidth: number, screenHeight: number) => {
    // Style
    const styleGameOver = StyleSheet.create({
        gameOver: {
            position: 'absolute',
            width: screenWidth,
            height: screenHeight,
        }
    }); 
    return styleGameOver;
}