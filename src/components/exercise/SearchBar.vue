<script setup>
import { Search } from '@element-plus/icons-vue'

defineProps({
  query: {
    type: String,
    default: '',
  },
  temperatureFilter: {
    type: String,
    default: 'all',
  },
  resultCount: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['update-query', 'update-filter'])

const filterOptions = [
  { label: '전체 도시', value: 'all' },
  { label: '선선한 도시', value: 'cool' },
  { label: '습하고 더운 도시', value: 'humidHot' },
  { label: '더운 도시', value: 'hot' },
]
</script>

<template>
  <div class="search-bar">
    <ElInput
      :model-value="query"
      :prefix-icon="Search"
      aria-label="목록에서 검색할 도시 이름"
      clearable
      placeholder="검색할 도시 이름 입력"
      size="large"
      @update:model-value="emit('update-query', $event)"
    />

    <p>
      검색 중인 도시:
      <strong>{{ query || '없음' }}</strong>
    </p>

    <div class="search-options">
      <div class="filter-section">
        <p class="filter-title">도시 필터</p>
        <ElSegmented :model-value="temperatureFilter" :options="filterOptions" aria-label="기온별 도시 필터" @change="emit('update-filter', $event)" />
      </div>

      <ElTag type="info" effect="plain" round aria-live="polite">검색 결과 {{ resultCount }}개</ElTag>
    </div>
  </div>
</template>

<style scoped>
.search-bar > p {
  min-height: 20px;
  margin: 8px 0 0;
  color: #536677;
  font-size: 14px;
}

.search-bar strong {
  color: var(--el-color-primary);
}

.search-options {
  margin-top: 14px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
}

.filter-section {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-title {
  margin: 0;
  color: #536677;
  font-size: 14px;
  font-weight: 700;
}

.filter-section :deep(.el-segmented) {
  --el-segmented-item-selected-bg-color: var(--el-color-primary);
  --el-segmented-item-selected-color: #fff;
  max-width: 100%;
}

@media (max-width: 680px) {
  .search-options {
    align-items: flex-start;
    flex-direction: column;
  }

  .filter-section {
    width: 100%;
  }

  .filter-section :deep(.el-segmented) {
    width: 100%;
  }

  .filter-section :deep(.el-segmented__group) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
