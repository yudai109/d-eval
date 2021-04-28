<template>
    <div class="nipo_conatiner bg-white border rounded-lg py-2 mt-4 shadow-lg">
        <div class="text-left ml-4 mt-4">
            <nuxt-link to="/report/workflow">
                <i class="far fa-arrow-alt-circle-left fa-2x text-gray-600"></i>
            </nuxt-link>
        </div>
        <h1 class="text-3xl pb-2">【報告書】外販イベント支援</h1>
        <p>※稼働終了時に報告</p>
        <p>※イベント当日の担当者が提出</p>
        <p>（特に指示がない場合はクローザーが提出）</p>
        <hr class="my-3">
        <div class="mb-4">
            <label class="label">名前 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="username" type="text" name="name" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">同行者 <span class="bg-gray-400 rounded-lg px-2 text-xs text-white">任意</span></label>
            <input v-model="follower" type="text" name="name" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">稼働日 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <!-- <input v-model="date" type="date" name="name" class="border rounded-lg p-2 w-11/12"> -->
            <Datetime
                v-model="requestDate"
                :minute-interval="30"
                :format="'YYYY-MM-DD HH:mm'"
                :disabled-hours="['00', '01', '02', '03', '04', '05', '06', '07', '08', '17', '18', '19', '20', '21', '22', '23']"
                :overlay="true"
                :min-date="start"
                :max-date="end"
                :only-date="true"
                label="稼働日選択"
                class="datepicker"
            ></Datetime>
        </div>

        <div class="mb-4">
            <label class="label">稼動店舗 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <v-select name="shop" :options="shops" v-model="shop" ></v-select>
        </div>

        <div class="mb-4">
            <label class="label">イベント実施場所 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input name="place" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">実施者 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <textarea v-model="follower" name="follower" class="border rounded-lg p-2 w-11/12" placeholder="(クローザー：〇〇、キャッチャー：〇〇)"></textarea>
        </div>

        <div class="mb-4">
            <label class="label">開始時間 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="start_time" type="time" name="start_time" class="border rounded-lg p-2 w-11/12">
            <!-- <Datetime
                v-model="start_time"
                :minute-interval="30"
                :format="'YYYY-MM-DD HH:mm'"
                :overlay="true"
                :min-date="start"
                :max-date="end"
                :only-time="true"
                label="開始時間"
                class="datepicker"
            ></Datetime> -->
        </div>

        <div class="mb-4">
            <label class="label">終了時間 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <!-- <input v-model="date" type="date" name="name" class="border rounded-lg p-2 w-11/12"> -->
            <!-- <Datetime
                v-model="end_time"
                :minute-interval="30"
                :format="'HH:mm'"
                :overlay="true"
                :min-date="start"
                :max-date="end"
                :only-time="true"
                label="終了時間"
                class="datepicker"
            ></Datetime> -->
            <input v-model="end_time" type="time" name="end_time" class="border rounded-lg p-2 w-11/12">
        </div>



    <!-- 店舗の当日目標 -->
        <h2 class="text-left pl-4 pt-6 pb-3">イベントの当日目標</h2>
        <hr class="w-11/12 ml-4 mb-4 ">

        <div class="mb-4">
            <label class="label">PI <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="pi_mokuhyou" type="number" name="souhan" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">光新規 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="hikari_mokuhyou" type="number" name="hs_shinki" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">スカパー <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="skp_mokuhyou" type="number" name="hs_shinki" class="border rounded-lg p-2 w-11/12">
        </div>



    <!-- マーケティング -->
        <h2 class="text-left pl-4 pt-6 pb-3">マーケティング</h2>
        <hr class="w-11/12 ml-4 mb-4 ">

        <div class="mb-4">
            <label class="label">店舗／着座数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="raikyaku_daily" type="number" name="raikyaku_daily" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">個人／声掛け数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="koekake_kojin" type="number" name="koekake_kojin" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">個人／有効提案数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="teian_kojin" type="number" name="teian_kojin" class="border rounded-lg p-2 w-11/12">
        </div>



    <!-- ドコモ光 個人-->
        <h2 class="text-left pl-4 pt-6 pb-3">ドコモ光／個人</h2>
        <hr class="w-11/12 ml-4 mb-4 ">
        <div class="mb-4">
            <label class="label">個人／光新規 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="hikari_kojin" type="number" name="hikari_kojin" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">個人／事業者変更 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="hikari_henko_kojin" type="number" name="hikari_henko_kojin" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">個人／転用 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="hikari_tenyo_kojin" type="number" name="hikari_tenyo_kojin" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">個人／OCN新規 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="hikari_ocn_kojin" type="number" name="hikari_ocn_kojin" class="border rounded-lg p-2 w-11/12">
        </div>



    <!-- ドコモ光 店舗 -->
        <h2 class="text-left pl-4 pt-6 pb-3">ドコモ光／店舗</h2>
        <hr class="w-11/12 ml-4 mb-4 ">
        <div class="mb-4">
            <label class="label">店舗／光新規 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="hikari_tenpo" type="number" name="hikari_tenpo" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">店舗／事業者変更 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="hikari_henko_tenpo" type="number" name="hikari_henko_tenpo" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">店舗／転用 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="hikari_tenyo_tenpo" type="number" name="hikari_tenyo_tenpo" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">店舗／OCN新規 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="hikari_ocn_tenpo" type="number" name="hikari_ocn_tenpo" class="border rounded-lg p-2 w-11/12">
        </div>



    <!-- スカパー！テレビオプション -->
        <h2 class="text-left pl-4 pt-6 pb-3">スカパー！テレビオプション</h2>
        <hr class="w-11/12 ml-4 mb-4 ">
        <div class="mb-4">
            <label class="label">店舗／TVOP <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="tvop" type="number" name="tvop" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">店舗／SJ工事 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="sj_kouji" type="number" name="sj_kouji" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">SKP獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="skp_cs" type="number" name="skp_cs" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">SKP - IC獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="skp_ic" type="number" name="skp_ci" class="border rounded-lg p-2 w-11/12">
        </div>



    <!-- 端末販売 個人-->
        <h2 class="text-left pl-4 pt-6 pb-3">端末販売／個人</h2>
        <hr class="w-11/12 ml-4 mb-4 ">
        <div class="mb-4">
            <label class="label">個人／HS獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="hs_kojin" type="number" name="hs_kojin" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">個人／PI獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="pi_kojin" type="number" name="pi_kojin" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">個人／マイグレ獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="migration_kojin" type="number" name="migration_kojin" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">個人／スマタブ総販数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="st_total_kojin" type="number" name="st_total_kojin" class="border rounded-lg p-2 w-11/12">
        </div>



    <!-- 端末販売 店舗-->
        <h2 class="text-left pl-4 pt-6 pb-3">端末販売／店舗</h2>
        <hr class="w-11/12 ml-4 mb-4 ">
        <div class="mb-4">
            <label class="label">店舗／HS獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="hs_tenpo" type="number" name="hs_tenpo" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">店舗／PI獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="pi_tenpo" type="number" name="pi_tenpo" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">店舗／マイグレ獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="migration_tenpo" type="number" name="migration_tenpo" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">店舗／スマタブ総販数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="st_total_tenpo" type="number" name="st_total_tenpo" class="border rounded-lg p-2 w-11/12">
        </div>


    <!-- 端末販売 店舗-->
        <h2 class="text-left pl-4 pt-6 pb-3">dカード</h2>
        <hr class="w-11/12 ml-4 mb-4 ">
        <div class="mb-4">
            <label class="label">個人／ｄカードGOLD獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="dcard_gold_kojin" type="number" name="dcard_gold_kojin" class="border rounded-lg p-2 w-11/12">
        </div>
        <div class="mb-4">
            <label class="label">個人／ｄカードレギュラー獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="dcard_regu_kojin" type="number" name="dcard_regu_kojin" class="border rounded-lg p-2 w-11/12">
        </div>
        <div class="mb-4">
            <label class="label">店舗／ｄカードGOLD獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="dcard_gold_tenpo" type="number" name="dcard_gold_tenpo" class="border rounded-lg p-2 w-11/12">
        </div>
        <div class="mb-4">
            <label class="label">店舗／ｄカードレギュラー獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="dcard_regu_tenpo" type="number" name="dcard_regu_tenpo" class="border rounded-lg p-2 w-11/12">
        </div>

        <!-- <div class="mb-4">
            <label class="label">ドコモ光獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="hikari" type="number" name="name" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">ISP獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="isp" type="number" name="name" class="border rounded-lg p-2 w-11/12">
        </div> -->

        <div class="my-3">
            <button @click.once="PushNipo" class="btn bg-yellow-500 font-bold py-2 my-3 rounded-2xl" id="Round">送信</button>
        </div>

    </div>
