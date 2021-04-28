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
      @click.once="setRepoData"
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
      <h2 class="text-gray-600 font-semibold text-lg my-2">
        {{ edit_data.shopname }}
      </h2>
      <table class="mx-auto">
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="shop">店舗名</td>
          <td>
            <input
              id="shop"
              type="text"
              class="border rounded py-1 pl-2"
              v-model="edit_data.shop"
            />
          </td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="attend">
            訪問先
          </td>
          <td>
            <input
              id="attend"
              type="text"
              class="border rounded py-1 pl-2"
              v-model="edit_data.attend"
            />
          </td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="skp_type">
            手段
          </td>
          <td>
            <input
              id="skp_type"
              type="text"
              class="border rounded py-1 pl-2"
              v-model="edit_data.skp_type"
            />
          </td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="smtab">
            活動内容
          </td>
          <td>
            <textarea name="" id="smtab" cols="50" rows="4" class="border rounded py-1 pl-2" v-model="edit_data.activity_repo"></textarea>
          </td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="dcard_gold">
            所感
          </td>
          <td>
            <textarea name="" id="smtab" cols="50" rows="4" class="border rounded py-1 pl-2" v-model="edit_data.impression_repo"></textarea>
          </td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="dcard_regu">
            要望など
          </td>
          <td>
            <textarea name="" id="smtab" cols="50" rows="4" class="border rounded py-1 pl-2" v-model="edit_data.request_repo"></textarea>
          </td>
        </tr>
        <tr>
          <td class="pr-2 py-2 font-semibold text-gray-600" for="hikari_shimki">
            競合情報
          </td>
          <td>
            <textarea name="" id="smtab" cols="50" rows="4" class="border rounded py-1 pl-2" v-model="edit_data.conflict_repo"></textarea>
          </td>
        </tr>
      </table>
      <button
        @click="edit_comit"
        class="rounded-lg bg-red-400 text-white font-semibold py-2 px-6 my-2"
      >
        編集確定
      </button>
    </modal>
  </div>
</template>

<script>
// import Vue from 'vue'
import VueJsonToCsv from "vue-json-to-csv"; // eslint-disable-line
import { firestore } from "~/plugins/firebase.js";
import { auth } from "~/plugins/firebase.js";

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
          field: "attend",
          label: "訪問先",
        },
        {
          field: "skp_type",
          label: "手段",
        },
        {
          field: "activity_repo",
          label: "活動内容",
        },
        {
          field: "impression_repo",
          label: "所感",
        },
        {
          field: "request_repo",
          label: "要望など",
        },
        {
          field: "conflict_repo",
          label: "競合情報",
        },
        {
          field: "edit",
          label: "編集",
        },
      ],
      rows: [],
      edit_data: {
        shop: "",
        attend: "",
        skp_type: "",
        username: "",
        activity_repo: "",
        impression_repo: "",
        request_repo: "",
        conflict_repo: "",
      },
    };
  },
  components: {
    VueJsonToCsv,
  },
  methods: {
    setRepoData() {
    //   var today = new Date();
    //   var year = today.getFullYear();
    //   var month = today.getMonth() + 1;

        var self = this;
      var current_user = auth().currentUser;
      var skp_repo_col = firestore().doc(
        `users/${current_user.uid}/skp_repo/${self.edit_data.doc_id}`
      );

    skp_repo_col.update({
            shop: self.edit_data.shop,
            attend: self.edit_data.attend,
            skp_type: self.edit_data.skp_type,
            username: self.edit_data.username,
            activity_repo: self.edit_data.activity_repo,
            impression_repo: self.edit_data.impression_repo,
            request_repo: self.edit_data.request_repo,
            conflict_repo: self.edit_data.conflict_repo,
        })
        .then(() => {
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
        (this.edit_data.doc_id = row.doc_id),
        (this.edit_data.shop = row.shop),
        (this.edit_data.attend = row.attend),
        (this.edit_data.skp_type = row.skp_type),
        (this.edit_data.username = row.username),
        (this.edit_data.activity_repo = row.activity_repo),
        (this.edit_data.impression_repo = row.impression_repo),
        (this.edit_data.request_repo = row.request_repo),
        (this.edit_data.conflict_repo = row.conflict_repo),
        console.log(this.edit_data.doc_id, "EDIT");
      this.show();
    },

    edit_comit() {
      var yesno = confirm("本当に編集しますか？");

      if (yesno) {
        //   ※※※※ここ書き換える
        this.$store.commit("editRepoData", this.edit_data);
        this.setRepoData(this.edit_data);
      }
      this.hide();
      this.getReportData();
      // 配列更新 強制発火
      this.rows.splice();
    },
    
    getReportData() {
      this.rows = this.$store.state.reports;
    },
    download() {
      // ラベル
      this.labels = {
        createdAt: { title: "報告日" },
        shop: { title: "ショップ名" },
        attend: { title: "訪問先" },
        skp_type: { title: "手段" },
        activity_repo: { title: "活動内容" },
        impression_repo: { title: "所感" },
        request_repo: { title: "要望" },
        conflict_repo: { title: "競合情報" },
      };

      // データ
      this.json_data = this.rows;
    },
  },
  created() {
    this.getReportData();
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