<template>
  <main class="view-page">
    <section class="content-panel">
      <h1>오늘의 날씨 서비스</h1>
      <p>도시별 기온과 습도를 빠르게 검색하고, 관심 있는 도시의 상세 기상 정보를 확인하는 Vue Router 실습 서비스입니다.</p>

      <p>현재 구현되어 있는 기능은 다음과 같습니다</p>
      <ul>
        <li>도시 이름 검색</li>
        <li>기온과 습도 조건별 필터</li>
        <li>도시별 상세 설명</li>
        <li>SGIS 지역 검색을 통한 도시 추가</li>
        <li>OpenWeather 현재 날씨 수동 갱신</li>
      </ul>

      <RouterLink to="/">← 메인 대시보드로 돌아가기</RouterLink>
      <!--메인페이지 복귀 라우터 링크-->
    </section>
  </main>
</template>

<style scoped>
.view-page {
  display: grid;
  place-items: start center;
  padding: 24px 20px 40px;
}

.content-panel {
  width: min(620px, 100%);
  padding: 38px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(38, 57, 77, 0.08);
}

h1 {
  margin: 0 0 18px;
  color: #26394d;
  font-size: 28px;
}

p,
li {
  color: #607587;
  line-height: 1.8;
}

ul {
  margin: 20px 0 26px;
  padding-left: 22px;
}

a {
  color: #2563eb;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}
</style>
