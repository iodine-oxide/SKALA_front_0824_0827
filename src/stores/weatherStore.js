// 여러 뷰에서 직접적으로 weather data를 사용하는 것을 store로 분배
import {defineStore} from 'pinia'
import { weatherData } from '@/data/weatherData'

export const useWeatherStore = defineStore('weather', {
    state: () => ({
        weatherList: [...weatherData]
    }),

    getters: {
        findById: (state) => {
            return (cityId) => state.weatherList.find((city) => city.id === cityId)
        },
        stats: (state) => ({
            total: state.weatherList.length,
            hot: state.weatherList.filter((city) => city.temp >=25).length,
            cool: state.weatherList.filter((city) => city.temp <25).length,
            humidhot: state.weatherList.filter((city) => city.temp >=25 && city.humidity >= 60).length,
        }),
    },
})