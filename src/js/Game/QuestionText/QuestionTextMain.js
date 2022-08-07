import { StyleSheet, Text, View } from 'react-native';
import QuestionsMain from "../Questions/QuestionsMain";

export default function QuestionTextMain(props) {

    const questionHelper = new QuestionsMain();

    let textJSX;
    if (typeof props.currentQuestionText === 'string' || props.currentQuestionText instanceof String) {
        textJSX =
         (<Text style={styles.text}>
            {props.currentQuestionText}
        </Text>);
    } else {
        let currentQuestionText = props.currentQuestionText;
        textJSX =
            (currentQuestionText.map((textPart, textPartIndex) => {

                let textToAdd = '';

                if (typeof textPart === 'string' ) {
                    textToAdd = textPart;
                } else {
                    let style = textPart === questionHelper.currentQuestionPart? styles.blankCurrent: styles.blank;
                    textToAdd = <View style={style}/>;
                }
               return (
                        <Text key={textPartIndex} style={styles.text}>{textToAdd}</Text>
                    )
            }));
    }
  return (
    <View style={styles.currentQuestionText}>
        {textJSX}
    </View>
  );
}

const styles = StyleSheet.create({
    blank: {
        backgroundColor: '#ffffff3b',
        marginHorizontal: 10,
        width: 30,
        height: 19
    },
    blankCurrent: {
        backgroundColor: 'rgba(255,255,255,0.77)',
        marginHorizontal: 10,
        width: 30,
        height: 19,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#ffffffb8'
        // 3px solid #ffffffb8
    },
  questionTextMain: {

  },
    currentQuestionText: {


        textAlign: "center",
        backgroundColor: '#151618',
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 10,
        minWidth: 180,
        flexDirection: 'row',
        // flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
    },
    text: {
      color: 'white',
        fontSize: 19,
    }
});
