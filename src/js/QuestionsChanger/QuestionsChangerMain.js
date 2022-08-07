import React from 'react';
import BasicResourceComponent from "../BasicResourceElements/BasicResourceComponent";

import $element$Adder from "./$element$Adder";
import $element$Single from "./$element$Single";
import $element$Editing from "./$element$Editing";

export default function Links() {

    return (
        <BasicResourceComponent
            ElementAdder={$element$Adder}
            ElementSingle={$element$Single}
            ElementEditing={$element$Editing}
            name="link"
        />
    );
}
