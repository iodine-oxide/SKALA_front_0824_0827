<script setup>
import { computed } from 'vue'

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
      <p v-if="message" class="message" role="status">{{ message }}</p>
      <p v-if="error" class="error" role="alert">{{ error }}</p>
    </div>

    <button type="button" :disabled="isRefreshing" @click="$emit('refresh')">
      {{ isRefreshing ? '갱신 중...' : '전체 날씨 새로고침' }}
    </button>
  </div>
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

.message {
  color: #288a4d;
}

.error {
  color: #c43d42;
}

button {
  min-height: 38px;
  padding: 0 14px;
  flex: 0 0 auto;
  border: 0;
  border-radius: 5px;
  color: #fff;
  background: #3b82f6;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

button:disabled {
  cursor: wait;
  opacity: 0.6;
}

@media (max-width: 600px) {
  .refresh-control {
    flex-direction: column;
  }

  button {
    width: 100%;
  }
}
</style>
