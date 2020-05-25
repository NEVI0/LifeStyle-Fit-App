import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

export default function TabBarIcon({ label, iconName, iconSize }) {
    return (
        <View style={ styles.container }>
            <AntDesign name={ iconName } size={ iconSize } style={ styles.icon } />
            <Text style={ styles.label }>{ label }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    label: {
        fontWeight: 'bold',
        fontSize: 14,
        paddingTop: 1
    },
    icon: {
        marginRight: 4
    }
});