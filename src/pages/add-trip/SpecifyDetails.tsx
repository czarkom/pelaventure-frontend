import React, { useEffect, useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    TextField,
    Box,
    List,
    ListItem,
    Divider,
    Select,
    MenuItem,
    Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Place } from '../../models/Place';
import AccommodationSection, { Accommodation } from './components/AccommodationSection';
import RestaurantsSection, { Restaurant } from './components/RestaurantsSection';
import AttractionsSection, { Attraction } from './components/AttractionsSection';
import PreviewIcon from '@mui/icons-material/Preview';

interface SpecifyDetailsProps {
    onNext: (places: Place[]) => void;
    onBack: () => void;
    places: Place[];
}

const SpecifyDetails: React.FC<SpecifyDetailsProps> = ({ onNext, onBack, places }) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [transportation, setTransportation] = useState<string>('');
    const [days, setDays] = useState<number | ''>('');
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [thumbnails, setThumbnails] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchThumbnail = async (placeName: string) => {
            try {
                const response = await fetch(
                    `https://pixabay.com/api/?key=48402273-ba91ab61c3cf1d9cf51600f8e&q=${encodeURIComponent(placeName)}&image_type=photo&per_page=3&orientation=horizontal`
                );
                const data = await response.json();
                if (data.hits && data.hits.length > 0) {
                    setThumbnails((prev) => ({
                        ...prev,
                        [placeName]: data.hits[0].previewURL,
                    }));
                }
            } catch (error) {
                console.error('Error fetching thumbnail:', error);
            }
        };

        places.forEach((place) => {
            if (!thumbnails[place.name]) {
                fetchThumbnail(place.name);
            }
        });
    }, [places, thumbnails]);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box className="p-4">
            <List>
                {places.map((place, index) => (
                    <ListItem key={index} className="p-0">
                        <Accordion className="w-full" expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${index}bh-content`}
                                id={`panel${index}bh-header`}
                            >
                                <div className='flex justify-between items-center w-full'>
                                    <Typography variant='subtitle1'>{index + 1}. {place.name}</Typography>
                                    <img
                                        src={thumbnails[place.name] || 'https://via.placeholder.com/150'}
                                        alt={place.name}
                                        className="w-24 h-16 rounded-md ml-4"
                                    />
                                </div>

                            </AccordionSummary>
                            <AccordionDetails>
                                <Box className="space-y-4">
                                    <Divider />
                                    <Typography variant="subtitle1">Mean of transport</Typography>
                                    <Select
                                        value={transportation}
                                        onChange={(e) => setTransportation(e.target.value)}
                                        className='w-48'
                                    >
                                        {[
                                            { label: 'Plane', icon: '✈️' },
                                            { label: 'Car', icon: '🚗' },
                                            { label: 'Bus', icon: '🚌' },
                                            { label: 'Taxi', icon: '🚕' },
                                            { label: 'Hitchhike', icon: '👍' },
                                            { label: 'Train', icon: '🚆' }
                                        ].map((option) => (
                                            <MenuItem key={option.label} value={option.label}>
                                                {option.icon} {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                    <Divider />
                                    <Typography variant="subtitle1">Number of Days</Typography>
                                    <TextField
                                        type="number"
                                        value={days}
                                        onChange={(e) => setDays(Number(e.target.value))}
                                        className='w-48'
                                    />

                                    <Divider />
                                    <AccommodationSection accommodations={accommodations} setAccommodations={setAccommodations} />

                                    <Divider />
                                    <AttractionsSection attractions={attractions} setAttractions={setAttractions} />

                                    <Divider />
                                    <RestaurantsSection restaurants={restaurants} setRestaurants={setRestaurants} />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                ))}
            </List>
            <Box>
                <div className='p-6 space-y-2'>
                    <Typography variant='h6'>
                        Trip summary:
                    </Typography>
                    <Typography variant="subtitle2">Predicted price: $1000</Typography>
                    <Typography variant="subtitle2">Trip length (in days): 7</Typography>
                </div>
                <div className="space</div>-x-4 flex justify-center mt-6 space-x-2">
                    <Button
                        variant="contained"
                        color="primary"
                        className='w-1/4'
                        onClick={() => onBack()}
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <PreviewIcon />
                            <Typography>Back</Typography>
                        </div>

                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => onNext(places)}
                        className='w-1/4'
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <PreviewIcon />
                            <Typography>Review trip</Typography>
                        </div>

                    </Button>
                </div>
            </Box>
        </Box>
    );
};

export default SpecifyDetails;
