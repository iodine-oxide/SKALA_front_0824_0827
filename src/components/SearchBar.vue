<script setup>
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

const handleInput = (event) => {
  emit('update-query', event.target.value)
}
</script>

<template>
  <div class="search-bar">
    <input type="text" placeholder="검색할 도시 이름 입력" :value="query" @input="handleInput" />

    <p>
      검색 중인 도시:
      <strong>{{ query }}</strong>
    </p>

    <div class="search-options">
      <div class="filter-section">
        <p class="filter-title">도시 필터</p>

        <div class="radio-group" role="radiogroup" aria-label="기온별 도시 필터">
          <label>
            <input :checked="temperatureFilter === 'all'" type="radio" name="temperature-filter" value="all" @change="emit('update-filter', 'all')" />
            전체 도시
          </label>
          <label>
            <input :checked="temperatureFilter === 'cool'" type="radio" name="temperature-filter" value="cool" @change="emit('update-filter', 'cool')" />
            선선한 도시
          </label>
          <label>
            <input :checked="temperatureFilter === 'humidHot'" type="radio" name="temperature-filter" value="humidHot" @change="emit('update-filter', 'humidHot')" />
            습하고 더운 도시
          </label>
          <label>
            <input :checked="temperatureFilter === 'hot'" type="radio" name="temperature-filter" value="hot" @change="emit('update-filter', 'hot')" />
            더운 도시
          </label>
        </div>
      </div>

      <span class="result-count">검색 결과: {{ resultCount }}개</span>
    </div>
  </div>
</template>

<style scoped>
.search-bar > input[type='text'] {
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid #9da8b0;
  border-radius: 2px;
  outline: none;
  background: #fff;
}

.search-bar > input[type='text']:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
}

.search-bar > p {
  min-height: 20px;
  margin: 8px 0 0;
  color: #536677;
  font-size: 14px;
}

.search-bar strong {
  color: #2563eb;
}

.search-options {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  color: #536677;
  font-size: 13px;
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-title {
  min-height: 0;
  margin: 0;
  color: #536677;
  font-size: 14px;
  font-weight: 700;
}

.radio-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
}

.radio-group input {
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: #3b82f6;
}

.result-count {
  flex: 0 0 auto;
  font-weight: 700;
}

@media (max-width: 600px) {
  .search-options {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }

  .radio-group {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
