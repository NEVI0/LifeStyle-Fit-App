import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Animated, TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ErrorBox({ error, onRemoveBox, type, offsetY }) {

    const [ offset ] = useState(new Animated.ValueXY({ x: 0, y: offsetY }));

    useEffect(() => {
        Animated.spring(offset.y, { toValue: 0, speed: 4 }).start();
    }, []);

    const handleClosing = () => {
        Animated.spring(offset.y, { toValue: offsetY, speed: 6 }).start(() => onRemoveBox())
    }

    return (
        <>
            {
                type == 'top' ? (
                    <Animated.View 
                        style={[ styles.errorBoxTop, styles.shadow, { transform: [{ translateY: offset.y }] } ]}
                    >
                        <Text style={ styles.errorText }>
                            { error }
                        </Text>

                        <TouchableOpacity 
                            style={ styles.closeBtn }
                            onPress={ () => handleClosing() }
                        >
                            <MaterialCommunityIcons name="window-close" color="#fff" size={ 20 } />
                        </TouchableOpacity>

                    </Animated.View>
                ) : (
                    <KeyboardAvoidingView style={ styles.container }>
                        <Animated.View 
                            style={[ styles.errorBox, styles.shadow, { transform: [{ translateY: offset.y }] } ]}
                        >
                            <Text style={ styles.errorText }>
                                { error }
                            </Text>

                            <TouchableOpacity 
                                style={ styles.closeBtn }
                                onPress={ () => handleClosing() }
                            >
                                <MaterialCommunityIcons name="window-close" color="#fff" size={ 20 } />
                            </TouchableOpacity>

                        </Animated.View>
                    </KeyboardAvoidingView>
                )
            }  
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    errorBox: {
        marginHorizontal: 20,
        backgroundColor: '#f23535',
        borderRadius: 4,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    errorText: {
        fontWeight: 'bold',
        color: '#fff',
        flex: 1
    },
    errorBoxTop: {
        position: 'absolute',
        top: 10,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#f23535',
        borderRadius: 4,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
});