<template>
  <div>
    <div class="mt-10">
      <h2 class="uppercase font-bold text-2xl mb-6 pb-6 border-b-2">
        ドコモ｜実績　報告内容
      </h2>
    <Tabs />
    </div>
    <VueJsonToCsv :json-data="json_data" :labels="labels">
      <button @click="download" class="rounded-lg bg-blue-400 py-2 px-3 my-5">
        <b class="text-white">csvダウンロード</b>
      </button>
    </VueJsonToCsv>

    <div class="w-11/12 mx-auto mb-20">
      <vue-good-table
        :columns="columns"
        :rows="rows"
        max-height="900px"
        :fixed-header="true"
        :search-options="{
          enabled: true,
          trigger: '',
          skipDiacritics: true,
          placeholder: 'Search this table',
        }"
        :sort-options="{
          enabled: true,
        }"
        :select-options="{ enabled: true }"
      >
        <div slot="table-actions">
          <button class="mx-6 px-4 py-2 rounded-lg bg-yellow-500">関西</button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'edit'">
            <button
              class="bg-red-500 rounded-md py-1 px-3 text-gray-100 text-sm"
              @click="editRow(props.row)"
            >
              編集
            </button>
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
          field: "createdAt",
          label: "報告日",
        },
        {
          field: "shop",
          label: "店舗名",
        },
        {
          field: "username",
          label: "名前",
        },
        {
          field: "negotiation",
          label: "商談数",
        },
        {
          field: "customer",
          label: "接客数",
        },
        {
          field: "hs",
          label: "HS",
        },
        {
          field: "pi",
          label: "PI",
        },
        {
          field: "migration",
          label: "マイグレ",
        },
        {
          field: "st_total",
          label: "スマタブ総販",
        },
        {
          field: "dcard_regu",
          label: "レギュラー",
        },
        {
          field: "dcard_gold",
          label: "ゴールド",
        },
        {
          field: "hikari_shinki",
          label: "光新規",
        },
        {
            field: "hikari_henko",
            label: "事業者変更",
        },
        {
            field: "hikari_tenyo",
            label: "転用",
        },
        {
            field: "isp",
            label: "OCN",
        },
        {
            field: "tvop",
            label: "TVOP",
        },
        {
            field: "skp_cs",
            label: "スカパー顧客",
        },
        {
            field: "skp_ic",
            label: "スカパーIC",
        },
        {
            field: "skp_koji",
            label: "スカパー工事",
        },

      ],
      rows: [],

    };
  },
  components: {
    VueJsonToCsv,
  },
  methods: {
    getReportData() {
        this.rows = this.$store.state.docomo_reports;
    },
    download() {
      // ラベル
      this.labels = {
        createdAt: { title: "報告日" },
        shop: { title: "店舗名" },
        username: { title: "名前" },
        negotiation: { title: "商談数" },
        customer: { title: "接客数" },
        hs: { title: "HS" },
        pi: { title: "PI" },
        migration: { title: "マイグレ" },
        st_total: { title: "スマタブ総販" },
        dcard_regu: { title: "レギュラー" },
        dcard_gold: { title: "ゴールド" },
        hikari_shinki: { title: "光新規" },
        hikari_henko: { title: "事業者変更" },
        hikari_tenyo: { title: "転用" },
        isp: { title: "OCN" },
        tvop: { title: "TVOP" },
        skp_cs: { title: "スカパー顧客" },
        skp_ic: { title: "スカパーIC" },
        skp_koji: { title: "スカパー工事" },
      };

      // データ
      this.json_data = this.rows;
    },
  },
  created() {
    this.$store.dispatch('getRepoData', {career_type: "docomo"})
    this.getReportData();
  },
    beforeDestroy() {
    this.$store.commit('resetRepoData', {career_type: "docomo"})
  }
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




