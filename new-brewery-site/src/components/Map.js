import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './Map.css'


const containerStyle = {
  width: '55vw',
  height: '90vh',
};

const center = {
  lat: 37.266,
  lng: -97.733
};

function MyMapComponent({ breweries }) {
      //to delay markers loading until script is loaded
  const [isApiLoaded, setIsApiLoaded] = useState(false); // State to track API load
  
    return (
      <LoadScript googleMapsApiKey="AIzaSyAg8ECS62DqSm9xp9K4YFBmBs2Z0JKUr0Y"
      onLoad={() => setIsApiLoaded(true)} // Set state to true when API loads
    >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{ lat: 37.7749, lng: -97.4194 }}
          zoom={5}
        >
          {isApiLoaded && breweries.map(brewery => {
          const latitude = parseFloat(brewery.latitude);
          const longitude = parseFloat(brewery.longitude);

          if (!isNaN(latitude) && !isNaN(longitude)) {
            return (
              <Marker
                key={brewery.id}
                position={{ lat: latitude, lng: longitude }}
              />
            );
          }
          return null;
        })}
        </GoogleMap>
      </LoadScript>
    );
  }

export default MyMapComponent;
