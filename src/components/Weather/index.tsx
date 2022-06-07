import React, {useEffect} from 'react';

import {usePosition} from "use-position";
import {Navigation, Pagination, Scrollbar, A11y, Virtual} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import weatherReducer, {fetchWeather, fetchCountries} from "../../store/weather";
import {AppDispatch, RootState, useAppDispatch, useAppSelector} from "../../store";
import {Weather as WeatherType} from "../../store/weather/types";

import {Box, Grid} from "@mui/material";

import Widget from "../Unknown/Widget";
import AddCity from "../Unknown/AddCity";

import "swiper/css";
import "swiper/css/navigation";
import './styles.css';

type WeatherProps = {}
const Weather: React.FC<WeatherProps> = () => {
    const dispatch = useAppDispatch()
    const widgets = useAppSelector(state => state.weatherReducer.widgets)
    const countries = useAppSelector(state => state.weatherReducer.countries)

    const {
        latitude,
        longitude,

    } = usePosition(false);

    useEffect(() => {
        if (latitude && longitude && widgets.length === 0) {
            dispatch(fetchWeather({lat: latitude, lon: longitude})).unwrap()
        }
    }, [latitude, longitude, dispatch, widgets.length])

    useEffect(() => {
        if (countries.length === 0) dispatch(fetchCountries())
    }, [countries.length, dispatch])

    return (
        <Box height={1} width={1}>
            <Box>
            <Swiper modules={[Navigation]} spaceBetween={10} slidesPerView={5} navigation pagination={{clickable: true}}
                    className={'mySwiper'}>
                {widgets.map(({weather, main, wind, sys, name, icon, id}: WeatherType) => (
                    <SwiperSlide key={id}>
                        <Widget weather={weather} main={main} wind={wind} sys={sys} name={name} icon={icon}/>
                    </SwiperSlide>
                ))}
                <SwiperSlide>
                    <AddCity/>
                </SwiperSlide>
            </Swiper>
            </Box>
        </Box>
    );
};

export default Weather;