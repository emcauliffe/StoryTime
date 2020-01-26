import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    minuteSelect: {
        backgroundColor: "#007322",
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        margin:1,
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
    }
});