<script setup>
import { computed, ref, watch, watchEffect } from 'vue'

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

const handleSearchInput = (event) => {
  searchCity.value = event.target.value
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
        <h1>🌤️ 과제 1: 날씨 (Mockup)</h1>
      </header>

      <section class="panel search-panel">
        <h2>🔍 도시 검색</h2>
        <input type="text" placeholder="검색할 도시 이름 입력" :value="searchCity" @input="handleSearchInput" />
        <p>
          검색 중인 도시:
          <strong>{{ searchCity }}</strong>
        </p>

        <div class="search-options">
          <div class="filter-section">
            <p class="filter-title">도시 필터</p>

            <div class="radio-group" role="radiogroup" aria-label="기온별 도시 필터">
              <label>
                <input v-model="temperatureFilter" type="radio" name="temperature-filter" value="all" />
                전체 도시
              </label>
              <label>
                <input v-model="temperatureFilter" type="radio" name="temperature-filter" value="cool" />
                선선한 도시
              </label>
              <label>
                <input v-model="temperatureFilter" type="radio" name="temperature-filter" value="humidHot" />
                습하고 더운 도시
              </label>
              <label>
                <input v-model="temperatureFilter" type="radio" name="temperature-filter" value="hot" />
                더운 도시
              </label>
            </div>
          </div>
          <span>검색 결과: {{ visibleCityCount }}개</span>
        </div>
      </section>

      <section class="panel weather-panel">
        <h2>🏙️ 지역별 날씨 현황</h2>

        <template v-if="filteredWeatherList.length > 0">
          <article
            v-for="city in filteredWeatherList"
            :key="city.id"
            class="weather-card"
            tabindex="0"
            @click="selectCity(city)"
            @keydown.enter="selectCity(city)"
            @keydown.space.prevent="selectCity(city)"
          >
            <div class="weather-info">
              <h3>{{ city.name }} ({{ city.status }})</h3>
              <p>현재 기온: {{ city.temp }}°C</p>
              <p>현재 습도: {{ city.humidity }}%</p>

              <span v-if="city.temp >= 25 && city.humidity >= 60" class="temperature-label humidhot">🫠 습하고 더움(25도 이상 습도 60 이상)</span>
              <span v-else-if="city.temp >= 25" class="temperature-label hot"> 🔥 더움 (25도 이상) </span>
              <span v-else class="temperature-label cool"> ❄️ 선선함 (25도 미만) </span>
            </div>

            <button type="button" class="detail-button" @click.stop="showDetail(city)">상세보기</button>
          </article>
        </template>

        <div v-else class="empty-result">
          <p>
            <strong>'{{ searchCity }}'</strong>와 일치하는 도시가 없습니다.
          </p>
        </div>
      </section>

      <div class="status-bar" aria-live="polite">
        <p v-if="selectedCity">{{ selectedCity.name }}이 선택되었습니다.</p>
        <p v-else-if="searchCity">'{{ searchCity }}'에 대한 검색 결과가 {{ filteredWeatherList.length }}개 있습니다.</p>
        <p v-else>카드를 클릭하거나 검색해 보세요.</p>
      </div>
    </section>
  </main>
</template>
