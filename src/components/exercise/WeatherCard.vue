<script setup>
import { computed } from 'vue'

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

const displayTemp = computed(() => {
  const rawTemp = props.city.temp

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }

  return rawTemp
})
</script>

<template>
  <article class="weather-card" tabindex="0" @click="emit('select-card', city)" @keydown.enter="emit('select-card', city)" @keydown.space.prevent="emit('select-card', city)">
    <div class="weather-info">
      <h3>{{ city.name }} ({{ city.status }})</h3>
      <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>
      <p>현재 습도: {{ city.humidity }}%</p>

      <span v-if="city.temp >= 25 && city.humidity >= 60" class="temperature-label humidhot">🫠 습하고 더움(25도 이상 습도 60 이상)</span>
      <span v-else-if="city.temp >= 25" class="temperature-label hot">🔥 더움 (25도 이상)</span>
      <span v-else class="temperature-label cool">❄️ 선선함 (25도 미만)</span>
    </div>

    <button type="button" class="detail-button" @click.stop="emit('click-detail', city)">상세보기</button>
  </article>
</template>

<style scoped>
.weather-card {
  min-height: 116px;
  margin-top: 12px;
  padding: 18px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  border: 1px solid #d7dde2;
  border-radius: 7px;
  outline: none;
  background: #fff;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.weather-card:hover,
.weather-card:focus-visible {
  border-color: #8cb9dd;
  box-shadow: 0 4px 12px rgba(38, 57, 77, 0.08);
}

.weather-info h3 {
  margin: 0 0 7px;
  color: #425466;
  font-size: 15px;
}

.weather-info p {
  margin: 0 0 8px;
  color: #536677;
  font-size: 14px;
}

.temperature-label {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.temperature-label.hot {
  background: #ff6266;
}

.temperature-label.humidhot {
  background: #ff5100;
}

.temperature-label.cool {
  background: #64adf5;
}

.detail-button {
  padding: 9px 13px;
  border: 1px solid #8b9298;
  border-radius: 2px;
  color: #425466;
  background: #fff;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.detail-button:hover {
  background: #f1f4f6;
}

@media (max-width: 600px) {
  .weather-card {
    min-height: auto;
    padding: 15px;
  }

  .detail-button {
    flex: 0 0 auto;
  }
}
</style>
