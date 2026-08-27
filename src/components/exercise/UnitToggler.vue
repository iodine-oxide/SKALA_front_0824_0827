<script setup>
import { computed } from 'vue'

import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()

const useFahrenheit = computed({
  get: () => configStore.unit === 'fahrenheit',
  set: (value) => {
    const nextUnit = value ? 'fahrenheit' : 'celsius'
    if (configStore.unit !== nextUnit) configStore.toggleUnit()
  },
})
</script>

<template>
  <div class="unit-toggler">
    <span>날씨 단위: {{ configStore.unitLabel }}</span>
    <ElSwitch v-model="useFahrenheit" inline-prompt active-text="°F" inactive-text="°C" aria-label="섭씨와 화씨 단위 전환" />
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 12px;
  border-left: 1px solid #d7e1e8;
  white-space: nowrap;
}

.unit-toggler > span {
  color: #687b8c;
  font-size: 12px;
  font-weight: 700;
}

@media (max-width: 680px) {
  .unit-toggler {
    width: 100%;
    justify-content: center;
    padding: 10px 0 0;
    border-top: 1px solid #d7e1e8;
    border-left: 0;
  }
}
</style>
