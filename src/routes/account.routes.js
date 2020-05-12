import React from 'react';
import Account from '../screens/Account';

import { createStackNavigator } from '@react-navigation/stack';

const AccountStack = createStackNavigator();

export default function AccountRoutes({ navigation }) {

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