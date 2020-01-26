import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    minuteSelect: {
        backgroundColor: "#e24856", //007322 //e24856
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        margin:7,
        borderRadius:15,
    },
    minuteSelectText: {
        fontSize:54,
        fontWeight:"bold", 
        color:"white",
    },
    storyTitle: {
        fontSize:30,
        fontWeight:"bold",
        textAlign:"center",
        margin:15
    },
    storyText: {
        fontSize: 20,
        textAlign: "justify",
        margin:15,
        marginTop:0
    },
    storyAuthor: {
        fontSize: 15,
        textAlign: "center",
        fontStyle:"italic",
    },
    storyBackground: {
        flex: 1,
        backgroundColor: "#F5F4E4"
    }
});