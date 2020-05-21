import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';

import AuthContext from '../contexts/auth.context';

import InputControl from '../components/InputControl';
import ErrorBox from '../components/ErrorBox';

export default function Signup({ navigation }) {

    const { signUp, error, isLoading, clearErrors } = useContext(AuthContext);

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPass, setConfirmPass ] = useState('');

    useEffect(() => {
        clearErrors();
    }, []);

    return (
        <View style={ styles.container }>

            <Text style={ styles.header }>LifeStyleFit</Text>

            <View style={ styles.form }>

                <InputControl label="Seu Nome" type="name" iconName="person" value={ name } onChangeValue={ value => setName(value) } />

                <InputControl label="E-mail" type="email" iconName="email" value={ email } onChangeValue={ value => setEmail(value) } />

                <InputControl label="Senha" type="password" iconName="lock" value={ password } onChangeValue={ value => setPassword(value) } />

                <InputControl label="Confirme a Senha" type="password" iconName="lock" value={ confirmPass } onChangeValue={ value => setConfirmPass(value) } />

                <TouchableHighlight underlayColor="transparent" onPress={ () => signUp({ name, email, password, confirmPass }) }>
                    <View style={ styles.btn }>
                        { isLoading ? <ActivityIndicator size={ 23 } color="#fff" /> : <Text style={ styles.textBtn }>CADASTRAR</Text> }
                    </View>
                </TouchableHighlight>

                <Text style={ styles.orText }>OU</Text>

                <TouchableOpacity
                    style={ styles.btnTwo }
                    onPress={ () => navigation.navigate('Signin') }
                >
                    <Text style={ styles.textBtnTwo }>Se você já tem uma conta, entre por aqui!</Text>
                </TouchableOpacity>

            </View>

            { error ? <ErrorBox error={ error } onRemoveBox={ () => clearErrors() } type="bottom" offsetY={ 80 } /> : null }

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