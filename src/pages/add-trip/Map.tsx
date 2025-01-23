import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MapIcon from '@mui/icons-material/Map';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import {
    Button,
    TextField,
    Box,
    Typography,
    Divider,
    ListItem,
    IconButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
    List,
} from "@mui/material";
import { Place } from "../../models/Place";
import PlacesList from "./components/PlacesList";

interface MapProps {
    onNext: (places: Place[]) => void;
    places: Place[];
}

const Map: React.FC<MapProps> = ({ onNext, places: initialPlaces }) => {
    const [places, setPlaces] = useState<Place[]>(initialPlaces);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState<Place | null>(null);

    // Search for a place (you can replace this with an API call to a geocoding service)
    const handleSearch = async () => {
        if (!search.trim()) return;
    
        const apiKey = "88583e1875824717865d1b341d7d2a5f"; // Replace with your OpenCage API key
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            search
        )}&key=${apiKey}&limit=5`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            if (data.results.length > 0) {
                const results = data.results.map((result: any) => ({
                    name: result.formatted,
                    coordinates: [result.geometry.lat, result.geometry.lng] as [number, number],
                }));
                setSearchResult(results[0]); // Assuming `searchResults` is your state for storing multiple places
            } else {
                setSearchResult(null); // No results found
            }
        } catch (error) {
            console.error("Error fetching places:", error);
        }
    };
    


    // Add a new place to the list
    const handleAddPlace = () => {
        if (searchResult) {
            setPlaces([...places, searchResult]);
            setSearch("");
            setSearchResult(null);
        }
    };

    // Marker icon (customized Leaflet icon)
    const customIcon = new L.Icon({
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    const updatePlaces = (updatedPlaces: Place[]) => {
        setPlaces(updatedPlaces);
    };

    return (
        <div className="flex h-full">
            {/* Left Section */}
            <Box
                className="p-4 h-full"
                sx={{ width: "33%", display: "flex", flexDirection: "column", gap: 2 }}
            >
                <TextField
                    label="Search for a place"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                >
                    Search
                </Button>
                {searchResult && (
                    <Box className="mt-4 p-2 shadow rounded">
                        <div className="mb-6 flex items-center">
                            <div className="mr-2">
                                <Typography variant="subtitle1">
                                    Found:
                                </Typography>
                            </div>
                            <Typography variant="body1">
                                {searchResult.name} ({searchResult.coordinates.join(", ")})
                            </Typography>
                        </div>
                        <Button
                            variant="outlined"
                            color="success"
                            className="mt-4"
                            fullWidth
                            onClick={handleAddPlace}
                        >
                            Add to List
                        </Button>
                    </Box>
                )}
                <Divider />
                <PlacesList places={places} onUpdate={updatePlaces} />
                {places.length > 0 && (
                    <div className="space-y-4">
                        <Divider />
                        <Button
                            variant="contained"
                            color="success"
                            fullWidth
                            onClick={() => onNext(places)}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <MapIcon />
                                <Typography>Add trip details</Typography>
                            </div>
                        </Button>
                    </div>

                )}
            </Box>

            {/* Map Section */}
            <Box sx={{ width: "67%" }}>
                <MapContainer
                    center={[51.505, -0.09]}
                    zoom={4}
                    scrollWheelZoom
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {places.map((place, index) => (
                        <Marker
                            key={index}
                            position={place.coordinates}
                            icon={customIcon}
                        />
                    ))}
                    {places.length > 1 && (
                        <Polyline
                            positions={places.map((place) => place.coordinates)}
                            color="blue"
                        />
                    )}
                </MapContainer>
            </Box>
        </div>
    );
};

export default Map;
