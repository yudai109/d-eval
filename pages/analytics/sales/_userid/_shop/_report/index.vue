<template>
  <div class="mt-14 mb-40">
    <div class="w-full lg:w-8/12 px-4">
      <div class="text-left ml-4">
        <nuxt-link
          :to="{
            name: 'analytics-sales-userid-shop',
            params: { shop: $route.params.shop },
          }"
        >
          <i class="far fa-arrow-alt-circle-left fa-2x text-gray-600"></i>
        </nuxt-link>
      </div>
      <h2 class="uppercase font-bold text-2xl mb-6 pb-6 border-b-2">
        報告内容
      </h2>
      <div
        v-for="(repo_detail, index) in repo_details"
        :key="index"
        class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6"
      >
        <div class="w-full md:w-5/12 px-4 pt-4 text-left">
          <label class="my-1 font-semibold leading-normal">
            報告内容
          </label>
          <hr class="mt-1">
          <p
            class="font-light leading-relaxed mt2 mb-4 text-blueGray-600"
          >
            Don't let your uses guess by attaching tooltips and popoves to any
            element. Just make sure you enable them first via JavaScript.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "default",
  data() {
    return {
      repo_details: [],
    };
  },
  mounted() {
    var self = this;
    self.repo_details.push(...[{ shop: "shop-a", shopid: "shop" }]);

    console.log(this.$route);
  },
};
</script>
<style lang="">
</style>