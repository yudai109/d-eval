<template>
  <div class="login_conatiner w-5/6">
    <h2 class="text-2xl">ドコモ評価アプリ</h2>
    <div
      class="mt-5 sm:mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <div class="px-6 py-4">
        <h2
          class="text-3xl font-bold text-center text-gray-700 dark:text-white"
        >
          新規登録
        </h2>

        <form>
          <div class="w-full mt-4">
            <input
              v-model="signup_email"
              class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="email"
              placeholder="Email"
              aria-label="Email Address"
            />
          </div>

          <div class="w-full mt-4">
            <input
              v-model="signup_password"
              class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="password"
              placeholder="Password"
              aria-label="Password"
            />
          </div>

          <div class="flexitems-center justify-between mt-4">
            <button
              @click="register"
              class="w-full px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none"
              type="button"
            >
              登録する
            </button>
          </div>
        </form>
      </div>

      <div
        class="flex items-center justify-center py-4 text-center bg-gray-100 dark:bg-gray-700"
      >
        <span class="text-sm text-gray-600 dark:text-gray-200"
          >ログインは</span
        >
        <router-link
          to="/login"
          href="#"
          class="mx-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500"
          >こちら→</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from '~/plugins/firebase.js'
import { firestore } from '~/plugins/firebase.js'

export default {
  layout: "authLayout",
  data() {
    return {
      signup_email: "",
      signup_password: "",
    };
  },
  methods: {
    register: function (err) {
      this.$store
      .dispatch('signUp', {
          email: this.signup_email,
          password: this.signup_password,
      })
      .then(() => {
        auth().onAuthStateChanged((user) =>{
            if (user) {
              // ユーザー情報追加
              firestore().doc(`users/${user.uid}`).set({
                  createdAt: firestore.FieldValue.serverTimestamp(),
                  uid: user.uid,
                  name: "",
                  email: user.email,
                  status: "退勤中",
                  Q_rank: "A",
                  V_rank: "B",
              }).then(() => {
                firestore().collection(`users/${user.uid}/Performance`).add({
                    createdAt: firestore.FieldValue.serverTimestamp(),
                    souhan_mokuhyou: 0,
                    hs_mokuhyou: 0,
                    raikyaku_daily: 0,
                    raikyaku_monthly: 0,
                    koekake_kojin: 0,
                    teian_kojin: 0,
                    hikari_kojin: 0,
                    hikari_henko_kojin: 0,
                    hikari_tenyo_kojin: 0,
                    hikari_ocn_kojin: 0,
                    hikari_tenpo: 0,
                    hikari_henko_tenpo: 0,
                    hikari_tenyo_tenpo: 0,
                    hikari_ocn_tenpo: 0,
                    tvop: 0,
                    sj_kouji: 0,
                    skp_cs: 0,
                    skp_ic: 0,
                    hs_kojin: 0,
                    pi_kojin: 0,
                    migration_kojin: 0,
                    st_total_kojin: 0,
                    hs_tenpo: 0,
                    pi_tenpo: 0,
                    migration_tenpo: 0,
                    st_total_tenpo: 0,
                    dcard_gold_kojin: 0,
                    dcard_regu_kojin: 0,
                    dcard_gold_tenpo: 0,
                    dcard_regu_tenpo: 0,
                })
              })
            }
            this.$router.push({ path: '/' })
        })
      })
      .then(() => {
        this.signup_email = '',
        this.signup_password = '',
        this.$router.push({
          name: 'index'
        })
      })
      .catch((err) => {
          alert(err)
      })
    },
  },
};

</script>

<style>
</style>