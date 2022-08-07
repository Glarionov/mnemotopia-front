import {StyleSheet, Text, View, TouchableOpacity, TouchableOpacityComponent, Button} from 'react-native';
import QuestionsMain from "../Questions/QuestionsMain";
import {useContext, useEffect, useState} from "react";
import QuestionTextMain from "../Game/QuestionText/QuestionTextMain";
import QuestionOptions from "./QuestionOptions";
import ShowingResult from "./ShowingResult";
import AnswerTextInput from "./AnswerTextInput";
import MyAlert from "../Components/MyAlert";
import {AlertContext} from "../Context/alert-context";

export default function SingleQuestion(props) {

  const [currentQuestionText, setCurrentQuestionText] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState({text: '', showingText: '' });
  const [prevButtonText, setPrevButtonText] = useState('');
  const [nextButtonText, setNextButtonText] = useState('Next');
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [showingResult, setShowingResult] = useState(false);
  const [options, setOptions] = useState({});
  const [score, setScore] = useState(0);

  const questionHelperObject = new QuestionsMain();
  const [alreadyClickedOptions, setAlreadyClickedOptions] = useState({});
  const [alreadyClickedOptionsOfCurrentQuestion, setAlreadyClickedOptionsOfCurrentQuestion] = useState([]);

  const [alreadyUsedAnswerTexts, setAlreadyUsedAnswerTexts] = useState({});
  const [message, setMessage] = useState('');


  const [hideLevel, setHideLevel] = useState(1);

  const show = useContext(AlertContext);



  useEffect(
      () => {
          loadQuestionsAnsRestTest();
      },  []
  );

  useEffect(
      () => {
          setCurrentQuestionText(questionHelperObject.currentQuestion.text);
      },  [questionHelperObject.currentQuestion.id]
  );

  const loadQuestionsAnsRestTest = async () => {
      await questionHelperObject.loadQuestions();
      resetTest();
  }


  const resetTest = (changeLevel = 0) => {
      setIsLastQuestion(false);
      setShowingResult(false);

      if (changeLevel) {
          questionHelperObject.changeHideLevel(changeLevel);
          setHideLevel(questionHelperObject.getHideLevel());
          setScore(0);
      }

      questionHelperObject.resetCurrentLoadedQuestions();
      // questionHelperObject.resetCurrentValues();

      changeQuestion(0, false, true);
      setShowingResult(false);
      setAlreadyClickedOptions({});
      setAlreadyClickedOptionsOfCurrentQuestion([]);
  }
    const changeQuestion = (changeValue = 1, relative = true, resetting = false) => {
        if (isLastQuestion && changeValue === 1 && !resetting) {
            /*s*/console.log('1111=', 1111); //todo r
            setShowingResult(true);
        } else {
            /*s*/console.log('2222=', 2222); //todo r
            let changeQuestionData = questionHelperObject.changeQuestion(changeValue, relative, resetting);
            if (changeQuestionData.success) {

                setMessage('');
                let currentQuestionId = questionHelperObject.currentQuestion.id;

                if (questionHelperObject.currentQuestion.type === 2) {
                    currentQuestionId += '_' + questionHelperObject.currentQuestionPart;
                }

                if (!alreadyClickedOptions.hasOwnProperty(currentQuestionId)) {
                    alreadyClickedOptions[currentQuestionId] = [];
                }

                setAlreadyClickedOptionsOfCurrentQuestion(alreadyClickedOptions[currentQuestionId]);

                setCurrentQuestionText(changeQuestionData.question.text);
                setIsLastQuestion(changeQuestionData.last);
                setCurrentQuestion(changeQuestionData.question);

                /*s*/console.log('changeQuestionData.question=', changeQuestionData.question); //todo r


                setOptions(changeQuestionData.options);
                if (changeQuestionData.last) {
                    setNextButtonText('See results');
                } else {
                    setNextButtonText('Next');
                }

                if (changeQuestionData.first) {
                    setPrevButtonText('');
                } else {
                    setPrevButtonText('Prev');
                }
            }
        }
    }

    const getCurrentQuestionId = () => {
        let currentQuestionId = questionHelperObject.currentQuestion.id;

        if (questionHelperObject.currentQuestion.type === 2) {
            currentQuestionId += '_' + questionHelperObject.currentQuestionPart;
        }

        return currentQuestionId;
    }

    const clickOnOption = (optionId) => {
      let currentQuestionId = getCurrentQuestionId();

      if (!alreadyClickedOptions.hasOwnProperty(currentQuestionId) ||
          !alreadyClickedOptions[currentQuestionId].includes(optionId)) {
          let newScore = questionHelperObject.changeHandleAnswering(score, optionId);



          let oldValue = alreadyClickedOptions[currentQuestionId] ?? [];
          let newClickedValue = [...oldValue, optionId];
          setAlreadyClickedOptions(
              alreadyClickedOptions => {
                  return {...alreadyClickedOptions, [currentQuestionId]: newClickedValue};
              }
          );
          setAlreadyClickedOptionsOfCurrentQuestion(newClickedValue);
          setScore(newScore);
      }
    }

    const answerByText = (text) => {

        let currentQuestionId = getCurrentQuestionId();

        let usedTexts = alreadyUsedAnswerTexts;

        if (!alreadyUsedAnswerTexts.hasOwnProperty(currentQuestionId)) {
            usedTexts[currentQuestionId] = [];
        }

        if (!usedTexts[currentQuestionId].includes(text)) {
            let {newScore, change} = questionHelperObject.changeScoreByAnswerText(score, text);
            setScore(newScore);

            usedTexts[currentQuestionId].push(text);
            if (change === -1) {
                setMessage('Wrong answer');
            } else {
                setMessage('');
            }

            setAlreadyUsedAnswerTexts(usedTexts)
        }
    }



    if (showingResult) {
        return (
            <ShowingResult resetTest={resetTest.bind(this)} hideLevel={hideLevel} setHideLevel={setHideLevel}
                           {...props}
            />
        )
    }

    const prevButton = prevButtonText? <TouchableOpacity onPress={() => {
        changeQuestion(-1);
    }}>
        <View style={{width: 100}}>
            <Text style={{justifyContent: 'start', display: 'flex'}}>
                <Text style={styles.prevButton}>
                    {prevButtonText}
                </Text>
            </Text>
        </View>
    </TouchableOpacity>: <View style={{width: 100}}></View>;

  return (
    <View style={styles.SingleQuestion}>
        <View style={styles.questionTopPart}>
            <View>
                <View style={styles.bottomStyles}>
                    <QuestionTextMain currentQuestionText={currentQuestion.showingText} />
                </View>
            </View>
        </View>

        <QuestionOptions currentQuestion={currentQuestion} options={options} clickOnOption={clickOnOption}
                         alreadyClickedOptions={alreadyClickedOptionsOfCurrentQuestion}
        />

        {/*<AnswerTextInput message={message} answerByText={answerByText.bind(this)}/>*/}

        <View style={styles.questionBottomPart}>
            {prevButton}

            <Button onPress={() => {
                let action = () => {
                    console.log('OTHER ACTION');
                    setShowingResult(true);
                };

                action = action.bind(this);

                show.openAlert(action, 'Stop test?')}}
                    title="Stop test"
                />

            <View>
                <Text>
                    Score: {score}
                </Text>
            </View>

            <View>
                <Text>
                    Hide level: {hideLevel}
                </Text>
            </View>

                <View style={{width: 100}}>
                    <TouchableOpacity onPress={() => {
                        changeQuestion(1);
                    }}>
                        <Text style={{justifyContent: 'end', display: 'flex'}}>
                            <Text style={styles.nextButton}>
                                {nextButtonText}
                            </Text>
                        </Text>

                    </TouchableOpacity>
                </View>


        </View>
    </View>
  );
}

