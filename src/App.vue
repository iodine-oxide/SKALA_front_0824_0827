<script setup>
import { ref } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', humidity: 60 },
  { id: 'city_02', name: '수원', temp: 24, status: '비', humidity: 90 },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', humidity: 70 },
  { id: 'city_04', name: '제주', temp: 22, status: '바람', humidity: 60 },
  { id: 'city_05', name: '판교', temp: 27, status: '구름', humidity: 80 }
])

const searchCity = ref('')
const selectedCity = ref('')

const handleSearchInput = (event) => {
  searchCity.value = event.target.value
}

const selectCity = (cityName) => {
  selectedCity.value = cityName
}

const showDetail = (city) => {
  window.alert(`${city.name}의 현재 날씨는 ${city.status}이고 온도는 ${city.temp}도, 습도는 ${city.humidity}%입니다.`)
}
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
      </section>

      <section class="panel weather-panel">
        <h2>🏙️ 지역별 날씨 현황</h2>

        <article v-for="city in weatherList" :key="city.id" class="weather-card" tabindex="0" @click="selectCity(city.name)" @keydown.enter="selectCity(city.name)">
          <div class="weather-info">
            <h3>{{ city.name }} ({{ city.status }})</h3>
            <p>현재 기온: {{ city.temp }}°C</p>

            <span v-if="city.temp >= 25 && city.humidity >= 60" class ="temperature-label humidhot">🫠 습하고 더움(25도 이상 습도 60 이상)</span>
            <span v-else-if="city.temp >= 25" class="temperature-label hot"> 🔥 더움 (25도 이상) </span>
            <span v-else class="temperature-label cool"> ❄️ 선선함 (25도 미만) </span>
          </div>

          <button type="button" class="detail-button" @click.stop="showDetail(city)">상세보기</button>
        </article>
      </section>

      <div class="status-bar" aria-live="polite">
        <p v-if="selectedCity">{{ selectedCity }}이 선택되었습니다.</p>
        <p v-else>카드를 클릭하거나 검색해 보세요.</p>
      </div>
    </section>
  </main>
</template>
