import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';
import {TextInput} from "react-native-web";


const styles = StyleSheet.create({
  questionOptions: {
    alignItems: 'center',
  },
  option: {
    backgroundColor: '#f4feff',
    padding: 4,
    marginTop: 15,
    textAlign: 'center',
    borderWidth: 5,
    borderStyle: 'solid',
    borderColor: 'rgba(65,167,255,0.66)',
    width: 400,
    maxWidth: '92%',
  }
});

export default function QuestionOptions(props) {

  return (
    <View style={styles.questionOptions}>
        {Object.entries(props.options).map(
            ([optionIndex, option]) => {
              let usingStyles = [styles.option];

              if (props.alreadyClickedOptions.includes(option.id)) {
                usingStyles.push({borderColor: 'rgba(2,138,255,0.99)'});
              }
              return (
                  <TouchableOpacity style={usingStyles} key={optionIndex} onPress={() => {props.clickOnOption(option.id)}}>
                    <View>
                      <Text key={optionIndex}>
                        {option.text}
                      </Text>
                    </View>
                  </TouchableOpacity>
              )
            }
        )
        }
    </View>
  );
}





// .banner {
//   background: #f4feff;
//   padding: 4px;
//   margin-top: 1.2rem;
//   text-align: center;
//   border-radius: 6px;
//   cursor: pointer;
//
//   border: 3px solid #41a7ff;
//
// &:hover {
//     //background: #dafcff;
//     background: #f2edff;
//   }
//
// &.good {
//     border-color: #7ece9a;
//   }
//
// &.bad {
//     border-color: #ff6d6d;
//   }
// }