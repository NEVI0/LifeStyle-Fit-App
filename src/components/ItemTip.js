import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

export default function ItemTip({ item: { item } }) {

	const path = item.id == 1 ? require('../../assets/Walking.png') : item.id == 2 ? require('../../assets/Running.png') : require('../../assets/Cycling.png');

	return (
		<View style={ styles.container }>
			<ImageBackground style={ styles.image } source={ path } >
				<Text style={ styles.title }>{ item.title }</Text>

				<View style={ styles.tipBox }>
					<FontAwesome name="quote-left" size={ 22 } color="#fff" style={ styles.left } />
					<Text style={ styles.tip }>{ item.tips.tip1 }</Text>
					<FontAwesome name="quote-right" size={ 22 } color="#fff" style={ styles.right } />
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginHorizontal: 5,
		width: 230,
		height: 300
	},
	title: {
		alignSelf: 'center',
		fontFamily: 'permanent-maker',
		fontSize: 22,
		color: '#fff',
		marginVertical: 10
	},
	image: {
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		borderRadius: 10
	},
	tipBox: {
		flex: 1,
		justifyContent: 'center'
	},
	tip: {
		fontSize: 20,
		color: '#fff',
		marginHorizontal: 20,
		textAlign: 'center',
		fontFamily: 'permanent-maker',
	},
	left: {
		alignSelf: 'flex-start',
		marginLeft: 20,
		marginBottom: 10
	},
	right: {
		alignSelf: 'flex-end',
		marginRight: 20,
		marginTop: 10
	}
});