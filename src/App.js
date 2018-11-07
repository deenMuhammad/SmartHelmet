import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Main from './Main';
import { createSwitchNavigator } from 'react-navigation';
class App extends Component { 
    componentDidMount() {
        setTimeout(() => { this.props.navigation.navigate('MainScreen'); }, 1800);
    }
    render() {
        return (
            <View style={{ backgroundColor: '#f44299', flex : 1, justifyContent: 'center',
            alignItems: 'center', }}>
                <Image source={require('./../img/LSL.gif')} style={styles.gifStyle} />
            </View>
        );
    }
}

export default createSwitchNavigator({
        LoadScreen: App,
        MainScreen: Main,
    },
    {
        initialRouteName: 'LoadScreen'
    }
);


const styles = StyleSheet.create({
    gifStyle: {
        width: 300,
        height: 320
    },
    LogoPngStyle: {
        width: 250,
        height: 50
    }
});
