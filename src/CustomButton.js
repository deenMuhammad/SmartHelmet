import React, { Component } from 'react';
import {View, Text, TouchableHighlight, StyleSheet } from 'react-native';

export default class CustomButton extends Component {
    render() {
        return (
            <TouchableHighlight onPress={this.props._onPress}>
                <View style={[styles.commonStyle, { backgroundColor: this.props._backgroundColor, width: this.props.wiDth }]}>
                    <Text>{this.props.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    commonStyle: {
        margin: 10,
        borderRadius: 20,
        justifyContent: 'center', 
        alignItems: 'center',
        height: 30,
    }
});
