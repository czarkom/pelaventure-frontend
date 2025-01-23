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

export interface Accommodation {
    name: string;
    link: string;
    price: number;
    editing?: boolean;
}

interface AccommodationSectionProps {
    accommodations: Accommodation[];
    setAccommodations: (accommodations: Accommodation[]) => void;
}

const AccommodationSection: React.FC<AccommodationSectionProps> = ({ accommodations, setAccommodations }) => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [price, setPrice] = useState('');

    const addAccommodation = () => {
        // Validate input fields are not empty
        if (name && link && price) {
            const newAccommodation = {
                name,
                link,
                price: Number(price),
                editing: false
            };

            setAccommodations([...accommodations, newAccommodation]);

            // Reset input fields
            setName('');
            setLink('');
            setPrice('');
        }
    };

    const removeAccommodation = (index: number) => {
        const updated = accommodations.filter((_, i) => i !== index);
        setAccommodations(updated);
    };

    const cancelEditing = (index: number) => {
        const updated = [...accommodations];
        updated[index].editing = false;
        setAccommodations(updated);
    };

    const updateAccommodation = (index: number, field: keyof Accommodation, value: string | number) => {
        const updated = [...accommodations];
        updated[index] = { ...updated[index], [field]: value };
        setAccommodations(updated);
    };

    const toggleEditMode = (index: number) => {
        const updated = [...accommodations];
        updated[index].editing = !updated[index].editing;
        setAccommodations(updated);
    };

    return (
        <Box>
            <Typography variant="subtitle1">Accommodation</Typography>
            {accommodations.map((acc, i) => (
                <Box key={i} className="flex items-center space-x-2 w-full mb-2 my-4">
                    <div className='flex w-5/6 items-center'>
                        <TextField
                            label="Name"
                            value={acc.name}
                            onChange={(e) => updateAccommodation(i, 'name', e.target.value)}
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
                                onChange={(e) => updateAccommodation(i, 'link', e.target.value)}
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
                            onChange={(e) => updateAccommodation(i, 'price', Number(e.target.value))}
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
                                    <IconButton onClick={() => removeAccommodation(i)}>
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
                        onClick={addAccommodation}
                        className="mt-2 w-1/2"
                    >
                        Add
                    </Button>
                </div>
            </Box>
        </Box>
    );
};

export default AccommodationSection;
