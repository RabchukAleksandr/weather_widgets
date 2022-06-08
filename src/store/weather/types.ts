export type InitialState = {
    widgets: Weather[]
    countries: Country[]
    status: string | null
    error: any
}

export type Weather = {
    weather: Array<{
        main: string
    }>
    id:string
    main: {
        temp: number
    }
    wind: {
        speed: number
    }
    sys: {
        sunrise: number
        sunset: number
        country: string
    }
    name: string
    icon: string
    home: boolean
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
