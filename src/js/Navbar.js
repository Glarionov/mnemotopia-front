import { StyleSheet, Text, View } from 'react-native';

export default function Navbar(props) {
  return (
    <View style={styles.navbar}>
      <Text style={ styles.text}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    fontSize: 20,
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#323290',
    padding: 10
  },
  text: {
    color: 'white',
  },
});
