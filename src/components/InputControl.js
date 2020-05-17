import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

export default function InputControl({ label, type, iconName, value, onChangeValue }) {
    return (
        <>
            <Text style={ styles.label }>
                { label }    
            </Text>

            <View style={ styles.control }>
                {
                    type !== 'password' ?
                        <TextInput
                            style={ styles.input }
                            value={ value }
                            autoCapitalize="none"
                            autoCorrect={ false }
                            onChangeText={ text => onChangeValue(text) }
                        />
                    :
                        <TextInput
                            style={ styles.input }
                            value={ value }
                            secureTextEntry={ true }
                            autoCorrect={ false }
                            autoCapitalize="none"
                            onChangeText={ text => onChangeValue(text) }
                        />
                }                
                <MaterialIcons name={ iconName } size={ 25 } style={ styles.icon } />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold'
    },
    control: {
        backgroundColor: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginBottom: 10,
        flexDirection: 'row'
    },
    input: {
        flex: 1
    },
    icon: {
        alignSelf: 'center',
        marginLeft: 5
    },
});