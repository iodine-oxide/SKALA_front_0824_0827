<script setup>
import { computed, ref } from 'vue'
import { Location, Plus, Search } from '@element-plus/icons-vue'

const props = defineProps({
  candidates: {
    type: Array,
    default: () => [],
  },
  isSearching: {
    type: Boolean,
    default: false,
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

const emit = defineEmits(['search-city', 'select-location', 'clear-results'])
const query = ref('')

const candidateDialogVisible = computed({
  get: () => props.candidates.length > 0,
  set: (visible) => {
    if (!visible) emit('clear-results')
  },
})

const handleInput = (value) => {
  query.value = value
  emit('clear-results')
}

const submitSearch = () => {
  const keyword = query.value.trim()
  if (!keyword || props.isSearching) return

  emit('search-city', keyword)
}

const selectLocation = (location) => {
  query.value = ''
  emit('select-location', location)
}
</script>

<template>
  <ElCard class="add-city-panel" shadow="never" aria-labelledby="add-city-title">
    <template #header>
      <h2 id="add-city-title">➕ 지역 추가</h2>
    </template>

    <p class="description">SGIS에서 지역 좌표를 찾습니다. 날씨는 추가 후 새로고침 버튼을 눌러 불러옵니다.</p>

    <form class="add-city-form" @submit.prevent="submitSearch">
      <label for="add-city-query">추가할 도시 또는 지역</label>
      <ElInput
        id="add-city-query"
        :model-value="query"
        :prefix-icon="Location"
        :disabled="isSearching"
        autocomplete="off"
        clearable
        placeholder="예: 성남시 분당구"
        size="large"
        @update:model-value="handleInput"
      >
        <template #append>
          <ElButton :icon="Search" :loading="isSearching" :disabled="!query.trim()" native-type="submit">
            {{ isSearching ? '검색 중' : '도시 찾기' }}
          </ElButton>
        </template>
      </ElInput>
    </form>

    <ElAlert v-if="message" class="feedback" :title="message" type="success" :closable="false" show-icon />
    <ElAlert v-if="error" class="feedback" :title="error" type="error" :closable="false" show-icon />

    <ElDialog v-model="candidateDialogVisible" title="추가할 지역 선택" width="min(520px, 92vw)" append-to-body>
      <p class="dialog-description">검색 결과 중 날씨 목록에 추가할 지역을 선택해 주세요.</p>

      <div class="candidate-list" aria-label="지역 검색 결과">
        <ElCard v-for="location in candidates" :key="location.id" shadow="never" class="candidate-card">
          <div class="candidate-content">
            <span>
              <strong>{{ location.fullName }}</strong>
              <small>위도 {{ location.latitude }}, 경도 {{ location.longitude }}</small>
            </span>
            <ElButton type="primary" :icon="Plus" :aria-label="`${location.fullName} 추가`" @click="selectLocation(location)">추가</ElButton>
          </div>
        </ElCard>
      </div>

      <template #footer>
        <ElButton @click="candidateDialogVisible = false">취소</ElButton>
      </template>
    </ElDialog>
  </ElCard>
</template>

<style scoped>
.add-city-panel {
  margin-top: 18px;
  border-radius: 9px;
  background: #f7f9fa;
}

.add-city-panel :deep(.el-card__header) {
  padding: 16px 20px 12px;
  border-bottom: 0;
}

.add-city-panel :deep(.el-card__body) {
  padding: 0 20px 20px;
}

h2 {
  margin: 0;
  color: #536677;
  font-size: 17px;
}

.description,
.dialog-description {
  margin: 0 0 16px;
  color: #687b8c;
  font-size: 13px;
  line-height: 1.6;
}

.add-city-form label {
  display: block;
  margin-bottom: 7px;
  color: #425466;
  font-size: 13px;
  font-weight: 700;
}

.feedback {
  margin-top: 12px;
}

.candidate-list {
  display: grid;
  gap: 10px;
}

.candidate-card :deep(.el-card__body) {
  padding: 14px;
}

.candidate-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.candidate-content span,
.candidate-content small {
  display: block;
}

.candidate-content strong {
  color: #425466;
  font-size: 14px;
}

.candidate-content small {
  margin-top: 4px;
  color: #7b8a98;
  font-size: 11px;
}

@media (max-width: 600px) {
  .add-city-panel :deep(.el-card__header) {
    padding: 15px 15px 10px;
  }

  .add-city-panel :deep(.el-card__body) {
    padding: 0 15px 15px;
  }

  .candidate-content {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
