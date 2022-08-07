import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Todo(props) {
  return (
      <TouchableOpacity onPress={() => {
        console.log('pressed', props.todo.title);
      }}
      // onLongPress={() => {
      //     console.log('LONG PRESSED');
      //     props.removeTodo(props.todo.id)}}
      // >

          onLongPress={ props.removeTodo.bind(null, props.todo.id)}
          >
        <View style={styles.todo}>
          <Text>{props.todo.title}</Text>
        </View>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  todo: {
    color: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 10
  },
});
