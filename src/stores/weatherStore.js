import { defineStore } from 'pinia'

import { weatherData } from '@/data/weatherData'
import { fetchCurrentWeather, isOpenWeatherConfigured } from '@/services/weatherApi'

const createWeatherList = () => weatherData.map((city) => ({ ...city }))

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    weatherList: createWeatherList(),
    isRefreshing: false,
    refreshError: '',
    refreshMessage: '',
    lastUpdated: null,
  }),
// 온,습도에 따라서 분류
  getters: {
    findById: (state) => (cityId) => state.weatherList.find((city) => city.id === cityId),
    stats: (state) => {
      const loadedCities = state.weatherList.filter((city) => Number.isFinite(city.temp))

      return {
        total: state.weatherList.length,
        hot: loadedCities.filter((city) => city.temp >= 25).length,
        cool: loadedCities.filter((city) => city.temp < 25).length,
        humidHot: loadedCities.filter((city) => city.temp >= 25 && city.humidity >= 60).length,
      }
    },
  },
// 도시 추가
  actions: {
    addLocation(location) {
      const duplicate = this.weatherList.find(
        (city) =>
          (location.adminCode && city.adminCode === location.adminCode) ||
          (location.fullName && city.fullName === location.fullName) ||
          (city.name === location.name && city.latitude === location.latitude && city.longitude === location.longitude),
      )

      if (duplicate) {
        return { added: false, city: duplicate, message: `${duplicate.fullName || duplicate.name}은(는) 이미 목록에 있습니다.` }
      }

      const city = {
        ...location,
        temp: null,
        humidity: null,
        status: '날씨 미조회',
        feelsLike: null,
        windSpeed: null,
        weatherLoaded: false,
        weatherError: '',
        weatherUpdatedAt: null,
      }

      this.weatherList.push(city)
      return { added: true, city, message: `${city.fullName || city.name}을(를) 목록에 추가했습니다.` }
    },

    async refreshWeatherList() {
      if (this.isRefreshing) return null

      this.refreshError = ''
      this.refreshMessage = ''

      if (!isOpenWeatherConfigured()) {
        this.refreshError = '.env.local에 VITE_OPENWEATHER_API_KEY를 입력한 뒤 개발 서버를 다시 시작해 주세요.'
        return null
      }

      this.isRefreshing = true
      const targets = [...this.weatherList]

      try {
        const results = await Promise.allSettled(
          targets.map(async (city) => ({
            id: city.id,
            weather: await fetchCurrentWeather(city),
          })),
        )

        let successCount = 0
        let failureCount = 0

        results.forEach((result, index) => {
          const cityId = targets[index].id
          const city = this.weatherList.find((item) => item.id === cityId)
          if (!city) return

          if (result.status === 'fulfilled') {
            Object.assign(city, result.value.weather)
            successCount += 1
            return
          }

          city.weatherError = result.reason instanceof Error ? result.reason.message : '날씨 갱신에 실패했습니다.'
          failureCount += 1
        })

        if (successCount > 0) {
          this.lastUpdated = new Date().toISOString()
          this.refreshMessage = `${successCount}개 도시의 날씨를 갱신했습니다.`
        }

        if (failureCount > 0) {
          this.refreshError = `${failureCount}개 도시의 날씨를 갱신하지 못했습니다. 각 카드의 오류 내용을 확인해 주세요.`
        }

        return { successCount, failureCount }
      } finally {
        this.isRefreshing = false
      }
    },
  },
})
