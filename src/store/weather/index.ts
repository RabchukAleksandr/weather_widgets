import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Coords, InitialState, Weather} from "./types";

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async function ({coords,home}:{coords:Coords,home:boolean}, {rejectWithValue,fulfillWithValue}){
        try{
            const {lat, lon} = coords
            const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)

            if (!weather.ok) {
                throw new Error('Server Error!');
            }
            const data = await weather.json() as Weather
            return fulfillWithValue({...data,home:home})

        }catch(error: any){
            return rejectWithValue(error.message)
        }
    },
)

export const fetchCityLocation = createAsyncThunk(
    'weather/fetchCityLocation',
    async function (city: string, {rejectWithValue,dispatch}){
        try{

            const location = await fetch(`https://geocode.xyz/${city}?json=1`)

            if (!location.ok) {
                throw new Error('Server Error!');
            }
            const {latt,longt} = await location.json()
            dispatch(fetchWeather({coords: {lat: latt, lon: longt},home:false}))
            return await location.json()

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
        deleteWidget: ((state, action) => {
           state.widgets = state.widgets.filter((widget) => widget.id !== action.payload.id)
        })
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchWeather.fulfilled,  (state, {payload}) => {
            // @ts-ignore
            if(payload.home){
                // @ts-ignore
                state.widgets.unshift({...payload,icon:`http://openweathermap.org/img/wn/${payload.weather[0].icon}.png`})
            }else {
                // @ts-ignore
                state.widgets.push({...payload,icon:`http://openweathermap.org/img/wn/${payload.weather[0].icon}.png`})
            }
            state.status = 'loaded'
        })
        builder.addCase(fetchWeather.rejected, (state, action) => {
            state.error = action.payload
            alert(action.payload)
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
            alert(action.payload)
            state.status = 'rejected'
        })
        builder.addCase(fetchCityLocation.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchCityLocation.fulfilled, (state, {payload}) => {
            console.log(payload)
            state.status = 'loaded'
        })
        builder.addCase(fetchCityLocation.rejected, (state, action) => {
            state.error = action.payload
            alert(action.payload)
            state.status = 'rejected'
        })
    }
})

export const {deleteWidget} = weatherSlice.actions

export default weatherSlice.reducer