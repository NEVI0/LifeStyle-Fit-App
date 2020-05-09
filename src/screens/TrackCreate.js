import React, { useContext, useCallback} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Map from '../components/Map';
import ErrorBox from '../components/ErrorBox';

import LocationContext from '../contexts/location.context';
import TrackContext from '../contexts/track.context';

import useLocation from '../hooks/useLocation';
import Stopwatch from '../components/Stopwatch';

import { FontAwesome5 } from '@expo/vector-icons';

export default function TrackCreate({ route, navigation }) {
    
    const { trackError, clearErrors } = useContext(TrackContext);
    const { addLocation, recording } = useContext(LocationContext);
    const { color, mode } = route.params;
    
    const callback = useCallback((location) => {
        addLocation(location, recording);
    }, [recording]);

    const [ locationError, setLocationError ] = useLocation(
        navigation.isFocused() || recording, callback
    );

    navigation.setOptions({
        headerTintColor: color,
        headerLeft: () => (
            <TouchableOpacity style={ styles.headerBtn } onPress={ () => navigation.pop() }>
                <FontAwesome5 name="angle-double-left" size={ 25 } />
            </TouchableOpacity>
        ),
        headerTitle:
            mode == 'cycling' ? 'Ciclismo' :
            mode == 'running' ? 'Corrida' :
            mode == 'walking' ? 'Caminhada' : null
    });

    return (
        <View style={ styles.container }>
            <Map color={ color } />

            { 
                locationError ? 
                    <ErrorBox error={ locationError } onRemoveBox={ () => setLocationError(null) } type="top" offsetY={ -150 } /> 
                : null
            }

            { 
                trackError ? 
                    <ErrorBox error={ trackError } onRemoveBox={ () => clearErrors(null) } type="top" offsetY={ -150 } /> 
                : null
            }

            <Stopwatch type={ mode } /> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerBtn: {
        marginLeft: 15,
        marginTop: 5
    }
});