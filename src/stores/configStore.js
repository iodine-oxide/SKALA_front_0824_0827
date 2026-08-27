import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
  state: () => ({
    unit: 'celsius',
  }),

  getters: {
    unitSymbol: (state) => (state.unit === 'fahrenheit' ? '°F' : '°C'),
    unitLabel: (state) => (state.unit === 'fahrenheit' ? '화씨' : '섭씨'),
    convertTemperature: (state) => (temperature) => {
      if (!Number.isFinite(temperature)) return null

      return state.unit === 'fahrenheit' ? Math.round((temperature * 9) / 5 + 32) : temperature
    },
  },

  actions: {
    toggleUnit() {
      this.unit = this.unit === 'celsius' ? 'fahrenheit' : 'celsius'
    },
  },
})
