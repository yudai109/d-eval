<template>
  <div class="flex flex-wrap">
    <div class="w-11/12 mx-auto">
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <NuxtLink
            to="/analytics/reports/"
            class="text-sm font-bold px-5 py-6 shadow-lg rounded block leading-normal"
            v-bind:class="{
              'text-emerald-600 bg-white': openTab !== 1,
              'text-white bg-blue-400': openTab === 1,
            }"
          >
            ドコモ
          </NuxtLink>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <NuxtLink
            to="/analytics/reports/skp_repo"
            class="text-sm font-bold px-5 py-6 shadow-lg rounded block leading-normal"
            v-bind:class="{
              'text-emerald-600 bg-white': openTab !== 2,
              'text-white bg-blue-400': openTab === 2,
            }"
          >
            スカパー
          </NuxtLink>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <NuxtLink
            to="/analytics/reports/ocn_repo"
            class="text-sm font-bold px-5 py-6 shadow-lg rounded block leading-normal"
            v-bind:class="{
              'text-emerald-600 bg-white': openTab !== 3,
              'text-white bg-blue-400': openTab === 3,
            }"
          >
            OCN
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "emerald-tabs",

  data() {
    return {
      openTab: 1,
    };
  },
  methods: {
    changeTabColer: function (tabNumber) {
      var self = this;
      var routeName = this.$route.name;
      console.log(routeName);
      if (routeName === "analytics-reports-skp_repo") {
        self.openTab = 2;
      } else if (routeName === "analytics-reports-ocn_repo") {
        self.openTab = 3;
      } else {
        self.openTab = 1;
      }
    },
  },
  mounted() {
    this.changeTabColer();
  },
};
</script>