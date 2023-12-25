import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -34.397,
  lng: 150.644
};

function MyMapComponent() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyAg8ECS62DqSm9xp9K4YFBmBs2Z0JKUr0Y">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components like markers go here */ }
      </GoogleMap>
    </LoadScript>
  )
}

export default MyMapComponent;
