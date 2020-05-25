import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import * as app from '../../app.json';

import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';

import AuthContext from '../contexts/auth.context';

import CustomModal from '../components/Modal';

export default function Account({ navigation }) {

	const [ isVisible, setIsVisible ] = useState(false);

    const { user, signOut } = useContext(AuthContext);

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
	
	return (
        <ScrollView style={ styles.container }>

			{ isVisible ? <CustomModal title="Alerta!" text="Tem certeza que quer sair do app?" onCloseModal={ () => setIsVisible(false) } onDoAction={ () => signOut() } /> : null }
            
            <View style={ styles.userInfo }>
                <View style={ styles.avatar }>
					<MaterialIcons name="add-a-photo" size={ 25 } />
                </View>

                <Text style={ styles.username }>{ user.name }</Text>
                <Text>{ user.email }</Text>
            </View>

			<View style={ styles.card }>
				<Text style={[ styles.title, { color: '#2db2c6' } ]}>ESTATÍSTICAS</Text>
			
			</View>

			<View style={ styles.card }>
				<Text style={[ styles.title, { color: '#f9bc13' } ]}>CONFIGURAÇÕES</Text>
				
				<View style={ styles.section }>
					<Text style={ styles.sectionText }>Recuperar Senha...</Text>

					<TouchableOpacity style={ styles.sectionBtn }>
						<AntDesign name="unlock" size={ 22 } color="#0be02e" />
					</TouchableOpacity>
				</View>
			
				<View style={ styles.section }>
					<Text style={ styles.sectionText }>Excluir Conta...</Text>

					<TouchableOpacity style={ styles.sectionBtn }>
						<AntDesign name="deleteuser" size={ 22 } color="#f74747" />
					</TouchableOpacity>
				</View>
			</View>

			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', padding: 10 }}>
				<Text style={{ color: '#cecece' }}>Company: Dev Inc.</Text>
				<Text style={{ color: '#cecece' }}>Versão: { app.expo.version }</Text>
			</View>
        
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
		flex: 1
    },
    headerBtn: {
        marginRight: 15,
        marginTop: 5
    },
    userInfo: {
        padding: 10,
        marginVertical: 10,
		alignItems: 'center',
    },
    avatar: {
		backgroundColor: '#fff',
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
		textAlign: 'center',
		marginVertical: 10,
		fontFamily: 'permanent-maker'
	},
	section: {
		width: '100%',
		flexDirection: 'row',
		padding: 10,
		alignItems: 'center'
	},
	sectionText: {
		fontSize: 14,
		fontWeight: 'bold',
		flex: 1
	},
	sectionBtn: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 4,
	}
});