</template>

<script>
import { firestore } from '~/plugins/firebase.js'
import { auth } from '~/plugins/firebase.js'
import Datetime from 'vue-ctk-date-time-picker';
import '@/node_modules/vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

export default {
    layout: 'default',
    components: {
        Datetime
    },
    data() {
        return{
            username: '',
            follower: '',
            requestDate: null,
            shop: '',
            follower: '',
            start_time: null,
            end_time: null,
            pi_mokuhyou: 0,
            hikari_mokuhyou: 0,
            skp_mokuhyou: 0,
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
            shops: [

            ],
        }
    },
    methods: {
        PushNipo: function() {
            var self = this;
            var CurrentUser = auth().currentUser;
            var usersNipoCol = firestore().collection(`users/${CurrentUser.uid}/event_report`)
            var PerformanceCol = firestore().collection(`users/${CurrentUser.uid}/Performance`)

            usersNipoCol.add({
                createdAt: firestore.FieldValue.serverTimestamp(),
                name: self.username,
                shop: self.shop,
                follower: self.follower,
                requestDate: this.requestDate,
                start_time: self.start_time,
                end_time: self.end_time,
                pi_mokuhyou: Number(self.pi_mokuhyou),
                hikari_mokuhyou: Number(self.hikari_mokuhyou),
                skp_mokuhyou: Number(self.skp_mokuhyou),
                raikyaku_daily: Number(self.raikyaku_daily),
                raikyaku_monthly: Number(self.raikyaku_monthly),
                koekake_kojin: Number(self.koekake_kojin),
                teian_kojin: Number(self.teian_kojin),
                hikari_kojin: Number(self.hikari_kojin),
                hikari_henko_kojin: Number(self.hikari_henko_kojin),
                hikari_tenyo_kojin: Number(self.hikari_tenyo_kojin),
                hikari_ocn_kojin: Number(self.hikari_ocn_kojin),
                hikari_tenpo: Number(self.hikari_tenpo),
                hikari_henko_tenpo: Number(self.hikari_henko_tenpo),
                hikari_tenyo_tenpo: Number(self.hikari_tenyo_tenpo),
                hikari_ocn_tenpo: Number(self.hikari_ocn_tenpo),
                tvop: Number(self.tvop),
                sj_kouji: Number(self.sj_kouji),
                skp_cs: Number(self.skp_cs),
                skp_ic: Number(self.skp_ic),
                hs_kojin: Number(self.hs_kojin),
                pi_kojin: Number(self.pi_kojin),
                migration_kojin: Number(self.migration_kojin),
                st_total_kojin: Number(self.st_total_kojin),
                hs_tenpo: Number(self.hs_tenpo),
                pi_tenpo: Number(self.pi_tenpo),
                migration_tenpo: Number(self.migration_tenpo),
                st_total_tenpo: Number(self.st_total_tenpo),
                dcard_gold_kojin: Number(self.dcard_gold_kojin),
                dcard_regu_kojin: Number(self.dcard_regu_kojin),
                dcard_gold_tenpo: Number(self.dcard_gold_tenpo),
                dcard_regu_tenpo: Number(self.dcard_regu_tenpo),
                // negotiation: Number(self.negotiation),
                // customer: Number(self.customer),
                // hs: Number(self.hs),
                // pi: Number(self.pi),
                // migration: Number(self.migration),
                // st_total: Number(self.st_total),
                // dcard: Number(self.dcard),
                // hikari: Number(self.hikari),
                // isp: Number(self.isp),
                // tvop: Number(self.tvop),
                // skp_cs: Number(self.skp_cs),
                // skp_pi: Number(self.skp_pi),
            })
            .then(function() {
                // // Performanceのインクリメント
                var CurrentUser = auth().currentUser
                var date = new Date()
                var year = date.getFullYear()
                var month = self.toDoubleDigits(date.getMonth() + 1)

                PerformanceCol.orderBy("createdAt", "desc").limit(1).get()
                .then(function(qs) {
                    qs.forEach(function(doc) {
                        var PerformanceDoc = firestore().doc(`users/${CurrentUser.uid}/Performance/${doc.id}`)
                        PerformanceDoc.get()
                        .then(function() {
                            PerformanceDoc.set({
                                createdAt: firestore.FieldValue.serverTimestamp(),
                                raikyaku_daily: firestore.FieldValue.increment(Number(self.raikyaku_daily)),
                                raikyaku_monthly: firestore.FieldValue.increment(Number(self.raikyaku_monthly)),
                                koekake_kojin: firestore.FieldValue.increment(Number(self.koekake_kojin)),
                                teian_kojin: firestore.FieldValue.increment(Number(self.teian_kojin)),
                                hikari_kojin: firestore.FieldValue.increment(Number(self.hikari_kojin)),
                                hikari_henko_kojin: firestore.FieldValue.increment(Number(self.hikari_henko_kojin)),
                                hikari_tenyo_kojin: firestore.FieldValue.increment(Number(self.hikari_tenyo_kojin)),
                                hikari_ocn_kojin: firestore.FieldValue.increment(Number(self.hikari_ocn_kojin)),
                                hikari_tenpo: firestore.FieldValue.increment(Number(self.hikari_tenpo)),
                                hikari_henko_tenpo: firestore.FieldValue.increment(Number(self.hikari_henko_tenpo)),
                                hikari_tenyo_tenpo: firestore.FieldValue.increment(Number(self.hikari_tenyo_tenpo)),
                                hikari_ocn_tenpo: firestore.FieldValue.increment(Number(self.hikari_ocn_tenpo)),
                                tvop: firestore.FieldValue.increment(Number(self.tvop)),
                                sj_kouji: firestore.FieldValue.increment(Number(self.sj_kouji)),
                                skp_cs: firestore.FieldValue.increment(Number(self.skp_cs)),
                                skp_ic: firestore.FieldValue.increment(Number(self.skp_ic)),
                                hs_kojin: firestore.FieldValue.increment(Number(self.hs_kojin)),
                                pi_kojin: firestore.FieldValue.increment(Number(self.pi_kojin)),
                                migration_kojin: firestore.FieldValue.increment(Number(self.migration_kojin)),
                                st_total_kojin: firestore.FieldValue.increment(Number(self.st_total_kojin)),
                                hs_tenpo: firestore.FieldValue.increment(Number(self.hs_tenpo)),
                                pi_tenpo: firestore.FieldValue.increment(Number(self.pi_tenpo)),
                                migration_tenpo: firestore.FieldValue.increment(Number(self.migration_tenpo)),
                                st_total_tenpo: firestore.FieldValue.increment(Number(self.st_total_tenpo)),
                                dcard_gold_kojin: firestore.FieldValue.increment(Number(self.dcard_gold_kojin)),
                                dcard_regu_kojin: firestore.FieldValue.increment(Number(self.dcard_regu_kojin)),
                                dcard_gold_tenpo: firestore.FieldValue.increment(Number(self.dcard_gold_tenpo)),
                                dcard_regu_tenpo: firestore.FieldValue.increment(Number(self.dcard_regu_tenpo)),
                            },  {merge: true})
                            })
                            .then(() => {
                                alert('送信しました')
                                self.follower = ''
                                self.pi_mokuhyou = 0
                                self.hikari_mokuhyou = 0
                                self.skp_mokuhyou = 0
                                self.raikyaku_daily = 0
                                self.raikyaku_monthly = 0
                                self.koekake_kojin = 0
                                self.teian_kojin = 0
                                self.hikari_kojin = 0
                                self.hikari_henko_kojin = 0
                                self.hikari_tenyo_kojin = 0
                                self.hikari_ocn_kojin = 0
                                self.hikari_tenpo = 0
                                self.hikari_henko_tenpo = 0
                                self.hikari_tenyo_tenpo = 0
                                self.hikari_ocn_tenpo = 0
                                self.tvop = 0
                                self.sj_kouji = 0
                                self.skp_cs = 0
                                self.skp_ic = 0
                                self.hs_kojin = 0
                                self.pi_kojin = 0
                                self.migration_kojin = 0
                                self.st_total_kojin = 0
                                self.hs_tenpo = 0
                                self.pi_tenpo = 0
                                self.migration_tenpo = 0
                                self.st_total_tenpo = 0
                                self.dcard_gold_kojin = 0
                                self.dcard_regu_kojin = 0
                                self.dcard_gold_tenpo = 0
                                self.dcard_regu_tenpo = 0

                            })
                            .then(() => {
                                setTimeout(() => {
                                    self.$router.push({
                                        name: 'index'
                                    })
                                }, 500);
                            })
                        })
                    })
            })
        },
        makePerformanceCol: function() {
            var self = this;
            var CurrentUser = auth().currentUser
            var PerformanceCol = firestore().collection(`users/${CurrentUser.uid}/Performance`)
            var date = new Date()
            var year = date.getFullYear()
            var month = self.toDoubleDigits(date.getMonth() + 1)

            PerformanceCol.orderBy("createdAt", "desc").limit(1).get()
            .then(function(qs) {
                qs.forEach(function(doc) {
                    var lastRepoDate = doc.data().createdAt.toDate();
                    console.log(lastRepoDate.getMonth() + 1)
                    console.log(date.getMonth() + 1)
                    if( lastRepoDate.getMonth() + 1 < date.getMonth() + 1) {
                        console.log('月変わり')
                        PerformanceCol.add({
                            createdAt: firestore.FieldValue.serverTimestamp(),
                            pi_mokuhyou: 0,
                            hikari_mokuhyou: 0,
                            skp_mokuhyou: 0,
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
                        }, {marge: true})
                    } else {
                        console.log('変わってません')
                    }

                })
            })
            console.log(month)

        },
        toDoubleDigits: function(num) {
                num += "";
                if (num.length === 1) {
                    num = "0" + num;
                }
                return num;
        },
    },
    mounted() {
        // 報告時、月が変わっていたら新たしいコレクション追加
        this.makePerformanceCol()
        this.username = this.$store.state.username

        var shops = this.$store.getters.getShops
        shops.forEach((info) => {
            this.shops.push(info.shopname)
        })
    },
}
</script>

<style>
    .nipo_conatiner {
        max-width: 800px;
        width: 92%;
        /* position: absolute;
        top: 30px; */
        margin: 20px auto 100px;
        color: #4B5563;
    }
    
    .btn {
        width: 250px;
    }

    .label { 
        font-size: 15px;
        text-align: left;
        font-weight: 500;
        display: block;
        padding-left: 1rem;
        margin-bottom: 0.25rem;
    }

    /* セレクトボックス */
    .top-100 {top: 100%}
    .bottom-100 {bottom: 100%}
    .max-h-select {
        max-height: 300px;
    }
    .vs__dropdown-toggle {
        border-radius: 8px;
        border-color: #e5e7eb;
        width: 91.666667%;
        margin-right: auto;
        margin-left: auto;
        padding: 0.45rem;

    }
    .vs__selected-options {
        width: 91.666667%;
    }

    .datepicker {
        width: 91.666667%;
        border-radius: 8px;
        border-color: #e5e7eb;
        margin-right: auto;
        margin-left: auto;
    }

    /* */
</style>
