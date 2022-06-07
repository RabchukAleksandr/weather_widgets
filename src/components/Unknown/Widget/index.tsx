import React from 'react';
import {Box, Typography} from '@mui/material'
import {Weather} from "../../../store/weather/types";

type WidgetProps = {} & Weather
const Widget: React.FC<WidgetProps> = ({weather, main, wind, sys,name,icon}) => {
    return (
        <Box padding={20}>
            <Typography>Widget</Typography>
            <Typography>{weather[0].description}</Typography>
            <Typography>{weather[0].main}</Typography>
            <Typography>{main.temp}</Typography>
            <Typography>{wind.speed}</Typography>
            <Typography>{wind.deg}</Typography>
            <Typography>{sys.sunrise}</Typography>
            <Typography>{sys.sunshine}</Typography>
            <img src={icon} alt="img"/>
            <Typography>{name}</Typography>
        </Box>
    );
};

export default Widget;