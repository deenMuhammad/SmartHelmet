import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export default class EntertanmentComponent extends Component{
    render(){
        return(
            <ImageBackground source = {require('./../../img/AzurLane.jpg')} style={{width: '100%', height : '100%'}}>
            <View style = {styles.entertanimentView}>
                <Text>This is Entertanment Component</Text>
            </View>
            </ImageBackground>
        );
    }
}

const styles=  StyleSheet.create({
    entertanimentView: {
        width: "100%",
        height: '100%',
    }
});