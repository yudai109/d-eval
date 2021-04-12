<template>
  <div>
    <button @click="showBird">Scraping!!</button>
    <br />
    <!-- <p>{{ result }}</p> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: "",
    };
  },
  methods: {
    async showBird() {
      var ROWS_DATA = {};
      var ROWS = [];

      var result = await this.$axios.$get("/api/get_skp_info");

      for (item in this.result) {
        ROW["登録日"] = item[0];
        ROW["登録時間"] = item[1];
        ROW["店舗コード"] = item[2];
        ROW["担当者"] = item[3];
        ROW["支店"] = item[4];
        ROW["店舗名"] = item[5];
        ROW["アダプター台数"] = item[6];
        ROW["スカパー！有無"] = item[7];
        ROW["申込パック"] = item[8];
        JSON_DATA.push(ROWS);
      }

      console.log(JSON_DATA);
    },
  },
};
</script>