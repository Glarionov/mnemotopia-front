import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from "react-native-web";
import {useEffect, useState} from "react";

export default function ShowingResult(props) {

  const [newHideLevel, setNewHideLevel] = useState(props.hideLevel);

  useEffect(
      () => {
          setNewHideLevel(props.hideLevel);
      },  [props.hideLevel]
  );

  const setHideLevel = (event) => {
  }



  return (
    <View style={styles.showingResult}>
        <View style={styles.SingleQuestion}>
            <View style={styles.questionTopPart}>
                <Text>Result</Text>
                <TouchableOpacity
                    style={styles.defaultButton}
                    onPress={() => {
                        props.resetTest();
                    }}>
                    <Text>
                        Restart
                    </Text>
                </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.defaultButton}
                        onPress={() => {
                            props.resetTest(1);
                        }}>
                        <Text>
                            Restart with higher level
                        </Text>

                    </TouchableOpacity>

                <TouchableOpacity style={styles.defaultButton}
                    onPress={() => {
                        props.resetTest(0);
                    }}>
                    <Text>
                        Reset test with given difficulty
                    </Text>

                </TouchableOpacity>

                <TextInput style={styles.textInput} onChange={(e) => props.setHideLevel(e.target.value)} value={newHideLevel} />

                <Button
                    title="Go to menu"
                    onPress={() =>
                        props.navigation.navigate('Menu', { name: 'Menu' })
                    }
                />
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    defaultButton: {
        marginTop: 20
    },
    textInput: {
        backgroundColor: 'white'
    },
  showingResult: {
      alignItems: 'center'
  },
});
