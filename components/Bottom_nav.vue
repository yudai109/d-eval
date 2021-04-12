<template>
<div class="fixed bottom-0 w-full">
    <nav class="bottomNav md:hidden bottom-0 w-full bg-gray-700 text-xs">
      <ul class=" flex justify-around items-center text-white text-center opacity-75 text-lg font-bold">
          <nuxt-link to="/">
            <li class="pt-3 pb-4 px-6 hover:bg-gray-500">
                <i class="fas fa-home"></i>
            </li>
           </nuxt-link>
          <nuxt-link to="/report">
            <li class="pt-3 pb-4 px-6 hover:bg-gray-500">
                <i class="fas fa-edit"></i>
            </li>
          </nuxt-link>
          <nuxt-link to="/analytics">
            <li class="pt-3 pb-4 px-6 hover:bg-gray-500">
                <i class="fas fa-chart-bar"></i>
            </li>
          </nuxt-link>
          <nuxt-link to="/test">
            <li class="pt-3 pb-4 px-6 hover:bg-gray-500">
                <i class="fas fa-tasks"></i>
            </li>
          </nuxt-link>
          <nuxt-link to="/account">
            <li class="pt-3 pb-4 px-6 hover:bg-gray-500">
                <i class="fas fa-cog"></i>
            </li>
          </nuxt-link>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>

    .bottomNav {
      height: 70px;
    }

    i {
      color: white
    }


</style>