import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

const readingTest = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'ReadingTest' }),
    ]
})

export default class InitScreen extends React.Component {

    static navigationOptions = {
        title: '',
        headerShown: false, 
      };
    

    constructor(props){
        super(props)

        this.state = {
            name: "",
            mySQLpassword: "",
        }
    }

    render() {
        return(
            <View style={{flex:1}}>
                <SafeAreaView >
                    <Text style={{fontSize:40, textAlign:"center", fontWeight:"bold", margin:10}}>Please input your name.</Text>
                    <TextInput
                        onChangeText={text => this.setState({name:text})}
                        placeholder="Your name here..."
                        placeholderTextColor="grey"
                        autoCapitalize="words"
                        autoCompleteType="name"
                        style={{
                            margin:10,
                            fontSize: 35, 
                            color:"black", 
                            textAlign:"left", 
                            justifyContent:"flex-start", 
                            alignContent:"center",
                        }}
                        // onSubmitEditing={
                        //     () => {
                        //         if (this.state.name.charAt(this.state.name.length-1) === " ") {
                        //             AsyncStorage.setItem('@name', this.state.name.substring(0, this.state.name.length-1)).then(this.props.navigation.dispatch(readingTest))
                        //         } else {
                        //             AsyncStorage.setItem('@name', this.state.name).then(this.props.navigation.dispatch(readingTest))
                        //         }
                        //     }}
                        returnKeyType="next"
                    />
                    <Text style={{fontSize:40, textAlign:"center", fontWeight:"bold", margin:10}}>Please input password.</Text>
                    <TextInput
                        onChangeText={text => this.setState({mySQLpassword:text})}
                        placeholder="mySQL database password"
                        placeholderTextColor="grey"
                        autoCompleteType="password"
                        secureTextEntry={true}
                        style={{
                            margin:10,
                            fontSize: 35, 
                            color:"black", 
                            textAlign:"left", 
                            justifyContent:"flex-start", 
                            alignContent:"center",
                        }}
                        onSubmitEditing={
                            () => {
                                if (this.state.name.charAt(this.state.name.length-1) === " ") {
                                    AsyncStorage.setItem('@mySQLpassword', this.state.mySQLpassword)
                                    .then(AsyncStorage.setItem('@name', this.state.name.substring(0, this.state.name.length-1)))
                                    .then(this.props.navigation.dispatch(readingTest))
                                } else {
                                    AsyncStorage.setItem('@mySQLpassword', this.state.mySQLpassword)
                                    .then(AsyncStorage.setItem('@name', this.state.name))
                                    .then(this.props.navigation.dispatch(readingTest))
                                }
                            }}
                        returnKeyType="next"
                    />

                </SafeAreaView>
            </View>
        )
    }
}

// class ReadingTestScreen extends React.Component {

//     constructor(props) {
//         super(props)

//         this.startTimer = this.startTimer.bind(this)
//         this.endTimer = this.endTimer.bind(this)
//     }

//     startTimer() {
//         console.print("start: " + console.time)
//     }

//     endTimer() {
//         console.print("end: " + console.time)
//     }


//     render() {
//         return(
//             <SafeAreaView>
//                 <ScrollView>
//                     <Text>Read this article to analyze your reading speed.</Text>
//                     <Button title="Start"/>
//                     <Text></Text>
//                     <Button title="end"/>
//                 </ScrollView>
//             </SafeAreaView>
//         )
//     }
// }
