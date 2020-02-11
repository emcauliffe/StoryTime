import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import {stories} from './storyList';

export default class StoryScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            author: "",
            content: "",
        }

        this.getStory = this.getStory.bind(this);
        this.likeOrDislike = this.likeOrDislike.bind(this);
    }

    static navigationOptions = {
        title: 'title',
        headerShown: false
    };

    componentDidMount() {

        AsyncStorage.getItem('@readTime')
        .then( result => {
            let readingSpeed = parseInt(result)

            let minWords
            if (this.props.navigation.state.params === 1) {
                minWords = (parseInt(this.props.navigation.state.params)-1)*readingSpeed
            } else {
                minWords = (parseInt(this.props.navigation.state.params)-0.5)*readingSpeed
            }
            
            let maxWords = (parseInt(this.props.navigation.state.params)+0.5)*readingSpeed

            this.getStory(minWords, maxWords, this.props.navigation.state.params)
        })
    }

    getStory(minWords, maxWords, mins) {

        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        // fetch(`https://storytimeapi.emcauliffe.ca/stories/request?minWords=${minWords}&maxWords=${maxWords}`, requestOptions)
        //     .then(response => response.json())
        //     .then(result => {
        //         console.log(result)
        //         this.setState({
        //             title: result[0],
        //             author: result[1],
        //             content: result[2],
        //             id: result[3]
        //         })
        //     })
        //     .catch(error => {
                let randomChoice = Math.floor(Math.random()*2)

                this.setState({
                    title: stories[mins-1][randomChoice].Title,
                    author: stories[mins-1][randomChoice].Author,
                    content: stories[mins-1][randomChoice].Content,
                })
            // });

    }

    likeOrDislike(reaction) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "multipart/form-data; boundary=--------------------------513459024693276879796331");
        
        var formdata = new FormData();
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };

        let reactionValue

        if (reaction === "like") {
            reactionValue = 1
        } else if (reaction === "dislike") {
            reactionValue = -1
        }

        fetch(`https://storytimeapi.emcauliffe.ca/stories/react?id_code=${this.state.id}&like=${reactionValue}`, requestOptions)
        .catch(error => console.log(error))
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
                        <Text style={styles.storyText}>{this.state.content}</Text>
                        <Text style={styles.storyAuthor}>By: {this.state.author}</Text>
                        <View style={{flexDirection:"row", alignContent: "center", justifyContent:"space-around"}}>
                            <TouchableOpacity onPress={() => {
                                    this.likeOrDislike("like")
                                    this.props.navigation.navigate("Home")
                                }}
                            >
                                <Text style={{fontSize:40}}>👍</Text>
                            </TouchableOpacity>
                            <View style={{justifyContent:"center"}}>
                                <Button
                                    title="Done"
                                    onPress={() => this.props.navigation.navigate("Home")}    
                                />
                            </View>
                            
                            <TouchableOpacity 
                                onPress={() => {
                                    this.likeOrDislike("dislike")
                                    this.props.navigation.navigate("Home")
                                }}
                            >
                                <Text style={{fontSize:40}}>👎</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    
                </SafeAreaView>
            </View>
        )
    }
}