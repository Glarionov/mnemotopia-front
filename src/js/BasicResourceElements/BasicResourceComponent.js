import React, { useState, useEffect } from 'react';
import RequestHelper from "../../../helpers/RequestHelper";
import BasicSingleResourceBlock from "./BasicSingleResourceBlock";
import BasicComponentAdder from "./BasicComponentAdder";
import {useAlert} from "react-alert";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function BasicResourceComponent(props) {
    const alert = useAlert();
    const [mainElements, setMainElements] = useState({});
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const requestHelper = new RequestHelper();
    const namePlural = props.name + 's';

    useEffect(
        () => {
            loadMainElements();
        },[]
    );

    /**
     * Performs actions after loading elements, such as checking, if there is more
     * @param response
     * @returns {boolean}
     */
    const handleLoadedElements = (response) => {
        if (!response.hasOwnProperty('data')) {
            alert.show('Elements loading error');
            return false;
        }

        let meta = response.data.meta;
        if (meta.current_page === meta.last_page) {
            setHasMore(false);
        }
        setPage(prevState => prevState + 1);

        setMainElements(
            prevState => {return {...prevState, ...response.data.data}}
        );
    }

    /**
     * Triggers loading process
     * @returns {Promise<void>}
     */
    const loadMainElements = async () => {
        let url = namePlural + '?page=' + page;
        let response = await requestHelper.get(url);
        handleLoadedElements(response);
    }

    const displayCreateOrUpdateErrors = (response) => {
        let text = 'Request error';
        /*s*/console.log('response=', response); //todo r
        if (response.hasOwnProperty('errors')) {
            text += response.errors.map(error => error[0]).join(', ');
        }
        alert.show(text);
    }


    /**
     * Creates an element, based of component's "name" prop
     * @param data
     * @returns {Promise<void>}
     */
    const createElement = async (data) => {
        let response = await requestHelper.post(namePlural, data);
        if (response.status === 201) {
            setMainElements(prevElements => {
                let id = response.data.data.id;
                return {[id]: response.data.data, ...prevElements};
            });
        } else {
            displayCreateOrUpdateErrors(response);
        }
    }

    /**
     * Updates an element by ID, based of component's "name" prop
     * @param id
     * @param data
     * @returns {Promise<void>}
     */
    const updateElement = async (id, data) => {
        let response = await requestHelper.patch( `${namePlural}/${id}`, data);
        if (response.status === 200) {
            setMainElements(prevElements => {
                prevElements[id] = response.data.data;
                return {...prevElements};
            });
        } else {
            displayCreateOrUpdateErrors(response);
        }
    }

    /**
     * Deletes an element by ID, based of component's "name" prop
     * @param id
     * @returns {Promise<void>}
     */
    const deleteElement = async (id) => {
        let response = await requestHelper.delete( `${namePlural}/${id}`);
        if (response.status === 200) {
            setMainElements(prevElements => {
                delete prevElements[id];
                return {...prevElements};
            });
        } else {
            alert.show('Elements deleting error');
        }
    }

    /**
     * Shows modal window to confirm element delete
     * @param id
     */
    const openDeleteConfirmation = (id) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Delete link?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteElement(id)
                },
                {
                    label: 'No',
                }
            ]
        });
    }

    return (
        <section className="base-resource-component">
            <div className="base-resource-component__adder">
                <BasicComponentAdder
                    EditingComponent={props.EditingComponent}
                    name={props.name}
                    createElement={createElement}
                />
            </div>
            <div className="base-resource-component__list">
                <InfiniteScroll
                    dataLength={Object.keys(mainElements).length}
                    next={loadMainElements.bind(this)}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p className="all-loaded-message mt-3">
                            <b>All {namePlural} have been loaded</b>
                        </p>
                    }
                >
                    {Object.entries(mainElements).map(
                        ([mainElementIndex, mainElement]) =>
                            (
                                <BasicSingleResourceBlock
                                    EditingComponent={props.EditingComponent}
                                    DefaultComponent={props.DefaultComponent}
                                    key={mainElementIndex}
                                    {...mainElement}
                                    openDeleteConfirmation={openDeleteConfirmation.bind(this)}
                                    UpdateElement={updateElement.bind(this)}
                                />
                            )
                    ).reverse()
                    }
                </InfiniteScroll>
            </div>
        </section>
    );
}
