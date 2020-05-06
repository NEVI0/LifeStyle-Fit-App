import { useContext } from 'react';

import TrackContext from '../contexts/track.context';
import LocationContext from '../contexts/location.context';

export default () => {

    const { createTrack } = useContext(TrackContext);
    const { locations } = useContext(LocationContext);

    const saveTrack = () => {
        createTrack('NAME_OF_TRACKING', locations);
    }

    return [ saveTrack ];

}