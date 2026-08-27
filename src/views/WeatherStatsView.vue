<script setup>
// import { computed } from 'vue'

// import { weatherData } from '@/data/weatherData'

// const stats = computed(() => ({
//   total: weatherData.length,
//   hot: weatherData.filter((city) => city.temp >= 25).length,
//   cool: weatherData.filter((city) => city.temp < 25).length,
//   humidHot: weatherData.filter((city) => city.temp >= 25 && city.humidity >= 60).length, // 각 환경애 있는 도시수와 총 도시수를 통계로 제공
// }))
// 기존 데이터 임포트 방식

import { useWeatherStore } from '@/stores/weatherStore' // Store 사용으로 변경

const weatherStore = useWeatherStore()
</script>

<template>
  <main class="view-page">
    <section class="stats-panel">
      <h1>도시 날씨 통계</h1>

      <div class="stats-grid">
        <article>
          <span>전체 도시</span><strong>{{ weatherStore.stats.total }}</strong>
        </article>
        <article>
          <span>더운 도시</span><strong>{{ weatherStore.stats.hot }}</strong>
        </article>
        <article>
          <span>선선한 도시</span><strong>{{ weatherStore.stats.cool }}</strong>
        </article>
        <article>
          <span>습하고 더운 도시</span><strong>{{ weatherStore.stats.humidHot }}</strong>
        </article>
      </div>

      <RouterLink to="/">← 메인 대시보드로 돌아가기</RouterLink>
      <!--메인페이지 복귀 라우터 링크-->
    </section>
  </main>
</template>

<style scoped>
.view-page {
  display: grid;
  place-items: start center;
  padding: 24px 20px 40px;
}

.stats-panel {
  width: min(720px, 100%);
  padding: 38px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(38, 57, 77, 0.08);
}

h1 {
  margin: 0 0 24px;
  color: #26394d;
  font-size: 28px;
}

.stats-grid {
  margin-bottom: 26px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.stats-grid article {
  padding: 22px;
  border: 1px solid #dfe5ea;
  border-radius: 9px;
  background: #f7f9fa;
}

.stats-grid span,
.stats-grid strong {
  display: block;
}

.stats-grid span {
  margin-bottom: 8px;
  color: #687b8c;
  font-size: 13px;
}

.stats-grid strong {
  color: #2563eb;
  font-size: 30px;
}

a {
  color: #2563eb;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

@media (max-width: 500px) {
  .stats-panel {
    padding: 26px 20px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
