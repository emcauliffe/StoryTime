import React from 'react';
import {
  ActivityIndicator,
  View,
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

const initialize = StackActions.reset({
    index: 0, 
    actions: [
      NavigationActions.navigate({ routeName: 'Setup' }),
    ],
});

const startNormal = StackActions.reset({
    index: 0, 
    actions: [
      NavigationActions.navigate({ routeName: 'Home' }),
    ],
});


export default class LoadingScreen extends React.Component {

    constructor(props) {
        super(props)

        AsyncStorage.getItem('@name')
        .then( value => {
            if (value == null || value == "") {
                this.props.navigation.dispatch(initialize)
            } else {
                this.props.navigation.dispatch(startNormal)
                // this.props.navigation.dispatch(initialize)
            }
        })
    }

    static navigationOptions = {
        title: '',
        headerShown: false,
    };

    render() {
        return(
            <View style={{flex: 1, justifyContent:"center", alignContent:"center"}}>
                {/* <ActivityIndicator size="large" color="#0000ff" /> */}
            </View>
        )
    }
}