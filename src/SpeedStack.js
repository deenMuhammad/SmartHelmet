import React, { Component } from 'react';
import { View, Text, Button, Image, ImageBackground } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class Main extends Component {
    static navigationOptions = {
        headerTitle: <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}><Image source = {require('./../img/logo.png')} style={{ width: 33, height: 33 }} /><Text style={{fontFamily: "Arial"}}>PI Project</Text></View>
    }
    render() {
        return (
            <ImageBackground source = {require('./../img/background.jpg')} style={{width: '100%', height : '100%'}}>
            <View>
                <Text>This is SpeedStack Screen</Text>
            </View>  
            </ImageBackground>
        );
    }
}


export default SpeedStack = createStackNavigator(
    {
        MainScreen: {
           screen: Main,
           navigationOptions: {
            headerRight: <Button title="->" style={{ paddingRight: 10 }} onPress={() => this.props.navigation.navigate('DrawerOpen')} />,
           } 
        }
    },
    {
        navigationOptions: {
            headerStyle: { 
                backgroundColor: '#6060FF'
            }
        },
        initialRouteName: 'MainScreen'
    }
);