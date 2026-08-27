<script setup>
import { computed } from 'vue'
import { Refresh } from '@element-plus/icons-vue'

const props = defineProps({
  isRefreshing: {
    type: Boolean,
    default: false,
  },
  lastUpdated: {
    type: String,
    default: null,
  },
  message: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
})

defineEmits(['refresh'])

const formattedLastUpdated = computed(() => {
  if (!props.lastUpdated) return '아직 API로 갱신하지 않았습니다.'

  return `${new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(props.lastUpdated))} 갱신`
})
</script>

<template>
  <div class="refresh-control">
    <div>
      <strong>OpenWeather 현재 날씨</strong>
      <p>{{ formattedLastUpdated }}</p>
    </div>

    <ElButton type="primary" :icon="Refresh" :loading="isRefreshing" @click="$emit('refresh')">전체 날씨 새로고침</ElButton>
  </div>

  <ElAlert v-if="message" class="refresh-alert" :title="message" type="success" :closable="false" show-icon />
  <ElAlert v-if="error" class="refresh-alert" :title="error" type="error" :closable="false" show-icon />
</template>

<style scoped>
.refresh-control {
  margin-bottom: 12px;
  padding: 14px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  border: 1px solid #dbe7f4;
  border-radius: 7px;
  background: #eef6ff;
}

strong {
  color: #425466;
  font-size: 14px;
}

p {
  margin: 5px 0 0;
  color: #687b8c;
  font-size: 12px;
  line-height: 1.45;
}

.refresh-alert {
  margin-bottom: 10px;
}

@media (max-width: 600px) {
  .refresh-control {
    flex-direction: column;
  }

  .refresh-control :deep(.el-button) {
    width: 100%;
  }
}
</style>
