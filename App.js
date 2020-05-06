import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Routes from './src/routes/routes';

import { AuthProvider } from './src/contexts/auth.context';
import { LocationProvider } from './src/contexts/location.context';
import { TrackProvider } from './src/contexts/track.context';

const fetchFonts = () => {
    return Font.loadAsync({
        'permanent-maker': require('./assets/fonts/PermanentMarker-Regular.ttf'),
    });
}

export default function App() {

	const [ fontLoaded, setFontLoaded ] = useState(false);

	if (!fontLoaded) {
        return (
            <AppLoading startAsync={ fetchFonts } onFinish={ () => setFontLoaded(true) } />
        );
    }

	return (
		<AuthProvider>
			<LocationProvider>
				<TrackProvider>
					<NavigationContainer>
						<Routes />
					</NavigationContainer>
				</TrackProvider>
			</LocationProvider>
		</AuthProvider>
	);
}