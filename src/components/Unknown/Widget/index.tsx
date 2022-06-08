import React from 'react';
import {Box, Grid, Typography} from '@mui/material'
import {deleteWidget} from '../../../store/weather'

import CloseIcon from '@mui/icons-material/Close';
import {Weather} from "../../../store/weather/types";
import {ReactComponent as Wind} from '../../../assets/icons/wind.svg'
import {ReactComponent as Sunset} from '../../../assets/icons/sunset.svg'
import {ReactComponent as Sunrise} from '../../../assets/icons/sunrise.svg'

import styles from './styles.module.css'
import {useAppDispatch} from "../../../store";

type WidgetProps = {} & Weather
const Widget: React.FC<WidgetProps> = ({weather, main, wind, sys, name, icon,id, home}) => {
    const dispatch = useAppDispatch()
    const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})
    const sunset = new Date(sys.sunset * 1000).toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})
    const today = new Date().toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    })

    const handleDeletion = () => {
        dispatch(deleteWidget({id}))
    }

    return (
        <Box padding={4} display={'flex'} flexDirection={'column'} border={'2px solid black'} borderRadius={2} width={'inherit'} position={'relative'} bgcolor={home ? 'olivedrab' : ''}>
            <Box position={'absolute'} top={5} right={5} className={styles.close} onClick={handleDeletion}><CloseIcon/></Box>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} mb={2}>
                <Box><Typography variant={'h5'} >{name}, {sys.country}</Typography></Box>
                <Box textAlign={'center'}><Typography variant={'subtitle2'}>{today}</Typography></Box>
            </Box>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} borderBottom={'1px solid black'} flexDirection={'column'} pb={2}>
                <Box className={styles.image}>
                    <img src={icon} alt="img"/>
                </Box>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                    <Typography variant={'h3'} whiteSpace={'nowrap'}>{Math.round(main.temp - 273.15)}° C</Typography>
                    <Typography>{weather[0].main}</Typography>
                </Box>
            </Box>
            <Grid container mt={2}>
                <Grid item xs={4} display={'flex'} justifyContent={'centre'} alignItems={'center'} flexDirection={'column'}>
                    <Typography>{sunrise}</Typography>
                     <Box className={styles.icon}><Sunrise/></Box>
                </Grid>
                <Grid item xs={4} display={'flex'} justifyContent={'centre'}  alignItems={'center'} flexDirection={'column'} justifySelf={'center'}>
                    <Typography>{sunset}</Typography>
                    <Box className={styles.icon}><Sunset/></Box>
                </Grid>
                <Grid item xs={4} display={'flex'} justifyContent={'centre'}  alignItems={'center'} flexDirection={'column'}>
                    <Typography>{wind.speed}</Typography>
                    <Box className={styles.icon}><Wind/></Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Widget;