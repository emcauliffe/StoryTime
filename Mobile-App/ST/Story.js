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
import { stories } from './storyList'

export default class StoryScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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
        // console.log(this.props.navigation.state.params)
        // this.props.navigation.state.params
        // console.log(stories)
        this.setState(this.getStory());
    }

    getStory(length) {
        
        return (
            {
                title: stories[0].title,
                author: stories[0].author,
                story: stories[0].story,
            }
        );
    }


    render() {
        return(
            <View style={{flex:1, backgroundColor: "#F5F4E4"}}>
                <StatusBar
                    // translucent={true}
                    // hidden={true}
                />
                <SafeAreaView style={{flex:1, backgroundColor: "#F5F4E4"}}>
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