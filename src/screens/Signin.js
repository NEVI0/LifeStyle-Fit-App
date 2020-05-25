import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';

import AuthContext from '../contexts/auth.context';

import InputControl from '../components/InputControl';
import ErrorBox from '../components/ErrorBox';

export default function Signin({ navigation }) {

    const { signIn, error, isLoading, clearErrors } = useContext(AuthContext);

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    useEffect(() => {
        clearErrors();
    }, []);

    return (
        <View style={ styles.container }>

            <Text style={ styles.header }>LifeStyleFit</Text>

            <View style={ styles.form }>

                <InputControl label="E-mail" type="email" iconName="email" value={ email } onChangeValue={ value => setEmail(value) } />

                <InputControl label="Senha" type="password" iconName="lock" value={ password } onChangeValue={ value => setPassword(value) } />

                <TouchableHighlight underlayColor="transparent" onPress={ () => signIn({ email, password }) }>
                    <View style={ styles.btn }>                        
                        { isLoading ? <ActivityIndicator size={ 23 } color="#fff" /> : <Text style={ styles.textBtn }>ENTRAR</Text> }
                    </View>
                </TouchableHighlight>

                <Text style={ styles.orText }>OU</Text>

                <TouchableOpacity
                    style={ styles.btnTwo }
                    onPress={ () => navigation.navigate('Signup') }
                >
                    <Text style={ styles.textBtnTwo }>Não tem uma conta ainda?</Text>
                    <Text style={ styles.textBtnTwo }>Cadastre-se aqui!</Text>
                </TouchableOpacity>

            </View>

			{ error ? <ErrorBox 
				error={ error }
				offsetY={ 80 }
				onRemoveBox={ () => clearErrors() }
				type="bottom"
			/> : null }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    },
    header: {
        marginVertical: 25,
        textAlign: 'center',
        fontSize: 26,
        fontFamily: 'permanent-maker'
    },
    form: {
        padding: 20
    },
    btn: {
        borderRadius: 4,
        alignItems: 'center',
        backgroundColor: '#1cdbb5',
        paddingVertical: 7,
        marginTop: 20
    },
    textBtn: {
        fontFamily:'permanent-maker',
        color: '#fff', fontSize: 16
    },
    orText: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 5
    },
    btnTwo: {
        alignItems: 'center',
        alignSelf: 'center'
    },
    textBtnTwo: {
        color: '#03c19b',
        fontSize: 14
    }
});