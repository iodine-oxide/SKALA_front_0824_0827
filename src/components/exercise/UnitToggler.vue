<script setup>
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span>날씨 단위: {{ configStore.unitLabel }}({{ configStore.unitSymbol }})</span>
    <button type="button" @click="configStore.toggleUnit">단위 변경</button>
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

.unit-toggler button {
  padding: 8px 10px;
  border: 0;
  border-radius: 6px;
  color: #fff;
  background: #475d70;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.unit-toggler button:hover {
  background: #30475a;
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
