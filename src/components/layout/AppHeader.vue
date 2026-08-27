<script setup>
import UnitToggler from '@/components/exercise/UnitToggler.vue'
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <div class="app-heading">
        <h1>🌤️ 종합실습 6: 날씨 (API 활용)</h1>
      </div>

      <nav class="navigation" aria-label="주요 메뉴">
        <div class="nav-links">
          <RouterLink to="/">날씨 홈</RouterLink>
          <RouterLink to="/stats">날씨 통계</RouterLink>
          <RouterLink to="/about">서비스 소개</RouterLink>
        </div>
        <UnitToggler />
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  padding: 28px 20px 0;
}

.header-inner {
  width: min(720px, 100%);
  margin: 0 auto;
  padding: 28px 32px 24px;
  border: 1px solid #dfe5ea;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(38, 57, 77, 0.08);
}

.app-heading {
  padding: 0 4px 22px;
  border-bottom: 1px solid #dfe5ea;
}

.app-heading h1 {
  margin: 0;
  color: #26394d;
  font-size: 26px;
  line-height: 1.35;
}

.navigation {
  margin-top: 18px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border: 1px solid #dfe5ea;
  border-radius: 9px;
  background: #f7f9fa;
}

.nav-links {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.nav-links a {
  min-width: 82px;
  padding: 10px 12px;
  border-radius: 7px;
  color: #536677;
  text-align: center;
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  transition:
    color 0.15s ease,
    background-color 0.15s ease,
    box-shadow 0.15s ease;
}

.nav-links a:hover {
  background: #eef4f7;
}

.nav-links a.router-link-exact-active {
  color: #fff;
  background: #3b82f6;
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.22);
}

@media (max-width: 680px) {
  .site-header {
    padding: 18px 12px 0;
  }

  .header-inner {
    padding: 22px 18px 18px;
  }

  .app-heading {
    padding-bottom: 16px;
  }

  .app-heading h1 {
    font-size: 20px;
  }

  .navigation {
    flex-wrap: wrap;
  }

  .nav-links {
    width: 100%;
  }

  .nav-links a {
    min-width: 0;
    flex: 1;
    padding: 9px 7px;
    font-size: 13px;
  }
}
</style>
