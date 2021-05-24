<template>
    <div>
            <div class="flex flex-col mt-8 text-left mx-auto w-full">
                <div class="relative bg-green-600 md:pt-32 pb-8 pt-8">
                <div class="px-4 md:px-10 mx-auto w-full">
                    <EmployeeTab />
                </div>
            </div>
            <div class="mt-8 mx-auto md:ml-12">
                <h2 class="text-2xl font-bold text-gray-600">出勤簿</h2>
                <h2 class="text-xl text-gray-600 ">{{ currentDate.format('YYYY年MM月') }}の出勤情報</h2>
                <button class="bg-blue-400 rounded-lg px-4 py-1 text-gray-100 " @click="prevMonth"><font-awesome-icon class="mr-2" icon="chevron-left" />前の月</button>
                <button class="bg-blue-400 rounded-lg px-4 py-1 text-gray-100 ml-2" @click="nextMonth">次の月<font-awesome-icon class="ml-2" icon="chevron-right" /></button>
            </div>
            <!-- <div class="md:ml-12">
                <table class="ml-4 my-3">
                    <thead class="border-b-4 border-double  border-gray-600 bg-gray-200">
                    <tr>
                        <th class="border-r border-gray-300 text-wrap p-2" scope="col">日付</th>
                        <th class="border-r border-gray-300 text-wrap p-2" scope="col">休日<br />区分</th>
                        <th class="border-r border-gray-300 text-wrap p-2" scope="col">シフト時間</th>
                        <th class="border-r border-gray-300 text-wrap p-2" scope="col">出勤時刻</th>
                        <th class="border-r border-gray-300 text-wrap p-2" scope="col">退勤時刻</th>
                        <th class="border-r border-gray-300 text-wrap p-2" scope="col">労働時間</th>
                        <th class="border-r border-gray-300 text-wrap p-2" scope="col">シフト外労働時間</th>
                        <th class="border-r border-gray-300 text-wrap p-2" scope="col">残業時間</th>
                        <th class="border-r border-gray-300 text-wrap p-2" scope="col">深夜時間</th>
                        <th class="border-r border-gray-300 text-wrap p-2" scope="col">休憩時間</th>
                        <th class="border-r border-gray-300 text-wrap p-2" scope="col">勤怠状況</th>
                    </tr>
                    </thead>
                <tbody>
                        <tr v-for="(day, index) in calendars" :key="index" class="border-b border-gray-400">
                        <td class="border-r border-gray-300 p-2"><a href="">{{ day.format('MM/DD(ddd)') }}</a></td>
                        <td class="border-r border-gray-300"></td>
                        <td class="border-r border-gray-300"></td>
                        <td class="border-r border-gray-300"></td>
                        <td class="border-r border-gray-300"></td>
                        <td class="border-r border-gray-300"></td>
                        <td class="border-r border-gray-300"></td>
                        <td class="border-r border-gray-300"></td>
                        <td class="border-r border-gray-300"></td>
                        <td class="border-r border-gray-300"></td>
                        <td class="border-r border-gray-300"></td>
                    </tr>
                </tbody>
                <tfoot class="border-t-4 border-double  border-gray-600 bg-gray-200">
                    <tr>
                            <th class="p-3" scope="row" colspan="2">合計</th>
                            <td class="p-3 border-r border-gray-300"></td>
                            <td class="p-3 border-r border-gray-300"></td>
                            <td class="p-3 border-r border-gray-300"></td>
                            <td class="p-3 border-r border-gray-300"></td>
                            <td class="p-3 border-r border-gray-300"></td>
                            <td class="p-3 border-r border-gray-300"></td>
                            <td class="p-3 border-r border-gray-300"></td>
                            <td class="p-3 border-r border-gray-300"></td>
                            <td class="p-3 border-r border-gray-300"></td>
                    </tr>
                </tfoot>
                </table>
            </div> -->
        </div>

        <!-- component -->
        <div class="w-11/12 mx-auto mt-4">
        <button type="" @click="show">ボタン</button>
            <table class="min-w-full table-auto">
                <thead class="justify-between">
                <tr class="bg-gray-800">
                    <th class="py-2"><span class="text-gray-300">日付</span></th>
                    <th class="py-2"><span class="text-gray-300">休日区分</span></th>
                    <th class="py-2"><span class="text-gray-300">シフト時間</span></th>
                    <th class="py-2"><span class="text-gray-300">出勤時刻</span></th>
                    <th class="py-2"><span class="text-gray-300">退勤時刻</span></th>
                    <th class="py-2"><span class="text-gray-300">労働時間</span></th>
                    <th class="py-2"><span class="text-gray-300">シフト外労働時間</span></th>
                    <th class="py-2"><span class="text-gray-300">残業時間</span></th>
                    <th class="py-2"><span class="text-gray-300">深夜時間</span></th>
                    <th class="py-2"><span class="text-gray-300">休憩時間</span></th>
                    <th class="py-2"><span class="text-gray-300">勤怠状況</span></th>
                </tr>
                </thead>
                <tbody class="bg-gray-200">
                    <tr v-for="(day, index) in calendars" :key="index" class="bg-white border-4 border-gray-200">
                        <td class="border-r border-gray-300 p-2" v-bind:class="[day.weekday() === 6 ? 'is-Saturday' : day.weekday() === 0 ? 'is-Sunday' : 'nomal']"><a href="" class="underline">{{ day.format('MM/DD(ddd)') }}</a></td>
                        <td class="border-r border-gray-300"></td>
                        <td class="border-r border-gray-300"></td>
                        <td class="border-r border-gray-300"></td>
                        <!-- <td class="border-r border-gray-300">{{ length(rows[1]) !==0 ? rows[1].createdAt : '' }}</td> -->
                        <td class="border-r border-gray-300">{{ rows[index] }}</td>
                        <!-- <td class="border-r border-gray-300">{{ JSON.parse(JSON.stringify(rows[index])) }}</td> -->
                        <td class="border-r border-gray-300"></td>
                        <td class="border-r border-gray-300"></td>
                        <td class="border-r border-gray-300"></td>
                        <td class="border-r border-gray-300"></td>
                        <td class="border-r border-gray-300"></td>
                        <td class="border-r border-gray-300"></td>
                    </tr>

                </tbody>
            </table>
            </div>
    </div>
