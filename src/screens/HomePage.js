import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import TrackContext from '../contexts/track.context';

import AddButton from '../components/AddButton';
import SuccessBox from '../components/SuccessBox';

export default function HomePage({ navigation }) {
	
	const { success, clearSuccess } = useContext(TrackContext);
	
	return (
        <View style={ styles.container }>
            
			{
				success ? <SuccessBox message={ success } offsetY={ -150 } onRemoveBox={ () => clearSuccess() } /> : null
			}

            <AddButton/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});