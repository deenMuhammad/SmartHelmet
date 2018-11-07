import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text, ImageBackground} from 'react-native';
import LogInScreen from './LogInScreen';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import CustomButton from './CustomButton';
import NotSigned from './NotSigned';
import { createStackNavigator } from 'react-navigation';
import SignUpPanel from './SignUpPanel';
import Information from './Information';

class LogInLogUpScreen extends Component {
    render() {
        return (
            <ScrollView style={[styles.container, { backgroundColor: '#106e7f' }]} contentContainerStyle={styles.content} >
            <View style={[styles.card2, { flex: 1 }]}>
            <NotSigned />
          <LogInScreen
            label={'Email Address'}
            isPass={false}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'white'}
          />
          <LogInScreen
            style={styles.input}
            label={'Password'}
            isPass={true}
            iconClass={FontAwesomeIcon}
            iconColor={'white'}
          />
          <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
          <CustomButton wiDth={130} _backgroundColor='#47cae0' _onPress={() => { this.props.navigation.navigate('SignUpScreen', { text: 'You Have Signed Up to LSL. Please check your email and verify your account!' }); }} title='Sign Up' />
          <CustomButton wiDth={130} _backgroundColor='#47cae0' _onPress={() => { alert('You have pressed Sign In Button'); }} title='Sign In' />
          </View>
        </View>
            </ScrollView>
        );
    }
}

export default createStackNavigator(
    {
        MainLogIn: { screen: LogInLogUpScreen,
            navigationOptions: {
                header: null
            }
        },
        SignUpScreen: { screen: SignUpPanel, 
            navigationOptions: {
                headerStyle: { 
                    backgroundColor: '#f44242'
                },
                title: 'Sign Up'
            }
         },
         Information: { screen: Information, 
            navigationOptions: {
                headerStyle: { 
                    backgroundColor: '#f44242'
                },
                title: 'Information'
            }
         },
    },
    {
        initialRouteName: 'MainLogIn',
    }
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 24,
      backgroundColor: 'white',
    },
    content: {
        justifyContent: 'center', 
        alignItems: 'center',
      // not cool but good enough to make all inputs visible when keyboard is active
      paddingBottom: 300,
    },
    card1: {
      paddingVertical: 16,
    },
    card2: {
        flex: 1,
        padding: 16,
    },
    input: {
      marginTop: 4,
    },
    title: {
      paddingTop: 15,  
      paddingBottom: 10,
      textAlign: 'center',
      color: '#404d5b',
      fontSize: 20,
      fontWeight: 'bold',
      opacity: 0.8,
    },
  });
