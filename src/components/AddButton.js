import React, { useState } from 'react';
import { StyleSheet, View, TouchableHighlight, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function AddButton() {

    const navigation = useNavigation();

	const [ mode ] = useState(new Animated.Value(0));
	const [ isActive, setIsActive ] = useState(false);

    const handleAnimation = () => {
        Animated.timing(mode, {
            toValue: mode._value === 0 ? 1 : 0
		}).start(() => setIsActive(!isActive));
    }

    const rotation = mode.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg']
    });

    const cyclingX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [3, -100]
    });
    const cyclingY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [3, 7]
    });

    const runningX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [3, -70]
    });
    const runningY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [3, -70]
    });

    const walkingX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [3, 7]
    });
    const walkingY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [3, -100]
    });

    return (
        <View style={[ styles.container, {
			height: isActive ? 175 : 'auto',
			width: isActive ? 175 : 'auto'
		} ]}>
            <View style={{ position: 'relative' }}>

            <Animated.View style={{ position: 'absolute', left: cyclingX, top: cyclingY }}>
                <TouchableHighlight 
                    underlayColor="transparent" 
                    onPress={ () => navigation.navigate('TrackCreate', { color: '#ea0e69', mode: 'cycling' }) }
                >
                    <View style={[ styles.btnSecondary, styles.shadow, styles.colorPink ]}>
                        <Ionicons name="md-bicycle" color="#fff" size={ 23 } />
                    </View>
                </TouchableHighlight>
            </Animated.View>

            <Animated.View style={{ position: 'absolute', left: runningX, top: runningY }}>
                <TouchableHighlight 
                    underlayColor="transparent" 
                    onPress={ () => navigation.navigate('TrackCreate', { color: '#780eea', mode: 'running' }) }
                >
                    <View style={[ styles.btnSecondary, styles.shadow, styles.colorPurple ]}>
                        <FontAwesome5 name="running" color="#fff" size={ 23 } />
                    </View>
                </TouchableHighlight>
            </Animated.View>

            <Animated.View style={{ position: 'absolute', left: walkingX, top: walkingY }}>
                <TouchableHighlight 
                    underlayColor="transparent" 
                    onPress={ () => navigation.navigate('TrackCreate', { color: '#0e79ed', mode: 'walking' }) }
                >
                    <View style={[ styles.btnSecondary, styles.shadow, styles.colorBlue ]}>
                        <FontAwesome5 name="walking" color="#fff" size={ 23 } />
                    </View>
                </TouchableHighlight>
            </Animated.View>

			<Animated.View style={[ styles.btn, styles.shadow ]}>
                <TouchableHighlight                
                    underlayColor="#1cdbb5"
                    onPress={ () => handleAnimation() }
                >
                    <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                        <MaterialIcons name="add" color="#fff" size={ 30 } />
                    </Animated.View>
                </TouchableHighlight>
            </Animated.View>
			
			</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
        bottom: 15,                                                    
		right: 15,
		zIndex: 1,
    },
    shadow: {
        shadowColor: '#1cdbb5',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    btn: {
        backgroundColor: '#1cdbb5',
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 36,
        borderWidth: 3,
        borderColor: '#fff',
		zIndex: 2
    },
    btnSecondary: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#780ef2',
        borderWidth: 3,
		borderColor: '#fff',
    },
    colorPink: { backgroundColor: '#ea0e69' },
    colorBlue: { backgroundColor: '#0e79ed' },
    colorPurple: { backgroundColor: '#780eea' }
});