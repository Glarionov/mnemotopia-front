import { StyleSheet, Text, View } from 'react-native';

export default function QuestionsList(props) {
    return (
        <View style={styles.main}>
          <Text style={styles.text}>
              QuestionsList
          </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {

    },
    text: {
        color: 'white'
    }
});
