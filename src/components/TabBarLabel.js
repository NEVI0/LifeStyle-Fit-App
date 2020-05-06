import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function TabBarLabel({ focused }) {
    return (
        <View style={ styles.container }>
            { focused ? <View style={ styles.border } /> : null }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        position: 'absolute'
    },
    border: {
        width: '50%',
        backgroundColor: '#1cdbb5',
        padding: 2,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
});