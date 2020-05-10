import React, { createContext, useState } from 'react';

const LocationContext = createContext({});

export function LocationProvider({ children }) {
   
    const [ currentLocation, setCurrentLocation ] = useState(null);
    const [ recording, setRecording ] = useState(false);
    const [ locations, setLocations ] = useState([]);

    const startRecording = () => {
        setRecording(true);
    }

    const stopRecording = () => {
        setRecording(false);
    }

    const addLocation = (newLocation, isRecording) => {
        setCurrentLocation(newLocation);

        if (isRecording) {
            setLocations(locations => [ ...locations, newLocation ]);
        }
	}
	
	const reset = () => {
		setRecording(false);
		setLocations([]);
	}

    return (
        <LocationContext.Provider value={{
            recording,
            locations,
            currentLocation,
            startRecording,
            stopRecording,
			addLocation,
			reset
        }}>
            { children }
        </LocationContext.Provider>
    );

}

export default LocationContext;