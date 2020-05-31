import React, { createContext, useState } from 'react';

import api from '../services/lifestyle.api';

const TrackContext = createContext({});

export function TrackProvider({ children }) {
   
	const [ tenTracks, setTenTracks ] = useState([]);
	const [ allTracks, setAllTracks ] = useState([]);

	const [ currentPage, setCurrentPage ] = useState(null);
    const [ trackError, setTrackError ] = useState(null);
	const [ success, setSuccess ] = useState(null);

    const getTenTracks = async ({ userId }) => {
		try {
			const resp = await api.get(`/track/${userId}?page=1`);
			setTenTracks(resp.data.result.docs);
		} catch ({ response }) {
			setTrackError(response.data.message);
		}
	}

	const getAllTracks = async ({ userId, page }) => {
		try {
			setCurrentPage(page);
			
			const resp = await api.get(`/track/${userId}?page=${page}`);
			
			if (allTracks[0] == undefined) {
				setAllTracks(resp.data.result.docs);
			} else {
				setAllTracks([ ...allTracks, ...resp.data.result.docs ]);
			}
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

	const reset = () => {
		setAllTracks([]);
	}

    return (
        <TrackContext.Provider value={{
			tenTracks,
			allTracks,
			currentPage,
            trackError,
			success,
			getTenTracks,
			getAllTracks,
            createTrack,
			clearErrors,
			clearSuccess,
			reset
        }}>
            { children }
        </TrackContext.Provider>
    );

}

export default TrackContext;