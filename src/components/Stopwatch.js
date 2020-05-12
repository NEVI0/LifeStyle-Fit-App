import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { AntDesign, FontAwesome5, Entypo } from '@expo/vector-icons';

import LocationContext from '../contexts/location.context';
import TrackContext from '../contexts/track.context';
import AuthContext from '../contexts/auth.context';

export default function Stopwatch({ type }) {

	const navigation = useNavigation();

    const { user: { _id } } = useContext(AuthContext);
    const { startRecording, stopRecording, reset, recording, locations } = useContext(LocationContext);
    const { createTrack } = useContext(TrackContext);

    const [ timer, setTimer ] = useState({ s: 0, m: 0, h: 0 });
    const [ interv, setInterv ] = useState();
    const [ offsetY ] = useState(new Animated.Value(90));

    let updatedH = timer.h, updatedM = timer.m, updatedS = timer.s;

    const run = () => {
        if (updatedM === 60) {
            updatedH++;
            updatedM = 0;
        }
        if (updatedS === 60) {
            updatedM++;
            updatedS = 0;
        }
        updatedS++;
        return setTimer({ s: updatedS, m: updatedM, h: updatedH });
    }

    const handleStart = () => {
        startRecording();
        run();
        setInterv(setInterval(run, 1000));
    }

    const handleStop = () => {
        clearInterval(interv);
        stopRecording();
    }

    const handleCreate = async () => {
		const hours = timer.h < 10 ? "0"+timer.h : timer.h;
        const minutes = timer.m < 10 ? "0"+timer.m : timer.m;
        const seconds = timer.s < 10 ? "0"+timer.s : timer.s;
        
        const time = `${hours} : ${minutes} : ${seconds}`;
		
		await createTrack({ userId: _id, type, locations, time });
		reset();
		navigation.navigate('HomePage');
    }

    useEffect(() => {
        Animated.spring(offsetY, { toValue: 0, speed: 6 }).start();
    }, []);
    
    return (                  
        <Animated.View style={[ styles.box, { transform: [{ translateY: offsetY }] } ]}>
            
            <Text style={ styles.timer }>
                <>{ timer.h < 10 ? "0"+timer.h : timer.h } : </>
                <>{ timer.m < 10 ? "0"+timer.m : timer.m } : </>
                <>{ timer.s < 10 ? "0"+timer.s : timer.s } </>
            </Text>

            {
                recording ?
                    <TouchableOpacity 
                        style={ styles.btn }
                        onPress={ () => handleStop() }
                    >
                        <Entypo name="controller-paus" color="#fff" size={ 25 } />
                    </TouchableOpacity>
                :
                    <>
                        {
                            !recording && locations.length ?
                                <TouchableOpacity 
                                    style={[ styles.btn, { marginRight: 15 } ]}
                                    onPress={ () => handleCreate() }
                                >
                                    <FontAwesome5 name="flag-checkered" color="#fff" size={ 24 } />
                                </TouchableOpacity>
                            : null
                        }

                        <TouchableOpacity 
                            style={ styles.btn }
                            onPress={ () => handleStart() }
                        >
                            <AntDesign name="caretright" color="#fff" size={ 25 } />
                        </TouchableOpacity>
                    </>
                    
            }
            
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    box: {
        bottom: Platform.select({ ios: 25, android: 15 }),
        width: '90%',
        position: 'absolute',
        backgroundColor: '#000',
        marginHorizontal: 20,
        borderRadius: 4,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    timer: {
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
        fontSize: 25
    },
    btn: {
        marginRight: 5
    }
});