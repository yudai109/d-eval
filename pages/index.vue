<template>
  <div class="bg-gray-100 text-gray-600 mb-40">
    <div class="relative bg-green-600 md:pt-32 pb-32 pt-12">
      <div class="px-4 md:px-10 mx-auto w-full">
        <div>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
              >
                <div class="flex-auto p-4">
                  <div class="flex flex-wrap">
                    <div
                      class="relative w-full pr-4 max-w-full flex-grow flex-1 text-left"
                    >
                      <h5 class="uppercase font-bold text-xs">
                        現在の評価ランク
                      </h5>
                      <span class="font-semibold text-3xl">{{ V_rank }}</span>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                      <div
                        class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500"
                      >
                        <i class="far fa-chart-bar"></i>
                      </div>
                    </div>
                  </div>
                  <p class="text-sm mt-4">
                    <span class="mr-2 text-emerald-500"
                      >評価点：{{ V_value }}</span
                    ><span class="whitespace-nowrap text-gray-400"
                      >次のランクまで：{{ V_next_value }}</span
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
              >
                <div class="flex-auto p-4">
                  <div class="flex flex-wrap">
                    <div
                      class="relative w-full pr-4 max-w-full flex-grow flex-1 text-left"
                    >
                      <h5 class="uppercase font-bold text-xs">定性評価</h5>
                      <span class="font-semibold text-3xl">{{ Q_rank }}</span>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                      <div
                        class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-gray-500"
                      >
                        <i class="fas fa-users"></i>
                      </div>
                    </div>
                  </div>
                  <p class="text-sm mt-4">
                    <span class="mr-2 text-gry-600">評価点：{{ Q_value }}</span
                    ><span class="whitespace-nowrap text-gray-400"
                      >次のランクまで：{{ V_next_value }}</span
                    >
                  </p>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
              <div
                class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
              >
                <div class="flex-auto p-4">
                  <div class="flex flex-wrap">
                    <div
                      class="relative w-full pr-4 max-w-full flex-grow flex-1 text-left"
                    >
                      <h5 class="uppercase font-bold text-xs">SALES</h5>
                      <span class="font-semibold text-3xl">924</span>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                      <div
                        class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500"
                      >
                        <i class="fas fa-users"></i>
                      </div>
                    </div>
                  </div>
                  <p class="text-sm mt-4">
                    <span class="mr-2 text-orange-500"
                      ><i class="fas fa-arrow-down"></i> 1.10% </span
                    ><span class="whitespace-nowrap">Since yesterday</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
              <div>
                <div
                  class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
                >
                  <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                      <div
                        class="relative w-full pr-4 max-w-full flex-grow flex-1 text-left"
                      >
                        <h5 class="uppercase font-bold text-xs">PERFORMANCE</h5>
                        <span class="font-semibold text-3xl">49,65%</span>
                      </div>
                      <div class="relative w-auto pl-4 flex-initial">
                        <div
                          class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-500"
                        >
                          <i class="fas fa-percent"></i>
                        </div>
                      </div>
                    </div>
                    <p class="text-sm mt-4">
                      <span class="mr-2 text-emerald-500"
                        ><i class="fas fa-arrow-up"></i> 12% </span
                      ><span class="whitespace-nowrap">Since last month</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 下半分 -->
    <div class="md:px-10 mx-auto w-full -m-24">
      <div>
        <div class="flex flex-wrap">
          <!-- 線グラフ -->
          <LineChart />
          <!-- 獲得進捗率 -->
          <Performance />
        </div>

        <div class="flex flex-wrap mb-60">
          <NumberTable class="w-full xl:w-8/12" />
          <Social class="xl:w-4/12" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import Social from "../components/Social.vue";
import { auth } from "~/plugins/firebase.js";
import { firestore } from "~/plugins/firebase.js";
import Performance from "../components/Performance.vue";

export default {
  components: { Social, Performance },
  middleware: "getUserInfo",
  data() {
    return {
      V_rank: "",
      V_value: 0,
      V_next_value: 0,
      Q_rank: "",
      Q_value: 0,
      Q_next_value: 0,
    };
  },
  transition(to, from) {
    if (!from) {
      return "slide-left";
    }
    return +to.query.page < +from.query.page ? "slide-right" : "slide-left";
  },
  methods: {
    setDefault: function () {
      var self = this;
      var current_user = auth().currentUser;
      var user_doc = firestore().doc(`users/${current_user.uid}`);

      user_doc.get().then((user) => {
        self.Q_rank = user.data().Q_rank;
        self.V_rank = user.data().V_rank;
      });
    },
  },

};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  display: inherit;
  position: absolute;
  margin: 0;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}

@media (min-width: 768px) {
  .container {
    width: 100%;
  }
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

/* .home-enter-active, .home-leave-active { transition: opacity 2.0s; }
  .home-enter, .home-leave-active { opacity: 0; } */
</style>
