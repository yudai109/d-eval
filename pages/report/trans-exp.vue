<template>
  <div>
    <div class="text-left ml-4 mt-10">
      <nuxt-link to="/report">
        <i class="far fa-arrow-alt-circle-left fa-2x text-gray-600"></i>
      </nuxt-link>
    </div>
    <div class="mt-4">
      <h2 class="uppercase font-bold text-2xl mb-6 pb-6 border-b-2">
        交通費 報告一覧
      </h2>
    </div>

    <div class="flex justify-center">
      <VueJsonToCsv
        :json-data="json_data"
        :labels="labels"
        class="hidden md:block"
      >
        <button @click="download" class="rounded-lg bg-blue-400 py-2 px-3 my-5">
          <b class="text-white">csvダウンロード</b>
        </button>
      </VueJsonToCsv>

      <div class="z-50 fixed bottom-28 right-8 md:static ml-3">
        <button
          @click="show('add_modal')"
          class="bg-yellow-500 rounded-full py-4 px-5 text-gray-700 md:rounded-lg md:py-2 md:px-3 md:my-5"
        >
          <i class="fas fa-plus"></i>
        </button>
      </div>
    </div>

    <div class="md:relative w-11/12 mx-auto mb-20">
      <vue-good-table
        :columns="columns"
        :rows="rows"
        max-height="900px"
        :fixed-header="false"
        :search-options="{
          enabled: true,
          trigger: '',
          skipDiacritics: true,
          placeholder: 'Search this table',
        }"
        :sort-options="{
          enabled: true,
        }"
      >
        <div slot="table-actions">
          <button class="mx-6 px-4 py-2 rounded-lg bg-yellow-500">関西</button>
        </div>

        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'edit'">
            <button
              class="bg-red-500 rounded-md py-1 px-3 text-gray-100 text-sm"
              @click="editRow('edit_modal', props.row)"
            >
              編集
            </button>
          </span>
        </template>
      </vue-good-table>
    </div>

    <!-- 登録モーダル -->
    <modal
      name="add_modal"
      height="auto"
      :width="350"
      :adaptive="true"
      class="fixd top-10"
    >
      <h2 class="text-gray-600 font-semibold text-lg my-2">交通費入力</h2>
      <p class="validate_text">{{ Validation.result }}</p>
      <table class="mx-auto">
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="smtab">
            報告日
          </td>
          <td>
            <input
              type="date"
              name=""
              id="smtab"
              class="border rounded py-1 pl-2"
              v-model="add_datas.date"
            />
          </td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="smtab">
            店舗名
          </td>
          <td>
            <v-select
              class="style-chooser"
              name="shop"
              :options="shops"
              v-model="add_datas.shop"
            ></v-select>
          </td>
        </tr>
        <tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="dcard_gold">
            出発地
          </td>
          <td>
            <input
              name=""
              id="start_place"
              class="border rounded py-1 pl-2"
              v-model="add_datas.start_place"
            />
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="dcard_gold">
            目的地
          </td>
          <td>
            <input
              name=""
              id="end_place"
              class="border rounded py-1 pl-2"
              v-model="add_datas.end_place"
            />
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="dcard_gold">
            交通手段
          </td>
          <td>
            <v-select 
              id="transportation"
              class="style-chooser"
              v-model="add_datas.transportation"
              :options="['電車', '車', '高速']">
            </v-select>
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="dcard_gold">
            金額
          </td>
          <td>
            <input
              name=""
              id="charge"
              class="border rounded py-1 pl-2"
              v-model="add_datas.charge"
            />
          </td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="dcard_regu">
            距離(車)
          </td>
          <td>
            <input
              name=""
              id="car_dist"
              class="border rounded py-1 pl-2"
              v-model="add_datas.car_dist"
            />
          </td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="hikari_shimki">
            ETC/高速
          </td>
          <td>
            <input
              name=""
              id="etc_charge"
              class="border rounded py-1 pl-2"
              v-model="add_datas.etc_charge"
            />
          </td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="hikari_shimki">
            備考
          </td>
          <td>
            <textarea
              name=""
              id="note"
              class="border rounded py-1 w-11/12"
              v-model="add_datas.note"
            ></textarea>
          </td>
        </tr>
      </table>
      <button
        @click="commitRow('add_datas')"
        class="rounded-lg bg-red-400 text-white font-semibold py-2 px-6 my-2"
      >
        登録する
      </button>
    </modal>

    <!-- 編集モーダル -->
    <modal
      name="edit_modal"
      height="auto"
      :width="350"
      :adaptive="true"
      class="fixd top-10"
    >
      <h2 class="text-gray-600 font-semibold text-lg my-2">交通費編集</h2>
      <p class="validate_text">{{ Validation.result }}</p>
      <table class="mx-auto">
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="smtab">
            報告日
          </td>
          <td>
            <input
              type="date"
              name=""
              id="smtab"
              class="border rounded py-1 pl-2"
              v-model="edit_datas.date"
            />
          </td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="smtab">
            店舗名
          </td>
          <td>
            <v-select
              class="style-chooser"
              name="shop"
              :options="shops"
              v-model="edit_datas.shop"
            ></v-select>
          </td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="dcard_gold">
            出発地
          </td>
          <td>
            <input
              name=""
              id="start_place"
              class="border rounded py-1 pl-2"
              v-model="edit_datas.start_place"
            />
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="dcard_gold">
            目的地
          </td>
          <td>
            <input
              name=""
              id="end_place"
              class="border rounded py-1 pl-2"
              v-model="edit_datas.end_place"
            />
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="dcard_gold">
            交通手段
          </td>
          <td>
            <v-select 
              id="transportation"
              class="style-chooser"
              v-model="edit_datas.transportation"
              :options="['電車', '車', '高速']">
            </v-select>
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="dcard_gold">
            金額
          </td>
          <td>
            <input
              name=""
              id="charge"
              class="border rounded py-1 pl-2"
              v-model="edit_datas.charge"
            />
          </td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="dcard_regu">
            距離(車)
          </td>
          <td>
            <input
              name=""
              id="car_dist"
              class="border rounded py-1 pl-2"
              v-model="edit_datas.car_dist"
            />
          </td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="hikari_shimki">
            ETC/高速
          </td>
          <td>
            <input
              name=""
              id="etc_charge"
              class="border rounded py-1 pl-2"
              v-model="edit_datas.etc_charge"
            />
          </td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="hikari_shimki">
            備考
          </td>
          <td>
            <textarea
              name=""
              id="note"
              class="border rounded py-1 w-11/12"
              v-model="edit_datas.note"
            ></textarea>
          </td>
        </tr>
      </table>
      <button
        @click="commitRow('edit_datas')"
        class="rounded-lg bg-red-400 text-white font-semibold py-2 px-6 my-2"
      >
        編集する
      </button>
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
      Validation: {
        result: "",
      },
      labels: {},
      json_data: [],
      shops: [],
      add_datas: {
        createdAt: firestore.FieldValue.serverTimestamp(),
        date: "",
        shop: "",
        useremail: this.$store.state.useremail,
        start_place: "",
        end_place: "",
        transportation: "",
        charge: "",
        car_dist: "0",
        etc_charge: "0",
        note: "-",
      },
      edit_datas: {
        doc_id: "",
        createdAt: firestore.FieldValue.serverTimestamp(),
        date: "",
        shop: "",
        useremail: this.$store.state.useremail,
        start_place: "",
        end_place: "",
        transportation: "",
        charge: "",
        car_dist: "0",
        etc_charge: "0",
        note: "-",
      },
      columns: [
        {
          field: "date",
          label: "報告日",
        },
        {
          field: "shop",
          label: "店舗名",
        },
        {
          field: "start_place",
          label: "出発地",
        },
        {
          field: "end_place",
          label: "目的地",
        },
        {
          field: "transportation",
          label: "交通手段",
        },
        {
          field: "charge",
          label: "金額",
        },
        {
          field: "car_dist",
          label: "距離(車)",
        },
        {
          field: "etc_charge",
          label: "ETC/高速",
        },
        {
          field: "note",
          label: "備考",
        },
        {
          field: "edit",
          label: "編集",
        },
      ],
      rows: [],
    };
  },
  components: {
    VueJsonToCsv,
  },
  methods: {
    editRow(modal_type, propsData) {
      var self = this;
      // doc_idの設定
      self.edit_datas.doc_id = propsData.doc_id
      for(let key in self.add_datas) {
        self.edit_datas[key] = propsData[key]
      }
      self.show(modal_type)
    },
    commitRow(commit_type) {
      var self = this;
      if(commit_type === "add_datas") {
        for (let key in self.add_datas) {
          console.log(key);
          console.log(`key:${key} ${self.add_datas[key]}`);
          if (self.add_datas[key] === null || self.add_datas[key] === "") {
            self.Validation.result = "※必須項目を入力してください";
            break;
          } else {
            this.$store.dispatch("addTransData", {
              trans_data: this.add_datas,
            });
            this.resetAddData();
            this.hide("add_modal");
            break;
          }
        }
      } else if (commit_type === "edit_datas") {
        for (let key in self.edit_datas) {
          if (self.edit_datas[key] === "") {
            self.Validation.result = "※必須項目を入力してください";
            break;
          } else {
            this.$store.dispatch("editTransData", {
              trans_data: self.edit_datas,
            });
            this.resetAddData();
            this.hide("edit_modal");
            break;
          }
        }
      }
    },
    getReportData() {
      this.rows = this.$store.state.trans_reports;
    },
    resetAddData() {
      this.add_datas.date = "";
      this.add_datas.shop = "";
      this.add_datas.useremail = "";
      this.add_datas.start_place = "";
      this.add_datas.end_place = "";
      this.add_datas.transportation = "";
      this.add_datas.charge = "";
      this.add_datas.car_dist = "";
      this.add_datas.etc_charge = "";
      this.add_datas.note = "";
    },
    download() {
      // ラベル
      this.labels = {
        createdAt: { title: "提出日" },
        date: { title: "報告日" },
        shop: { title: "店舗名" },
        useremail: { title: "名前" },
        start_place: { title: "出発地" },
        end_place: { title: "目的地" },
        transportation: { title: "交通手段" },
        charge: { title: "距離(車)" },
        car_dist: { title: "ETC/高速" },
        etc_charge: { title: "スマタブ総販" },
        note: { title: "備考" },
      };
      // データ
      this.json_data = this.rows;
    },
    show(modal_type) {
      console.log(modal_type)
      this.Validation.result = "";
      this.$modal.show(modal_type);
    },

    hide(modal_type) {
      this.$modal.hide(modal_type);
    },
  },
  created() {
    this.useremail = this.$store.state.useremail;
    this.$store.dispatch("getRepoData", { career_type: "trans" });
    this.getReportData();
  },
  mounted() {
    var shops = this.$store.getters.getShops;
    shops.forEach((info) => {
      this.shops.push(info.shopname);
    });
  },
  beforeDestroy() {
    this.$store.commit("resetRepoData", { career_type: "trans" });
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

.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  margin: 0;
  width: 100%;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 0.25rem;
  padding-left: 0.5rem;
  color: #394066;
  text-transform: lowercase;
  font-variant: small-caps;
}

.style-chooser .vs__selected-options {
  flex-wrap: nowrap;
}


.style-chooser .vs__selected {
  max-width:  100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

input[type="date"] {
  position: relative;
  padding: 0 10px;
  width: 200px;
  height: 36px;
  background: transparent;
  box-sizing: border-box;
  font-size: 14px;
  color: #999;
}

.validate_text {
  font-size: small;
  color: #ef4444;
}

/* CSSのズームさせない */
input {
  font-size: 16px;
  transform: scale(0.9);
}

</style>




