import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoieW91c3NlZnNoYWJvIiwiYSI6ImNsZnlsOW14cjBiczkzcm9odWJmemN0ejEifQ.lju6vjKv3aiPNv-IvLNKYw";

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(-100);
  const [lat, setLat] = useState(38);
  const [zoom, setZoom] = useState(4.5);
  const [breweries, setBreweries] = useState([]); // Adding state for breweries

  // Fetch coordinates from API and update state
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.openbrewerydb.org/v1/breweries?by_dist=38.8977,77.0365&per_page=3"
      );
      const breweriesData = await response.json();
      setBreweries(breweriesData); // Update your breweries state or prop
    };

    fetchData();
  }, []);

  // Initialize map and markers when component mounts or breweries data changes
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/youssefshabo/clfymf6eb000101l1xl5w0szn/draft",
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Create markers
    breweries.forEach((brewery) => {
      new mapboxgl.Marker()
        .setLngLat([brewery.longitude, brewery.latitude])
        .addTo(map);
    });

    map.on("move", () => {
      setLng(map.getCenter().lng);
      setLat(map.getCenter().lat);
      setZoom(map.getZoom().zoom);
    });

    // Clean up on unmount
    return () => map.remove();
  }, [breweries]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Map;
