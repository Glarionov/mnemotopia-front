import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import {useState} from "react";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import QuestionsList from "./QuestionsList";

export default function QuestionAdderMain(props) {

    const [newQuestion, setNewQuestion] = useState('');
    const [type, setType] = useState(1);


    // Каждый <qpart id="1"
    // badOptions="master|||slave"
    //     >охотник</qpart> желает знать где сидит фазан


    const sendQuestion = () => {
        /*s*/console.log('newQuestion=', newQuestion); //todo r


        let saveData = {
            text: newQuestion,
            group_id: 1,
            type: type
        };

        axios.post('http://127.0.0.1:8000/api/questions', saveData)
          .then(function (response) {
              /*s*/console.log('response=', response); //todo r
          })
          .catch(function (error) {

          });
    }

    return (
    <View style={styles.QuestionAdderMain}>
      <Text>
          <TextInput
              style={styles.input}
              multiline={true}
              value={newQuestion}
              onChange={e => setNewQuestion(e.target.value)}
          />
      </Text>

        <View style={styles.typePicker}>
            <Text style={styles.text}>
                Type:
            </Text>
            <RNPickerSelect
                value={1}
                style={pickerSelectStyles}
                onValueChange={(itemValue) =>
                {
                    setType(itemValue)
                }}
                items={[
                    {label: '1', value: 1},
                    {label: '2', value: 2},
                ]}
            />
        </View>


        <Button title="Send"
            onPress={() => {sendQuestion()}}
        />

        <QuestionsList />
    </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'white'
    },
    QuestionAdderMain: {
        backgroundColor: 'black',
        flex: 1,
        alignItems: 'center',
        color: 'white'
    },
    typePicker: {
        width: 200,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        marginTop: 20,
        width: 600,
        maxWidth: '90%',
        height: 200
    }
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