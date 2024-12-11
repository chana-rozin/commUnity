// // components/Map.tsx
// "use client"
// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// // Fix for default marker icons in Leaflet
// delete (L.Icon.Default.prototype as any)._getIconUrl;
// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
// });

// interface Event {
//     _id: string;
//     name: string;
//     location: {
//         type: string;
//         coordinates: [number, number]; // [longitude, latitude]
//     };
// }

// const Map: React.FC = () => {
//     const [events, setEvents] = useState<Event[]>([]);
//     const [userPosition, setUserPosition] = useState<[number, number] | null>(null);
//     const [radius, setRadius] = useState(300); // Default radius in meters

//     // Custom hook to allow map click for selecting location
//     const LocationSelector = () => {
//         useMapEvents({
//             click(e) {
//                 setUserPosition([e.latlng.lat, e.latlng.lng]);
//             },
//         });
//         return null;
//     };

//     const fetchEvents = async () => {
//         if (!userPosition) {
//             alert('Please select your location on the map.');
//             return;
//         }

//         try {
//             const [lat, lng] = userPosition;
//             const response = await axios.get('/api/nearby-events', {
//                 params: {
//                     lat,
//                     lng,
//                     radius,
//                 },
//             });
//             setEvents(response.data);
//         } catch (error) {
//             console.error(error);
//             alert('Failed to fetch events. Please try again.');
//         }
//     };

//     return (
//         <div>
//             <div style={{ marginBottom: '1rem' }}>
//                 <label>
//                     Select Radius (meters):{' '}
//                     <input
//                         type="number"
//                         value={radius}
//                         onChange={(e) => setRadius(Number(e.target.value))}
//                         min={50}
//                         step={50}
//                     />
//                 </label>
//                 <button onClick={fetchEvents} style={{ marginLeft: '1rem' }}>
//                     Find Events
//                 </button>
//             </div>
//             <MapContainer
//                 center={userPosition || [51.505, -0.09]}
//                 zoom={15}
//                 style={{ height: '500px', width: '100%' }}
//             >
//                 <TileLayer
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//                 <LocationSelector />
//                 {userPosition && (
//                     <Marker position={userPosition}>
//                         <Popup>You selected this location</Popup>
//                     </Marker>
//                 )}
//                 {events.map((event) => (
//                     <Marker
//                         key={event._id}
//                         position={[event.location.coordinates[1], event.location.coordinates[0]]}
//                     >
//                         <Popup>{event.name}</Popup>
//                     </Marker>
//                 ))}
//             </MapContainer>
//         </div>
//     );
// };

// export default Map;
"use client"
import { useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const App = () => {
    const [location, setLocation] = useState<[number, number] | null>(null); // [lat, lng]
    const [radius, setRadius] = useState(300); // Default radius
    const [address, setAddress] = useState("");
    const [events, setEvents] = useState([]);

    const handleSearch = async () => {
        if (!address) return alert("Please enter an address");

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
                    address
                )}&format=json&addressdetails=1&accept-language=he`
            );
            const data = await response.json();

            if (data.length === 0) {
                alert("Address not found");
                return;
            }

            const { lat, lon } = data[0]; // Select the first result
            setLocation([parseFloat(lat), parseFloat(lon)]);
        } catch (error) {
            console.error("Error fetching location:", error);
            alert("Failed to fetch location");
        }
    };

    const fetchNearbyEvents = async () => {
        if (!location) return alert("Set a location first");

        const [lat, lng] = location;

        try {
            const response = await fetch(
                `/api/nearby-events?lat=${lat}&lng=${lng}&radius=${radius}`
            );
            const events = await response.json();
            setEvents(events);
        } catch (error) {
            console.error("Error fetching events:", error);
            alert("Failed to fetch events");
        }
    };

    return (
        <div>
            <h1>Event Finder</h1>
            <div>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address (in Hebrew)"
                />
                <button onClick={handleSearch}>Search Location</button>
            </div>

            {location && (
                <>
                    <div>
                        <label>
                            Radius (meters):{" "}
                            <input
                                type="number"
                                value={radius}
                                onChange={(e) => setRadius(Number(e.target.value))}
                            />
                        </label>
                        <button onClick={fetchNearbyEvents}>Find Events</button>
                    </div>

                    <MapContainer
                        center={location}
                        zoom={15}
                        style={{ height: "400px", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={location}></Marker>
                    </MapContainer>

                    <div>
                        <h2>Nearby Events</h2>
                        <ul>
                            {events.map((event: any) => (
                                <li key={event._id}>{event.name}</li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
