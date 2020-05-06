import React, { useState } from 'react';

import Account from '../screens/Account';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { createStackNavigator } from '@react-navigation/stack';

const fetchFonts = () => {
    return Font.loadAsync({
        'permanent-maker': require('../../assets/fonts/PermanentMarker-Regular.ttf'),
    });
}

const AccountStack = createStackNavigator();

export default function AccountRoutes() {

    const [ fontLoaded, setFontLoaded ] = useState(false);

    if (!fontLoaded) {
        return (
            <AppLoading startAsync={ fetchFonts } onFinish={ () => setFontLoaded(true) } />
        );
    }

    return (
        <AccountStack.Navigator>
            <AccountStack.Screen
                name="Account"
                component={ Account }
                options={{
                    headerTintColor: '#1cdbb5',
                    headerTitleAlign: 'center',
                    headerTitle: 'Minha Conta',
                    headerTitleStyle: {
                        fontFamily: 'permanent-maker',
                        fontSize: 30
                    }                    
                }}
            />
        </AccountStack.Navigator>
    );

}