import React from 'react';
import {
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

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: '',
    headerShown: false, 
  };

  // render() {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //       <Text>Home Screen</Text>
  //       <Button title="fuck" onPress={() => this.props.navigation.navigate("Details")}/>
  //     </View>
  //   );
  // }

  render() {
    return(
      <View style={{flex:1}}>
        {/* <StatusBar
          hidden={true}
          translucent={true}
        /> */}
        <SafeAreaView style={{flex:1}}>
          <View style={{flex:5}}>
            <View style={{flex:2, justifyContent:"center"}}>
              <Text 
                style={{
                  textAlign:"center",
                  fontWeight:"bold",
                  fontSize: 54,
                  }}
                >Hey. Got a few minutes?
              </Text>
            </View>
            <View style={{flex:3, flexDirection:"column", margin:1}}>
              
              <View style={{flex: 1, flexDirection: "row"}}>
                <TouchableOpacity style={styles.minuteSelect} onPress={() => this.props.navigation.navigate("Story")}>
                  <Text style={styles.minuteSelectText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.minuteSelect}>
                  <Text style={styles.minuteSelectText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.minuteSelect}>
                  <Text style={styles.minuteSelectText}>3</Text>
                </TouchableOpacity>
              </View>

              <View style={{flex: 1, flexDirection: "row"}}>
                <TouchableOpacity style={styles.minuteSelect}>
                  <Text style={styles.minuteSelectText}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.minuteSelect}>
                  <Text style={styles.minuteSelectText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.minuteSelect}>
                  <Text style={styles.minuteSelectText}>6</Text>
                </TouchableOpacity>
              </View>

              <View style={{flex: 1, flexDirection: "row"}}>
                <TouchableOpacity style={styles.minuteSelect}>
                  <Text style={styles.minuteSelectText}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.minuteSelect}>
                  <Text style={styles.minuteSelectText}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.minuteSelect}>
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

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
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