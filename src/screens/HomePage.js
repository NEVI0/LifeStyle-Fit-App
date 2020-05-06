import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import AddButton from '../components/AddButton';

export default function HomePage({ navigation }) {
    return (
        <View style={ styles.container }>
            <Text>gdgfdgdfgdf</Text>

            <AddButton/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});