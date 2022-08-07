import {Button, StyleSheet, Text, View} from 'react-native';
import {useState} from "react";
import GameMain from "../Game/GameMain";
import NonGameTesting from "../NonGameTesting/NonGameTesting";
import QuestionAdderMain from "../QuestionsChanger/QuestionAdderMain";

export default function Menu(props) {

    const [items, setItems] = useState({
        1: {
            text: 'Game',
            component: GameMain
        },
        2: {
            text: 'NonGameTesting',
            component: NonGameTesting
        },
        3: {
            text: 'QuestionAdderMain',
            component: QuestionAdderMain
        }
    });

    const goToPage = (menuItem) => {
        props.navigation.navigate(menuItem.component, { name: menuItem.text })
    }

    return (
    <View style={styles.Menu}>
      {Object.entries(items).map(
          ([itemIndex, item]) =>
              (
                  <View key={itemIndex} style={styles.menuItem}>
                      <Button onPress={() => goToPage(item)} title={item.text} />
                  </View>

              ))
      }
    </View>
    );
}

const styles = StyleSheet.create({
    Menu: {

    },
    menuItem: {
        marginTop: 10
    }
});
