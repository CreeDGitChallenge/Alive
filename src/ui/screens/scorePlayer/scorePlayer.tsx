// React native
import { StyleProp, ImageStyle } from "react-native";

// Reanimated
import { SharedValue, useSharedValue } from "react-native-reanimated"

// Components
import GenerateNumber from "@/src/ui/components/scorePlayerComp/generateNumber";

// Types
type PropsScorePlayer = {
    scoreData: {
        x: SharedValue<number>;
        y: SharedValue<number>;
        width: SharedValue<number>;
        height: SharedValue<number>;
        id: number;
        src: number;
        visibility: SharedValue<number>;
    }[];
    styleSheet: StyleProp<ImageStyle>;
};

export default function ScorePlayer ({ scoreData, styleSheet }: PropsScorePlayer) {

    // Types
    type PropsGenerateAll = {
        positionX: number;
        positionY: number;
        digit: {
            id: number;
            src: number;
            visibility: SharedValue<number>;
        }[];
        styleSheet: StyleProp<ImageStyle>
    }

    // Componant Generator
    function GenerateAll ({positionX, positionY, digit, styleSheet}: PropsGenerateAll) {
        return (
            digit.map((element) => (   
                <GenerateNumber
                    key={element.id}
                    id={element.id}
                    pathImage={element.src}
                    positionX={positionX} 
                    positionY={positionY}
                    visibility={element.visibility}
                    styleSheet={styleSheet}
                />
            ))
        );
    }

    return (
        <GenerateAll
            digit={scoreData}
            positionX={scoreData[0].x.value}
            positionY={scoreData[0].y.value}
            styleSheet={styleSheet}
        />
    );
}

// Data score player
export const DataScorePlayer = (
    setX = 0,
    setY = 0,
    setWidth = 30,
    setHeight = 31
) => {
    return (
        [
            {
                x: useSharedValue(setX),
                y: useSharedValue(setY),
                width: useSharedValue(setWidth),
                height: useSharedValue(setHeight),
                id: 0,
                src: require('@/assets/game/score/zero.png'),
                visibility: useSharedValue(0)
            },
            {
                x: useSharedValue(setX),
                y: useSharedValue(setY),
                width: useSharedValue(setWidth),
                height: useSharedValue(setHeight),
                id: 1,
                src: require('@/assets/game/score/one.png'),
                visibility: useSharedValue(0)
            },
            {
                x: useSharedValue(setX),
                y: useSharedValue(setY),
                width: useSharedValue(setWidth),
                height: useSharedValue(setHeight),
                id: 2,
                src: require('@/assets/game/score/two.png'),
                visibility: useSharedValue(0)
            },
            {
                x: useSharedValue(setX),
                y: useSharedValue(setY),
                width: useSharedValue(setWidth),
                height: useSharedValue(setHeight),
                id: 3,
                src: require('@/assets/game/score/tree.png'),
                visibility: useSharedValue(0)
            },
            {
                x: useSharedValue(setX),
                y: useSharedValue(setY),
                width: useSharedValue(setWidth),
                height: useSharedValue(setHeight),
                id: 4,
                src: require('@/assets/game/score/for.png'),
                visibility: useSharedValue(0)
            },
            {
                x: useSharedValue(setX),
                y: useSharedValue(setY),
                width: useSharedValue(setWidth),
                height: useSharedValue(setHeight),
                id: 5,
                src: require('@/assets/game/score/five.png'),
                visibility: useSharedValue(0)
            },
            {
                x: useSharedValue(setX),
                y: useSharedValue(setY),
                width: useSharedValue(setWidth),
                height: useSharedValue(setHeight),
                id: 6,
                src: require('@/assets/game/score/six.png'),
                visibility: useSharedValue(0)
            },
            {
                x: useSharedValue(setX),
                y: useSharedValue(setY),
                width: useSharedValue(setWidth),
                height: useSharedValue(setHeight),
                id: 7,
                src: require('@/assets/game/score/seven.png'),
                visibility: useSharedValue(0)
            },
            {
                x: useSharedValue(setX),
                y: useSharedValue(setY),
                width: useSharedValue(setWidth),
                height: useSharedValue(setHeight),
                id: 8,
                src: require('@/assets/game/score/height.png'),
                visibility: useSharedValue(0)
            },
            {
                x: useSharedValue(setX),
                y: useSharedValue(setY),
                width: useSharedValue(setWidth),
                height: useSharedValue(setHeight),
                id: 9,
                src: require('@/assets/game/score/nine.png'),
                visibility: useSharedValue(0)
            }
        ]
    );
}