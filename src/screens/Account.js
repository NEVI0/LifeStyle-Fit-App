import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

import AuthContext from '../contexts/auth.context';
import CustomModal from '../components/Modal';

export default function Account({ navigation }) {

    const [ isVisible, setIsVisible ] = useState(false);

    const { user, signOut } = useContext(AuthContext);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={ styles.headerBtn }
                    onPress={ () => setIsVisible(true) }
                >
                    <FontAwesome name="sign-out" size={ 25 } />
                </TouchableOpacity>
            )
        });
    }, []);

    return (
        <View style={ styles.container }>
            
            <View style={ styles.userInfo }>
                <View style={ styles.avatar }>
                    <MaterialIcons name="photo-camera" size={ 30 } />
                </View>

                <Text style={ styles.username }>{ user.name }</Text>
                <Text>{ user.email }</Text>
            </View>

        { 
            isVisible ? 
                <CustomModal 
                    title="Alerta!" 
                    text="Tem certeza que quer sair do app?" 
                    onCloseModal={ () => setIsVisible(false) }
                    onDoAction={ () => signOut() } 
                /> 
            : null
        }
        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerBtn: {
        marginRight: 10,
        marginTop: 5
    },
    userInfo: {
        padding: 10,
        marginVertical: 20,
        alignItems: 'center',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center'
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15
    }
});