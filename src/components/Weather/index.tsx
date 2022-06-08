import React, {useEffect} from 'react';

import {usePosition} from "use-position";
import {Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';

import  {fetchWeather, fetchCountries} from "../../store/weather";
import {useAppDispatch, useAppSelector} from "../../store";
import {Weather as WeatherType} from "../../store/weather/types";

import {Box} from "@mui/material";

import Widget from "../Unknown/Widget";
import AddCity from "../Unknown/AddCity";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
            dispatch(fetchWeather({coords: {lat: latitude, lon: longitude}, home:true}))
        }
    }, [latitude, longitude, dispatch, widgets.length])

    useEffect(() => {
        if (countries.length === 0) dispatch(fetchCountries())
    }, [countries.length, dispatch])

    return (
        <Box height={1} width={1}>
            <Box>
            <Swiper modules={[Navigation, Pagination]} spaceBetween={10} slidesPerView={5} navigation slidesPerGroup={5} pagination={{clickable: true, }}
                    className={'mySwiper'}>
                {widgets.map(({weather, main, wind, sys, name, icon, id, home}: WeatherType) => (
                    <SwiperSlide key={id}>
                        <Widget weather={weather} main={main} wind={wind} sys={sys} name={name} icon={icon} id={id} home={home}/>
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