import {createAsyncThunk, createSlice, SerializedError, PayloadAction, StateFromReducersMapObject} from '@reduxjs/toolkit';
import {Coords, InitialState, Weather} from "./types";
import {useAppDispatch} from "../index";

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async function (coords: Coords, {rejectWithValue}){
        try{
            const {lat, lon} = coords
            const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)

            if (!weather.ok) {
                throw new Error('Server Error!');
            }

            return await weather.json()

        }catch(error: any){
            return rejectWithValue(error.message)
        }
    },
)


export const fetchCountries = createAsyncThunk(
    'weather/fetchCountries',
    async function (_, {rejectWithValue}){
        try{
            const response = await fetch('https://countriesnow.space/api/v0.1/countries')

            if (!response.ok) {
                throw new Error('Server Error!');
            }

            return await response.json();

        }catch(error: any){
            return rejectWithValue(error.message)
        }
    },
)



export const initialState = {
    widgets: [],
    countries: [],
    status: null,
    error: null
} as InitialState

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchWeather.fulfilled,  (state, {payload}) => {
            state.widgets.push({...payload,icon:`http://openweathermap.org/img/wn/${payload.weather[0].icon}.png`})
            state.status = 'loaded'
        })
        builder.addCase(fetchWeather.rejected, (state, action) => {
            state.error = action.payload
            state.status = 'rejected'
        })
        builder.addCase(fetchCountries.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchCountries.fulfilled, (state, {payload}) => {
            state.countries = payload.data
            state.status = 'loaded'
        })
        builder.addCase(fetchCountries.rejected, (state, action) => {
            state.error = action.payload
            state.status = 'rejected'
        })
    }
})

export const {} = weatherSlice.actions

export default weatherSlice.reducer