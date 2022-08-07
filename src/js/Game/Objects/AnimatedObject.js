import {Animated, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {useEffect, useRef} from "react";
import {ScoreContext} from "../../Context/score-context";

export default function AnimatedObject(props) {

    let initialX = props.gameObject.settings.initialAnimationX? 0: props.gameObject.pStyle.marginLeft;
    let initialY = props.gameObject.settings.initialAnimationY? 0: props.gameObject.pStyle.marginTop;

    const fadeAnimY = useRef(new Animated.Value(initialY)).current  // Initial value for opacity: 0
    // const fadeAnimY = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    const fadeAnimX = useRef(new Animated.Value(initialX)).current  // Initial value for opacity: 0

    const optimisation = false;
    // const optimisation = true;
    const mainIntervalDuration = 50;

    if (!optimisation) {
        useEffect(() => {
            // /*s*/console.log('fadeAnimY=', fadeAnimY); //todo r

            let duration = mainIntervalDuration;
            Animated.timing(
                fadeAnimY,
                {
                    // toValue: 300,
                    toValue: props.gameObject.pStyle.marginTop,
                    duration,
                    useNativeDriver: false
                }
            ).start();
        }, [props.gameObject.pStyle.marginTop])

        useEffect(() => {
            let duration = mainIntervalDuration;

            // Animated.imm

            Animated.timing(
                fadeAnimX,
                {
                    toValue: props.gameObject.pStyle.marginLeft,
                    duration,
                    useNativeDriver: false
                }
            ).start();
        }, [props.gameObject.pStyle.marginLeft])
    } else {

        let bigDuration = 5000;
        // let bigDuration = 2500;
        useEffect(() => {
            // /*s*/console.log('fadeAnimY=', fadeAnimY); //todo r

            let duration = bigDuration;
            Animated.timing(
                fadeAnimY,
                {
                    // toValue: 300,
                    toValue: props.gameObject.targetY,
                    duration,
                    useNativeDriver: false
                }
            ).start();
        }, [])

        useEffect(() => {
            let duration = bigDuration;

            // Animated.imm

            Animated.timing(
                fadeAnimX,
                {
                    toValue: props.gameObject.targetX,
                    duration,
                    useNativeDriver: false
                }
            ).start();
        }, [])
    }





    return (

        <ScoreContext.Consumer>
            {({handleObjectTouch}) => (
                <TouchableWithoutFeedback key={props.boxIndex}
                    //                           style={{...props.gameObject.style,
                    //     // marginTop: fadeAnimY, marginX: fadeAnimX
                    //     marginTop: 0, marginLeft: 0
                    // }}
                  onPress={() => {
                      // gameObject.touchAction();
                      props.applyOnTouchAction(props.boxIndex);
                      handleObjectTouch(props.gameObject);
                  }}
                >
                    <Animated.Text style={{
                        ...props.gameObject.style,
                        marginTop: fadeAnimY, marginLeft: fadeAnimX,
                        // userSelect: 'none'
                        // marginTop: props.gameObject.pStyle.marginTop
                        // marginTop: 0, marginLeft: 0
                    }}>
                        {props.gameObject.text}
                    </Animated.Text>
                    {/*<Text style={{...props.gameObject.style,*/}
                    {/*    marginTop: fadeAnimY, marginX: fadeAnimX,*/}
                    {/*    // marginTop: props.gameObject.pStyle.marginTop*/}
                    {/*    // marginTop: 0, marginLeft: 0*/}
                    {/*}}*/}
                    {/*>*/}
                    {/*    fadeAnimY={Math.floor(JSON.stringify(fadeAnimY))}*/}
                    {/*fadeAnimX={fadeAnimX}*/}
                    {/*{props.gameObject.text}*/}
                    {/*</Text>*/}
                </TouchableWithoutFeedback>
            )}

        </ScoreContext.Consumer>

    )
}

const styles = StyleSheet.create({
  animatedObject: {

  },
});
