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

import StoryScreen from './Story';
import {userData} from './UserData';


// class HomeScreen extends React.Component {
//   state = {
//     ready: false,
//     SlideUpValue: new Animated.Value(0),
//     fadeValue: new Animated.Value(0)
//   };

//   _start = () => {
//     return Animated.parallel([
//       Animated.timing(this.state.SlideUpValue, {
//         toValue: 1,
//         duration: 500,
//         useNativeDriver: true
//       }),
//       Animated.timing(this.state.fadeValue, {
//         toValue: 1,
//         duration: 500,
//         useNativeDriver: true
//       }),
//     ]).start();
//   };

  
//   render() {
//     let { fadeValue, SlideUpValue } = this.state;
//     return (
//         <Animated.View
//           style={{
//             ...props.style,
//             transform: [
//               {
//                 translateY: SlideUpValue.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [600, 0]
//                 })
//               }
//             ],
//             opacity: fadeValue,
//           }}
//         >
//         </Animated.View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF",
//     alignItems: "center"
//   },
//   item: {},
//   btn: {
//     backgroundColor: "#480032",
//     width: 100,
//     height: 40,
//     padding: 3,
//     justifyContent: "center",
//     borderRadius: 6,
//     marginTop: 29
//   },
//   text: {
//     fontSize: 20,
//     color: "#fff",
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   item1: {
//     backgroundColor: "red",
//     padding: 20,
//     width: 100,
//     margin: 10
//   },

//   textBtn: {
//     color: "#f4f4f4",
//     fontWeight: "bold",
//     textAlign: "center"
//   }
// });


class HomeScreen extends React.Component {

  constructor(props) {
    super(props)

    this.state  = {
      ready: false,
      SlideUpValue: new Animated.Value(0),
      fadeValue: new Animated.Value(0)
    };

    this.start = this.start.bind(this)
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
  }

  static navigationOptions = {
    title: '',
    headerShown: false, 
  };

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
                  fontSize: 54,
                  }}
                >Hey {userData.name}. Got a few minutes?
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
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);