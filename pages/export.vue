<template>
  <div>
    <VueJsonToCsv :json-data="json_data" :labels="labels">
      <button @click="download" class="rounded-lg bg-blue-400 py-2 px-3 my-5">
        <b class="text-white">csvダウンロード</b>
      </button>
    </VueJsonToCsv>
    <button
      @click.once="getSkpData"
      class="rounded-lg bg-blue-400 py-2 px-3 my-5"
    >
      <b class="text-white">スクレイピング</b>
    </button>

    <div class="w-11/12 mx-auto">
      <vue-good-table
        :columns="columns"
        :rows="rows"
        max-height="900px"
        :fixed-header="true"
        @on-row-click="onRowClick"
        @on-sort-change="onSortChange"
        :search-options="{
          enabled: true,
          trigger: '',
          skipDiacritics: true,
          placeholder: 'Search this table',
        }"
        :sort-options="{
          enabled: true,
          initialSortBy: { field: 'id', type: 'desc' },
        }"
        :select-options="{ enabled: true }"
      >
        <div slot="table-actions">
          <button class="mx-6 px-4 py-2 rounded-lg bg-yellow-500">関西</button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'age'">
            <span class="text-blue-400">{{ props.row.age }}</span>
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>

        <!-- CSVダウンロードボタン -->
        <div slot="selected-row-actions">
          <button class="csv-btn rounded-lg bg-blue-400 py-2 px-3 text-white">
            CSVダウンロード
          </button>
        </div>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
import VueJsonToCsv from "vue-json-to-csv"; // eslint-disable-line

export default {
  name: "CsvDownload",
  data() {
    return {
      labels: {},
      json_data: [],
      columns: [
        {
          field: "id",
          label: "登録日",
          width: "120px",
        },
        {
          field: "time",
          label: "登録時間",
          width: "100px",
        },
        {
          field: "code",
          label: "店舗コード",
          width: "120px",
          // type: 'number',
        },
        {
          field: "tantou",
          label: "担当者",
          width: "120px",
          // type: 'date',
          // dateInputFormat: 'yyyy-MM-dd',
          // dateOutputFormat: 'MMM do yy',
        },
        {
          field: "area",
          label: "エリア",
          width: "80px",
        },
        {
          field: "shiten",
          label: "支店",
        },
        {
          field: "shop",
          label: "ショップ名",
        },
        {
          field: "adaputer",
          label: "アダプター台数",
          width: "70px",
        },
        {
          field: "skp_kokyaku",
          label: "スカパー！有無",
          width: "120px",
        },
        {
          field: "package",
          label: "申込パック",
          width: "120px",
        },
      ],
      rows: [],
    };
  },
  components: {
    VueJsonToCsv,
  },
  methods: {
    getSkpData() {
      var self = this;
      this.$store.dispatch("getSkpData").then(() => {
        self.rows = self.$store.state.rows;
      });
    },
    // async showBird() {
    //   var _result = await this.$axios.$get("/api/get_skp_info");
    //   // 先頭３行削除
    //   _result.shift()
    //   _result.shift()
    //   _result.shift()
    //   _result.pop()
    //   _result.pop()
    //   _result.pop()

    //   _result.forEach((item) => {
    //     var ROWS_DATA = {};
    //     ROWS_DATA.id = item[0];
    //     ROWS_DATA.time = item[1];
    //     ROWS_DATA.code = item[2];
    //     ROWS_DATA.tantou = item[3];
    //     ROWS_DATA.area = item[4];
    //     ROWS_DATA.shop = item[5];
    //     ROWS_DATA.shiten = item[6];
    //     ROWS_DATA.adaputer = item[7];
    //     ROWS_DATA.skp_kokyaku = item[8];
    //     ROWS_DATA.package = item[9];
    //     console.log(ROWS_DATA)
    //     this.rows.push(ROWS_DATA);
    //   })
    // },
    download() {
      // ラベル
      this.labels = {
        id: { title: "id" },
        time: { title: "登録日" },
        code: { title: "店舗コード" },
        tantou: { title: "担当者" },
        area: { title: "エリア" },
        shop: { title: "店舗名" },
        shiten: { title: "支店名" },
        adaputer: { title: "アダプター台数" },
        skp_kokyaku: { title: "スカパー！有無" },
        package: { title: "申込パック" },
      };

      // データ
      this.json_data = this.rows;
    },
    onRowClick: (params) => {
      console.log("クリック");
      console.log(params.row);
      console.log(params.selected);
      console.log(params.indicates);
      console.log(params.event);
    },
    onSortChange(params) {
      console.log(params[0].field);
      console.log(params[0].columnIndex);
    },
  },
  mounted() {
    this.rows = this.$store.state.rows;
  },
};
</script>

<style>
.vgt-selection-info-row {
  padding-top: 30px;
  padding-bottom: 30px;
}

.vgt-selection-info-row #text {
  padding-top: 10px;
}

.csv-btn {
  margin-top: -12px;
}

th > span {
  font-size: 8px;
}
</style>