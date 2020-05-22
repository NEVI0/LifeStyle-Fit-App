import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import TrackContext from '../contexts/track.context';
import AuthContext from '../contexts/auth.context';

import AddButton from '../components/AddButton';
import SuccessBox from '../components/SuccessBox';
import ItemList from '../components/ItemList';

export default function HomePage({ navigation }) {
	
	const { user } = useContext(AuthContext);
	const { success, clearSuccess, allTracks, getTenTracks } = useContext(TrackContext);
	
    useEffect(() => {
		getTenTracks({ userId: user._id });		
	}, []);

	return (
        <View style={ styles.container }>

			<AddButton />

			<View style={ styles.tips }>
				<Text style={ styles.tipsTitle }>Dicas</Text>
				
				<FlatList
					horizontal={ true }
					showsHorizontalScrollIndicator={ false }
				/>
			</View>

			<View style={[
				styles.card, 
				{ height: allTracks[0] == undefined || allTracks.length <= 4 ? 'auto' : 400 } 
			]}>
				<Text style={ styles.title }>Seus Exercícios</Text>
				
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

						<TouchableOpacity 
							style={ styles.viewMoreBtn } 
							onPress={ () => navigation.navigate('ListAllTracks') }
						>
							<Text style={{ color: 'gray' }}>Ver Mais</Text>
						</TouchableOpacity>
					</>
				) }

			</View>

			{
				success ? <SuccessBox message={ success } offsetY={ -150 } onRemoveBox={ () => clearSuccess() } /> : null
			}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
	},
	card: {
		margin: 20,
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 4,
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
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: 10
	},
	tipsTitle: {
		fontSize: 25,
		color: '#3d25db',
		fontWeight: 'bold',
		textAlign: 'left',
		marginVertical: 10,
		marginHorizontal: 20
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