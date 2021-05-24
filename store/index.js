import { auth } from "~/plugins/firebase.js";
import { firestore } from "~/plugins/firebase.js";
import axios from "axios";

export const strict = false;

export const state = () => ({
  user: null,
  username: "",
  useremail: "",
  shops: [],
  skp_data: [],
  docomo_reports: [],
  skp_reports: [],
  ocn_reports: [],
  trans_reports: [],
  clock_reports: [],
  rows: [],
  kojin_data: [],
  shop_data: [],
});

// --------------------
// mutation
// --------------------
export const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },
  setUserinfo(state, userinfos) {
    state.username = userinfos.username;
    state.useremail = userinfos.useremail;
  },
  skpSetData(state, result_array) {
    result_array.forEach(item => {
      state.rows.push(item);
    });
  },
  setShopsInfo(state, datas) {
    datas.forEach(data => {
      state.shops.push(data);
    });
  },
  addTransData(state, add_trans_reports) {
    state.trans_reports.push(add_trans_reports);
  },
  setReportData(state, { repo_datas, career_type }) {
    if (career_type === "skp") {
      repo_datas.forEach(repo_data => {
        state.skp_reports.push(repo_data);
      });
    } else if (career_type === "ocn") {
      repo_datas.forEach(repo_data => {
        state.ocn_reports.push(repo_data);
      });
    } else if (career_type === "docomo") {
      repo_datas.forEach(repo_data => {
        state.docomo_reports.push(repo_data);
      });
    } else if (career_type === "trans") {
      repo_datas.forEach(repo_data => {
        state.trans_reports.push(repo_data);
      });
    } else if (career_type === "clock") {
      repo_datas.forEach(repo_data => {
        state.clock_reports.push(repo_data);
      });
    }
  },

  setKojinData(state, {kojin_data}) {
    for (let key in kojin_data) {
      console.log(kojin_data[key])
      state.kojin_data.push(kojin_data[key])
    }
  },

  resetRepoData(state, { career_type }) {
    if (career_type === "skp") {
      state.skp_reports.splice(0);
    } else if (career_type === "ocn") {
      state.ocn_reports.splice(0);
    } else if (career_type === "docomo") {
      state.docomo_reports.splice(0);
    } else if (career_type === "trans") {
      state.trans_reports.splice(0);
    } else if (career_type === "clock") {
      state.clock_reports.splice(0);
    }
  },

  editShopInfo(state, edit_data) {
    var index = state.shops.findIndex(el => el.shopname === edit_data.shopname);
    state.shops[index].pi = edit_data.pi;
    state.shops[index].hstab = edit_data.hstab;
    state.shops[index].migration = edit_data.migration;
    state.shops[index].smtab = edit_data.smtab;
    state.shops[index].dcard_gold = edit_data.dcard_gold;
    state.shops[index].dcard_regu = edit_data.dcard_regu;
    state.shops[index].hikari_shinki = edit_data.hikari_shinki;
    state.shops[index].hikari_tenyo = edit_data.hikari_tenyo;
    state.shops[index].hikari_henko = edit_data.hikari_henko;
  },

  editRepoData(state, { edit_data, career_type }) {
    if (career_type === "skp") {
      var index = state.skp_reports.findIndex(
        el => el.doc_id === edit_data.doc_id
      );
      console.log(index);
      state.skp_reports[index].shop = edit_data.shop;
      state.skp_reports[index].attend = edit_data.attend;
      state.skp_reports[index].method = edit_data.method;
      state.skp_reports[index].username = edit_data.username;
      state.skp_reports[index].activity_repo = edit_data.activity_repo;
      state.skp_reports[index].impression_repo = edit_data.impression_repo;
      state.skp_reports[index].request_repo = edit_data.request_repo;
      state.skp_reports[index].conflict_repo = edit_data.conflict_repo;
    } else if (career_type === "ocn") {
      var index = state.ocn_reports.findIndex(
        el => el.doc_id === edit_data.doc_id
      );
      console.log(index);
      state.ocn_reports[index].shop = edit_data.shop;
      state.ocn_reports[index].attend = edit_data.attend;
      state.ocn_reports[index].method = edit_data.method;
      state.ocn_reports[index].username = edit_data.username;
      state.ocn_reports[index].activity_repo = edit_data.activity_repo;
      state.ocn_reports[index].impression_repo = edit_data.impression_repo;
      state.ocn_reports[index].request_repo = edit_data.request_repo;
      state.ocn_reports[index].conflict_repo = edit_data.conflict_repo;
    } else if (career_type === "clock") {
      var index = state.clock_reports.findIndex(
        el => el.doc_id === edit_data.doc_id
      );
      console.log(index);
      var date = new Date(edit_data.createdAt)
      var month = date.getMonth() + 1;
      var date_ = date.getDate();
      var hour = date.getHours();
      var min = date.getMinutes();
      var sec = date.getSeconds();
      state.clock_reports[index].createdAt = `${month}月${date_}日 ${hour}:${min}:${sec}`;
    }
  },

  editTransData(state, {edit_data}) {
    var index = state.trans_reports.findIndex(el => el.shopname === edit_data.shopname);
    state.trans_reports[index].date = edit_data.date;
    state.trans_reports[index].shop = edit_data.shop;
    state.trans_reports[index].useremail = edit_data.useremail;
    state.trans_reports[index].start_place = edit_data.start_place;
    state.trans_reports[index].end_place = edit_data.end_place;
    state.trans_reports[index].transportation = edit_data.transportation;
    state.trans_reports[index].charge = edit_data.charge;
    state.trans_reports[index].car_dist = edit_data.car_dist;
    state.trans_reports[index].etc_charge = edit_data.etc_charge;
    state.trans_reports[index].note = edit_data.note;
  },
};

