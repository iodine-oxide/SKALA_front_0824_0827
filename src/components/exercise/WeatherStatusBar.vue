<script setup>
import { computed } from 'vue'

const props = defineProps({
  selectedCity: {
    type: Object,
    default: null,
  },
  searchCity: {
    type: String,
    default: '',
  },
  resultCount: {
    type: Number,
    default: 0,
  },
})

const statusText = computed(() => {
  if (props.selectedCity) return `${props.selectedCity.name}이 선택되었습니다.`
  if (props.searchCity) return `'${props.searchCity}'에 대한 검색 결과가 ${props.resultCount}개 있습니다.`
  return '카드를 클릭하거나 검색해 보세요.'
})
</script>

<template>
  <ElAlert class="status-bar" :title="statusText" type="success" :closable="false" show-icon center aria-live="polite" />
</template>

<style scoped>
.status-bar {
  margin-top: 18px;
}
</style>
