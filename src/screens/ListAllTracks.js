import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

import TrackContext from '../contexts/track.context';
import AuthContext from '../contexts/auth.context';

import FilterButton from '../components/FilterButton';
import ItemList from '../components/ItemList';

export default function ListAllTracks({ navigation }) {

	const { user } = useContext(AuthContext);
	const { allTracks, trackLoading, getTracks } = useContext(TrackContext);

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
		<View style={ styles.container }>
			
			<FlatList
				data={ allTracks }
				keyExtractor={ item => item._id }
				renderItem={ ({ item }) => <ItemList item={ item } page="list" /> }
				showsVerticalScrollIndicator={ false }
			/>

			<FilterButton /> 
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
    }
});