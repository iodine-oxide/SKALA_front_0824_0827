import { defineStore } from 'pinia'

import { searchSgisLocations } from '@/services/sgisApi'

export const useLocationStore = defineStore('location', {
  state: () => ({
    candidates: [],
    isSearching: false,
    searchError: '',
    searchMessage: '',
  }),

  actions: {
    async searchLocations(query) {
      const keyword = query.trim()

      this.candidates = []
      this.searchError = ''
      this.searchMessage = ''

      if (!keyword) {
        this.searchError = '추가할 도시 또는 지역 이름을 입력해 주세요.'
        return []
      }

      this.isSearching = true

      try {
        this.candidates = await searchSgisLocations(keyword)

        if (this.candidates.length === 0) {
          this.searchError = `'${keyword}'에 해당하는 지역을 찾지 못했습니다.`
        } else if (this.candidates.length > 1) {
          this.searchMessage = '같은 이름의 지역이 여러 곳입니다. 추가할 지역을 선택해 주세요.'
        }

        return this.candidates
      } catch (error) {
        this.searchError = error instanceof Error ? error.message : '지역 검색에 실패했습니다.'
        return []
      } finally {
        this.isSearching = false
      }
    },

    showAddResult(message, isError = false) {
      this.candidates = []
      this.searchMessage = isError ? '' : message
      this.searchError = isError ? message : ''
    },

    clearResults() {
      this.candidates = []
      this.searchError = ''
      this.searchMessage = ''
    },
  },
})
