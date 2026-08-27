import axios from 'axios'

const OPENWEATHER_CURRENT_URL = 'https://api.openweathermap.org/data/2.5/weather'

const getOpenWeatherApiKey = () => import.meta.env.VITE_OPENWEATHER_API_KEY?.trim()

export const isOpenWeatherConfigured = () => Boolean(getOpenWeatherApiKey())

const roundToOneDecimal = (value) => Math.round(value * 10) / 10

const getWeatherErrorMessage = (error) => {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : '날씨 요청 중 알 수 없는 오류가 발생했습니다.'
  }

  const responseMessage = error.response?.data?.message
  if (error.response?.status === 401) return 'OpenWeather API 키가 유효하지 않습니다.'
  if (responseMessage) return `OpenWeather 요청 오류: ${responseMessage}`
  if (!error.response) return 'OpenWeather에 연결하지 못했습니다. 네트워크 상태를 확인해 주세요.'

  return 'OpenWeather 날씨 요청에 실패했습니다.'
}

export const fetchCurrentWeather = async (location) => {
  const apiKey = getOpenWeatherApiKey()

  if (!apiKey) {
    throw new Error('.env.local에 VITE_OPENWEATHER_API_KEY를 입력해 주세요.')
  }

  if (!Number.isFinite(location.latitude) || !Number.isFinite(location.longitude)) {
    throw new Error(`${location.name}의 위도 또는 경도 정보가 올바르지 않습니다.`)
  }

  try {
    const { data } = await axios.get(OPENWEATHER_CURRENT_URL, {
      params: {
        lat: location.latitude,
        lon: location.longitude,
        appid: apiKey,
        units: 'metric',
        lang: 'kr',
      },
    })

    if (!Number.isFinite(data?.main?.temp) || !Number.isFinite(data?.main?.humidity)) {
      throw new Error('OpenWeather 응답에 기온 또는 습도 정보가 없습니다.')
    }

    return {
      temp: roundToOneDecimal(data.main.temp),
      humidity: data.main.humidity,
      status: data.weather?.[0]?.description || '정보 없음',
      feelsLike: Number.isFinite(data.main.feels_like) ? roundToOneDecimal(data.main.feels_like) : null,
      windSpeed: Number.isFinite(data.wind?.speed) ? data.wind.speed : null,
      weatherLoaded: true,
      weatherError: '',
      weatherUpdatedAt: new Date().toISOString(),
    }
  } catch (error) {
    throw new Error(getWeatherErrorMessage(error), { cause: error })
  }
}
