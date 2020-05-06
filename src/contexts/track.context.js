import React, { createContext, useState } from 'react';

import api from '../services/lifestyle.api';

const TrackContext = createContext({});

export function TrackProvider({ children }) {
   
    const [ allTracks, setAllTracks ] = useState([])

    const getTracks = async () => {}

    const createTrack = async ({ type, locations }) => {
        try {
            await api.post('/tracks', { name: type, locations });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <TrackContext.Provider value={{
            allTracks,
            getTracks,
            createTrack
        }}>
            { children }
        </TrackContext.Provider>
    );

}

export default TrackContext;