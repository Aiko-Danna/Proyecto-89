import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, Image, Switch } from "react-native";
import firebase from 'firebase';

 export default class Logout extends Component {
    componentDidMount(){
        firebase.auth().signOut();
    }

    render(){
        <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
            <Text> Cerrar sesión </Text>
        </View>
    }
 }