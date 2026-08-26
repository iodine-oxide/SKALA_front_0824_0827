<script setup>
import AppHeader from '@/components/layout/AppHeader.vue' // 내비게이션 바와 제목이 합쳐진 상단 고정 블럭을 컴포넌트로 분리
</script>

<template>
  <div class="app-shell">
    <AppHeader /> <!--상단 고정용 제목, 네비게이션 바-->
    <RouterView />
  </div>
</template>
