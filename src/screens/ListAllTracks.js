import React, { useContext } from 'react';
import { StyleSheet, View, ScrollView,TextInput, TouchableOpacity, FlatList } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

import TrackContext from '../contexts/track.context';
import AuthContext from '../contexts/auth.context';

import ViewAllItemList from '../components/ViewAllItemList';

export default function ListAllTracks({ navigation }) {

	const { user } = useContext(AuthContext);
	const { allTracks, getTracks } = useContext(TrackContext);

	navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity style={ styles.headerBtn } onPress={ () => navigation.navigate('HomePage') }>
                <FontAwesome5 name="angle-double-left" size={ 25 } />
            </TouchableOpacity>
        )
	});

	if (navigation.isFocused()) {
		getTracks({ userId: user._id });
	}

	return (
		<ScrollView style={ styles.container }>
			
			<View style={ styles.searchBox }>
				<TextInput
					style={ styles.input }
					placeholder="Pesquise um exercício..."
				/>
				<FontAwesome5 name="search" size={ 20 } color="#a0dd11" />
			</View>

			<FlatList
				data={ allTracks }
				keyExtractor={ item => item._id }
				renderItem={ ({ item }) => <ViewAllItemList item={ item } /> }
				showsVerticalScrollIndicator={ false }
			/>

		</ScrollView>
	);

}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	headerBtn: {
        marginLeft: 15,
        marginTop: 5
    },
	searchBox: {
		backgroundColor: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
		elevation: 7,
		marginHorizontal: 20,
		marginTop: 15,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		flex: 1,
		color: '#000'
	}
});