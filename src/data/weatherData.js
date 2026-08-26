export const weatherData = [
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', humidity: 60 },
  { id: 'city_02', name: '수원', temp: 24, status: '비', humidity: 90 },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', humidity: 70 },
  { id: 'city_04', name: '제주', temp: 22, status: '바람', humidity: 60 },
  { id: 'city_05', name: '판교', temp: 27, status: '구름', humidity: 80 },
  { id: 'city_06', name: '수서', temp: 26, status: '맑음', humidity: 40 },
]

export const findWeatherById = (cityId) => weatherData.find((city) => city.id === cityId)
