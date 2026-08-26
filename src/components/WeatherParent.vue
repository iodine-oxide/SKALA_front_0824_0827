<script setup>
import { computed, ref, watch, watchEffect } from 'vue'

import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import WeatherStatusBar from './WeatherStatusBar.vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', humidity: 60 },
  { id: 'city_02', name: '수원', temp: 24, status: '비', humidity: 90 },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', humidity: 70 },
  { id: 'city_04', name: '제주', temp: 22, status: '바람', humidity: 60 },
  { id: 'city_05', name: '판교', temp: 27, status: '구름', humidity: 80 },
  { id: 'city_06', name: '수서', temp: 26, status: '맑음', humidity: 40 },
])

const searchCity = ref('')
const selectedCity = ref(null)
const temperatureFilter = ref('all')

const filteredWeatherList = computed(() => {
  const keyword = searchCity.value.trim()
  let result = weatherList.value

  if (keyword) {
    result = result.filter((city) => city.name.includes(keyword))
  }

  if (temperatureFilter.value === 'hot') {
    result = result.filter((city) => city.temp >= 25)
  } else if (temperatureFilter.value === 'cool') {
    result = result.filter((city) => city.temp < 25)
  } else if (temperatureFilter.value === 'humidHot') {
    result = result.filter((city) => city.temp >= 25 && city.humidity >= 60)
  }

  return result
})

const visibleCityCount = computed(() => filteredWeatherList.value.length)

const handleSearchInput = (query) => {
  searchCity.value = query
  selectedCity.value = null
}

const updateTemperatureFilter = (filter) => {
  temperatureFilter.value = filter
  selectedCity.value = null
}

const selectCity = (city) => {
  selectedCity.value = city
}

const showDetail = (city) => {
  window.alert(`${city.name}의 현재 날씨는 ${city.status}이고 온도는 ${city.temp}도, 습도는 ${city.humidity}%입니다.`)
}

watch(selectedCity, (newCity, oldCity) => {
  console.log('선택 도시가 변경되었습니다.')
  console.log('이전 도시:', oldCity?.name ?? '없음')
  console.log('현재 도시:', newCity?.name ?? '없음')
})

watchEffect(() => {
  console.log(`[watchEffect] 현재 검색어 '${searchCity.value}'에 일치하는 도시는 ${filteredWeatherList.value.length}개입니다.`)
})

watch(temperatureFilter, (newFilter, oldFilter) => {
  console.log(`기온 필터 변경: ${oldFilter} → ${newFilter}`)
})
</script>

<template>
  <main class="page-wrap">
    <section class="weather-app">
      <header class="app-header">
        <h1>🌤️ 과제 1, 2, 3: 날씨 (컴포넌트)</h1>
      </header>

      <BaseDashboardCard title="🔍 도시 검색">
        <!--검색 기능을 배경 블럭에 주입-->
        <SearchBar :query="searchCity" :temperature-filter="temperatureFilter" :result-count="visibleCityCount" @update-query="handleSearchInput" @update-filter="updateTemperatureFilter" />
      </BaseDashboardCard>

      <BaseDashboardCard title="🏙️ 지역별 날씨 현황">
        <!--검색, 필터링된 지역별 날씨 카드를 배경 블럭에 주입 -->
        <template v-if="filteredWeatherList.length > 0">
          <WeatherCard v-for="city in filteredWeatherList" :key="city.id" :city="city" @select-card="selectCity" @click-detail="showDetail" />
        </template>

        <div v-else class="empty-result">
          <p>
            <strong>'{{ searchCity }}'</strong>와 일치하는 도시가 없습니다.
          </p>
        </div>
      </BaseDashboardCard>

      <WeatherStatusBar :selected-city="selectedCity" :search-city="searchCity" :result-count="visibleCityCount" />
    </section>
  </main>
</template>

<style scoped>
.page-wrap {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 40px 20px;
}

.weather-app {
  width: min(720px, 100%);
  padding: 44px 48px 36px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(38, 57, 77, 0.08);
}

.app-header {
  padding-bottom: 20px;
  border-bottom: 1px solid #dfe5ea;
}

.app-header h1 {
  margin: 0;
  color: #26394d;
  font-size: 26px;
}

.empty-result {
  margin-top: 12px;
  padding: 28px 18px;
  border: 1px dashed #c6d0d8;
  border-radius: 7px;
  color: #687b8c;
  background: #fff;
  text-align: center;
  font-size: 14px;
}

.empty-result p {
  margin: 0;
}

@media (max-width: 600px) {
  .page-wrap {
    padding: 20px 12px;
  }

  .weather-app {
    padding: 28px 18px 22px;
  }

  .app-header h1 {
    font-size: 21px;
  }
}
</style>
