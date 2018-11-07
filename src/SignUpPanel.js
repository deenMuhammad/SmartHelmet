import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import LogInScreen from './LogInScreen';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import CustomButton from './CustomButton';


export default class SignUpPanel extends Component {
    render() {
        return (
            <ScrollView style={[styles.container, { backgroundColor: '#106e7f' }]} contentContainerStyle={styles.content} >
            <View style={[styles.card2, { flex: 1 }]}>
          <LogInScreen
            label={'Name'}
            isPass={false}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'white'}
          />
          <LogInScreen
            label={'Email'}
            isPass={false}
            iconClass={FontAwesomeIcon}
            iconName={'pencil'}
            iconColor={'white'}
          />
          <LogInScreen
            style={styles.input}
            label={'Create Password'}
            isPass={true}
            iconClass={FontAwesomeIcon}
            iconColor={'white'}
          />
          <LogInScreen
            style={styles.input}
            label={'Confirm Password'}
            isPass={true}
            iconClass={FontAwesomeIcon}
            iconColor={'white'}
          />
          <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
          <CustomButton wiDth={300} _backgroundColor='#47cae0' _onPress={() => { this.props.navigation.navigate('Information'); }} title='Sign Up' />
          </View>
        </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 24,
      backgroundColor: 'white',
    },
    content: {
        
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
