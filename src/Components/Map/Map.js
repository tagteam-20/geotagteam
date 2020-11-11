import React from 'react';
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import mapStyles from './mapStyles';

const libraries = ['places'];
const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
};
const center = {
    lat: 40.233845,
    lng: -111.658531,
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

export default function Map() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);

    const onMapClick = React.useCallback((event) => {
        setMarkers(current => [{
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
        }])
    }, []);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);
    
    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading Maps";

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                {markers.map((marker) => (
                    <Marker 
                        key={marker.time.toISOString()} 
                        position={{ lat: marker.lat, lng: marker.lng }}
                        icon={{
                            url: "/gem.png",
                            scaledSize: new window.google.maps.Size(20, 20),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(10, 10),
                        }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                    />
                ))}

                {selected ? (<InfoWindow>
                    <div>
                        <h2>Title</h2>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>
        </div>
    );
}