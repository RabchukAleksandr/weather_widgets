import React, {useEffect} from 'react';
import {usePosition} from "use-position";
import weatherReducer, {fetchWeather,fetchCountries} from "../../store/weather";
import {AppDispatch, RootState, useAppDispatch, useAppSelector} from "../../store";
import {Box} from "@mui/material";
import {Weather as WeatherType} from "../../store/weather/types";
import Widget from "../Unknown/Widget";

type WeatherProps = {}
const Weather: React.FC<WeatherProps> = () => {
    const dispatch = useAppDispatch()
    const widgets = useAppSelector(state => state.weatherReducer.widgets)
    const countries = useAppSelector(state => state.weatherReducer.countries)

    const {
        latitude,
        longitude,

    } = usePosition(false);

    useEffect(()=> {
            if(latitude && longitude && widgets.length === 0) {
                dispatch(fetchWeather({lat: latitude, lon: longitude})).unwrap()
            }
    },[latitude,longitude,dispatch,widgets.length])

    useEffect(()=>{
       if(countries.length === 0) dispatch(fetchCountries())
    },[countries.length, dispatch])

    return (
        <Box>
            {widgets.map(({weather,main,wind,sys,name,icon}: WeatherType) => (<Widget weather={weather} main={main} wind={wind} sys={sys} name={name} icon={icon}/>))}
        </Box>
    );
}

export default Weather;