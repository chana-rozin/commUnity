"use client"
import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import MapUpdater from '@/components/map/mapUpdater';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { number } from 'zod';


interface OptionType {
    value: string;
    label: string;
}
interface MapProps {
    setAddress: React.Dispatch<any>;
    inputPlaceholder: string;
}
const DEFAULT_ISRAEL_CENTER: [number, number] = [31.0461, 34.8516];
const SearchableSelectWithAPI: React.FC<MapProps> = ({ setAddress, inputPlaceholder }) => {
    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [location, setLocation] = useState<[any, any]>(DEFAULT_ISRAEL_CENTER);
    const [radius, setRadius] = useState<number>(300); // Default radius in meters

    const fetchOptions = async (inputValue: string): Promise<OptionType[]> => {
        if (!inputValue) return [];

        try {

            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    inputValue
                )}&addressdetails=1&accept-language=he&namedetails=1&extratags=1`
            );
            const data = await response.json();

            return data.map((item: any) => ({
                value: item,
                label: item.display_name,
            }));
        } catch (error) {
            console.error('Error fetching options:', error);
            return [];
        }
    };

    const handleChange = (selected: any) => {
        if (selected) {
            setSelectedOption(selected);
            setAddress(selected)
            setLocation([parseFloat(selected.value.lat), parseFloat(selected.value.lon)]);
        } else {
            setSelectedOption(null);
            setAddress(null);
            setLocation(DEFAULT_ISRAEL_CENTER); // Reset to default location
        }
    };

    return (
        <AsyncSelect
            loadOptions={fetchOptions}
            value={selectedOption}
            onChange={handleChange}
            placeholder={inputPlaceholder}
            isClearable
            styles={{
                menu: (provided) => ({
                    ...provided,
                    zIndex: 1050, // Ensure it appears above the map
                }),
            }}
            className="flex-1 shrink gap-1 self-stretch w-full text-sm leading-none"
            classNames={{
                control: ({ isFocused }) =>
                    `px-2 py-2 bg-white rounded-md border border-solid ${isFocused ? 'border-black' : 'border-stone-300'} text-neutral-500 min-h-[36px]`,
                placeholder: () => "text-neutral-500",
                singleValue: () => "text-neutral-700",
                menu: () => "bg-white rounded-md border border-solid border-stone-300",
                menuList: () => "p-0 m-0",
                option: ({ isFocused }) =>
                    `px-3 py-2 text-sm leading-none ${isFocused ? "bg-stone-100 text-neutral-800" : "text-neutral-700"
                    }`,
            }}
        />

    );
};

export default SearchableSelectWithAPI;

/* 
            <MapContainer
                center={location}
                zoom={13}
                style={{ height: "500px", width: "100%" }}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={location}></Marker>
                <MapUpdater location={location} />
            </MapContainer>
            <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                placeholder="Radius in meters"
            /> */
