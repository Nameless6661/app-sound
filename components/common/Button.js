import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";


export default function Button (props) {
    return (
        <TouchableOpacity style={StyleSheet.button} onPress={props.onPress}>
            <Text style={StyleSheet.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: "#040306",
        padding: 15,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText:{
        color: "#131624"
    },
});