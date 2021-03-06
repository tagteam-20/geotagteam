import React, { useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import mapStyles from './mapStyles';
import axios from 'axios';
import './Map.css';
import { Link } from 'react-router-dom';
//import {connect} from 'react-redux';
import {Helmet} from 'react-helmet-async';

const libraries = ['places'];
const mapContainerStyle = {
    width: '100vw',
    height: 'calc(100vh - 56px)',
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

export default function Map(props) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const [allPins, getAllPins] = React.useState([]);

    useEffect(() => {
        axios
            .get('/api/pins')
            .then(res => {
                //console.log(res.data)
                getAllPins(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

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

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    const mappedPins = allPins.map((pin, ind) => {
        //console.log('pin', pin);
        return <Marker
            key={ind}
            position={{ lat: +pin.lat, lng: +pin.lng }}
            icon={{
                url: "/diamond.png",
                scaledSize: new window.google.maps.Size(20, 20),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(10, 10),
            }}
            onClick={() => {
                setSelected(pin);
            }} />
    })

    const addFavorite = () =>{
        axios.post(`/api/favorite`,{id: +selected.id})
        .then(
            props.history.push(`/gem/${selected.id}`)
        )
        .catch(err => console.log(err))
    }

    //console.log('selected', selected);

    return (
        <div id='map'>
            <Helmet>
                <title>Hidden Gems - Map</title>
            </Helmet>
            <Search panTo={panTo} />
            <Locate panTo={panTo} />
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
                            url: "/diamond.png",
                            scaledSize: new window.google.maps.Size(20, 20),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(10, 10),
                        }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                    />
                ))}
                {selected ? selected.id ? (
                    <InfoWindow
                        position={{ lat: +selected.lat, lng: +selected.lng }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            <h4>{selected.title}</h4>
                            <img src={`${selected.img}`} alt='gem location' className='gem-picture' />
                            <Link to={`/gem/${selected.id}`}
                            ><p>View More</p></Link>
                            <p onClick={addFavorite}>Add to Favorite &#11088;</p>
                        </div>
                    </InfoWindow>) : (
                        <InfoWindow
                            position={{ lat: +selected.lat, lng: +selected.lng }}
                            onCloseClick={() => {
                                setSelected(null);
                            }}
                        >
                            <div>
                                <Link selectedGem={selected} to={`/new/${selected.lat}/${selected.lng}`}><h6>+Add Gem</h6></Link>
                            </div>
                        </InfoWindow>) : null}
                {mappedPins}
            </GoogleMap>
        </div>
    );
}

function Locate({ panTo }) {
    return (
        <button
            className='locate'
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => null
                );
            }}
        >
            <img src='compass.png' alt='compass - locate me' />
        </button>
    );
}

function Search({ panTo }) {
    const { ready, value, suggestions: { status, data }, setValue, clearSuggestions } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 40.233845, lng: () => -111.658531, },
            radius: 200 * 1000,
        },
    });

    return (
        <div className='search'>
            <Combobox
                onSelect={async (address) => {
                    setValue(address, false);
                    clearSuggestions();

                    try {
                        const results = await getGeocode({ address });
                        const { lat, lng } = await getLatLng(results[0]);
                        panTo({ lat, lng });
                    } catch (err) {
                        console.log('error!')
                    }
                }}
            >
                <ComboboxInput
                    value={value}
                    id='searchbar'
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    disabled={!ready}
                    placeholder='Enter an address'
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === 'OK' &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}