// src/components/PlacesList.tsx

import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Typography } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';  // Map icon
import DeleteIcon from '@mui/icons-material/Delete';  // Delete icon
import DragHandleIcon from '@mui/icons-material/DragHandle';  // Drag handle icon // Import the Place interface
import { Place } from '../../../models/Place';

const PlacesList = ({ places }: { places: Place[] }) => {
    return (
        <List sx={{ overflowY: 'auto', maxHeight: '300px' }}>
            {places.map((place, index) => (
                <ListItem key={place.name} className='flex justify-between space-x-4'>
                    <ListItemAvatar className='flex items-center space-x-4'>
                        <Typography variant="body2" className="mr-2">
                            {index + 1}
                        </Typography>
                        <Avatar>
                            <MapIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={place.name}
                        secondary={`Lat: ${place.coordinates[0].toFixed(4)}, Long: ${place.coordinates[1].toFixed(4)}`}
                    />
                    <div className='flex space-x-6'>
                        <IconButton edge="end">
                            <DeleteIcon />
                        </IconButton>
                        <IconButton edge="end">
                            <DragHandleIcon />
                        </IconButton>
                    </div>
                </ListItem>
            ))}
        </List>
    );
};

export default PlacesList;
