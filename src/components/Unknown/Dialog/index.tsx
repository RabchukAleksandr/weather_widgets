import React, { useState, SyntheticEvent } from 'react';
import {
    Dialog as MuiDialog,
    DialogTitle,
    Typography,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Box,
    Autocomplete,
    TextField
} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../../store";
import {Country} from "../../../store/weather/types";

type Option = {
    label:string
    id:string
}

type DialogProps = {
    open: boolean;
    onClose: () => void;
}

const Dialog:React.FC<DialogProps> = ({onClose, open}) => {
    const [country, setCountry] = useState<string | null>(null)
    const [activeStep, setActiveStep] = React.useState(0);

    const countries = useAppSelector(state => state.weatherReducer.countries)
    const dispatch = useAppDispatch()


    const handleChange = (event: SyntheticEvent<Element, Event>, value: { label: string; id: string; } | null,) => {
        if(value) {
            setCountry(value.label)
        } else {
            setCountry(null)
        }
    }


    console.log(country)

    return (
    <MuiDialog open={open} onClose={onClose}>
        <Box p={5} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} width={400}>
        <DialogTitle>Add city</DialogTitle>
        <Box mb={3}><Typography>Select country</Typography></Box>
            <Autocomplete sx={{ width: 300 }}
                          autoHighlight
                          onChange={handleChange}
                          isOptionEqualToValue={(option:Option, value:Option) => option.id === value.id}
                          getOptionLabel={(option:Option) => option.label}
                          renderInput={(params => <TextField {...params} fullWidth label={'Country'}/>)} id={'Country'}
                          options={countries.map(({country,iso3}:Country) => ({label:country,id:iso3}))}
                          renderOption={(props, option) => (
                              <Box component="li" {...props}>
                                  {option.label}
                              </Box>
                          )}/>
        </Box>
    </MuiDialog>
 );
};

export default Dialog;