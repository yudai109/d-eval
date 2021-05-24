<template>
    <div>
        <div class="mt-10">
        <h2 class="uppercase font-bold text-2xl mb-6 pb-6 border-b-2">
            出勤簿
        </h2>
        <EmployeeTab />
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
        </vue-good-table>
    </div>

    <modal name="modal-content"
        height="auto"
        :width="350"
        :adaptive="true"
        class="fixd top-10">
        <h2 class="text-gray-600 font-semibold text-lg my-2">
            {{ edit_data.createdAt }}
        </h2>
        <table class="mx-auto">
            <tr>
                <td class="pr-2 py-2 font-semibold text-gray-600" for="createdAt">日時</td>
                <td>
                    <input
                    id="createdAt"
                    type="datetime-local"
                    value="datetime"
                    class="border rounded py-1 pl-2"
                    v-model="edit_data.createdAt"
                    />
                </td>
            </tr>
            <tr>
                <td class="pr-2 py-2 font-semibold text-gray-600" for="latitude">
                    緯度
                </td>
                <td>
                    <p
                    id="latitude"
                    class="border rounded py-1 pl-2 text-gray-300"
                    >{{ edit_data.latitude }}</p>
                </td>
            </tr>
            <tr>
                <td class="pr-2 py-2 font-semibold text-gray-600" for="longtitude">
                    経度
                </td>
                <td>
                    <p
                    id="longtitude"
                    class="border rounded py-1 pl-2 text-gray-300"
                    >{{ edit_data.longtitude }}</p>
                </td>
            </tr>
            <tr>
                <td class="pr-2 py-2 font-semibold text-gray-600" for="status">
                    出退勤
                </td>
                <td>
                    <p
                    id="status"
                    class="border rounded py-1 pl-2 text-gray-300"
                    >{{ edit_data.status }}</p>
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
import VueCtkDateTimePicker from "vue-ctk-date-time-picker"; // eslint-disable-line
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
          field: "latitude",
          label: "緯度",
        },
        {
          field: "longtitude",
          label: "経度",
        },
        {
          field: "status",
          label: "出勤/退勤",
        },
        {
          field: "edit",
          label: "編集",
        },
      ],
      rows: [],
      edit_data: {
        doc_id: "",
        createdAt: "",
        latitude: "",
        longtitude: "",
        status: "",
      },
    };
  },
  components: {
    VueJsonToCsv,
    VueCtkDateTimePicker,

  },
  middleware({ store }) {
      store.dispatch('getRepoData', {career_type: "clock"})
  },
  methods: {
    setRepoData() {
    //   var today = new Date();
    //   var year = today.getFullYear();
    //   var month = today.getMonth() + 1;

        var self = this;
        var current_user = auth().currentUser;
        var clock_data_doc = firestore().doc(
            `users/${current_user.uid}/ClockInOut/${self.edit_data.doc_id}`
        );

    clock_data_doc.update({
            createdAt: firestore.Timestamp.fromDate(new Date(self.edit_data.createdAt))
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
        (this.edit_data.createdAt = row.createdAt),
        (this.edit_data.latitude = row.latitude),
        (this.edit_data.longtitude = row.longtitude),
        (this.edit_data.status = row.status),
        console.log(this.edit_data.doc_id, "EDIT");
      this.show();
    },

    edit_comit() {
      var yesno = confirm("本当に編集しますか？");

      if (yesno) {
        //   ※※※※ここ書き換える
        console.log(this.edit_data)
        this.$store.commit("editRepoData", {edit_data: this.edit_data, career_type: 'clock'});
        this.setRepoData(this.edit_data);
      }
      this.hide();
    //   this.getReportData();
        // 配列更新 強制発火
        this.rows.splice();
    },
    
    getReportData() {
        this.rows = this.$store.state.clock_reports;
    },
    download() {
      // ラベル
      this.labels = {
        createdAt: { title: "打刻日時" },
        latitude: { title: "緯度" },
        longtitude: { title: "経度" },
        status: { title: "出勤/退勤" },
      };

      // データ
      this.json_data = this.rows;
    },
  },
  mounted() {
    this.getReportData();
  },
  beforeDestroy() {
    this.$store.commit('resetRepoData', {career_type: "clock"})
  }
};
</script>

<style>
.vgt-selection-info-row {
  padding-top: 30px;
  padding-bottom: 30px;
}

.vgt-global-search {
    border-radius: 5px 5px 0 0 ;
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