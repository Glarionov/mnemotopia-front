import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {useMemo, useState} from "react";
import {TouchableOpacity} from "react-native-web";

export default function AnswerTextInput(props) {

  const [answer, setAnswer] = useState('');
  // const [message, setMessage] = useState('m');

    // let propMessage = props.message;

  // const message = useMemo(() => {return propMessage}, [propMessage])


  const setNewAnswer = (event) => {
      /*s*/console.log('event.target.value=', event.target.value); //todo r
      setAnswer(event.target.value);
  }

  const answerByText = () => {
      /*s*/console.log('answer=', answer); //todo r
      props.answerByText(answer);
  }


  return (
    <View style={styles.AnswerTextInput}>
      <TextInput
          style={styles.textInput}
          onSubmitEditing={answerByText}
          value={answer} onChange={setNewAnswer} />

      {/*<TouchableOpacity onPress={answerByText}>*/}
      {/*    <Text style={styles.confirm}>*/}
      {/*        Confirm*/}
      {/*    </Text>*/}
      {/*</TouchableOpacity>*/}

        <View style={styles.confirm}>
            <Button
                onPress={answerByText}
                title="Confirm"
                // color="#841584"
                // accessibilityLabel="Learn more about this purple button"
            />
        </View>

        <View>
            <Text style={styles.message}>
                {props.message}
            </Text>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    message: {
        color: 'red',
        marginTop: 10
    },
    confirm: {
        // padding: 3,
        // backgroundColor: 'rgba(255,255,255,0.45)',
        marginTop: 10
    },
    textInput: {
        backgroundColor: 'white',
        fontSize: 24,
        padding: 3,
        width: '90%'
    },
    AnswerTextInput: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
});
