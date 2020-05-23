import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'; 

import DetailModal from '../components/DetailModal';

export default function ItemList({ item }) {

	const [ visible, setVisible ] = useState(false);
	const color = item.type == 'running' ? '#780eea' : item.type == 'walking' ? '#0e79ed' : '#ea0e69';

	return (
		<TouchableOpacity
			underlayColor="transparent"
			style={ styles.container }
			onPress={ () => setVisible(true) }
		>			
			<View style={ styles.content }>
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

				{ visible ? <DetailModal item={ item } color={ color } onCloseModal={ () => setVisible(false) } /> : null }
			</View>
		</TouchableOpacity>		
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
		flex: 1,
		marginLeft: 10,
		flexDirection: 'row'
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