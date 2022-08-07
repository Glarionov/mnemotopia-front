// import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, ScrollView, FlatList, Button} from 'react-native';
import {useEffect, useState} from "react";
import GameMain from "./src/js/Game/GameMain";
import AnimationTestMoving from "./src/js/Game/AnimationTestMoving";
import AniTest from "./src/js/AniTest";
import axios from "axios";
import RouteExample from "./src/js/Game/Examples/RouteExample";
import {NavigationContainer} from "@react-navigation/native";
import * as React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NonGameTesting from "./src/js/NonGameTesting/NonGameTesting";
// import ForwardRefExample from 'src/js/Examples/ForwardRefExample';
import ForwardRefExample from "./src/js/Examples/ForwardRefExample";
import ForwardRefExampleHOC from "./src/js/Examples/ForwardRefExampleHOC";
import UseMemoExample from "./src/js/Examples/UseMemoExample";
// import AlertExample from "./src/js/Examples/AlertExample";
// import AwesomeAlertsExample from "./src/js/Examples/AwesomeAlertsExample";
import MyAlert from "./src/js/Components/MyAlert";
import Main from "./src/js/Main";

export default function App() {

    const [y, setY] = useState(-300);


    useEffect(() => {



        // axios.get('http://127.0.0.1:8000/test', {  headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Content-Type': 'application/json',
        //     }})
        //     .then(function (response) {
        //         /*s*/console.log('response=', response); //todo r
        //     })
        //     .catch(function (error) {
        //
        //     })
        //     .then(function () {
        //
        //     });
    }, [])

    // const [todos, setTodos] = useState([]);

    const [todos, setTodos] = useState([]);
    const [todo2, setTodo2] = useState({
        1: {title: '1', id: 1},
        2: {title: '2', id: 2},
        3: {title: '3', id: 3},
        4: {title: '4', id: 4},
        // 5: {title: '5'},
        // 6: {title: '6'},
        // 7: {title: '7'},
        // 8: {title: '8'},
        // 9: {title: '9'},
        // 10: {title: '10'},
        // 11: {title: '11'},
        // 13: {title: '13'},
        // 14: {title: '14'},
        // 15: {title: '15'},
        // 16: {title: '16'},
        // 17: {title: '17'},
        // 18: {title: '18'},
    });


    const [todo3, setTodo3] = useState([
         {title: '1', id: 1},
         {title: '2', id: 2},
         {title: '3', id: 3},
         {title: '4', id: 4}
        ]);

    const addTodo = (title) => {

        // setTodos(prevArray =>  [...prevArray, newElement]);

        let id = Date.now().toString();

        const newElement = {
            id,
            title
        }

        setTodos(prevArray =>  {
            /*s*/console.log('prevArray=', prevArray); //todo r
            let b = [...prevArray, newElement];

            // return prevArray;
            return b;
        });

        setTodo2(prevArray =>  { return {[id]: newElement, ...prevArray}});
/*s*/console.log('todo2=', todo2); //todo r

    }
    
    const removeTodo = (id) => {
        // setTodo2(prev => {
        //     delete prev[id];
        //     /*s*/console.log('prev=', prev); //todo r
        //     return prev;
        // })

        /*s*/console.log('id=', id); //todo r
        setTodo3(prev => prev.filter(todo => todo.id !== id))
    }

    const getValues = (arr) => {
        return Object.values(arr);
    }

    // const Stack = createNativeStackNavigator();

    // let emailRef = React.createRef();
    //
    // const comp = function(props) { return <View><Text><input ref={emailRef} {...props} type="email" className="AppEmailInput" /></Text></View>}
    //
    // let FF = ForwardRefExampleHOC(comp);
    // // /*s*/console.log('ff=', ff); //todo r
    //
    // function onClickButton() {
    //     emailRef.current.focus();
    // }

  return (
    <View style={styles.container}>

        <Main />
        {/*<MyAlert />*/}
        {/*<AlertExample />*/}
        {/*<UseMemoExample />*/}

        {/*<button onClick={() => onClickButton()}>*/}
        {/*    Click me to focus email*/}
        {/*</button>*/}

        {/*<FF />*/}


        {/*<ForwardRefExampleHOC />*/}
        {/*<ForwardRefExample />*/}
        {/*<RouteExample />*/}
        {/*<AnimationTestMoving y={y}/>*/}
        {/*<TextInput></TextInput>*/}
        {/*<GameMain />*/}
        {/*<AniTest y={y}/>*/}
        {/*<Button onPress={() => {*/}
        {/*    let newY = y === -300? 500: -300;*/}
        {/*    setY(newY)}*/}
        {/*} title="ADD"/>*/}
        {/*<Navbar title="MyTitle"/>*/}
      {/*<AddTodo onSubmit={addTodo}/>*/}
      {/*  /!*<ScrollView>*!/*/}
      {/*  /!*    {Object.entries(todo2).map(*!/*/}
      {/*  /!*        ([index, todo]) =>*!/*/}
      {/*  /!*            (<Todo todo={todo} key={index}/>))*!/*/}
      {/*  /!*    }*!/*/}

      {/*  /!*    /!*{JSON.parse(JSON.stringify(todos)).map(todo=> {*!/*!/*/}
      {/*  /!*    /!*   // return (*!/*!/*/}
      {/*  /!*    /!*   //          <Text>{todo.title}</Text>*!/*!/*/}
      {/*  /!*    /!*   //      )*!/*!/*/}
      {/*  /!*    /!*    return todo;*!/*!/*/}
      {/*  /!*    /!*})}*!/*!/*/}

      {/*  /!*</ScrollView>*!/*/}

      {/*  <FlatList data={todo3}*/}
      {/*            keyExtractor={(item) => item.title}*/}
      {/*            renderItem={*/}
      {/*      ({item}) =>*/}
      {/*          (<Todo todo={item} removeTodo={removeTodo}/>)*/}

      {/*  } />*/}
    </View>
  );
}

const styles = StyleSheet.create({
    topText: {
        color: 'orange'
    },
  container: {
    flex: 1,
      color: 'white',
    backgroundColor: '#1e1e28',
      fontFamily: 'Arial',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
