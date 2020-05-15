import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';

import { FontAwesome5 } from "@expo/vector-icons";

import { mapStyleLight } from '../styles/mapStyles';

export default function TrackDetail({ navigation, route }) {
	
	const { item, color } = route.params;
	
	navigation.setOptions({
		headerLeft: () => (
			<TouchableOpacity style={ styles.headerBtn } onPress={ () => navigation.navigate('HomePage') }>
                <FontAwesome5 name="angle-double-left" size={ 25 } />
            </TouchableOpacity>
		),
		headerTintColor: color,
        headerTitle:
            item.type == 'cycling' ? 'Ciclismo' :
            item.type == 'running' ? 'Corrida' :
            item.type == 'walking' ? 'Caminhada' : null
	});

	const initialLocation = item.locations[0].coords;
	const finalLocation = item.locations[item.locations.length - 1].coords;

    return (
        <View style={ styles.container }>

			<View style={ styles.mapContainer }>

				<MapView
					style={ styles.map }
					initialRegion={{
						...initialLocation,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01
					}}
					customMapStyle={ mapStyleLight }
				>
					<Circle
						center={ initialLocation }
						radius={ 30 }
						strokeWidth={ 2 }
						strokeColor={ color }
						fillColor="#fff"
					/>

					<Polyline
						coordinates={ item.locations.map(loc => loc.coords) } 
						strokeColor={ color }
                		strokeWidth={ 4 }
					/>

					<Circle
						center={ finalLocation }
						radius={ 30 }
						strokeWidth={ 2 }
						strokeColor={ color }
						fillColor={ color }
					/>
				</MapView>

			</View>

            <Text>Tempo Decorrido: { item.time }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15
	},
	headerBtn: {
        marginLeft: 15,
        marginTop: 5
	},
	mapContainer: {
		width: '100%',
		height: 350,
		shadowColor: '#1cdbb5',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
		elevation: 5,
		borderRadius: 4,
		borderWidth: 3,
        borderColor: '#fff'
	},
	map: {
		flex: 1
	}
});