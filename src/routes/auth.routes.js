import React from 'react';

import Signin from '../screens/Signin';
import Signup from '../screens/Signup';

import { createStackNavigator } from '@react-navigation/stack';

const AuthStack = createStackNavigator();

export default function AuthRoutes() {

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="Signin"
                component={ Signin }
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="Signup"
                component={ Signup }
                options={{ headerShown: false }}
            />
        </AuthStack.Navigator>
    );

}