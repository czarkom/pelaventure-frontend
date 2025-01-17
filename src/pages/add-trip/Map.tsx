import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MapIcon from '@mui/icons-material/Map';
import DeleteIcon from '@mui/icons-material/Delete';

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


const Map = () => {
    const [places, setPlaces] = useState<Place[]>([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState<Place | null>(null);

    // Search for a place (you can replace this with an API call to a geocoding service)
    const handleSearch = async () => {
        // Generate random latitude and longitude within Europe bounds
        const randomLatitude = (Math.random() * (71 - 35) + 35).toFixed(4); // Between 35 and 71 degrees North
        const randomLongitude = (Math.random() * (40 - (-25)) + (-25)).toFixed(4); // Between -25 and 40 degrees East

        // Convert to numbers (fixed to 4 decimal places for more precise coordinates)
        const coordinates: [number, number] = [parseFloat(randomLatitude), parseFloat(randomLongitude)];

        setSearchResult({
            name: search,  // Assuming 'search' is the place being searched
            coordinates: coordinates,
        });
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
        <div className="flex h-screen">
            {/* Left Section */}
            <Box
                className="p-4"
                sx={{ width: "33%", display: "flex", flexDirection: "column", gap: 2 }}
            >
                <Typography variant="h5">Add Places</Typography>
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
                <PlacesList places={places}  onUpdate={updatePlaces} />
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
