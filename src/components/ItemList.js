import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'; 

export default function ItemList({ item, page }) {

	const navigation = useNavigation();

	return (
		<TouchableHighlight 
			underlayColor="transparent"
			style={ styles.container }
			onPress={ () => {
				const color = item.type == 'running' ? '#780eea' : item.type == 'walking' ? '#0e79ed' : '#ea0e69'
				navigation.navigate('TrackDetail', { item, color }) 
			} }
		>
			{
				page == 'home' ? (
					<>
						<View style={ styles.contentPageHome }>
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
						</View>

						<View style={ styles.viewDetailBtn }>
							<FontAwesome name="angle-right" size={ 22 } color="black" />
						</View>
					</>
				) : (
					<View style={ styles.contentPageList }>
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

						<View style={ styles.viewDetailBtnPageList }>
							<FontAwesome name="angle-right" size={ 22 } color="black" />
						</View>
					</View>
				)
			}
		</TouchableHighlight>		
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
	contentPageHome: {
		flex: 1,
		marginLeft: 10,
		flexDirection: 'row'
	},
	contentPageList: {
		backgroundColor: '#fff',
		flex: 1,
		marginHorizontal: 20,
		flexDirection: 'row',
		borderRadius: 4,
		padding: 10,
		shadowColor: '#1cdbb5',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
		width: 30,
		alignItems: 'center',
	},
	viewDetailBtnPageList: {
		flex: 1,
		alignItems: 'flex-end',
		justifyContent: 'center',
		marginRight: 10
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