// --------------------
// actions
// --------------------
export const actions = {
  // 個人レポート情報
  getRepoData({ commit }, { career_type }) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;

    var self = this;
    var CurrentUser = auth().currentUser;
    var repo_col = firestore().collection(
      `users/${CurrentUser.uid}/${career_type}_repo`
    );
    var repo_datas = [];

    if (career_type == "skp" || career_type == "ocn") {
      console.log(career_type);
      repo_col
        .get()
        .then(qs => {
          qs.forEach(doc => {
            var date = doc.data().createdAt.toDate();
            var month = date.getMonth() + 1;
            var date_ = date.getDate();
            var hour = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();

            var repo_data = {};
            repo_data.doc_id = doc.id;
            repo_data.createdAt = `${month}月${date_}日 ${hour}:${min}:${sec}`;
            repo_data.shop = doc.data().shop;
            repo_data.attend = doc.data().attend;
            repo_data.method = doc.data().method;
            repo_data.username = doc.data().username;
            repo_data.activity_repo = doc.data().activity_repo;
            repo_data.impression_repo = doc.data().impression_repo;
            repo_data.request_repo = doc.data().request_repo;
            repo_data.conflict_repo = doc.data().conflict_repo;
            repo_datas.push(repo_data);
          });
        })
        .then(() => {
          self.commit("setReportData", {
            repo_datas: repo_datas,
            career_type: career_type
          });
        });
    } else if (career_type == "docomo") {
      console.log(career_type);
      repo_col
        .get()
        .then(qs => {
          qs.forEach(doc => {
            var date = doc.data().createdAt.toDate();
            var month = date.getMonth() + 1;
            var date_ = date.getDate();
            var hour = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();

            var repo_data = {};
            repo_data.doc_id = doc.id;
            repo_data.createdAt = `${month}月${date_}日 ${hour}時${min}分${sec}秒`;
            repo_data.username = doc.data().username;
            repo_data.shop = doc.data().shop;
            repo_data.negotiation = doc.data().negotiation;
            repo_data.customer = doc.data().customer;
            repo_data.hs = doc.data().hs;
            repo_data.pi = doc.data().pi;
            repo_data.migration = doc.data().migration;
            repo_data.st_total = doc.data().st_total;
            repo_data.dcard_regu = doc.data().dcard_regu;
            repo_data.dcard_gold = doc.data().dcard_gold;
            repo_data.hikari_shinki = doc.data().hikari_shinki;
            repo_data.hikari_henko = doc.data().hikari_henko;
            repo_data.hikari_tenyo = doc.data().hikari_tenyo;
            repo_data.isp = doc.data().isp;
            repo_data.tvop = doc.data().tvop;
            repo_data.skp_cs = doc.data().skp_cs;
            repo_data.skp_ic = doc.data().skp_ic;
            repo_data.skp_koji = doc.data().skp_koji;
            repo_datas.push(repo_data);
          });
        })
        .then(() => {
          self.commit("setReportData", {
            repo_datas: repo_datas,
            career_type: career_type
          });
        });
    } else if (career_type == "trans") {
      var TransExpDoc = firestore().collection(
        `trans_repo/${year}_${month}/${CurrentUser.uid}`
      );
      console.log(career_type);
      TransExpDoc.get()
        .then(qs => {
          qs.forEach(doc => {
            var repo_data = {};
            repo_data.doc_id = doc.id;
            repo_data.createdAt = doc.data().createdAt;
            repo_data.date = doc.data().date;
            repo_data.useremail = doc.data().useremail;
            repo_data.shop = doc.data().shop;
            repo_data.start_place = doc.data().start_place;
            repo_data.end_place = doc.data().end_place;
            repo_data.transportation = doc.data().transportation;
            repo_data.charge = doc.data().charge;
            repo_data.car_dist = doc.data().car_dist;
            repo_data.etc_charge = doc.data().etc_charge;
            repo_data.note = doc.data().note;
            repo_datas.push(repo_data);
          });
        })
        .then(() => {
          self.commit("setReportData", {
            repo_datas: repo_datas,
            career_type: career_type
          });
        });
    } else if (career_type == "clock") {
      var ClockCol = firestore().collection(
        `users/${CurrentUser.uid}/ClockInOut`
      );
      ClockCol.get()
        .then(qs => {
          qs.forEach(doc => {
            var date = doc.data().createdAt.toDate();
            var month = date.getMonth() + 1;
            var date_ = date.getDate();
            var hour = date.getHours();
            var min = date.getMinutes();
            var sec = date.getSeconds();

            var repo_data = {};
            repo_data.doc_id = doc.id;
            repo_data.createdAt = `${month}月${date_}日 ${hour}:${min}:${sec}`;
            repo_data.latitude = doc.data().latitude;
            repo_data.longtitude = doc.data().longtitude;
            repo_data.status = doc.data().status;
            repo_datas.push(repo_data);
          });
        })
        .then(() => {
          self.commit("setReportData", {
            repo_datas: repo_datas,
            career_type: career_type
          });
      });
    }
  },

  // 全ショップ情報
  getShopsInfo() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;

    var self = this;
    var shopsCol = firestore().collection(`shops`);
    var datas = [];

    shopsCol
      .get()
      .then(qs => {
        qs.forEach(doc => {
          var shops_data = {};
          var MarksDoc = firestore().doc(
            // `shops/${doc.id}/${year}_${month}/marks`
            `shops/${doc.id}/${year}_4/marks`
          );
          MarksDoc.get().then(el => {
            shops_data.shop_id = el.data().shop_id;
            shops_data.company = el.data().company;
            shops_data.shopname = el.data().shopname;
            shops_data.pi = el.data().pi;
            shops_data.hstab = el.data().hstab;
            shops_data.migration = el.data().migration;
            shops_data.smtab = el.data().smtab;
            shops_data.dcard_gold = el.data().dcard_gold;
            shops_data.dcard_regu = el.data().dcard_regu;
            shops_data.hikari_shinki = el.data().hikari_shinki;
            shops_data.hikari_tenyo = el.data().hikari_tenyo;
            shops_data.hikari_henko = el.data().hikari_henko;
          });
          datas.push(shops_data);
        });
      })
      .then(() => {
        self.commit("setShopsInfo", datas);
      });
  },

  signUp({ email, password }) {
    return auth().createUserWithEmailAndPassword(email, password);
  },

  signInWithEmail({ commit }, { email, password }) {
    return auth().signInWithEmailAndPassword(email, password);
  },

  signOut() {
    return auth().signOut();
  },

  getUserInfo() {
    var self = this;
    var CurrentUser = auth().currentUser;
    var UserDoc = firestore().doc(`users/${CurrentUser.uid}`);

    UserDoc.get().then(function(doc) {
      var username = doc.data().username;
      var usermail = doc.data().email;

      var userinfos = {
        username: username,
        useremail: usermail
      };
      self.commit("setUserinfo", userinfos);
    });
  },

  async getSkpData() {
    var self = this;
    var result_array = [];
    var _result = await this.$axios.$get(`/api/get_skp_info`);

    _result.forEach(item => {
      var rows_data = {};
      rows_data.id = item[0];
      rows_data.time = item[1];
      rows_data.code = item[2];
      rows_data.tantou = item[3];
      rows_data.area = item[4];
      rows_data.shop = item[5];
      rows_data.shiten = item[6];
      rows_data.adaputer = item[7];
      rows_data.skp_kokyaku = item[8];
      rows_data.package = item[9];
      result_array.push(rows_data);
    });

    await self.commit("skpSetData", result_array);
  },

  addTransData({ commit }, { trans_data }) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;

    var self = this;
    var CurrentUser = auth().currentUser;
    var TransExpCol = firestore().collection(
      `trans_repo/${year}_${month}/${CurrentUser.uid}`
    );

    TransExpCol.add({
      createdAt: trans_data.createdAt,
      date: trans_data.date,
      shop: trans_data.shop,
      useremail: trans_data.useremail,
      start_place: trans_data.start_place,
      end_place: trans_data.end_place,
      transportation: trans_data.transportation,
      charge: trans_data.charge,
      car_dist: trans_data.car_dist,
      etc_charge: trans_data.etc_charge,
      note: trans_data.note
    }).then(() => {
      self.commit("addTransData", trans_data);
    });
  },

  editTransData({ commit }, { trans_data }) {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    
    var self = this;
    var CurrentUser = auth().currentUser;
    var EditDoc = firestore().doc(
      `trans_repo/${year}_${month}/${CurrentUser.uid}/${trans_data.doc_id}`
    );
    EditDoc.update({
      createdAt: trans_data.createdAt,
      date: trans_data.date,
      shop: trans_data.shop,
      useremail: trans_data.useremail,
      start_place: trans_data.start_place,
      end_place: trans_data.end_place,
      transportation: trans_data.transportation,
      charge: trans_data.charge,
      car_dist: trans_data.car_dist,
      etc_charge: trans_data.etc_charge,
      note: trans_data.note
    }).then(() => {
      self.commit("editTransData", trans_data);
    });
  },

  setKojinData: function() {
    var self = this;
    var current_user = auth().currentUser;
    var preformance_col = firestore().collection(`users/${current_user.uid}/Performance`)
    var kojin_data_brank = {};

    preformance_col.orderBy("createdAt", "desc").limit(1).get().then(qs => {
      qs.forEach(doc => {
            kojin_data_brank.negotiation_count =  doc.data().negotiation
            kojin_data_brank.customer_count =  doc.data().customer
            kojin_data_brank.hs_kojin =  doc.data().hs_kojin
            kojin_data_brank.pi_kojin =  doc.data().pi_kojin
            kojin_data_brank.migration_kojin =  doc.data().migration_kojin
            kojin_data_brank.st_total_kojin =  doc.data().st_total_kojin
            kojin_data_brank.dcard_gold_kojin =  doc.data().dcard_gold_kojin
            kojin_data_brank.dcard_regu_kojin =  doc.data().dcard_regu_kojin
            kojin_data_brank.hikari_kojin =  doc.data().hikari_kojin
            kojin_data_brank.hikari_tenyo_kojin =  doc.data().hikari_tenyo_kojin
            kojin_data_brank.hikari_henko_kojin =  doc.data().hikari_henko_kojin
            kojin_data_brank.hikari_ocn_kojin =  doc.data().hikari_ocn_kojin
            kojin_data_brank.tvop_kojin =  doc.data().tvop
            kojin_data_brank.skp_cs_kojin =  doc.data().skp_cs
            kojin_data_brank.skp_ic_kojin =  doc.data().skp_ic
            kojin_data_brank.sj_kouji_kojin =  doc.data().sj_kouji
        })
      })
      .then(() => {
        self.commit("setKojinData", {
          kojin_data: kojin_data_brank,
        })
      })
}
};

export const getters = {
  user(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return !!state.user;
  },
  getShops(state) {
    return state.shops;
  }
};
