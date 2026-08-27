<script setup>
//뒷배경(블럭)용 컴포넌트
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <ElCard class="panel" shadow="never">
    <template #header>
      <h2>{{ title }}</h2>
    </template>
    <slot />
    <!-- slot으로 주입된 인자들 출력 -->
  </ElCard>
</template>

<style scoped>
.panel {
  margin-top: 24px;
  border-radius: 9px;
  background: #f7f9fa;
}

.panel h2 {
  margin: 0;
  color: #536677;
  font-size: 17px;
  font-weight: 700;
}

.panel :deep(.el-card__header) {
  padding: 16px 20px 12px;
  border-bottom: 0;
}

.panel :deep(.el-card__body) {
  padding: 0 20px 20px;
}

@media (max-width: 600px) {
  .panel :deep(.el-card__header) {
    padding: 15px 15px 10px;
  }

  .panel :deep(.el-card__body) {
    padding: 0 15px 15px;
  }
}
</style>
