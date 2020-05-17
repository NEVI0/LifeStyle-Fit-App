import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';

import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'; 

import { mapStyleLight } from '../styles/mapStyles';

import DetailModal from '../components/DetailModal';

export default function ItemList({ item }) {

	const [ visible, setVisible ] = useState(false);

	const initialLocation = item.locations[0].coords;
	const finalLocation = item.locations[item.locations.length - 1].coords;

	const color = item.type == 'running' ? '#780eea' : item.type == 'walking' ? '#0e79ed' : '#ea0e69';

	return (			
		<View style={ styles.container }>

			{ visible ? <DetailModal item={ item } color={ color } onCloseModal={ () => setVisible(false) } /> : null }

			<View style={ styles.content }>
				
				<View style={ styles.mapContainer }>
					<MapView
						style={ styles.map }
						initialRegion={{
							...initialLocation,
							latitudeDelta: 0.01,
							longitudeDelta: 0.01
						}}
						customMapStyle={ mapStyleLight }
						rotateEnabled={ false }
						scrollEnabled={ false }
						zoomEnabled={ false }
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

				<TouchableHighlight
					underlayColor="transparent"
					style={ styles.trackDescriptions }
					onPress={ () => setVisible(true) }
				>
					<View style={ styles.btnContent }>
						{
							item.type == 'running' ? (
								<>
									<View style={[ styles.circle, { borderColor: '#780eea' } ]}>
										<FontAwesome5 name="running" size={ 20 } color="#780eea" />
									</View>
									<View style={ styles.details }>
										<Text style={ styles.trackType }>Corrida</Text>
										<Text>{ new Date(item.createdAt).toLocaleDateString() }</Text>
									</View>
								</>
							) : item.type == 'walking' ? (
								<>
									<View style={[ styles.circle, { borderColor: '#0e79ed' } ]}>
										<FontAwesome5 name="walking" size={ 20 } color="#0e79ed" />
									</View>
									<View style={ styles.details }>
										<Text style={ styles.trackType }>Caminhada</Text>
										<Text>{ new Date(item.createdAt).toLocaleDateString() }</Text>
									</View>
								</>
							) : (
								<>
									<View style={[ styles.circle, { borderColor: '#ea0e69' } ]}>
										<Ionicons name="md-bicycle" size={ 22 } color="#ea0e69" />
									</View>
									<View style={ styles.details }>
										<Text style={ styles.trackType }>Ciclismo</Text>
										<Text>{ new Date(item.createdAt).toLocaleDateString() }</Text>
									</View>
								</>
							)
						}

						<View style={ styles.viewDetailBtn }>
							<FontAwesome name="angle-right" size={ 22 } color="black" />
						</View>
					</View>
				</TouchableHighlight>

			</View>
		</View>
	);

}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		marginVertical: 5,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	content: {
		backgroundColor: '#fff',
		flex: 1,
		marginHorizontal: 20,
		borderRadius: 4,
		shadowColor: '#1cdbb5',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
	},
	mapContainer: {
		width: '100%',
		height: 150,
		borderTopLeftRadius: 4,
		borderTopRightRadius: 4
	},
	map: {
		flex: 1
	},
	btnContent: {
		flex: 1,
		marginLeft: 10,
		flexDirection: 'row',
		paddingVertical: 10
	},
	circle: {
		borderWidth: 2,
		width: 45,
		height: 45,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50
	},
	viewDetailBtn: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center',
		marginRight: 20
	},
	details: {
		marginLeft: 10,
		justifyContent: 'center',
		flexDirection: 'column'
	},
	trackType: {
		fontWeight: 'bold',
		fontSize: 15
	}
});