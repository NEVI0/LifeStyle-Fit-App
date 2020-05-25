import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import TrackContext from '../contexts/track.context';
import AuthContext from '../contexts/auth.context';

import AddButton from '../components/AddButton';
import SuccessBox from '../components/SuccessBox';
import ItemList from '../components/ItemList';
import ItemTip from '../components/ItemTip';

import tipsData from '../mocked/tipsData';

export default function HomePage({ navigation }) {
	
	const { user } = useContext(AuthContext);
	const { success, clearSuccess, allTracks, getTenTracks } = useContext(TrackContext);
	
    useEffect(() => {
		getTenTracks({ userId: user._id });		
	}, []);

	return (
		<>
			<AddButton />

			<ScrollView style={ styles.container }>

				<View style={ styles.tips }>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text style={ styles.tipsTitle }>Dicas</Text>
						<AntDesign style={{ marginTop: 7 }} name="ellipsis1" size={ 22 } color="#6a58f4" />
					</View>
					
					<FlatList
						horizontal={ true }
						showsHorizontalScrollIndicator={ false }
						data={ tipsData }
						keyExtractor={ item => (item.id).toString() }
						renderItem={ item => <ItemTip item={ item } /> }
					/>
				</View>

				<View style={ styles.card }>
					<Text style={ styles.title }>SEUS EXERCÍCIOS</Text>
					
					{ allTracks[0] == undefined ? (
						<View style={ styles.noneTrack }>
							<Text>Você não possui nenhum exercício registrado!</Text>
						</View>
					) : (
						<>
							<FlatList
								data={ allTracks }
								keyExtractor={ item => item._id }
								renderItem={ ({ item }) => <ItemList item={ item } /> }
								showsVerticalScrollIndicator={ false }
							/>

							{ allTracks.length == 10 ? (
								<TouchableOpacity 
									style={ styles.viewMoreBtn } 
									onPress={ () => navigation.navigate('ListAllTracks') }
								>
									<Text style={{ color: 'gray' }}>Ver Mais</Text>
								</TouchableOpacity>
							) : null }							
						</>
					) }

				</View>

			</ScrollView>

			{ success ? <SuccessBox message={ success } offsetY={ -150 } onRemoveBox={ () => clearSuccess() } /> : null }
		</>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
	},
	card: {
		margin: 15,
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 10,
		marginBottom: 20,
		shadowColor: '#1cdbb5',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
		elevation: 5,
	},
	title: {
		fontSize: 20,
		color: '#a0dd11',
		textAlign: 'center',
		marginVertical: 10,
		fontFamily: 'permanent-maker'
	},
	tipsTitle: {
		fontSize: 25,
		color: '#3d25db',
		fontWeight: 'bold',
		textAlign: 'left',
		marginVertical: 10,
		marginLeft: 20,
		marginRight: 7
	},
	viewMoreBtn: {
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 10,
		width: '80%',
	},
	noneTrack: {
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
		marginTop: 5
	}
});