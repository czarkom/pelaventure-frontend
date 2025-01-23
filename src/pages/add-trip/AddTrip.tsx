import React from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Map from './Map'; // Assuming you have a Map component

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    button: {
        marginRight: '1rem',
    },
    instructions: {
        marginTop: '1rem',
        marginBottom: '1rem',
    },
});

const steps = ['Add places', 'Specify details', 'Review trip', 'Trip summary'];

const getStepContent = (stepIndex: number, handleNext: () => void) => {
    switch (stepIndex) {
        case 0:
            return <Map onNext={handleNext} />;
        case 1:
            return <Map onNext={handleNext} />;
        // case 2:
        //     return <ReviewTrip />;
        // case 3:
        //     return <TripSummary />;
        default:
            return 'Unknown step';
    }
};

const StepsWrapper: React.FC = () => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className='h-full flex flex-col'>
            <Stepper activeStep={activeStep} className='px-12 py-6'>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel sx={{
                            '& .MuiStepLabel-label': {
                                fontSize: '1rem',
                            },
                            '& .MuiStepIcon-root': {
                                fontSize: '2rem', // Adjust the icon size
                            },
                        }}>
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div className='flex-1'>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>All steps completed</Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
                        </Button>
                    </div>
                ) : (
                    <div className='h-full flex flex-col'> 
                        <Box className="flex-1">
                            {getStepContent(activeStep, handleNext)}
                        </Box>
                        {activeStep !== 0 && (
                            <div className='flex-none'>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.button}
                                >
                                    Back
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StepsWrapper;
