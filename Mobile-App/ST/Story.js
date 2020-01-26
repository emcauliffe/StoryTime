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
        this.setState(this.getStory());
    }

    getStory() {
        var storyObject = {
            title: "The Road Not Taken",
            author: "Robert Frost",
            story: `Two roads diverged in a yellow wood,
And sorry I could not travel both
And be one traveler, long I stood
And looked down one as far as I could
To where it bent in the undergrowth;
            
Then took the other, as just as fair,
And having perhaps the better claim,
Because it was grassy and wanted wear;
Though as for that the passing there
Had worn them really about the same,
            
And both that morning equally lay
In leaves no step had trodden black.
Oh, I kept the first for another day!
Yet knowing how way leads on to way,
I doubted if I should ever come back.
            
I shall be telling this with a sigh
Somewhere ages and ages hence:
Two roads diverged in a wood, and I—
I took the one less traveled by,
And that has made all the difference.`
        }

        return storyObject;
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
                    </ScrollView>
                    
                </SafeAreaView>
            </View>
        )
    }
}