const bottomButtonStyles = {
    backgroundColor: '#ffffff8f',
    padding: 8,
}

const styles = StyleSheet.create({
    bottomButtonWrapper: {
        width: 200,
        // backgroundColor: 'red'
    },
    prevButton: {
        ...bottomButtonStyles,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    nextButton: {
        ...bottomButtonStyles,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    bottomButton: {
        // backgroundColor: 'red',
        // width: 20,
        // height: 100,
        // flex: 1,
        // justifyContent: 'space-between'
        // height: '100%'
        backgroundColor: '#ffffff8f',
        // background: 'red',
        padding: 8,

        // border-radius: 0px 7px 7px 0px;
    },
    questionBottomPart: {
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        // height: 100,
        // flex: 1,
        // backgroundColor: 'rgb(86,93,204)',
        backgroundColor: '#a2a2ff',
        // backgroundColor: 'red',

        color: 'white',
        marginBottom: 0,
        borderTopWidth: 6,
        borderStyle: 'solid',
        borderColor: '#6a6aff5c'
        // 6px solid #6a6aff5c
    },
    SingleQuestion: {
        fontSize: 20,
        width: '100%',
        flexDirection: 'column',
        flex: 1,
        // height: '100%',
        justifyContent: 'space-between',
    },
    questionGroupName: {
        fontSize: 15
    },
    questionTopPart: {
        width: '100%',
        minHeight: 100,
        display: 'flex',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: '#a2a2ff',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingVertical: 5,
        borderBottomWidth: 6,
        borderStyle: 'solid',
        borderColor: '#6a6aff5c'
    }
});

// .nongame-questions .question-top-part {
//     border-radius: 30px 30px 0 0;
//     align-items: center;
//     font-weight: 600;
//     background-color: #a2a2ff;
//     text-align: center;
//     border-bottom: 6px solid #6a6aff5c;
//     padding-top: 5px;
//     padding-bottom: 5px;
//     min-height: 8rem;
// }
//
// .nongame-questions .question-top-part .question-name {
//     min-height: 90px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }

// <div className="row question-top-part">
//
//   <div className="row col-12">
//     <div className="question-group-name col-6 offset-3">
//       {this.props.currentGroup.group_name}
//     </div>
//     <div className="col-3">
//       Score: {this.props.score}
//     </div>
//   </div>
//
//   <div className="question-name col-12">
//     {this.state.questionData.question_name}
//
//   </div>
//
// </div>