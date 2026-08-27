<script setup>
import { ref } from 'vue'

defineProps({
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

const handleInput = (event) => {
  query.value = event.target.value
  emit('clear-results')
}

const submitSearch = () => {
  emit('search-city', query.value)
}

const selectLocation = (location) => {
  query.value = ''
  emit('select-location', location)
}
</script>

<template>
  <section class="add-city-panel" aria-labelledby="add-city-title">
    <h2 id="add-city-title">➕ 지역 추가</h2>
    <p class="description">SGIS에서 지역 좌표를 찾습니다. 날씨는 추가 후 새로고침 버튼을 눌러 불러옵니다.</p>

    <form class="add-city-form" @submit.prevent="submitSearch">
      <label for="add-city-query">추가할 도시 또는 지역</label>
      <div class="input-row">
        <input id="add-city-query" type="text" autocomplete="off" placeholder="예: 성남시 분당구" :value="query" :disabled="isSearching" @input="handleInput" />
        <button type="submit" :disabled="isSearching || !query.trim()">
          {{ isSearching ? '검색 중...' : '도시 찾기' }}
        </button>
      </div>
    </form>

    <p v-if="message" class="feedback success" role="status">{{ message }}</p>
    <p v-if="error" class="feedback error" role="alert">{{ error }}</p>

    <ul v-if="candidates.length > 0" class="candidate-list" aria-label="지역 검색 결과">
      <li v-for="location in candidates" :key="location.id">
        <span>
          <strong>{{ location.fullName }}</strong>
          <small>위도 {{ location.latitude }}, 경도 {{ location.longitude }}</small>
        </span>
        <button type="button" @click="selectLocation(location)">추가</button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.add-city-panel {
  margin-top: 18px;
  padding: 20px;
  border: 1px solid #dfe5ea;
  border-radius: 9px;
  background: #f7f9fa;
}

h2 {
  margin: 0;
  color: #536677;
  font-size: 17px;
}

.description {
  margin: 8px 0 16px;
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

.input-row {
  display: flex;
  gap: 8px;
}

.input-row input {
  min-width: 0;
  height: 42px;
  padding: 0 12px;
  flex: 1;
  border: 1px solid #9da8b0;
  border-radius: 4px;
  outline: none;
  background: #fff;
}

.input-row input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
}

button {
  padding: 0 16px;
  border: 0;
  border-radius: 5px;
  color: #fff;
  background: #3b82f6;
  font-weight: 700;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.feedback {
  margin: 12px 0 0;
  font-size: 13px;
  line-height: 1.5;
}

.feedback.success {
  color: #288a4d;
}

.feedback.error {
  color: #c43d42;
}

.candidate-list {
  margin: 14px 0 0;
  padding: 0;
  display: grid;
  gap: 8px;
  list-style: none;
}

.candidate-list li {
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border: 1px solid #d7dde2;
  border-radius: 6px;
  background: #fff;
}

.candidate-list span,
.candidate-list small {
  display: block;
}

.candidate-list strong {
  color: #425466;
  font-size: 14px;
}

.candidate-list small {
  margin-top: 4px;
  color: #7b8a98;
  font-size: 11px;
}

.candidate-list button {
  min-height: 34px;
  flex: 0 0 auto;
}

@media (max-width: 600px) {
  .add-city-panel {
    padding: 15px;
  }

  .input-row {
    flex-direction: column;
  }

  .input-row button {
    min-height: 40px;
  }
}
</style>
