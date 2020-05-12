import React, { createContext, useState } from 'react';

import api from '../services/lifestyle.api';

const TrackContext = createContext({});

export function TrackProvider({ children }) {
   
    const [ allTracks, setAllTracks ] = useState([]);
    const [ trackError, setTrackError ] = useState(null);
    const [ success, setSuccess ] = useState(null);

    const getTracks = async ({ userId }) => {
		try {
			const resp = await api.get(`/track/${userId}`);
			setAllTracks(resp.data.result.docs);
		} catch ({ response }) {
			setTrackError(response.data.message);
		}
	}

    const createTrack = async ({ userId, type, locations, time }) => {
        try {
            const resp = await api.post('/track/', { userId, type, locations, time });
            setSuccess(resp.data.message);
        } catch ({ response }) {
            setTrackError(response.data.message);
        }
    }

    const clearErrors = () => {
        setTrackError(null);
	}
	
	const clearSuccess = () => {
		setSuccess(null);
	}

    return (
        <TrackContext.Provider value={{
            allTracks,
            trackError,
            success,
            getTracks,
            createTrack,
			clearErrors,
			clearSuccess
        }}>
            { children }
        </TrackContext.Provider>
    );

}

export default TrackContext;