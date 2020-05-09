import { useState, useEffect } from 'react';
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from 'expo-location';

export default (shouldTrack, callback) => {
    
    const [ locationError, setLocationError ] = useState(null);

    useEffect(() => {
        let subscriber;

        const startWatching = async () => {
            try {
                await requestPermissionsAsync();
                subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10
                }, callback);
            } catch (err) {
                setLocationError('Por favor, habilite a localização!');
            }        
        }

        if (shouldTrack) {
            startWatching();
        } else {
            if (subscriber) {
                subscriber.remove();
            }
            subscriber = null;
        }

        return () => {
            if (subscriber) {
                subscriber.remove();
            }
        }
    }, [shouldTrack]);

    return [locationError, setLocationError];

}