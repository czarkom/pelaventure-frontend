import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    TextField,
    Box,
    List,
    ListItem,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Place } from '../../models/Place';

interface SpecifyDetailsProps {
    places: Place[];
}

const SpecifyDetails: React.FC<SpecifyDetailsProps> = ({ places }) => {
    const [expanded, setExpanded] = useState<string | false>(false);

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
                                <Typography>{place.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box className="space-y-4">
                                    <TextField
                                        label="Number of days"
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <TextField
                                        label="Places to see"
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <TextField
                                        label="Accomodation"
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <TextField
                                        label="Recommended food"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default SpecifyDetails;
