// React native
import { StyleSheet } from "react-native";

// Obstacle data
export const OBSTACLE = {
    x: 0,
    y: 0,
    width: 150,
    height: 100
}

// Style
export const styleObstacle = StyleSheet.create({
    obstacle: {
        position: 'absolute',
        backgroundColor: 'green',
    }
})

// React native
// import { StyleSheet } from "react-native";
// // Reanimed
// import Animated from "react-native-reanimated";

// const OBSTACLE = {
//     x: 0,
//     y: 0,
//     width: 150,
//     height: 100
// };

// export default function Obstacle () {
//     return (
//         <Animated.View 
//             style={
//                 [
//                     style.obstacle,
//                     {
//                         left: 0,
//                         top: 0,
//                         width: OBSTACLE.width,
//                         height: OBSTACLE.height
//                     }
//                 ]
//             }
//         />
//     )
// }

// // Style
// const style = StyleSheet.create({
//     obstacle: {
//         position: 'absolute',
//         backgroundColor: 'green',
//     }
// })

// export { OBSTACLE };