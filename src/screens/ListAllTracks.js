import React from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity, FlatList } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

export default function ListAllTracks({ navigation }) {

	navigation.setOptions({
        headerLeft: () => (
            <TouchableOpacity style={ styles.headerBtn } onPress={ () => navigation.pop() }>
                <FontAwesome5 name="angle-double-left" size={ 25 } />
            </TouchableOpacity>
        )
	});

	return (
		<ScrollView>
			<Text>SFDGFDGDFGDFGDFGDFG</Text>
		</ScrollView>
	);

}

const styles = StyleSheet.create({
	container: {},
	headerBtn: {
        marginLeft: 15,
        marginTop: 5
    }
});