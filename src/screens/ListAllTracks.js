import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity, FlatList } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

import TrackContext from '../contexts/track.context';
import AuthContext from '../contexts/auth.context';

import ViewAllItemList from '../components/ViewAllItemList';

export default function ListAllTracks({ navigation }) {

	const { user } = useContext(AuthContext);
	const { allTracks, getAllTracks, currentPage } = useContext(TrackContext);

	navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity style={ styles.headerBtn } onPress={ () => navigation.navigate('HomePage') }>
                <FontAwesome5 name="angle-double-left" size={ 25 } />
            </TouchableOpacity>
        )
	});

	const loadMore = () => {
		getAllTracks({ userId: user._id, page: currentPage + 1 });
	}

	useEffect(() => {
		getAllTracks({ userId: user._id });
	}, []);

	return (
		<View style={ styles.container }>
			<Text>{ allTracks.length }</Text>
			<FlatList
				data={ allTracks }
				keyExtractor={ item => item._id }
				renderItem={ ({ item }) => <ViewAllItemList item={ item } /> }
				showsVerticalScrollIndicator={ false }
				onEndReached={ () => loadMore() }
				onEndReachedThreshold={ 0.1 }
				ListHeaderComponent={ () => (
					<View style={ styles.searchBox }>
						<TextInput
							style={ styles.input }
							placeholder="Pesquise um exercício..."
						/>
						<FontAwesome5 name="search" size={ 20 } color="#a0dd11" style={ styles.searchIcon } />
					</View>
				) }
			/>

		</View>
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
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		flex: 1,
		color: '#000'
	},
	searchIcon: {
		marginHorizontal: 5,
	}
});