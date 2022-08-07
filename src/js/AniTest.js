import React, {useEffect, useRef} from "react";
import { Animated, Text, View, StyleSheet, Button, SafeAreaView } from "react-native";

const AniTest = (props) => {
    // fadeAnim will be used as the value for opacity. Initial Value: 0
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 100,
            duration: 500,
            useNativeDriver: false
        }).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
    };

    useEffect(() => {
        console.log('y changed ', props.y)

            // Will change fadeAnim value to 1 in 5 seconds
            Animated.timing(fadeAnim, {
                toValue: props.y,
                duration: 500,
                useNativeDriver: false
            }).start();
    }, [props.y])

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View
                style={[
                    styles.fadingContainer,
                    {
                        // Bind opacity to animated value
                        // opacity: fadeAnim
                        marginTop: fadeAnim
                    }
                ]}
            >
                <Text style={styles.fadingText}>Fading View!</Text>
            </Animated.View>
            <View style={styles.buttonRow}>
                <Button title="Fade In View" onPress={fadeIn} />
                <Button title="Fade Out View" onPress={fadeOut} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    fadingContainer: {
        padding: 20,
        backgroundColor: "powderblue"
    },
    fadingText: {
        fontSize: 28
    },
    buttonRow: {
        flexBasis: 100,
        justifyContent: "space-evenly",
        marginVertical: 16
    }
});

export default AniTest;