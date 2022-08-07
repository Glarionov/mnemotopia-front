import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from "react";
import AwesomeAlert from "react-native-awesome-alerts";

export default function Alert(props) {

    const [showAlert, setShowAlert] = useState(false);

    return (
        <View style={styles.container}>

            <Text>I'm AwesomeAlert</Text>
            <TouchableOpacity onPress={() => {
                setShowAlert(true);
            }}>
                <View style={styles.button}>
                    <Text style={styles.text}>Try me!</Text>
                </View>
            </TouchableOpacity>

            <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="AwesomeAlert"
                message="I have a message for you!"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="No, cancel"
                confirmText="Yes, delete it"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    setShowAlert(false);
                }}
                onConfirmPressed={() => {
                    setShowAlert(false);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    button: {
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
        backgroundColor: "#AEDEF4",
    },
    text: {
        color: '#fff',
        fontSize: 15
    }
});