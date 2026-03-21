<template>
  <div class="main-app">
    <AppHeader />

    <main class="main-content">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
<style scoped>
.main-content {
  position: relative;
}
</style>
