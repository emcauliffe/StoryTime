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
import AsyncStorage from '@react-native-community/async-storage';

export default class StoryScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            minutes: 0,
            title: "",
            author: "",
            story: "",
        }

        this.getStory = this.getStory.bind(this);
    }

    static navigationOptions = {
        title: 'title',
        headerShown: false
    };

    componentDidMount() {

        AsyncStorage.getItem('@readTime')
        .then( result => {
            let readingSpeed = parseInt(result)


            let minWords = (parseInt(this.props.navigation.state.params)-1)*readingSpeed
            let maxWords = parseInt(this.props.navigation.state.params)*readingSpeed

            console.log(minWords + ", " + maxWords)

            this.getStory(minWords, maxWords)

        })
    }

    getStory(minWords, maxWords) {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "multipart/form-data; boundary=--------------------------513459024693276879796331");
        
        var formdata = new FormData();
        formdata.append("password", "");//INSERT PASSWORD
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };

        fetch(`https://storytimeapi.emcauliffe.ca/requestStory?minWords=${minWords}&maxWords=${maxWords}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState({
                    title: result[0],
                    author: result[1],
                    story: result[4],

                })
            })
            .catch(error => console.log('error', error));

    }


    render() {
        return(
            <View style={{flex:1, backgroundColor: "#F5F4E4"}}>
                <StatusBar
                    // translucent={true}
                    // hidden={true}
                />
                <SafeAreaView style={styles.storyBackground}>
                    <ScrollView>
                        <Text style={styles.storyTitle}>{this.state.title}</Text>
                        <Text style={styles.storyText}>{this.state.story}</Text>
                        <Text style={styles.storyAuthor}>By: {this.state.author}</Text>
                        <View style={{flexDirection:"row", alignContent: "center", justifyContent:"space-around"}}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                                <Text style={{fontSize:40}}>👍</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
                                <Text style={{fontSize:40}}>👎</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    
                </SafeAreaView>
            </View>
        )
    }
}