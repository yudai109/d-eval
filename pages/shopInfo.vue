<template>
  <div>
    <div class="mt-10">
      <h2 class="uppercase font-bold text-2xl mb-6 pb-6 border-b-2">
        ショップ目標値
      </h2>
    </div>
    <VueJsonToCsv :json-data="json_data" :labels="labels">
      <button @click="download" class="rounded-lg bg-blue-400 py-2 px-3 my-5">
        <b class="text-white">csvダウンロード</b>
      </button>
    </VueJsonToCsv>
    <button
      @click.once="setShopInfo"
      class="rounded-lg bg-blue-400 py-2 px-3 my-5"
    >
      <b class="text-white">shop</b>
    </button>

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

    <modal name="modal-content" height="auto">
      <h2 class="text-gray-600 font-semibold text-lg my-2">{{ edit_data.shopname }}</h2>
      <table class="mx-auto">
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="pi">PI</td>
          <td><input id="pi" type="number" class="border rounded py-1 pl-2" v-model="edit_data.pi" /></td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="hstab">HS/タブレット</td>
          <td><input id="hstab" type="number" class="border rounded py-1 pl-2" v-model="edit_data.hstab" /></td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="migration">マイグレ</td>
          <td><input id="migration" type="number" class="border rounded py-1 pl-2" v-model="edit_data.migration" /></td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="smtab">スマタブ総販</td>
          <td><input id="smtab" type="number" class="border rounded py-1 pl-2" v-model="edit_data.smtab" /></td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="dcard_gold">dカードGOLD</td>
          <td><input id="dcard_gold" type="number" class="border rounded py-1 pl-2" v-model="edit_data.dcard_regu" /></td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="dcard_regu">dカードレギュラー</td>
          <td><input id="dcard_regu" type="number" class="border rounded py-1 pl-2" v-model="edit_data.dcard_gold" /></td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="hikari_shimki">光新規</td>
          <td><input id="hikari_shimki" type="number" class="border rounded py-1 pl-2" v-model="edit_data.hikari_shinki" /></td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="hikari_tenyo">光転用</td>
          <td><input id="hikari_tenyo" type="number" class="border rounded py-1 pl-2" v-model="edit_data.hikari_tenyo" /></td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="hikari_henko">光事業者変更</td>
          <td><input id="hikari_henko" type="number" class="border rounded py-1 pl-2" v-model="edit_data.hikari_henko" /></td>
        </tr>
      </table>
      <button @click="edit_comit" class="rounded-lg bg-red-400 text-white font-semibold py-2 px-6 my-2">編集確定</button>
    </modal>
  </div>
</template>

<script>

// import Vue from 'vue'
import VueJsonToCsv from "vue-json-to-csv"; // eslint-disable-line
import { firestore } from "~/plugins/firebase.js";

