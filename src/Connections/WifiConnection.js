import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export default class WifiComponent extends Component{
    render(){
        return(
            <ImageBackground source = {require('./../../img/AzurLane.jpg')} style={{width: '100%', height : '100%'}}>
            <View style = {styles.wifiView}>
                <Text>This is Wifi Component</Text>
            </View>
            </ImageBackground>
        );
    }
}

const styles=  StyleSheet.create({
    wifiView: {
        width: "100%",
        height: '100%',
    }
});