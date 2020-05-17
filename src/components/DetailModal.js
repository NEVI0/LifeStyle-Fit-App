import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';

import { Entypo, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { mapStyleLight } from '../styles/mapStyles';

export default function DetailModal({ item, color, onCloseModal }) {

	const initialLocation = item.locations[0].coords;
	const finalLocation = item.locations[item.locations.length - 1].coords;

    return (
        <Modal 
            visible={ true } 
            transparent={ true } 
            animationType="fade"
            onRequestClose={ () => onCloseModal() }
        >
            <View style={ styles.container }>
				<View style={ styles.content }>

					<View style={ styles.header }>
						<Text style={[ styles.title, { color } ]}>{
							item.type == 'cycling' ? 'Ciclismo' :
							item.type == 'running' ? 'Corrida' :
							item.type == 'walking' ? 'Caminhada' : null
						}</Text>

						<TouchableOpacity onPress={ () => onCloseModal() }>
							<MaterialCommunityIcons name="window-close" size={ 25 }/>
						</TouchableOpacity>
					</View>

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

					<View style={ styles.details }>
						<View style={ styles.box }>
							<Entypo name="stopwatch" size={ 25 } />							
							<Text style={{ marginLeft: 10 }}>{ item.time }</Text>
						</View>

						<View style={ styles.box }>
							<MaterialIcons name="date-range" size={ 25 } />						
							<Text style={{ marginLeft: 10 }}>
								{ new Date(item.createdAt).toLocaleDateString() }
							</Text>
						</View>
					</View>

				</View>
            </View>    
        </Modal>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
		backgroundColor: '#fff',
        width: '80%',
        borderRadius: 4,
	},
	mapContainer: {
		width: '100%',
		height: 300
	},
	map: {
		flex: 1
	},   
	header: {
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	title: {
		fontSize: 22,
		flex: 1,
		fontFamily: 'permanent-maker'
	},
	details: {
		paddingHorizontal: 10,
		paddingBottom: 10
	},
	box: {
		width: '100%',
		flexDirection: 'row',
		marginTop: 10,
		alignItems: 'center'
	}
});