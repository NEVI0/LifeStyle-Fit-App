import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Feather } from '@expo/vector-icons';

import HomePage from '../screens/HomePage';
import TrackCreate from '../screens/TrackCreate';
import ListAllTracks from '../screens/ListAllTracks';

const HomeStack = createStackNavigator();

export default function HomeRoutes({ route, navigation }) {

	if (route.state && route.state.index > 0) {
        navigation.setOptions({ tabBarVisible: false });
    } else {
        navigation.setOptions({ tabBarVisible: true });
    }

    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="HomePage"
                component={ HomePage }
                options={{
                    headerTintColor: '#1cdbb5',
                    headerTitleAlign: 'center',
                    headerTitle: 'Home Page',
                    headerTitleStyle: {
                        fontFamily: 'permanent-maker',
                        fontSize: 30
					},                 
                }}
            />
            <HomeStack.Screen
                name="TrackCreate"
                component={ TrackCreate }
                options={{
					headerBackImage: () => <Feather name="chevrons-left" size={ 25 } />,
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: 'permanent-maker',
                        fontSize: 30
					},
					headerLeftContainerStyle: {
						marginTop: 5
					}
                }}
            />
			<HomeStack.Screen
				name="ListAllTracks"
				component={ ListAllTracks }
				options={{
					headerBackImage: () => <Feather name="chevrons-left" size={ 25 } />,
					headerTitleAlign: 'center',
					title: 'Exercícios',
                    headerTitleStyle: {
                        fontFamily: 'permanent-maker',
						fontSize: 30,
						color: '#a0dd11'
                    },
					headerLeftContainerStyle: {
						marginTop: 5
					}
                }}
			/>
        </HomeStack.Navigator>
    );

}