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
        try {
            fetch( //pulls the selected store info from the api
            constants.API_ENDPOINT + '/store/businessinfo?store_ids=["' + this.props.navigation.state.params.store_id + '"]',
            {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                apikey: constants.API_KEY,
                entity_api_key: constants.EAPIK
                }
            }
            )
            .then(response => {
                return response.json();
            })
            .then(result => {
                if (!RNLocalize.uses24HourClock()) {
                for (let i in result.data.stores[0].open_hours) {
                    result.data.stores[0].open_hours[i].time.start = this.convert24h(
                    result.data.stores[0].open_hours[i].time.start
                    );
                    result.data.stores[0].open_hours[i].time.end = this.convert24h(
                    result.data.stores[0].open_hours[i].time.end
                    );
                }
                }
        
                this.setState(result.data.stores[0]);
            });
        } catch {
            this.setState(this.getStory())
        }
    }

    getStory() {
        console.log(this.props.navigation.state.params-1)
        let storyPick = Math.round(Math.random())
        let storyResult = {
            title: stories[this.props.navigation.state.params-1][storyPick].Title,
            author: stories[this.props.navigation.state.params-1][storyPick].Author,
            story: stories[this.props.navigation.state.params-1][storyPick].Content,
        }
        return storyResult
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