import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Animated, TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MessageBox({ message, onRemoveBox, offsetY }) {

    const [ offset ] = useState(new Animated.Value(offsetY));

    useEffect(() => {
        Animated.spring(offset, { toValue: 0, speed: 4 }).start();
    }, []);

    const handleClosing = () => {
        Animated.spring(offset, { toValue: offsetY, speed: 6 }).start(() => onRemoveBox())
    }

    return (
		<Animated.View 
			style={[ styles.box, styles.shadow, { transform: [{ translateY: offset }] } ]}
		>
			<Text style={ styles.boxMessage }>
				{ message }
			</Text>

			<TouchableOpacity 
				style={ styles.closeBtn }
				onPress={ () => handleClosing() }
			>
				<MaterialCommunityIcons name="window-close" color="#fff" size={ 20 } />
			</TouchableOpacity>

		</Animated.View>
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
    boxMessage: {
        fontWeight: 'bold',
        color: '#fff',
        flex: 1
    },
    box: {
        position: 'absolute',
        top: 20,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#18ce34',
        borderRadius: 4,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
});