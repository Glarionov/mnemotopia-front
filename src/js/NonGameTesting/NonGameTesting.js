import { StyleSheet, Text, View } from 'react-native';
import SingleQuestion from "./SingleQuestion";

export default function NonGameTesting(props) {
  return (
      <View style={styles.NonGameTesting}>
          <View style={styles.NonGameTestingBlock}>
              {/*<Text>*/}
              {/*    NonGameTesting!*/}
              {/*</Text>*/}

              <SingleQuestion
                  {...props}
                  // questionData={this.state.currentQuestion}
                  // score={this.state.score}
                  // testType={this.state.testType}
                  // key={this.state.currentQuestionIndex}
                  // changeScore={this.changeScore.bind(this)}
                  // currentGroup={this.state.currentGroup}
                  // needShowAnswer={this.state.needShowAnswer}
                  // clickedOptions={typeof this.state.clickedOptionsByQuestionIndex[this.state.currentQuestionIndex] == "undefined" ? [] : this.state.clickedOptionsByQuestionIndex[this.state.currentQuestionIndex]}
              />
          </View>
      </View>

  );
}

// .nongame-questions-block {
//     background: #c8d1ff;
//     border-radius: 30px 30px 5px 5px;
//     padding-bottom: 1rem;
//     margin-top: 50px;
//     min-height: 300px;
// }
//
// .nongame-questions-block.simple-info {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 20px;
// }

const styles = StyleSheet.create({
    NonGameTesting: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0C063AFF',
        flex: 1
    },
  NonGameTestingBlock: {
        minHeight: 300,
      marginTop: 50,
      backgroundColor: '#c8d1ff',
      // borderRadius: 30,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      // paddingBottom: 15,
      width: 700,
      maxWidth: '92\%' +
          '' +
          '' +
          ''

  },
});
