import React from 'react';

import AccountRoutes from './account.routes';
import HomeRoutes from './home.routes';

import TabBarLabel from '../components/TabBarLabel';
import TabBarIcon from '../components/TabBarIcon';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const AppTab = createBottomTabNavigator();

export default function AppRoutes() {

    return (
        <AppTab.Navigator 
            initialRouteName="TrackCreate"
            tabBarOptions={{
                activeTintColor: '#1cdbb5',
                inactiveTintColor: '#000'
            }}
        >
            <AppTab.Screen
                name="HomePageFlow"
                component={ HomeRoutes }
                options={{ 
                    tabBarLabel: ({ focused }) => <TabBarLabel focused={ focused } />,
                    tabBarIcon: () => <TabBarIcon label="Home" iconName="home" iconSize={ 21 } />
                }}
            />
            <AppTab.Screen
                name="AccountFlow"
                component={ AccountRoutes }
                options={{ 
                    tabBarLabel: ({ focused }) => <TabBarLabel focused={ focused } />,
                    tabBarIcon: () => <TabBarIcon label="Conta" iconName="user" iconSize={ 19 } />
                }}
            />
        </AppTab.Navigator>
    );

}