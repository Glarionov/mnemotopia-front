import React, { useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";

const AlertExample = () => {
    const createTwoButtonAlert = () =>
        Alert.alert(
            "MyAlert Title",
            "My MyAlert Msg",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    const createThreeButtonAlert = () =>
        Alert.alert(
            "MyAlert Title",
            "My MyAlert Msg",
            [
                {
                    text: "Ask me later",
                    onPress: () => console.log("Ask me later pressed")
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    return (
        <View style={styles.container}>
            <Button title={"2-Button MyAlert"} onPress={createTwoButtonAlert} />
            <Button title={"3-Button MyAlert"} onPress={createThreeButtonAlert} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center"
    }
});

export default AlertExample;