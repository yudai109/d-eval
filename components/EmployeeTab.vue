<template>
  <div class="flex flex-wrap">
    <div class="w-11/12 mx-auto">
      <ul class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <NuxtLink
            to="/employee/"
            class="text-sm font-bold px-5 py-6 shadow-lg rounded block leading-normal"
            v-bind:class="{
              'text-emerald-600 bg-white': openTab !== 1,
              'text-white bg-blue-400': openTab === 1,
            }"
          >
            出退勤
          </NuxtLink>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <NuxtLink
            to="/employee/attendance"
            class="text-sm font-bold px-5 py-6 shadow-lg rounded block leading-normal"
            v-bind:class="{
              'text-emerald-600 bg-white': openTab !== 2,
              'text-white bg-blue-400': openTab === 2,
            }"
          >
            一覧
          </NuxtLink>
        </li>
        <li class="-mb-px mr-2 last:mr-0 flex-auto text-center">
          <NuxtLink
            to="/employee/calender"
            class="text-sm font-bold px-5 py-6 shadow-lg rounded block leading-normal"
            v-bind:class="{
              'text-emerald-600 bg-white': openTab !== 3,
              'text-white bg-blue-400': openTab === 3,
            }"
          >
            出勤簿
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
      if (routeName === "employee") {
        self.openTab = 1;
      } else if (routeName === "employee-attendance") {
        self.openTab = 2;
      } else {
        self.openTab = 3;
      }
    },
  },
  mounted() {
    this.changeTabColer();
  },
};
</script>