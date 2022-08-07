import RandomHelper from "../helpers/RandomHelper";

export default class  QuestionResettingObject
{

    static mixGoodAndAllAnswers(currentAnswers, options, params)
    {
        let result = currentAnswers;
        if (params.sharedOptions) {
            let allOptionsKeys = Object.keys(options);
            /*s*/console.log('currentAnswers=', currentAnswers); //todo r
            let freeOptions = allOptionsKeys.filter((value) => !currentAnswers.includes(Number(value)));

            let shuffledFreeOption = RandomHelper.shuffleArray(freeOptions);

            result = [...currentAnswers, ...shuffledFreeOption.slice(0, params.totalNeededOptions - currentAnswers.length)];
        }

        return RandomHelper.shuffleArray(result).map(value => Number(value));
    }

    static resetQuestionsOrder(loadedQuestionGroups)
    {
        for (let groupIndex in loadedQuestionGroups) {
            let group = loadedQuestionGroups[groupIndex];
            let settedQuestionsOrder = [];

            let chains = group.chains;

            let chainMix = [...chains, ...group.freeQuestions];
            chainMix = RandomHelper.shuffleArray(chainMix);

            for (let chainId in chainMix) {
                let chain = chainMix[chainId];
                if (typeof chain === 'number') {
                    settedQuestionsOrder.push(chainMix[chainId]);
                } else {
                    for (let chainElement of chain) {
                        settedQuestionsOrder = [...settedQuestionsOrder, ...RandomHelper.shuffleArray(chainElement)];
                    }
                }
            }

            loadedQuestionGroups[groupIndex].settedQuestionsOrder = settedQuestionsOrder;
        }
        return loadedQuestionGroups;
    }

    static resetOptionsOrder(loadedQuestionGroups, loadedQuestions, options, params)
    {
        for (let groupIndex in loadedQuestionGroups) {
            let group = loadedQuestionGroups[groupIndex];

            let questions = group.settedQuestionsOrder;

            let settedOptions = [];

            for (let questionId of questions)  {
                let currentQuestion = loadedQuestions[questionId];
                let currentAnswers;
                /*s*/console.log('currentQuestion.type=', currentQuestion.type); //todo r
                switch (currentQuestion.type) {
                    case 1:
                        currentAnswers = currentQuestion.correctAnswers;
                        settedOptions[questionId] = QuestionResettingObject.mixGoodAndAllAnswers(currentAnswers, options, params);
                        break;
                    case 2:
                        let result = [];
                        for (let partIndex in currentQuestion.parts) {
                            result[partIndex] = QuestionResettingObject.mixGoodAndAllAnswers(currentQuestion.parts[partIndex].correctAnswers,
                                options, params);
                        }
                        settedOptions[questionId] = result;
                        break;
                }
            }

            loadedQuestionGroups[groupIndex].settedOptions = settedOptions;
        }

        /*s*/console.log('loadedQuestionGroups=', loadedQuestionGroups); //todo r
        return loadedQuestionGroups;
    }

    static resetShowingQuestionParts(loadedQuestions, options, params)
    {
        /*s*/console.log('loadedQuestions=', loadedQuestions); //todo r
        for (let questionIndex in loadedQuestions) {
            let question = loadedQuestions[questionIndex];

            loadedQuestions[questionIndex].showingText = question.text;
            /*s*/console.log('question.parts=', question.parts); //todo r
            if (question.type !== 2 || !question.parts) {
                continue;
            }
            loadedQuestions[questionIndex].showingText = [...question.text];
            question.showingParts = {...question.parts};
            question.showingAnswers = [];
            for (let partId in question.parts) {
                let part = question.parts[partId];
                if (params.currentHideLevel < part.hideLevel) {
                    let indexOfPart = question.text.indexOf(Number(partId));
                    loadedQuestions[questionIndex].showingText[indexOfPart] = options[part.correctAnswers[0]].text;
                    delete question.showingParts[partId];
                } else {

                    console.log('MORE')
                }
            }

            question.partsAmount = Object.keys(question.showingParts).length;
            question.partsIds = Object.keys(question.showingParts);
        }

        /*s*/console.log('loadedQuestions=', loadedQuestions); //todo r
        return loadedQuestions;
    }
}