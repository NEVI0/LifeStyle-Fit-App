import React, { useContext, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Map from '../components/Map';
import ErrorBox from '../components/ErrorBox';
import Stopwatch from '../components/Stopwatch';

import LocationContext from '../contexts/location.context';
import TrackContext from '../contexts/track.context';

import useLocation from '../hooks/useLocation';

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
        headerTitle:
            mode == 'cycling' ? 'Ciclismo' :
            mode == 'running' ? 'Corrida' :
            mode == 'walking' ? 'Caminhada' : null
	});
	
	useEffect(() => {
		clearErrors(null);
	}, []);

    return (
		<View style={ styles.container }>
            <Map color={ color } />

			{ 
				locationError ? <ErrorBox 
					error={ locationError }
					offsetY={ -180 }
					onRemoveBox={ () => setLocationError(null) }
					type="top"
				/> : null
			}

            { 
                trackError ? <ErrorBox 
					error={ trackError }
					offsetY={ -180 }
					onRemoveBox={ () => clearErrors() }
					type="top"
				/> : null
            }

            <Stopwatch type={ mode } /> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});