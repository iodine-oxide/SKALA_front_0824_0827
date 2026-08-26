<script setup>
defineProps({
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
</script>

<template>
  <div class="status-bar" aria-live="polite">
    <p v-if="selectedCity">{{ selectedCity.name }}이 선택되었습니다.</p>
    <p v-else-if="searchCity">'{{ searchCity }}'에 대한 검색 결과가 {{ resultCount }}개 있습니다.</p>
    <p v-else>카드를 클릭하거나 검색해 보세요.</p>
  </div>
</template>

<style scoped>
.status-bar {
  margin-top: 18px;
  padding: 14px 18px;
  border-radius: 7px;
  color: #288a4d;
  background: #eaf8ed;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
}

.status-bar p {
  margin: 0;
}
</style>
