import { StyleSheet, Text, View } from 'react-native';
import NonGameTesting from "./NonGameTesting/NonGameTesting";
import GameMain from "./Game/GameMain";
import Menu from "./Menu/Menu";
import QuestionAdderMain from "./QuestionsChanger/QuestionAdderMain";

import {NavigationContainer} from "@react-navigation/native";
import * as React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AlertContext} from "./Context/alert-context";
import MyAlert from "./Components/MyAlert";
import {useCallback, useState} from "react";

export default function Main(props) {

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('AM');


    const [alertAction, setAlertAction] = useState(() => {
        return () => {
            console.log('default action')
        };
    });

    const action = useCallback(() => {
        /*s*/console.log('typeof alertAction=', typeof alertAction); //todo r
        alertAction();
    }, [alertAction]);

    const Stack = createNativeStackNavigator();


    const showStopTestAlert = () => {
        setShowAlert(true);
    }

    const setShowAlert2 = (value = true, doAction = false) => {
        setShowAlert(value);
        if (doAction) {
            /*s*/console.log('typeof alertAction=', typeof alertAction); //todo r
            alertAction();
        }
    }

    const openAlert = (action2, message = 'Message') => {
        // action2();
        /*s*/console.log('typeof action2=', typeof action2); //todo r
        setShowAlert(true);
        setAlertMessage(message);
        setAlertAction(() => {
            const fff = () => {action2()}
            return fff;
        });
    }

    const showState = {
        show: showAlert,
        setShowAlert2: setShowAlert2,
        action: {
            action: () => {
            console.log('action');
        }
        },
        openAlert: openAlert,
        message: alertMessage
    };

    return (
    <View style={styles.main}>

        <AlertContext.Provider value={showState}>

        <NavigationContainer  style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen name="QuestionAdderMain" component={QuestionAdderMain} options={{ title: 'QuestionAdderMain' }}/>
                <Stack.Screen name="NonGameTesting" component={NonGameTesting} options={{ title: 'NonGameTesting' }}/>
                <Stack.Screen name="Menu" component={Menu} options={{ title: 'Menu' }}/>

                <Stack.Screen
                    name="GameMain"
                    component={GameMain}
                    options={{ title: 'GameMain' }}
                />
            </Stack.Navigator>
        </NavigationContainer>


            <MyAlert showAlert={showAlert}/>
        </AlertContext.Provider>
    </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        color: 'white',
        backgroundColor: '#1e1e28',
        fontFamily: 'Arial',
    },
});
