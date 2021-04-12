<template>
  <div class="container bg-gray-100">
      <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'authLayout',
  layout: 'authLayout'
}
</script>

<style scoped>
  .container {
    margin: 0 auto;
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 15px;
}
</style>