import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

 
export default class BluetoothComponent extends Component{
    render(){
        return(
            <ImageBackground source = {require('./../../img/AzurLane.jpg')} style={{width: '100%', height : '100%'}}>
            <View style = {styles.bluetoothView}>
                <Text>This is Bluetooth Component</Text>
            </View>
            </ImageBackground>
        )
    }
}

const styles=  StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
      },
    bluetoothView: {
        width: "100%",
        height: '100%',
    }
});