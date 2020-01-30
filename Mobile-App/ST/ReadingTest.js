import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
  Alert
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import {styles} from './styles'

const goHome = StackActions.reset({
    index: 0, // <-- currect active route from actions array
    actions: [
      NavigationActions.navigate({ routeName: 'Home' }),
    ],
});

export default class ReadingTestScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            time: 0,
        }

        this.startTimer = this.startTimer.bind(this)
        this.endTimer = this.endTimer.bind(this)
    }

    static navigationOptions = {
        title: '',
        headerShown: false,
    };

    startTimer() {
        this.setState({time: Date.now()})
    }

    endTimer() {
        
        // time = Date.now() - time

        // if (this.state.time === 0) {
        //     Alert("Please make sure to start the test using the button at the top of the page.")
        // } else {

        this.setState({time: Date.now() - this.state.time}, 
        () => {
            AsyncStorage.setItem('@readTime',(187/(this.state.time/60000)).toString())
        });

        this.props.navigation.dispatch(goHome)
        // }
    }


    render() {
        return(
            <SafeAreaView style={{flex:1}}>
                <ScrollView style={styles.storyBackground}>
                    <Text style={styles.storyTitle}>Read this article to analyze your reading speed. </Text>
                    <Text style={styles.storyTitle}>Click start to begin.</Text>
                    <Button title="Start" onPress={() => this.startTimer()}/>
                    <Text style={styles.storyText}>Sleep is, biologically, a requirement for human life. While we have no concrete reason as to why we require it, we do know that a lack of it can cause detrimental effects. Even with this knowledge, however, modern society has decided to forego a healthy sleep schedule for the benefit of added productivity.  Over the past 60 to 100 years, the percentage of people in the United States and the United Kingdom who sleeps less than the recommended amount (8 hours for adults) has increased. In fact, some studies show that the percentage of people who state they are “tired” has increased by 20% since the 1980s. Society has even begun using lack of sleep as a way to brag or show superiority over others. Modern industry has created an environment where we see those who are getting enough sleep as the “slackers” who are unwilling to sacrifice mandatory human function for productivity in the name of the “greater good”. The lack of argument when it comes to society’s decreased amount of sleep has not only postponed progress, it has caused the issue to get worse.</Text>
                    <Button 
                        title="End" 
                        onPress={() => this.endTimer()}
                        disabled={this.state.time === 0}
                    />
                </ScrollView>
            </SafeAreaView>
        )
    }
}