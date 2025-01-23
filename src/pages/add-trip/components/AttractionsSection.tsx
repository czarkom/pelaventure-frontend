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
import CheckIcon from '@mui/icons-material/Check';

export interface Attraction {
    name: string;
    fee?: number;
    editing?: boolean;
}


interface AttractionsSectionProps {
    attractions: Attraction[];
    setAttractions: (attractions: Attraction[]) => void;
}

const AttractionsSection: React.FC<AttractionsSectionProps> = ({ attractions, setAttractions }) => {
    const [name, setName] = useState('');
    const [fee, setFee] = useState('');

    const addAttraction = () => {
        // Validate input fields are not empty
        if (name && fee) {
            const newAttraction = {
                name,
                fee: Number(fee),
                editing: false
            };

            setAttractions([...attractions, newAttraction]);

            // Reset input fields
            setName('');
            setFee('');
        }
    };

    const removeAttraction = (index: number) => {
        const updated = attractions.filter((_, i) => i !== index);
        setAttractions(updated);
    };

    const cancelEditing = (index: number) => {
        const updated = [...attractions];
        updated[index].editing = false;
        setAttractions(updated);
    };

    const updateAttraction = (index: number, field: keyof Attraction, value: string | number) => {
        const updated = [...attractions];
        updated[index] = { ...updated[index], [field]: value };
        setAttractions(updated);
    };

    const toggleEditMode = (index: number) => {
        const updated = [...attractions];
        updated[index].editing = !updated[index].editing;
        setAttractions(updated);
    };

    return (
        <Box>
            <Typography variant="subtitle1">Attractions</Typography>
            {attractions.map((acc, i) => (
                <Box key={i} className="flex items-center space-x-2 w-full mb-2 my-4">
                    <div className='flex w-5/6 items-center'>
                        <TextField
                            label="Name"
                            value={acc.name}
                            onChange={(e) => updateAttraction(i, 'name', e.target.value)}
                            variant="outlined"
                            inputProps={{
                                readOnly: !acc.editing
                            }}
                            className='w-full'
                        />
                    </div>
                    <div className='flex items-center w-1/6 space-x-2'>
                        <TextField
                            label="Entrance fee"
                            type="number"
                            value={acc.fee}
                            onChange={(e) => updateAttraction(i, 'fee', Number(e.target.value))}
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
                                    <IconButton onClick={() => removeAttraction(i)}>
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
                </div>
                <div className='flex items-center w-1/6 space-x-2'>
                    <TextField
                        label="Entrance fee"
                        type="number"
                        value={fee}
                        onChange={(e) => setFee(e.target.value)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        className="w-1/2"
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        color='primary'
                        onClick={addAttraction}
                        className="mt-2 w-1/2"
                    >
                        Add
                    </Button>
                </div>
            </Box>
        </Box>
    );
};

export default AttractionsSection;
