<script setup>
import { Back } from '@element-plus/icons-vue'

import { useWeatherStore } from '@/stores/weatherStore'

const weatherStore = useWeatherStore()

const statisticItems = [
  { key: 'total', title: '전체 도시' },
  { key: 'hot', title: '더운 도시' },
  { key: 'cool', title: '선선한 도시' },
  { key: 'humidHot', title: '습하고 더운 도시' },
]
</script>

<template>
  <main class="view-page">
    <ElCard class="stats-panel" shadow="never">
      <template #header>
        <h1>도시 날씨 통계</h1>
      </template>

      <ElRow :gutter="14" class="stats-grid">
        <ElCol v-for="item in statisticItems" :key="item.key" :xs="24" :sm="12">
          <div class="statistic-card">
            <ElStatistic :title="item.title" :value="weatherStore.stats[item.key]" />
          </div>
        </ElCol>
      </ElRow>

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

.stats-panel {
  width: min(720px, 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(38, 57, 77, 0.08);
}

.stats-panel :deep(.el-card__header) {
  padding: 28px 32px 20px;
}

.stats-panel :deep(.el-card__body) {
  padding: 26px 32px 32px;
}

h1 {
  margin: 0;
  color: #26394d;
  font-size: 28px;
}

.stats-grid {
  margin-bottom: 12px;
}

.statistic-card {
  min-height: 112px;
  margin-bottom: 14px;
  padding: 20px;
  display: flex;
  align-items: center;
  border: 1px solid var(--el-border-color-light);
  border-radius: 9px;
  background: var(--el-fill-color-light);
}

.statistic-card :deep(.el-statistic__head) {
  margin-bottom: 8px;
  color: #687b8c;
  font-size: 13px;
}

.statistic-card :deep(.el-statistic__number) {
  color: var(--el-color-primary);
  font-size: 30px;
  font-weight: 700;
}

@media (max-width: 500px) {
  .stats-panel :deep(.el-card__header) {
    padding: 22px 20px 16px;
  }

  .stats-panel :deep(.el-card__body) {
    padding: 20px;
  }
}
</style>
