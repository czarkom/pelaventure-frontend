import React, { useState } from 'react';
import {
    Box,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
    Button,
    Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import LinkIcon from '@mui/icons-material/Link';
import CheckIcon from '@mui/icons-material/Check';

export interface Restaurant {
    name: string;
    link: string;
    price: number;
    editing?: boolean;
}

interface RestaurantsSectionProps {
    restaurants: Restaurant[];
    setRestaurants: (restaurants: Restaurant[]) => void;
}

const RestaurantsSection: React.FC<RestaurantsSectionProps> = ({ restaurants: restaurants, setRestaurants: setRestaurants }) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [price, setPrice] = useState('');

    const addRestaurant = () => {
        // Validate input fields are not empty
        if (name && link && price) {
            const newRestaurant = {
                name,
                link,
                price: Number(price),
                editing: false
            };

            setRestaurants([...restaurants, newRestaurant]);

            // Reset input fields
            setName('');
            setLink('');
            setPrice('');
        }
    };

    const removeRestaurant = (index: number) => {
        const updated = restaurants.filter((_, i) => i !== index);
        setRestaurants(updated);
    };

    const cancelEditing = (index: number) => {
        const updated = [...restaurants];
        updated[index].editing = false;
        setRestaurants(updated);
    };

    const updateRestaurant = (index: number, field: keyof Restaurant, value: string | number) => {
        const updated = [...restaurants];
        updated[index] = { ...updated[index], [field]: value };
        setRestaurants(updated);
    };

    const toggleEditMode = (index: number) => {
        const updated = [...restaurants];
        updated[index].editing = !updated[index].editing;
        setRestaurants(updated);
    };

    return (
        <Box>
            <Typography variant="subtitle1">Recommended food</Typography>
            {restaurants.map((acc, i) => (
                <Box key={i} className="flex items-center space-x-2 w-full mb-2 my-4">
                    <div className='flex w-5/6 items-center'>
                        <TextField
                            label="Name"
                            value={acc.name}
                            onChange={(e) => updateRestaurant(i, 'name', e.target.value)}
                            variant="outlined"
                            inputProps={{
                                readOnly: !acc.editing
                            }}
                            className='w-1/2'
                        />
                        {acc.editing ? (
                            <TextField
                                label="Link"
                                value={acc.link}
                                className='w-1/2'
                                onChange={(e) => updateRestaurant(i, 'link', e.target.value)}
                                variant="outlined"
                                InputProps={{
                                    readOnly: !acc.editing
                                }}
                            />
                        ) : (
                            <a
                                href={acc.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-inherit hover:text-blue-500 mx-4 flex items-center"
                            >
                                <LinkIcon className='mr-2' />
                                {acc.link}
                            </a>
                        )}
                    </div>
                    <div className='flex items-center w-1/6 space-x-2'>
                        <TextField
                            label="Price"
                            type="number"
                            value={acc.price}
                            onChange={(e) => updateRestaurant(i, 'price', Number(e.target.value))}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                readOnly: !acc.editing
                            }}
                            className="w-1/2"
                            variant="outlined"
                        />

                        <Box className="flex space-x-2 w-1/2 justify-center">
                            {acc.editing ? (
                                <>
                                    <IconButton onClick={() => toggleEditMode(i)}>
                                        <CheckIcon />
                                    </IconButton>
                                    <IconButton onClick={() => cancelEditing(i)}>
                                        <CancelIcon />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <IconButton onClick={() => toggleEditMode(i)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => removeRestaurant(i)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            )}
                        </Box>
                    </div>

                </Box>
            ))}

            <Box className="flex items-center space-x-2 w-full mt-4">
                <div className='flex w-5/6 items-center space-x-2'>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        label="Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        fullWidth
                        variant="outlined"
                    />
                </div>
                <div className='flex items-center w-1/6 space-x-2'>
                    <TextField
                        label="Price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        className="w-1/2"
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        color='primary'
                        onClick={addRestaurant}
                        className="mt-2 w-1/2"
                    >
                        Add
                    </Button>
                </div>
            </Box>
        </Box>
    );
};

export default RestaurantsSection;
