<template>
    <div class="bg-gray-100 text-gray-600 mb-40">
        <div class="relative bg-green-600 md:pt-32 pb-8 pt-8">
          <div class="px-4 md:px-10 mx-auto w-full">
            <EmployeeTab />
          </div>
        </div>

        <div class="mt-8">
            <p class="font-sans text-3xl font-semibold">{{ clockInOut_status }}中</p>
            <p class="mt-8 pt-8 mx-auto w-11/12 border-t font-sans text-4xl font-semibold">{{ date }}</p>
            <p class="mb-8 pb-8 pb-2 mx-auto w-11/12 border-b font-sans text-8xl font-semibold">{{ time }}</p>
        </div>

        <div v-if="clockInOut_status == '退勤'" Vclass="flex-auto text-center">
          <button @click.once="clockIn" type="submit" class="mx-auto mt-8 text-lg font-bold px-20 py-6 shadow-lg rounded block leading-normal bg-yellow-400">出勤する</button>
        </div>

        <div v-if="clockInOut_status == '出勤'" class="flex-auto text-center">
          <button @click.once="clockOut" type="submit" class="mx-auto mt-8 text-lg font-bold px-20 py-6 shadow-lg rounded block leading-normal bg-red-400">退勤する</button>
        </div>


        <!-- component -->
        <!-- This is an example component -->
        <div class="mt-10 flex items-center px-4">
            <div class='overflow-x-auto w-full mx-auto'>
                <!-- Table -->
                <table class='mx-auto max-w-4xl w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden'>
                    <thead class="bg-gray-300">
                        <tr class="text-gray-600 text-left">
                            <th class="font-semibold text-sm uppercase px-6 py-4">
                                項目
                            </th>
                            <th class="font-semibold text-sm uppercase px-6 py-4">
                                エラー件数
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr>
                            <td class="px-6 py-4">
                                <div class="flex items-center space-x-3">
                                    <div>
                                        <p class="text-red-600">
                                            打刻漏れ・打刻間違い
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                              <div class="flex items-center space-x-3">
                                <div>
                                  <p class="">
                                      {{ dakokumore }}件
                                  </p>
                                </div>
                              </div>
                            </td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4">
                                <div class="flex items-center space-x-3">
                                    <div>
                                        <p class="text-red-600">
                                            打刻エラー
                                        </p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4">
                              <div class="flex items-center space-x-3">
                                <div>
                                  <p class="">
                                      {{ dakokumore }}件
                                  </p>
                                </div>
                              </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    </div>
</template>

<script>
import { auth } from "~/plugins/firebase.js";
import { firestore } from "~/plugins/firebase.js";

export default {
  middleware: "getUserInfo",
  data() {
    return {
        date: '',
        time: '',
        dakokumore: 0,
        dakokumore: 0,
        time: '',
        clockInOut_status: '',
        week: ['（日）', '（月）', '（火）', '（水）', '（木）',  '（金）', '（土）'],
        latitude: 0,
        longtitude: 0,
    };
  },
  methods: {
    updateTime: function() {
      //現在の日付・時刻を取得 
      let current_date = new Date()
      this.time = current_date.getHours() + ':' + this.zeroPadding(current_date.getMinutes(), 2) + ':' + this.zeroPadding(current_date.getSeconds(), 2)
      this.date = current_date.getFullYear() + '年' + this.zeroPadding(current_date.getMonth()+1, 2) + '月' + this.zeroPadding(current_date.getDate(), 2) + '日'
    },
    zeroPadding: function(num, len) {
        let zero = '';
        //0の文字列を作成
        for(var i = 0; i < len; i++) {
          zero += '0';
        }

        // zeroの文字列と、数字を結合し、後ろ２文字を返す
        return (zero + num).slice(-len);
    },
    clockIn: function() {
      const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      }
      navigator.geolocation.getCurrentPosition(this.success_in, this.error, options)
    },
    clockOut: function() {
      const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      }
      navigator.geolocation.getCurrentPosition(this.success_out, this.error, options)
    },

    success_in (position) {
      var self = this;
      var ClockInOut_Col = firestore().collection(`users/${auth().currentUser.uid}/ClockInOut`)
      ClockInOut_Col.add({
        createdAt: firestore.FieldValue.serverTimestamp(),
        latitude: position.coords.latitude,
        longtitude: position.coords.longitude,
        status: "出勤",
      })
      .then(function() {
          var User_Doc = firestore().doc(`users/${auth().currentUser.uid}`)
          User_Doc.update({
            status: "出勤",
          })
        })
      this.clockInOut_status = "出勤"
      setTimeout(() => {
          self.$router.push({
              name: 'index'
          })
      }, 500);
    },

    success_out (position) {
      var self = this;
      var ClockInOut_Col = firestore().collection(`users/${auth().currentUser.uid}/ClockInOut`)
      ClockInOut_Col.add({
        createdAt: firestore.FieldValue.serverTimestamp(),
        latitude: position.coords.latitude,
        longtitude: position.coords.longitude,
        status: "退勤",
      })
      .then(function() {
          var User_Doc = firestore().doc(`users/${auth().currentUser.uid}`)
          User_Doc.update({
            status: "退勤",
          })
        })
      this.clockInOut_status = "退勤"
      setTimeout(() => {
          self.$router.push({
              name: 'index'
          })
      }, 500);
    },
    error (error) {
      switch (error.code) {
        case 1: //PERMISSION_DENIED
          alert('位置情報の利用が許可されていません')
          break
        case 2: //POSITION_UNAVAILABLE
          alert('現在位置が取得できませんでした')
          break
        case 3: //TIMEOUT
          alert('タイムアウトになりました')
          break
        default:
          alert('現在位置が取得できませんでした')
          break
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.updateTime()
    }, 1000);
    
    // 出勤退勤の状態取得
    var User_Doc = firestore().doc(`users/${auth().currentUser.uid}`)
    User_Doc.get().then((doc) => {
      this.clockInOut_status = doc.data().status
    })
  }

};
</script>

<style>

</style>
