import React from 'react';
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

import { styles } from './styles';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

import StoryScreen from './Story';
import InitScreen from './Init';
import LoadingScreen from './Loading'
import ReadingTestScreen from './ReadingTest';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state  = {
      ready: false,
      SlideUpValue: new Animated.Value(0),
      fadeValue: new Animated.Value(0)
    };

    this.start = this.start.bind(this)
    this.login = this.login.bind(this)
  }

  start = () => {
    return Animated.parallel([
      Animated.timing(this.state.SlideUpValue, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true
      }),
      Animated.timing(this.state.fadeValue, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true
      }),
    ]).start();
  };
  
  componentDidMount() {
    this.start()
    AsyncStorage.getItem('@name')
    .then(value => this.setState({name: value}))
    this.login()
  }

  static navigationOptions = {
    title: '',
    headerShown: false,
  };

  login() {

    AsyncStorage.getItem('@mySQLpassword')
    .then( password => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "multipart/form-data; boundary=--------------------------901122788479602152541640");
      
      var formdata = new FormData();
      formdata.append("password", password);
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
  
      fetch("https://storytimeapi.emcauliffe.ca/login", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    })
  }

  render() {
    let { fadeValue, SlideUpValue } = this.state;
    return(
      <View style={{flex:1}}>
        {/* <StatusBar
          hidden={true}
          translucent={true}
        /> */}
        <SafeAreaView style={{flex:1}}>
          <View style={{flex:5}}>
            <Animated.View
              style={{
                flex:2,
                justifyContent:"center",
                margin:4,
                transform: [
                  {
                    translateY: SlideUpValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [600, 0]
                    })
                  }
                ],
                opacity: fadeValue,
              }}
            >
              <Text 
                style={{
                  textAlign:"center",
                  fontWeight:"bold",
                  fontSize: 50,
                  // flexWrap:"wrap"
                  }}
                  adjustsFontSizeToFit={true}
                >Hey {this.state.name}. Got a few minutes?
              </Text>
            </Animated.View>
            <View style={{flex:3, flexDirection:"column", margin:1}}>
              
              <View style={{flex: 1, flexDirection: "row"}}>
                <TouchableOpacity style={styles.minuteSelect} onPress={() => this.props.navigation.navigate("Story", 1)}>
                  <Text style={styles.minuteSelectText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.minuteSelect} onPress={() => this.props.navigation.navigate("Story", 2)}>
                  <Text style={styles.minuteSelectText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.minuteSelect} onPress={() => this.props.navigation.navigate("Story", 3)}>
                  <Text style={styles.minuteSelectText}>3</Text>
                </TouchableOpacity>
              </View>

              <View style={{flex: 1, flexDirection: "row"}}>
                <TouchableOpacity style={styles.minuteSelect} onPress={() => this.props.navigation.navigate("Story", 4)}>
                  <Text style={styles.minuteSelectText}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.minuteSelect} onPress={() => this.props.navigation.navigate("Story", 5)}>
                  <Text style={styles.minuteSelectText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.minuteSelect} onPress={() => this.props.navigation.navigate("Story", 6)}>
                  <Text style={styles.minuteSelectText}>6</Text>
                </TouchableOpacity>
              </View>

              <View style={{flex: 1, flexDirection: "row"}}>
                <TouchableOpacity style={styles.minuteSelect} onPress={() => this.props.navigation.navigate("Story", 7)}>
                  <Text style={styles.minuteSelectText}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.minuteSelect} onPress={() => this.props.navigation.navigate("Story", 8)}>
                  <Text style={styles.minuteSelectText}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.minuteSelect} onPress={() => this.props.navigation.navigate("Story", 9)}>
                  <Text style={styles.minuteSelectText}>9</Text>
                </TouchableOpacity>
              </View>

            </View>
            

          </View>
        </SafeAreaView>
      </View>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Story: StoryScreen,
    Setup: InitScreen,
    Loading: LoadingScreen,
    ReadingTest: ReadingTestScreen
  },
  {
    initialRouteName: "Loading",
  }
);

export default createAppContainer(AppNavigator);