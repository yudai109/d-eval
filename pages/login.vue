<template>
  <div class="login_conatiner w-5/6 mx-auto mt-14">
    <h2 class="text-2xl">ドコモ評価アプリ</h2>
    <div
      class="mt-5 sm:mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <div class="px-6 py-4">
        <h2
          class="text-3xl font-bold text-center text-gray-700 dark:text-white"
        >
          ログイン
        </h2>

        <form>
          <div class="w-full mt-4">
            <input
              v-model="login_email"
              class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="email"
              placeholder="Email"
              aria-label="Email Address"
            />
          </div>

          <div class="w-full mt-4">
            <input
              v-model="login_password"
              class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="password"
              placeholder="Password"
              aria-label="Password"
            />
          </div>

          <div class="flexitems-center justify-between mt-4">
            <button
              @click="signIn"
              class="w-full px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none"
              type="button"
            >
              ログイン
            </button>
          </div>
        </form>
      </div>

      <div
        class="flex items-center justify-center py-2 text-center bg-gray-100 dark:bg-gray-700"
      >
        <span class="text-sm text-gray-600 dark:text-gray-200"
          >パスワードを忘れた場合</span
        >
        <router-link
          to="/signup"
          href="#"
          class="mx-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500"
          >こちら→</router-link
        >
      </div>
      <div
        class="flex items-center justify-center py-2 text-center bg-gray-100 dark:bg-gray-700"
      >
        <span class="text-sm text-gray-600 dark:text-gray-200"
          >新規登録は</span
        >
        <router-link
          to="/register"
          href="#"
          class="mx-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500"
          >こちら→</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: "authLayout",
  data() {
    return {
      login_email: "",
      login_password: "",
    };
  },
  methods: {
    signIn: function (err) {
      this.$store
      .dispatch('signInWithEmail', {
          email: this.login_email,
          password: this.login_password,
      })
      .then(() => {
        this.login_email = '',
        this.login_password = '',
        this.$router.push({
          name: 'index'
        })
      })
      .catch((err) => {
        alert(err)
          // if(err.code === 'auth/user-disabled') {
          //   this.loginErrorMsg ='このアカウントはロックされています。'
          // } else {
          //   this.loginErrorMsg = 'メールアドレスまたはパスワードが間違っています。'
          // }
      })
    },
  },
};
</script>

<style>
</style>