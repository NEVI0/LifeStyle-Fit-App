import React, { createContext, useState } from 'react';

import api from '../services/lifestyle.api';

const TrackContext = createContext({});

export function TrackProvider({ children }) {
   
	const [ allTracks, setAllTracks ] = useState([]);

	const [ currentPage, setCurrentPage ] = useState(1);

    const [ trackError, setTrackError ] = useState(null);
	const [ success, setSuccess ] = useState(null);

    const getTenTracks = async ({ userId }) => {
		try {
			const resp = await api.get(`/track/${userId}?page=1`);
			setAllTracks(resp.data.result.docs);
		} catch ({ response }) {
			setTrackError(response.data.message);
		}
	}

	const getAllTracks = async ({ userId, page = 1 }) => {
		try {
			// if (page == currentPage) return;

			const resp = await api.get(`/track/${userId}?page=${page}`);

			setAllTracks(resp.data.result.docs);

			setCurrentPage(page);
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
			currentPage,
            trackError,
			success,
			getTenTracks,
			getAllTracks,
            createTrack,
			clearErrors,
			clearSuccess
        }}>
            { children }
        </TrackContext.Provider>
    );

}

export default TrackContext;