import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import { material } from 'react-native-typography';
import CustomButton from './CustomButton';

export default class InformationScreen extends Component {
    render() {
        const { navigation } = this.props;
        const text = navigation.getParam('text', 'NO-TEXT');
        return (
            <ScrollView style={[styles.container, { backgroundColor: '#106e7f' }]} contentContainerStyle={styles.content} >
            <View style={[styles.card2, { flex: 1 }]}>
            <Image source={require('./../img/information-icon.png')} style={styles.userPngStyle} />
            <Text style={[material.subheading, { margin: 10 }]} >{text}</Text>
            <CustomButton _onPress={() => { this.props.navigation.popToTop(); }} wiDth={300} _backgroundColor='#47cae0' _onPress={this.props.backToTop} title='Go to Sign In Screen' />
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
        justifyContent: 'center', 
        alignItems: 'center',
      // not cool but good enough to make all inputs visible when keyboard is active
      paddingBottom: 300,
    },
    card2: {
        justifyContent: 'center', 
        alignItems: 'center',
        flex: 1,
        padding: 16,
    },
    userPngStyle: {
        width: 200,
        height: 200
    }, 
  });
