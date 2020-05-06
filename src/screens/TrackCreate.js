import React, { useContext, useCallback} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import Map from '../components/Map';
import ErrorBox from '../components/ErrorBox';

import LocationContext from '../contexts/location.context';
import useLocation from '../hooks/useLocation';
import Stopwatch from '../components/Stopwatch';

import { FontAwesome5 } from '@expo/vector-icons';

export default function TrackCreate({ route, navigation }) {
    
    const { color, mode } = route.params;
    const { addLocation, recording } = useContext(LocationContext);
    
    const callback = useCallback((location) => {
        addLocation(location, recording);
    }, [recording]);

    const [ error, setError ] = useLocation(navigation.isFocused() || recording, callback);

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
                error ? 
                    <ErrorBox error={ error } onRemoveBox={ () => setError(null) } type="top" offsetY={ -150 } /> 
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
        marginLeft: 10,
        marginTop: 5
    }
});