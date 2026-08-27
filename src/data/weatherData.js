// 기본 설정 지역 및 위도 경도 정보
export const weatherData = [
  { id: 'city_01', name: '서울', fullName: '서울특별시', latitude: 37.5665, longitude: 126.978, temp: 28, status: '맑음', humidity: 60 },
  { id: 'city_02', name: '수원', fullName: '경기도 수원시', latitude: 37.2636, longitude: 127.0286, temp: 24, status: '비', humidity: 90 },
  { id: 'city_03', name: '부산', fullName: '부산광역시', latitude: 35.1796, longitude: 129.0756, temp: 26, status: '구름', humidity: 70 },
  { id: 'city_04', name: '제주', fullName: '제주특별자치도 제주시', latitude: 33.4996, longitude: 126.5312, temp: 22, status: '바람', humidity: 60 },
  { id: 'city_05', name: '판교', fullName: '경기도 성남시 분당구 판교동', latitude: 37.3947, longitude: 127.1112, temp: 27, status: '구름', humidity: 80 },
  { id: 'city_06', name: '수서', fullName: '서울특별시 강남구 수서동', latitude: 37.4875, longitude: 127.1013, temp: 26, status: '맑음', humidity: 40 },
].map((city) => ({
  ...city,
  weatherLoaded: true,
  weatherError: '',
  weatherUpdatedAt: null,
}))

export const findWeatherById = (cityId) => weatherData.find((city) => city.id === cityId)
