import { StyleSheet, Text, View } from 'react-native';
import {useMemo, useState} from "react";
import {TextInput} from "react-native";

export default function UseMemoExample(props) {

    const [values, setValues] = useState(4);


    let usedMemo = useMemo(() => {
        let sum = 0;
        console.log(11111
        )
        for (let i = 0; i < values; i++) {
            sum+=i;
        }
        return sum;
    }, [values]);

  return (
    <View style={styles.useMemoExample}>
      <Text>
          Use memo

          values={values}
          usedMemo={usedMemo}
      </Text>

        <TextInput value={values} onChange={(event) => setValues(event.target.value)} />
    </View>
  );
}

const styles = StyleSheet.create({
  useMemoExample: {
        backgroundColor: 'white'
  },
});
