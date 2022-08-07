import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import {AlertContext} from "../Context/alert-context";

export default function MyAlert(props) {
    const [showAlert, setShowAlert] = useState(false);

    const show = useContext(AlertContext);


    const [message, setMessage] = useState(props.message ?? 'Default message');


    useEffect(
        () => {
            setShowAlert(props.showAlert)
        },  [props.showAlert]
    );

    if (!show.show) {
        return <View></View>;
    }

    return (
        <View style={styles.container}>
            <AwesomeAlert
                show={show.show}
                showProgress={false}
                title="Need to confirm"
                message={show.message}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="cancel"
                confirmText="OK"
                confirmButtonColor="#DD6B55"
                onCancelPressed={() => {
                    show.setShowAlert2(false);
                }}
                onConfirmPressed={() => {
                    show.setShowAlert2(false, true);
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
        position: 'fixed',
        zIndex: 1000,
        width: '100%',
        height: '100%'
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