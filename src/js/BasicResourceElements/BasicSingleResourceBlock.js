import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert'

export default function BasicSingleResourceBlock(props) {
    const alert = useAlert();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const saveResource = async (newValues) => {
        await props.UpdateElement(props.id, newValues);
        setIsSaving(false);
        setIsEditing(false);
    }

    const handleSavingFail = (newMessage = '') => {
        if (newMessage) {
            alert.show(newMessage);
        }
        setIsSaving(false);
    }

    let DisplayingComponent, DisplayingButtons;
    if (isEditing) {
        DisplayingComponent =  props.EditingComponent;
        DisplayingButtons = (
            <React.Fragment>
                <button type="button" className="btn btn-warning"
                        onClick={() => setIsEditing(false)}
                >Cancel
                </button>

                <button type="button" className="btn btn-success offset-1"
                        onClick={() => setIsSaving(true)}
                >
                    Save
                </button>
            </React.Fragment>
        )
    } else {
        DisplayingComponent =  props.DefaultComponent;
        DisplayingButtons = (
           <React.Fragment>
               <button type="button" className="btn btn-primary"
                       onClick={() => setIsEditing(true)}
               >Edit
               </button>

               <button type="button" className="btn btn-danger offset-1"
                       onClick={() => props.openDeleteConfirmation(props.id)}
               >
                   Delete
               </button>
           </React.Fragment>
        )
    }

    return (
        <div className="single-resource bg-dark p-3 mt-4">
            <div className="row">
                <div className="col-12 col-md-9">
                    <DisplayingComponent {...props} isSaving={isSaving} saveResource={saveResource}
                        handleSavingFail={handleSavingFail}
                    />
                </div>
                <div className="col-12 col-md-3">
                    {DisplayingButtons}
                </div>
            </div>

        </div>
    );
}
