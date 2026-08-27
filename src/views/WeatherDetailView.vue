<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Back } from '@element-plus/icons-vue'

// import { weatherData } from '@/data/weatherData' 기존 데이터 임포트 방식

import { useConfigStore } from '@/stores/configStore'
import { useWeatherStore } from '@/stores/weatherStore' //기존 데이터 임포트에서 Store로 변경

const route = useRoute()
const configStore = useConfigStore()
const weatherStore = useWeatherStore()
const city = computed(() => weatherStore.findById(route.params.cityId) ?? null)
const hasWeather = computed(() => Number.isFinite(city.value?.temp) && Number.isFinite(city.value?.humidity))

const temperatureMessage = computed(() => {
  if (!hasWeather.value) return '아직 불러온 날씨가 없습니다. 메인 화면에서 전체 날씨 새로고침을 눌러 주세요.'
  if (city.value.temp >= 25 && city.value.humidity >= 60) return '🫠 습하고 더운 날씨입니다.'
  if (city.value.temp >= 25) return '🔥 더운 날씨입니다.'
  return '❄️ 선선한 날씨입니다.'
})

const displayTemp = computed(() => configStore.convertTemperature(city.value?.temp))
const displayFeelsLikeTemp = computed(() => configStore.convertTemperature(city.value?.feelsLike))
</script>

<template>
  <main class="view-page">
    <ElCard class="detail-panel" shadow="never">
      <template #header>
        <div v-if="city" class="detail-heading">
          <div>
            <h1>{{ city.name }} 상세 날씨</h1>
            <p v-if="city.fullName" class="location-name">{{ city.fullName }}</p>
          </div>
          <ElTag type="info" effect="plain">{{ city.status }}</ElTag>
        </div>
        <h1 v-else>도시 정보</h1>
      </template>

      <template v-if="city">
        <ElDescriptions v-if="hasWeather" :column="2" border>
          <ElDescriptionsItem label="현재 기온">
            <strong class="weather-value">{{ displayTemp }}{{ configStore.unitSymbol }}</strong>
          </ElDescriptionsItem>
          <ElDescriptionsItem label="현재 습도">
            <strong class="weather-value">{{ city.humidity }}%</strong>
          </ElDescriptionsItem>
          <ElDescriptionsItem label="현재 체감 온도" :span="2">
            <strong v-if="displayFeelsLikeTemp !== null" class="weather-value">{{ displayFeelsLikeTemp }}{{ configStore.unitSymbol }}</strong>
            <ElTag v-else type="info" effect="plain">미조회</ElTag>
          </ElDescriptionsItem>
        </ElDescriptions>

        <ElAlert class="weather-message" :title="temperatureMessage" type="info" :closable="false" show-icon />
        <ElAlert v-if="city.weatherError" class="api-error" :title="city.weatherError" type="error" :closable="false" show-icon />
      </template>

      <ElEmpty v-else description="요청한 도시 코드가 날씨 데이터에 없습니다." :image-size="120" />

      <RouterLink to="/" custom v-slot="{ navigate }">
        <ElButton type="primary" plain :icon="Back" @click="navigate">메인 대시보드로 돌아가기</ElButton>
      </RouterLink>
    </ElCard>
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
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(38, 57, 77, 0.08);
}

.detail-panel :deep(.el-card__header) {
  padding: 28px 32px 20px;
}

.detail-panel :deep(.el-card__body) {
  padding: 26px 32px 32px;
}

.detail-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.detail-panel h1 {
  margin: 0;
  color: #26394d;
  font-size: 28px;
}

.location-name {
  margin: 8px 0 0;
  color: #687b8c;
  font-size: 13px;
}

.weather-value {
  color: #26394d;
  font-size: 20px;
}

.weather-message {
  margin: 18px 0 14px;
}

.api-error {
  margin-bottom: 14px;
}

@media (max-width: 500px) {
  .detail-panel :deep(.el-card__header) {
    padding: 22px 20px 16px;
  }

  .detail-panel :deep(.el-card__body) {
    padding: 20px;
  }

  .detail-heading {
    flex-direction: column;
  }
}
</style>
