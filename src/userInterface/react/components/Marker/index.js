import React from 'react';
import { Marker as BaseMarker, InfoWindow } from 'react-google-maps';
import { string, func } from 'prop-types';

import stationType from 'domain/types/stationType';
import MarkerIcon from 'userInterface/react/components/MarkerIcon';
import MarkerInfoWindow from 'userInterface/react/components/MarkerInfoWindow';

const Marker = ({ markerId, markerActive, station, onMarkerClick, onInfoWindowCloseClick }) => {
    const lastAvailability = station.lastAvailability;
    const status = lastAvailability ? lastAvailability.status : 'CLOSED';
    const availableBikeNumber = lastAvailability ? lastAvailability.availableBikeNumber : 0;
    const availableSlotNumber = lastAvailability ? lastAvailability.availableSlotNumber : 0;

    return <BaseMarker
        defaultIcon={MarkerIcon(station.type, status, availableBikeNumber, availableSlotNumber)}
        position={{ lat: station.latitude, lng: station.longitude }}
        onClick={() => onMarkerClick(markerId)}
    >
        {markerId === markerActive &&
            <InfoWindow
                position={{ lat: station.latitude, lng: station.longitude }}
                onCloseClick={() => onInfoWindowCloseClick()}
            >
                <MarkerInfoWindow
                    name={station.name}
                    zipCode={station.zipCode}
                    type={station.type}
                    availableBikeNumber={availableBikeNumber}
                    availableSlotNumber={availableSlotNumber}
                    status={status}
                />
            </InfoWindow>
        }
    </BaseMarker >
};

Marker.defaultProps = {
    markerActive: null,
};

Marker.propTypes = {
    markerId: string.isRequired,
    markerActive: string,
    station: stationType.isRequired,
    onMarkerClick: func.isRequired,
    onInfoWindowCloseClick: func.isRequired,
};

export default Marker;
