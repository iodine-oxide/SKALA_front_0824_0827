<script setup>
import { computed } from 'vue'
import { View } from '@element-plus/icons-vue'

import { useConfigStore } from '@/stores/configStore'

// 각 도시별 정보 카드(블럭)용 컴포넌트
const props = defineProps({
  city: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])
const configStore = useConfigStore()
const hasWeather = computed(() => Number.isFinite(props.city.temp) && Number.isFinite(props.city.humidity))
const displayTemp = computed(() => configStore.convertTemperature(props.city.temp))
const displayFeelsLikeTemp = computed(() => configStore.convertTemperature(props.city.feelsLike))
</script>

<template>
  <ElCard class="weather-card" shadow="hover" tabindex="0" @click="emit('select-card', city)" @keydown.enter.self="emit('select-card', city)" @keydown.space.self.prevent="emit('select-card', city)">
    <div class="weather-info">
      <h3>
        {{ city.name }}
        <ElTag type="info" effect="plain" size="small">{{ city.status }}</ElTag>
      </h3>
      <small v-if="city.fullName && city.fullName !== city.name" class="location-name">{{ city.fullName }}</small>

      <template v-if="hasWeather">
        <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
        <p>
          체감 온도:
          <template v-if="displayFeelsLikeTemp !== null">{{ displayFeelsLikeTemp }}{{ configStore.unitSymbol }}</template>
          <template v-else>미조회</template>
        </p>
        <p>현재 습도: {{ city.humidity }}%</p>

        <ElTag v-if="city.temp >= 25 && city.humidity >= 60" type="danger" effect="dark">🫠 습하고 더움</ElTag>
        <ElTag v-else-if="city.temp >= 25" type="warning" effect="dark">🔥 더움</ElTag>
        <ElTag v-else type="primary" effect="dark">❄️ 선선함</ElTag>
      </template>

      <p v-else class="not-loaded">날씨 정보가 없습니다. 전체 날씨 새로고침을 눌러 주세요.</p>
      <p v-if="city.weatherError" class="weather-error">{{ city.weatherError }}</p>
    </div>

    <ElButton type="primary" plain :icon="View" class="detail-button" @click.stop="emit('click-detail', city)">상세보기</ElButton>
  </ElCard>
</template>

<style scoped>
.weather-card {
  margin-top: 12px;
  border-radius: 7px;
  cursor: pointer;
}

.weather-card :deep(.el-card__body) {
  min-height: 116px;
  padding: 18px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.weather-card:focus-visible {
  outline: none;
  border-color: #8cb9dd;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.16);
}

.weather-info h3 {
  margin: 0 0 7px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;
  color: #425466;
  font-size: 15px;
}

.location-name {
  display: block;
  margin: -2px 0 8px;
  color: #7b8a98;
  font-size: 12px;
}

.weather-info p {
  margin: 0 0 8px;
  color: #536677;
  font-size: 14px;
}

.weather-info .not-loaded {
  max-width: 390px;
  margin-top: 10px;
  color: #687b8c;
  line-height: 1.5;
}

.weather-info .weather-error {
  max-width: 390px;
  margin-top: 8px;
  color: #c43d42;
  font-size: 12px;
  line-height: 1.45;
}

.detail-button {
  flex: 0 0 auto;
}

@media (max-width: 600px) {
  .weather-card :deep(.el-card__body) {
    min-height: auto;
    padding: 15px;
  }

  .detail-button {
    flex: 0 0 auto;
  }
}
</style>
