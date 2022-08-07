import GameFieldInfo from "../GameFieldInfo";
import RandomHelper from "../../helpers/RandomHelper";
import axios from "axios";
import ArrayObjectHelper from "../../helpers/ArrayObjectHelper";
import QuestionResettingObject from "./QuestionResettingObject";

export default class QuestionsMain
{
    constructor()
    {
        this.params = {
            sharedOptions: true,
            totalNeededOptions: 3,
            currentHideLevel: 1
        };

        this.loadedQuestions = {
            1: {
                text: 'Select good option',
                showingText: 'Select good option',
                id: 1,
                rightAnswers: [1, 6],
                type: 1,
                options: [1, 2, 3]
            },
            2: {
                text: 'Select bad option',
                showingText: 'Select bad option',
                id: 2,
                rightAnswers: [2],
                type: 1
            },
            3: {
                // text: ['2 + ', {rightAnswer: 1}, ' = 5'],
                text: ['Каждый ', 0, ' желает знать ', 3, ' сидит фазан'],
                showingText: ['Каждый ', 0, ' желает знать &nbsp;', 3, ' &nbsp;сидит фазан'],
                // text: 'zz',
                id: 3,
                type: 2,
                maxPart: 1,
                partsIds: [0, 3],
                parts: {0: {rightAnswers:[3], hideLevel: 3}, 3: {rightAnswers: [4], hideLevel: 1}}
            },
            4: {
                text: '444Select bad option',
                showingText: '444Select bad option',
                id: 4,
                rightAnswers: [2],
                type: 1
            },
            5: {
                text: '555Select bad option',
                showingText: '555Select bad option',
                id: 5,
                rightAnswers: [2],
                type: 1
            },
            6: {
                text: '666Select bad option',
                showingText: '666Select bad option',
                id: 6,
                rightAnswers: [2],
                type: 1
            },
        };

        this.currentQuestion = this.loadedQuestions[1];
        this.currentQuestionIndex = 0;
        this.currentQuestionPart = 0;
        this.currentQuestionType = 2;

        this.options = {
            1: {
                text: 'Good option',
                id: 1,
            },
            2: {
                text: 'Bad option',
                id: 2,
            },
            3: {
                text: 'охотник',
                id: 3,
            },
            4: {
                text: 'где',
                id: 4,
            },
            5: {
                text: 'fifth',
                id: 5
            },
            6: {
                text: 'Good2',
                id: 6
            }
        };

        this.currentChainElement = 0;

        this.loadedQuestionGroups = [
             {
                chains: [[[1], [4]]],
                sharedAnswers: true,
                freeQuestions: [],
                options: [1, 2, 3, 4, 5, 6]
            },
            {
                chains: [[[3]]],
                sharedAnswers: true,
                freeQuestions: [],
                options: [1, 2, 3, 4, 5, 6]
            },
        ];

        this.showingQuestionOptions = {};

        if (QuestionsMain._instance) {
            return QuestionsMain._instance
        }

        QuestionsMain._instance = this;
    }

    randomlyChangeCurrentQuestion()
    {
        if (this.currentQuestionType === 2 && this.currentQuestionPart < this.currentQuestion.partsIds.length - 1) {
            this.currentQuestionPart++;
        } else {
            let {value} = RandomHelper.getRandomObjectKeyAndValue(this.loadedQuestions);
            this.currentQuestion = value;
            this.currentQuestionPart = 0;
            this.currentQuestionType = value.type;
        }

    }

    async loadQuestions()
    {
        return await axios('http://127.0.0.1:8000/test', {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            withCredentials: false,
            credentials: 'same-origin',
        }).then(response => {
            this.loadedQuestions = response.data.questions;
        })
    }

    setCurrentQuestionOptions()
    {
        this.showingQuestionOptions = {};
        let result = this.loadedQuestionGroups[this.currentGroupIndex].settedOptions[this.currentQuestion.id];

        if (this.currentQuestion.type == 2) {
            /*s*/console.log('result=', result); //todo r
            let partId = this.currentQuestion.partsIds[this.currentQuestionPart];
            result = result[partId];
        }
        for (let index of result) {
            this.showingQuestionOptions['_' + index] = this.options[index];
        }
        return this.showingQuestionOptions;
    }

    setCurrentGroupIndex(changeValue = 1, relative = true)
    {
        if (relative) {
            this.currentGroupIndex += changeValue;
        } else {
            this.currentGroupIndex = changeValue;
        }
    }

    setCurrentQuestionPartIfNeeded(changeValue, relative)
    {
        if (this.currentQuestion.type === 2) {
            if (!relative) {
                this.currentQuestionPart = 0;
            } else {
                if (changeValue > 0) {
                    this.currentQuestionPart = 0;
                } else {
                    this.currentQuestionPart = this.currentQuestion.partsIds.length - 1;
                }
            }
        }
    }

