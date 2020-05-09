import React, { useContext } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';

import LocationContext from '../contexts/location.context';

import { mapStyleLight } from '../styles/mapStyles';

export default function Map({ color }) {
    
    const { currentLocation, locations } = useContext(LocationContext);
    
    if (!currentLocation) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" color={ color } />
            </View>
        );
    } 
    
    return (
        <MapView 
            style={ styles.map }
            loadingEnabled={ true }
            initialRegion={{
                ...currentLocation.coords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
            followsUserLocation={ true }
            customMapStyle={ mapStyleLight }
        >
            <Circle
                center={ currentLocation.coords }
                radius={ 30 }
                strokeWidth={ 2 }
                strokeColor={ color }
                fillColor="#fff"
            />
            <Polyline
                coordinates={ locations.map(item => item.coords) }
                strokeColor={ color }
                strokeWidth={ 4 }
            />
        </MapView>        
    );
    
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});
