<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { findWeatherById } from '@/data/weatherData'

const route = useRoute()
const city = ref(null)

const loadCity = () => {
  city.value = findWeatherById(route.params.cityId) ?? null
}

const temperatureMessage = computed(() => {
  if (!city.value) return ''
  if (city.value.temp >= 25 && city.value.humidity >= 60) return '🫠 습하고 더운 날씨입니다.'
  if (city.value.temp >= 25) return '🔥 더운 날씨입니다.'
  return '❄️ 선선한 날씨입니다.'
})

onMounted(loadCity)
watch(() => route.params.cityId, loadCity)
</script>

<template>
  <main class="view-page">
    <section class="detail-panel">
      <template v-if="city">
        <h1>{{ city.name }} 상세 날씨</h1>
        <p class="status">현재 상태: {{ city.status }}</p>

        <div class="detail-grid">
          <article>
            <span>현재 기온</span>
            <strong>{{ city.temp }}°C</strong>
          </article>
          <article>
            <span>현재 습도</span>
            <strong>{{ city.humidity }}%</strong>
          </article>
        </div>

        <p class="weather-message">{{ temperatureMessage }}</p>
      </template>

      <template v-else>
        <h1>도시 정보를 찾을 수 없습니다.</h1>
        <p class="missing-message">요청한 도시 코드가 날씨 데이터에 없습니다.</p>
      </template>

      <RouterLink class="back-link" to="/">← 메인 대시보드로 돌아가기</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.view-page {
  display: grid;
  place-items: start center;
  padding: 24px 20px 40px;
}

.detail-panel {
  width: min(620px, 100%);
  padding: 38px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(38, 57, 77, 0.08);
}

h1 {
  margin: 0;
  color: #26394d;
  font-size: 28px;
}

.status,
.missing-message {
  margin: 10px 0 24px;
  color: #687b8c;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.detail-grid article {
  padding: 22px;
  border: 1px solid #dfe5ea;
  border-radius: 9px;
  background: #f7f9fa;
}

.detail-grid span,
.detail-grid strong {
  display: block;
}

.detail-grid span {
  margin-bottom: 8px;
  color: #687b8c;
  font-size: 13px;
}

.detail-grid strong {
  color: #26394d;
  font-size: 28px;
}

.weather-message {
  margin: 18px 0 26px;
  padding: 14px;
  border-radius: 7px;
  color: #475d70;
  background: #eef6ff;
  font-weight: 700;
}

.back-link {
  color: #2563eb;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

@media (max-width: 500px) {
  .detail-panel {
    padding: 26px 20px;
  }

  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>
