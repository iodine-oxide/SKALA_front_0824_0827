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
  <section class="panel">
    <h2>{{ title }}</h2>
    <slot />
    <!-- slot으로 주입된 인자들 출력 -->
  </section>
</template>

<style scoped>
.panel {
  margin-top: 24px;
  padding: 20px;
  border: 1px solid #dfe5ea;
  border-radius: 9px;
  background: #f7f9fa;
}

.panel h2 {
  margin: 0 0 12px;
  color: #536677;
  font-size: 17px;
  font-weight: 700;
}

@media (max-width: 600px) {
  .panel {
    padding: 15px;
  }
}
</style>
