import React, { useState } from 'react';
import { useAlert } from 'react-alert'
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import QuestionsList from "../QuestionsChanger/QuestionsList";

export default function BasicComponentAdder(props) {
    const alert = useAlert();
    const [isSaving, setIsSaving] = useState(false);
    const EditingComponent = props.EditingComponent;

    /**
     * Triggers parent's save function
     * @param data
     * @returns {Promise<void>}
     */
    const saveResource = async (data) => {
        await props.createElement(data);
        setIsSaving(false);
    }

    /**
     * Change current state to "no saving" and displays error message
     * @param newMessage
     */
    const handleSavingFail = (newMessage = '') => {
        if (newMessage) {
            alert.show(newMessage);
        }
        setIsSaving(false);
    }

    const submitForm = (event) => {
        event.preventDefault();
        setIsSaving(true);
    }

    return (
        <View style={styles.QuestionAdderMain}>
            <Text style={styles.text}>
                Create new {props.name}
            </Text>
            <EditingComponent  saveResource={saveResource} handleSavingFail={handleSavingFail} isSaving={isSaving}/>
            <Button title="Save"
                onPress={() => {submitForm()}}
            />
        </View>

        // <div className="link-adder bg-dark p-3 mb-5">
        //     <h6 className="display-6">Create new {props.name}</h6>
        //     <form onSubmit={submitForm}>
        //         <EditingComponent  saveResource={saveResource} handleSavingFail={handleSavingFail} isSaving={isSaving}/>
        //         <button type="summit" className="btn-success mt-3">
        //             Save
        //         </button>
        //     </form>
        // </div>
    );
}

const styles = StyleSheet.create({
    main: {

    },
    text: {
        color: 'white'
    }
});
