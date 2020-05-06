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

    const addLocation = (currentLocation, isRecording) => {
        setCurrentLocation(currentLocation);

        if (isRecording) {
            setLocations([ ...locations, currentLocation ]);
        }
    }

    return (
        <LocationContext.Provider value={{
            recording,
            locations,
            currentLocation,
            startRecording,
            stopRecording,
            addLocation
        }}>
            { children }
        </LocationContext.Provider>
    );

}

export default LocationContext;