import React, { useRef, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';
import {TouchableWithoutFeedback} from "react-native-web";

const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    useEffect(() => {
        console.log('Y CHANGED ', props.y)
        Animated.timing(
            fadeAnim,
            {
                toValue: props.y,
                duration: 1000,
            }
        ).start();
    }, [props.y])

    const onPressOut = () => {
        /*s*/console.log('1111=', 1111); //todo r
        Animated.timing(
            fadeAnim,
            {
                toValue: 100,
                duration: 1000,
            }
        ).start();
    };

    return (
        <Animated.View                 // Special animatable View
            style={{
                ...props.style,
                marginTop: fadeAnim,         // Bind opacity to animated value
            }}
        >
            <TouchableWithoutFeedback
                // onPress={()=>{}}
                // onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                {/*<Animated.View style={[styles.iconContainer, animatedScaleStyle]}>*/}
                {/*    <Image source={require('./iconHeart.png')}/>*/}
                {/*</Animated.View>*/}

                {props.children}
            </TouchableWithoutFeedback>

        </Animated.View>
    );
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default (props) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}} props={props}>
                <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
            </FadeInView>
        </View>
    )
}