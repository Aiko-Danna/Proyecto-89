import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, SafeAreaView, Image, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList } from "react-native-gesture-handler";

import PostCardScreen from './PostCard';

let posts = require('./temp_posts.json')

export default class FeedScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            light_theme: true,
            publicaciones: ""
        }
    }

    renderItem = ({ item: post }) => {
        return <PostCardScreen post={post} navigation={this.props.navigation} />
    }

    fetchPosts=()=>{
        firebase
        .database()
        .ref("/posts/")
        .on(
            "value",
            snapshot =>{
                let posts = []
                if(snapshot.val()){
                    Object.keys(snapshot.val()).forEach(function(key){
                        posts.push({
                            key: key,
                            value: snapshot.val()[key]
                        });
                    });
                }
                this.setState({publicaciones: posts});
                this.props.setUpdateToFalse();
            },
            function(errorObject){
                console.log("La lectura falló" + errorObject.code)
            }
        );
    };

    keyExtractor = (item, index) => index.toString();

    render(){
        return(
            <View style={this.state.light_theme
                ? styles.containerLight 
                : styles.container
            }>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image
                            source={require('../assets/logo.png')}
                            style={styles.iconImage}
                        ></Image>
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text style={this.state.light_theme
                            ? styles.appTitleTextLight 
                            : styles.appTitleText
                        }> Espectagrama </Text>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={posts} 
                        renderItem={this.renderItem}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    containerLight: {
        flex: 1,
        backgroundColor: "white"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight: RFValue(35)
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row",
        marginBottom: RFValue(5)
    },
    appIcon: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center"
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center",
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(28)
    },
    appTitleTextLight: {
        color: "black",
        fontSize: RFValue(28)
    },
    cardContainer: {
        flex: 0.85
    }
});