    changeQuestion(changeValue = 1, relative = true, reset = false)
    {
        let questionKeys = this.loadedQuestionGroups[this.currentGroupIndex].settedQuestionsOrder;
        let currentQuestionIndex = this.currentQuestionIndex;
        let newIndex;
        let changedQuestion = true;

        if (relative) {
            if (this.currentQuestion.type === 2) {
                let newQuestionPart = this.currentQuestionPart + changeValue;
                if (newQuestionPart > -1 && newQuestionPart < this.currentQuestion.partsIds.length) {
                    this.currentQuestionPart = newQuestionPart;
                    changedQuestion = false;
                    newIndex = currentQuestionIndex;
                } else {
                    newIndex = currentQuestionIndex + changeValue;
                }
            } else {
                newIndex = currentQuestionIndex + changeValue;
            }
        } else {
            newIndex = changeValue;
        }

        if (!changeValue) {
            changedQuestion = false;
        }

        if (questionKeys.hasOwnProperty(newIndex) && !reset) {
            let questionId = questionKeys[newIndex];
            this.currentQuestionIndex = newIndex;
            this.currentQuestion = this.loadedQuestions[questionId];

            if (changedQuestion) {
                this.setCurrentQuestionPartIfNeeded(changeValue, relative);
            }

            let last = ArrayObjectHelper.checkIfIndexIsLast(questionKeys, this.currentQuestionIndex);
            let first = !newIndex && !this.currentGroupIndex;
            if (this.currentQuestion.type === 2) {
                if (this.currentQuestionPart) {
                    first = false;
                }
                if (last) {
                    if (this.currentQuestionPart < this.currentQuestion.partsIds.length - 1) {
                        last = false;
                    }
                }
            }

            if (last) {
                if (!ArrayObjectHelper.checkIfIndexIsLast(this.loadedQuestionGroups, this.currentGroupIndex)) {
                    last = false;
                }
            }

            let options = this.setCurrentQuestionOptions();

            return {success: true, last, first, question: this.currentQuestion, options};
        } else {

            let currentQuestionIndex = 0;
            if (reset) {
                this.setCurrentGroupIndex(0, false);
            } else {
                if (changeValue == 1) {
                    this.setCurrentGroupIndex(1);
                } else {
                    this.setCurrentGroupIndex(-1);

                    currentQuestionIndex =
                        ArrayObjectHelper.getLastArrayIndex(this.loadedQuestionGroups[this.currentGroupIndex].settedQuestionsOrder);
                }
            }

            this.currentQuestionIndex = currentQuestionIndex;

            let currentQuestionId = this.loadedQuestionGroups[this.currentGroupIndex].settedQuestionsOrder[0];
            this.currentQuestion = this.loadedQuestions[currentQuestionId];

            this.setCurrentQuestionPartIfNeeded(changeValue, relative);
            return this.changeQuestion(0);
        }
    }

    resetGroupOrder()
    {
        this.currentGroupIndex = 0;
    }

    resetCurrentLoadedQuestions()
    {
        this.resetGroupOrder();
        QuestionResettingObject.resetQuestionsOrder(this.loadedQuestionGroups, this.loadedQuestions);

        this.loadedQuestionGroups = QuestionResettingObject.resetOptionsOrder(this.loadedQuestionGroups,
            this.loadedQuestions, this.options, this.params);

        this.loadedQuestions =  QuestionResettingObject.resetShowingQuestionParts(this.loadedQuestions, this.options, this.params);
        this.resetCurrentValues();
    }

    resetCurrentValues()
    {
        this.setCurrentGroupIndex(0, false);
        this.changeQuestion(0, false);
        this.currentQuestionIndex = 0;
        this.currentQuestionPart = 0;
    }
    
    changeHandleAnswering(score, optionId)
    {
        let newScore = 0;
        switch (this.currentQuestion.type) {
            case 1:
                if (this.currentQuestion.rightAnswers.includes(optionId)) {
                    newScore = score + 1;
                } else {
                    newScore = score - 1;
                }
                break;

            case 2:
                let partId = this.currentQuestion.partsIds[this.currentQuestionPart];
                if (this.currentQuestion.showingParts[partId].rightAnswers.includes(optionId)) {
                    newScore = score + 1;
                } else {
                    newScore = score - 1;
                }
                break;
        }

        return newScore
    }

    getCurrentQuestionRightAnswersText()
    {
        if (this.currentQuestion.type == 1) {
            return this.currentQuestion.rightAnswers;
        }
        return this.currentQuestion.parts[this.currentQuestion.partsIds[this.currentQuestionPart]];
    }

    changeScoreByAnswerText(score, text)
    {
        let rightAnswers = this.getCurrentQuestionRightAnswersText();
        /*s*/console.log('rightAnswers=', rightAnswers); //todo r
    }

    changeHideLevel(changeValue = 0)
    {
        this.params.currentHideLevel += changeValue;
    }

    getHideLevel()
    {
        return this.params.currentHideLevel;
    }
}
