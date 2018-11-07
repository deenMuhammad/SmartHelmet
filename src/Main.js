import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableHighlight, StyleSheet } from 'react-native';
import { createStackNavigator, createTabNavigator } from 'react-navigation';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import LogInLogUpScreen from './LogInPanel';
import HealthStack from './HealthStack';
import SpeedStack from './SpeedStack';
import EntertainmentStack from './EntertainmentStack';
import BluetoothComponent from './Connections/BluetoothConnection';
import WifiComponent from './Connections/WifiConnection';
import EntertainmentComponent from './Connections/EntertainmentComponent';

class Main extends Component {
    static navigationOptions = {
        headerTitle: <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}><Image source = {require('./../img/logo.png')} style={{ width: 33, height: 33 }} /><Text style={{fontFamily: "Arial"}}>PI Project</Text></View>
    }
    render() {
        return (
            <ImageBackground source = {require('./../img/background.jpg')} style={{width: '100%', height : '100%'}}>
            <View>
                <View style = {styles.mainViewContainer}>
                <TouchableHighlight underlayColor='#42f1f4' style={styles.touchButton} onPress = {()=>{this.props.navigation.navigate('BluetoothConnectionScreen')}}>
                <ImageBackground source = {require('./../img/bluetoothBack.jpg')} style = {{marginTop: 2,width: '98%', height: '98%', borderRadius: 10}}>
                <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingTop: 10}}>
                <Text style = {styles.hit_the_floor_text}><FontAwesome>{Icons.bluetooth}</FontAwesome> Bluetooth Control Center</Text>
                </View>
                </ImageBackground>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='#42f1f4' style={styles.touchButton} onPress = {()=>{this.props.navigation.navigate('WifiConnectionScreen')}}>
                <ImageBackground source = {require('./../img/wifiBack.jpg')} style = {{marginTop: 2,width: '98%', height: '98%', borderRadius: 10}}>
                <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingTop: 10}}>
                <Text style = {styles.hit_the_floor_text}><FontAwesome>{Icons.wifi}</FontAwesome> Wifi Control Center</Text>
                </View>
                </ImageBackground>
                </TouchableHighlight>
                <TouchableHighlight underlayColor='#42f1f4' style={styles.touchButton} onPress = {()=>{this.props.navigation.navigate('EntertainmentScreen')}}>
                <ImageBackground source = {require('./../img/musicBack.png')} style = {{marginTop: 2,width: '98%', height: '98%', borderRadius: 10}}>
                <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', paddingTop: 10}}>
                <Text style = {styles.hit_the_floor_text}><FontAwesome>{Icons.music}</FontAwesome> Entertainment Control Center</Text>
                </View>
                </ImageBackground>
                </TouchableHighlight>
                </View>
            </View>  
            </ImageBackground>
        );
    }
}

const LogInStack = createStackNavigator(
    {
        MainLogIn: LogInLogUpScreen
    },
    {
        navigationOptions: {
            header: null
        }
    }
);

const MainStack = createStackNavigator(
    {
        MainScreen: {
           screen: Main,
        },
        BluetoothConnectionScreen: {
            screen: BluetoothComponent,
            navigationOptions:{
                headerTitle: <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}><FontAwesome>{Icons.bluetooth}</FontAwesome><Text> Bluetooth Control </Text></View>
            }
        },
        WifiConnectionScreen: {
            screen: WifiComponent,
            navigationOptions:{
                headerTitle: <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}><FontAwesome>{Icons.wifi}</FontAwesome><Text> Wifi Control </Text></View>
            }
        },
        EntertainmentScreen: {
            screen: EntertainmentComponent,
            navigationOptions:{
                headerTitle: <View style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}><FontAwesome>{Icons.music}</FontAwesome><Text> Entertainment Control </Text></View>
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

export default createTabNavigator(
    {
        Home: { screen: MainStack, 
            navigationOptions: {
            tabBarIcon: () =>
            <FontAwesome color = '#4bf442'>{Icons.home}</FontAwesome>
            }
    },
        Health: { screen: HealthStack,
            navigationOptions: {
                tabBarIcon: () =>
                <FontAwesome color = '#4bf442'>{Icons.heart}</FontAwesome>
                }
        },
        Speed: { screen: SpeedStack,
            navigationOptions: {
                tabBarIcon: () =>
                <FontAwesome color = '#4bf442'>{Icons.tachometer}</FontAwesome>
                }
        },
        Entertainment: { screen: EntertainmentStack,
            navigationOptions: {
                tabBarIcon: () =>
                <FontAwesome color = '#4bf442'>{Icons.music}</FontAwesome>
                }
         },
        MySpace: {
            screen: LogInStack,
            navigationOptions: {
                tabBarIcon: () =>
                <FontAwesome color = '#4bf442'>{Icons.user}</FontAwesome>
                }
        }
    },
    {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            style: {
                backgroundColor: '#6060FF'
            },
            activeBackgroundColor: '#8080FF',
            inactiveTintColor: '#42f4e8',
        },
        animationEnabled: true,
        swipeEnabled: false,
    },
);

const styles = StyleSheet.create({
    mainViewContainer: {
        padding: 3,
        justifyContent: 'space-around',
        alignItems: 'center'

    },
    touchButton: {
        justifyContent: "space-between",
        alignItems: 'center',
        borderRadius: 10,
        width: '95%',
        height: '32%',
        backgroundColor: '#41a3f4',
    },
    hit_the_floor_text: {
        fontFamily: 'Helvetica',
        fontWeight: 'bold',
        backgroundColor: '#DDDDDD'
    }
});