</template>

<script>
import { firestore } from "~/plugins/firebase.js";
import { auth } from "~/plugins/firebase.js";

import moment from "moment";
moment.locale("ja", {weekdaysShort: ["日","月","火","水","木","金","土"], });

export default {
    name: "WorkCalendar",
    data() {
        return {
            currentDate: moment(),
            rows: Array,
        };
    },
    middleware({ store }) {
        store.dispatch('getRepoData', {career_type: "clock"})
    },
    methods: {
        show() {
            // var jsonobj = JSON.parse(JSON.stringify(this.rows))
            console.log(this.rows[1].createdAt)
            // console.log(JSON.parse(JSON.stringify(this.rows)))
        },
        getStartDate() {
            let date = moment(this.currentDate);
            return date.startOf("month");
        },
        getEndDate() {
            let date = moment(this.currentDate);
            return date.endOf("month");
        },
        getCalendar() {
            const startDate =this.getStartDate();
            const endDate = this.getEndDate();
            var days = moment.duration(endDate - startDate).days() + 1;
            var dates = [...Array(days).keys()].map(v => startDate.clone().add(v, 'days'));
            return dates
        },
        nextMonth() {
            this.currentDate = moment(this.currentDate).add(1, "month");
        },
        prevMonth() {
            this.currentDate = moment(this.currentDate).subtract(1, "month");
        },
        getReportData() {
            var obj = []
            var ClockCol = firestore().collection(
                `users/${auth().currentUser.uid}/ClockInOut`
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
                    obj.push(repo_data);
                });
            }).then(() => {
                var jsonobj = JSON.parse(JSON.stringify(obj))
                console.log(jsonobj)
                this.rows.push(jsonobj)
                console.log(this.rows)
                
                for (let i = 0; i < 30; i++) [
                ]
                // jsonobj.forEach(obj => {
                //     console.log(obj)
                //     this.rows.push(obj)
                // })
            })

        },
    },
    created() {
        this.getReportData();
    },
    computed: {
        calendars() {
            return this.getCalendar();
        },
    },
    beforeDestroy() {
        this.$store.commit('resetRepoData', {career_type: "clock"})
    }
};
</script>

<style scoped>
.is-Sunday {
    background-color: #E8BDBA;
}

.is-Saturday {
    background-color: powderblue;
}
</style>
