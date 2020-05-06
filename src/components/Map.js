import React, { useContext } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';

import LocationContext from '../contexts/location.context';

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
            showsUserLocation={ true }
            followsUserLocation={ true }
        >
            {/* <Circle
                center={ currentLocation.coords }
                radius={ 15 }
                strokeColor="rgba(0, 0, 0, 1)"
                fillColor="rgba(0, 0, 0, 0.3)"
            /> */}
            <Polyline
                coordinates={ locations.map(item => item.coords) }
                fillColor={ color }
            />
        </MapView>        
    );
    
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});