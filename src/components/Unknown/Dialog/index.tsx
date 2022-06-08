import React, {useState, SyntheticEvent} from 'react';
import {
    Dialog as MuiDialog,
    DialogTitle,
    Typography,
    Box,
    Autocomplete,
    TextField,
    MobileStepper,
    Button
} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {useAppDispatch, useAppSelector} from "../../../store";
import {Country} from "../../../store/weather/types";
import {fetchCityLocation} from "../../../store/weather";

type Option = {
    label: string
    id: string
}

type DialogProps = {
    open: boolean;
    onClose: () => void;
}

const Dialog: React.FC<DialogProps> = ({onClose, open}) => {
    const countries = useAppSelector(state => state.weatherReducer.countries)
    const dispatch = useAppDispatch()
    const [country, setCountry] = useState<string | null>(null)
    const [city, setCity] = useState<string | null>(null)
    const [cities, setCities] = useState<string[]>([])
    const [activeStep, setActiveStep] = useState<number>(0);
    const theme = useTheme();
    const maxSteps = 2;

    const handleCountryChange = (event: SyntheticEvent<Element, Event>, value: { label: string; id: string; } | null,) => {
        if (value) {
            setCountry(value.label)
        } else {
            setCountry(null)
        }
    }

    const handleCityChange = (event: SyntheticEvent<Element, Event>, value: { label: string; id: string; } | null,) => {
        if (value) {
            setCity(value.label)
        } else {
            setCity(null)
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        const citiesArr = countries.find((item:Country)=> item.country === country).cities
        setCities(citiesArr)
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setCountry(null)
    };

    const handleSubmit = () => {
        dispatch(fetchCityLocation(city as string))
        onClose()
        setCity(null)
        setCountry(null)
        setActiveStep(0)
    }
    return (
        <MuiDialog open={open} onClose={onClose}>
            <Box p={5} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}
                 width={400}>
                <DialogTitle>Add city</DialogTitle>
                {!activeStep ? (<>
                        <Box mb={3}><Typography>Select country</Typography></Box>
                        <Autocomplete sx={{width: 300}}
                                      autoHighlight
                                      onChange={handleCountryChange}
                                      isOptionEqualToValue={(option: Option, value: Option) => option.id === value.id}
                                      renderInput={(params => <TextField {...params} fullWidth label={'Country'}/>)}
                                      options={countries.map(({country, iso3}: Country, index:number) => ({label: country, id: iso3+country+index}))}
                                      renderOption={(props, option) => (
                                          <Box component="li" {...props} key={option.id}>
                                              {option.label}
                                          </Box>
                                      )}/>
                    </>)
                    : (<>
                        <Box mb={3}><Typography>Select city</Typography></Box>
                        <Autocomplete sx={{width: 300}}
                                      autoHighlight
                                      onChange={handleCityChange}
                                      getOptionLabel={(option: Option) => option.label}
                                      renderInput={(params => <TextField {...params} fullWidth label={'City'}/>)}
                                      options={cities!.map((city:string,index:number) => ({
                                          label: city,
                                          id: index+city
                                      }))}
                                      renderOption={(props, option) => (
                                          <Box component="li" {...props} key={option.id}>
                                              {option.label}
                                          </Box>
                                      )}/>
                                          </>)
                }
                <MobileStepper
                    variant="text"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            disabled={!country || activeStep === maxSteps - 1}
                        >
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft/>
                            ) : (
                                <KeyboardArrowRight/>
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight/>
                            ) : (
                                <KeyboardArrowLeft/>
                            )}
                            Back
                        </Button>
                    }
                />
                {city && <Button size="small" variant={'contained'} onClick={handleSubmit}>ADD</Button>}
            </Box>
        </MuiDialog>
    );
};

export default Dialog;