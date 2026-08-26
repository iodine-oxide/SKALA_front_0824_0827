<template>
  <main class="not-found">
    <section>
      <strong>존재하지 않는 페이지 입니다.</strong>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>입력한 주소가 올바른지 확인해 주세요.</p>
      <RouterLink to="/">날씨 홈으로 이동</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.not-found {
  display: grid;
  place-items: start center;
  padding: 24px 20px 40px;
  text-align: center;
}

.not-found strong {
  color: #3b82f6;
  font-size: 64px;
}

h1 {
  margin: 10px 0;
  color: #26394d;
}

p {
  margin: 0 0 24px;
  color: #687b8c;
}

a {
  display: inline-block;
  padding: 11px 16px;
  border-radius: 7px;
  color: #fff;
  background: #3b82f6;
  text-decoration: none;
  font-weight: 700;
}
</style>
