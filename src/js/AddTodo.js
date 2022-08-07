import { StyleSheet, TextInput, Button, View, Text, Alert } from 'react-native';
import {useState} from "react";

export default function AddTodo(props) {

    const [value, setValue] = useState('');





  const pressHandler = () => {
      if (value) {
          props.onSubmit(value);
          setValue('');
      } else {
          console.log(11111);
            Alert.alert('empty text!');
      }

  }


  return (
    <View style={styles.block}>
      <TextInput style={styles.input} onChangeText={text => setValue(text)}  value={value} placeholder = "input text"
                 keyboardType="numeric"
      />
      <Button title="Add222333" onPress={pressHandler}/>


    </View>
  );
}

const styles = StyleSheet.create({
    block: {
    flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15
  },
    text: {
        color: 'green'
    },
    input: {
        width: '50%',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderColor: '#3949ab',
        color: 'red'
    },
    topText: {
        color: 'purple'
    },
});
