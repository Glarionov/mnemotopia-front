import {Button, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from "react";
import GameFieldInfo from "./GameFieldInfo";
import {Dimensions} from "react-native";
import RNPickerSelect from 'react-native-picker-select';

// import { useWindowDimensions } from 'react-native';
import GameIterationMain from "./GameIteraion/GameIterationMain";
import AnimationTest from "./AnimationTest";
import AnimationTestMoving from "./AnimationTestMoving";
import AnimatedObject from "./Objects/AnimatedObject";
import {ScoreContext} from "../Context/score-context";
import {TouchableOpacity} from "react-native";
import BoxCreator from "./GameIteraion/BoxCreator";
import QuestionsMain from "../Questions/QuestionsMain";
import QuestionTextMain from "./QuestionText/QuestionTextMain";

// import logBoxLog from "react-native/Libraries/LogBox/Data/LogBoxLog";

export default function GameMain(props) {
    const [gameObjects, setGameObjects] = useState({});
    const [gameIterationMain] = useState(new GameIterationMain());
    const [score, setScore] = useState(0);
    const [paused, setPaused] = useState(false);
    const [mainInterval, setMainInterval] = useState(false);
    const [selectedValue, setSelectedValue] = useState("java");
    const [currentQuestionText, setCurrentQuestionText] = useState('');
    const [difficulty, setDifficulty] = useState(1);


    // const mainIntervalDuration = 100;
    const mainIntervalDuration = 50;

    const boxCreatorObject = new BoxCreator();
    const questionHelperObject = new QuestionsMain();

    const applyGameIteration = () => {
        let {newGameObjects, newQuestionText} = gameIterationMain.applyGameIteration();
        setGameObjects(newGameObjects);

        if (newQuestionText !== currentQuestionText) {
            setCurrentQuestionText(newQuestionText);
        }
    }

    function  doGameIteration() {
        /*s*/console.log('p1aused=', paused); //todo r
        if (!paused) {
            console.log('not paused')
            applyGameIteration();
            setTimeout(function(){doGameIteration()}.bind(this), mainIntervalDuration);
        } else {
            console.log('PAUSED')
        }
    }

    const pauseGame = () => {
        /*s*/console.log('paused=', paused); //todo r
        setPaused(!paused);
        /*s*/console.log('paused2=', paused); //todo r

        /*s*/console.log('paused=', paused); //todo r
        if (!paused) {
            clearTimeout(mainInterval);
        } else {
            let interval = setInterval(applyGameIteration.bind(this), mainIntervalDuration);
            setMainInterval(interval);
        }
    }



    useEffect(
        () => {
            setDifficulty(boxCreatorObject.dificulty);
        }, [boxCreatorObject.dificulty]
    );

    // async function loadQuestions() {
    //     await questionHelperObject.loadQuestions();
    // }
    //
    //
    // useEffect(() => {
    //     loadQuestions();
    // }, []);

    //
    useEffect(
        () => {
            let interval = setInterval(applyGameIteration.bind(this), 100);
            setMainInterval(interval);


            // gameIterationMain.startMainIteration();
            // doGameIteration();
        }, []
    );

    function applyOnTouchAction(boxIndex) {
        // gameIterationMain.gameObjects[boxIndex].touchAction();
    }

    const handleObjectTouch = (touchedObject) => {

        if (!paused) {
            if (touchedObject.hasOwnProperty('optionId')) {

                let newScore = questionHelperObject.changeHandleAnswering(score, touchedObject.optionId);
                setScore(newScore);
            }
            touchedObject.touchAction();
        }

    }

  return (
    <View style={styles.testgameWrapper}>
        {/*<AnimationTest />*/}
        {/*<AnimationTestMoving />*/}

        <ScoreContext.Provider value={{handleObjectTouch: handleObjectTouch.bind(this)}}>
            <View style={styles.testgame}>
                {Object.entries(gameObjects).map(
                    ([boxIndex, gameObject]) => {
                        if (typeof gameObject.touchAction === "function") {
                            return (
                                <AnimatedObject
                                    key={boxIndex}
                                    boxIndex={boxIndex} gameObject={gameObject} applyOnTouchAction={applyOnTouchAction.bind(this)}/>
                            )
                        } else {
                            return <Text style={gameObject.style}  key={boxIndex}>
                                {gameObject.text}
                            </Text>;
                        }
                    })

                }
            </View>
        </ScoreContext.Provider>


        <View style={styles.bottomStyles}>
            <QuestionTextMain currentQuestionText={currentQuestionText} />
        </View>

        <View style={styles.bottomStyles}>

            <View>
                <Text style={styles.text}>
                    Score: {score}
                </Text>
                <Text style={styles.text}>
                    Difficulty: {difficulty}
                </Text>
            </View>

            {/*<Text style={{color: 'white'}}>*/}




            <View style={styles.container}>

                <RNPickerSelect
                    value={boxCreatorObject.boxAppearType}
                    style={pickerSelectStyles}
                    onValueChange={(itemValue) =>
                    {
                        boxCreatorObject.setBoxAppearType(itemValue);
                        setSelectedValue(itemValue)
                    }}
                    items={
                        Object.entries(BoxCreator.boxCreatingMods).map(([modIndex, boxCreatingMod]) => {
                            {return {label: boxCreatingMod, value: modIndex}}
                        })
                    }
                />
            </View>

            <Button
                title="NonGameTesting"
                onPress={() =>
                    props.navigation.navigate('NonGameTesting', { name: 'NonGameTesting' })
                }
            />

            <TouchableOpacity
                style={{width: 40}}
                onPress={() => {
                pauseGame();
                // setPaused(true)
            }}>
                <Text style={styles.pauseSymbol}>
                    {paused && '▶'}
                    {!paused && '⏸'}
                </Text>
            </TouchableOpacity>

        </View>


    </View>
  );
}

let gameFieldInfo = new GameFieldInfo();


const styles = StyleSheet.create({
    pauseSymbol: {
        fontSize: 30,
        color: 'orange'
    },
    bottomStyles: {
        // color: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // flex: 1,
        width: '100%',
        padding: 10,
        // height: 40
    },
    text: {
        color: '#9ea8b2'
    },
    testgameWrapper: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    test: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'black',
        height: 666,
        width: 350,
        backgroundColor: 'pink',
        position: 'absolute',
        zIndex: 1
    },
  testgame: {
      overflow: "hidden",
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: 'black',
      zIndex: 10,
      // backgroundColor: 'radial-gradient(#3f4cff, #d393e98f)',
      backgroundColor: '#a4bbfc',
      // height: 666,
      // width: 350,
      // height: height - 10,
      // width: width - 10
      height: gameFieldInfo.height,
      width: gameFieldInfo.width,
  },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});