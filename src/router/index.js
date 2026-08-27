import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // localhost../ 에서 기본은 WeatherHomeView로 라우팅
      name: 'weather-home',
      component: () => import('@/views/WeatherHomeView.vue'),
    },
    {
      path: '/weather/:cityId', // 도시 id에 따라 각각의 페이지로 라우팅
      name: 'weather-detail',
      component: () => import('@/views/WeatherDetailView.vue'),
    },
    {
      path: '/about', // 상세 페이지 WeatherAboutView로 라우팅
      name: 'weather-about',
      component: () => import('@/views/WeatherAboutView.vue'),
    },
    {
      path: '/stats', // 통계 페이지 WeatherStatsView로 라우팅
      name: 'weather-stats',
      component: () => import('@/views/WeatherStatsView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'), // 일치하는 곳이 없을 시 NotFound로 라우팅
    },
  ],
})
export default router
