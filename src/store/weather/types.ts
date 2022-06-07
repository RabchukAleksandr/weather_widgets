import {useSelector} from "react-redux";
import {RootState} from "../index";

export type InitialState = {
    widgets: Weather[]
    countries: Country[]
    status: string | null
    error: any
}

export type Weather = {
    weather: Array<{
        main: string
        description: string
    }>
    main: {
        temp: string
    }
    wind: {
        speed: number
        deg:number
    }
    sys: {
      sunrise: number
      sunshine: number
    }
    name: string
    icon:string
}

export type Coords = {
    lat: number
    lon: number
}

export type Country = {
    iso3: string
    country: string
    cities: string[]
}