export default {
  name: "CsvDownload",
  data() {
    return {
      labels: {},
      json_data: [],
      columns: [
        {
          field: "company",
          label: "代理店名",
          width: "8.5%",
        },
        {
          field: "shopname",
          label: "ショップ名",
          width: "8.5%",
        },
        {
          field: "pi",
          label: "PI",
          width: "8.5%",
        },
        {
          field: "hstab",
          label: "HS/タブレット",
          // type: 'number',
          width: "8.5%",
        },
        {
          field: "migration",
          label: "マイグレ",
          width: "8.5%",
        },
        {
          field: "smtab",
          label: "スマタブ総販",
          width: "8.5%",
        },
        {
          field: "dcard_gold",
          label: "dカードGOLD",
          width: "8.5%",
        },
        {
          field: "dcard_regu",
          label: "dカードレギュラー",
          width: "8.5%",
        },
        {
          field: "hikari_shinki",
          label: "ドコモ光新規",
          width: "8.5%",
        },
        {
          field: "hikari_tenyo",
          label: "ドコモ光転用",
          width: "8.5%",
        },
        {
          field: "hikari_henko",
          label: "ドコモ光事業者変更",
          width: "8.5%",
        },
        {
          field: "edit",
          label: "",
          width: "8.5%",
        },
      ],
      rows: [],
      edit_data: {
          shop_id: "",
          shopname: "",
          pi: "",
          hstab: "",
          migration: "",
          smtab: "",
          dcard_regu: "",
          dcard_gold: "",
          hikari_shinki: "",
          hikari_tenyo: "",
          hikari_henko: "",
        },
    };
  },
  components: {
    VueJsonToCsv,
  },
  methods: {
    setShopInfo() {
      var today = new Date()
      var year = today.getFullYear();
      var month = today.getMonth() + 1;

      // 全部セットする時
      // self.rows.forEach(el => {
      //     firestore().collection(`shops`).doc(`${el.shop_id}/${year}_${month}/marks`).set({
      //       shop_id: el.shop_id,
      //       company: el.company,
      //       shopname: el.shopname,
      //       pi: el.pi,
      //       hstab: el.hstab,
      //       migration: el.migration,
      //       smtab: el.smtab,
      //       dcard_gold: el.dcard_gold,
      //       dcard_regu: el.dcard_regu,
      //       hikari_shinki: el.hikari_shinki,
      //       hikari_tenyo: el.hikari_tenyo,
      //       hikari_henko: el.hikari_henko,
      //     }).then(() => {
      //         console.log("Document successfully written!");
      //     })
      //     .catch((error) => {
      //         console.error("Error writing document: ", error);
      //     });
      // });


      firestore().collection(`shops`).doc(`${this.edit_data.shop_id}`).set({
        pi: this.edit_data.pi,
        hstab: this.edit_data.hstab,
        migration: this.edit_data.migration,
        smtab: this.edit_data.smtab,
        dcard_gold: this.edit_data.dcard_gold,
        dcard_regu: this.edit_data.dcard_regu,
        hikari_shinki: this.edit_data.hikari_shinki,
        hikari_tenyo: this.edit_data.hikari_tenyo,
        hikari_henko: this.edit_data.hikari_henko,
      }).then(() => {
          console.log("Document successfully written!");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });

      firestore().collection(`shops`).doc(`${this.edit_data.shop_id}/${year}_${month}/marks`).set({
        pi: this.edit_data.pi,
        hstab: this.edit_data.hstab,
        migration: this.edit_data.migration,
        smtab: this.edit_data.smtab,
        dcard_gold: this.edit_data.dcard_gold,
        dcard_regu: this.edit_data.dcard_regu,
        hikari_shinki: this.edit_data.hikari_shinki,
        hikari_tenyo: this.edit_data.hikari_tenyo,
        hikari_henko: this.edit_data.hikari_henko,
      }).then(() => {
          console.log("Document successfully written!");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });
    },

    show() {
      this.$modal.show("modal-content");
    },

    hide() {
      this.$modal.hide("modal-content");
    },

    editRow(row) {
        (this.edit_data.shop_id = row.shop_id),
        (this.edit_data.shopname = row.shopname),
        (this.edit_data.pi = row.pi),
        (this.edit_data.hstab = row.hstab),
        (this.edit_data.migration = row.migration),
        (this.edit_data.smtab = row.smtab),
        (this.edit_data.dcard_regu = row.dcard_regu),
        (this.edit_data.dcard_gold = row.dcard_gold),
        (this.edit_data.hikari_shinki = row.hikari_shinki),
        (this.edit_data.hikari_tenyo = row.hikari_tenyo),
        (this.edit_data.hikari_henko = row.hikari_henko),
        console.log(this.edit_pi, "EDIT");
        this.show();
    },

    edit_comit() {
      var yesno = confirm('本当に編集しますか？')

      if(yesno) {
        this.$store.commit("editShopInfo", this.edit_data);
        this.setShopInfo();
      }
        this.hide();
        this.getShopsData()
        // 配列更新 強制発火
        this.rows.splice();
    },
    getShopsData() {
        this.rows = this.$store.state.shops;
    },
    download() {
      // ラベル
      this.labels = {
        company: { title: "代理店名" },
        shopname: { title: "ショップ名" },
        pi: { title: "PI" },
        hstab: { title: "HS/タブレット" },
        migration: { title: "マイグレ" },
        smtab: { title: "スマタブ総販" },
        dcard_regu: { title: "スマタブ総販" },
        dcard_gold: { title: "dカードレギュラー" },
        hikari_shinki: { title: "ドコモ光新規" },
        hikari_tenyo: { title: "ドコモ光転用" },
        hikari_henko: { title: "ドコモ光事業者変更" },
      };

      // データ
      this.json_data = this.rows;
    },
  },
  // middleware({ store }) {
  //   store.dispatch('getShopsInfo')
  // },
  mounted() {
    this.getShopsData()
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