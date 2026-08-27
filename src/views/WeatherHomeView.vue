<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'
import WeatherStatusBar from '@/components/exercise/WeatherStatusBar.vue'
import { useWeatherStore } from '@/stores/weatherStore'
// import { weatherData } from '@/data/weatherData' 기존 데이터 임포트 방식

const router = useRouter()
const weatherStore = useWeatherStore()
// const weatherList = ref([...weatherData]) 기존 데이터 임포트 방식

const searchCity = ref('')
const selectedCity = ref(null)
const temperatureFilter = ref('all')

const filteredWeatherList = computed(() => {
  const keyword = searchCity.value.trim()
  let result = weatherStore.wheatherList

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
  router.push(`/weather/${city.id}`)
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
      <BaseDashboardCard title="🔍 도시 검색">
        <SearchBar :query="searchCity" :temperature-filter="temperatureFilter" :result-count="visibleCityCount" @update-query="handleSearchInput" @update-filter="updateTemperatureFilter" />
      </BaseDashboardCard>

      <BaseDashboardCard title="🏙️ 지역별 날씨 현황">
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
  min-height: calc(100vh - 136px);
  display: grid;
  place-items: start center;
  padding: 24px 20px 40px;
}

.weather-app {
  width: min(720px, 100%);
  padding: 12px 48px 36px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(38, 57, 77, 0.08);
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
    padding: 6px 18px 22px;
  }
}
</style>
