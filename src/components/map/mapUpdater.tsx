"use client"
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapUpdater: React.FC<{ location: [number, number] }> = ({ location }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(location); // Dynamically update the map's center
    }, [location, map]);
    return null;
};
export default MapUpdater;

