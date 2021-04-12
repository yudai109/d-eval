<template>
    <div class="nipo_conatiner bg-white border rounded-lg py-2 mt-4 shadow-lg">
        <div class="text-left ml-4 mt-4">
            <nuxt-link to="/report">
                <i class="far fa-arrow-alt-circle-left fa-2x text-gray-600"></i>
            </nuxt-link>
        </div>
        <h1 class="text-3xl pb-2">ドコモ｜日報</h1>
        <p>稼働終了後に必ず報告してください。</p>
        <hr class="my-3">
        <div class="mb-4">
            <label class="label">名前 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="username" type="text" name="name" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">稼動店舗 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <v-select name="hoge" :options="shops" v-model="selected" ></v-select>
        </div>

        <div class="mb-4">
            <label class="label">商談数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="negotiation" type="number" name="name" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">接客数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="customer" type="number" name="name" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">HS獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="hs" type="number" name="name" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">PI獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="pi" type="number" name="name" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">マイグレ獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="migration" type="number" name="name" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">スマタブ総販数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="st_total" type="number" name="name" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">ｄカード獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="dcard" type="number" name="name" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">ドコモ光獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="hikari" type="number" name="name" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">ISP獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="isp" type="number" name="name" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">TVOP獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="tvop" type="number" name="name" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">SKP獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="skp_cs" type="number" name="name" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">SKP - IC獲得数 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="skp_pi" type="number" name="name" class="border rounded-lg p-2 w-11/12">
        </div>
        <div class="my-3">
            <button @click.once="PushNipo" class="btn bg-yellow-500 font-bold py-2 my-3 rounded-2xl" id="Round">送信</button>
        </div>
    </div>
</template>

<script>
import { firestore } from '~/plugins/firebase.js'
import { auth } from '~/plugins/firebase.js'


export default {
    layout: 'default',
    data() {
        return{
            username: '',
            negotiation: 0,
            customer: 0,
            hs: 0,
            pi: 0,
            migration: 0,
            st_total: 0,
            dcard: 0,
            hikari: 0,
            isp: 0,
            tvop: 0,
            skp_cs: 0,
            skp_pi: 0,
            selected: "",
            shops: [

            ],
        }
    },
    methods: {
        PushNipo: function() {
            var self = this;
            var CurrentUser = auth().currentUser;
            var usersNipoCol = firestore().collection(`users/${CurrentUser.uid}/docomo_repo`)
            var PerformanceCol = firestore().collection(`users/${CurrentUser.uid}/Performance`)

            usersNipoCol.add({
                createdAt: firestore.FieldValue.serverTimestamp(),
                name: Number(self.username),
                shop: Number(self.selected),
                negotiation: Number(self.negotiation),
                customer: Number(self.customer),
                hs: Number(self.hs),
                pi: Number(self.pi),
                migration: Number(self.migration),
                st_total: Number(self.st_total),
                dcard: Number(self.dcard),
                hikari: Number(self.hikari),
                isp: Number(self.isp),
                tvop: Number(self.tvop),
                skp_cs: Number(self.skp_cs),
                skp_pi: Number(self.skp_pi),
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
                                negotiation: firestore.FieldValue.increment(Number(self.negotiation)),
                                customer: firestore.FieldValue.increment(Number(self.customer)),
                                hs: firestore.FieldValue.increment(Number(self.hs)),
                                pi: firestore.FieldValue.increment(Number(self.pi)),
                                migration: firestore.FieldValue.increment(Number(self.migration)),
                                st_total: firestore.FieldValue.increment(Number(self.st_total)),
                                dcard: firestore.FieldValue.increment(Number(self.dcard)),
                                hikari: firestore.FieldValue.increment(Number(self.hikari)),
                                isp: firestore.FieldValue.increment(Number(self.isp)),
                                tvop: firestore.FieldValue.increment(Number(self.tvop)),
                                skp_cs: firestore.FieldValue.increment(Number(self.skp_cs)),
                                skp_pi: firestore.FieldValue.increment(Number(self.skp_pi)),
                            },  {merge: true})
                            })
                            .then(() => {
                                alert('送信しました')
                                self.username = ''
                                self.selected = ''
                                self.negotiation = 0
                                self.customer = 0
                                self.hs = 0
                                self.pi = 0
                                self.migration = 0
                                self.st_total = 0
                                self.dcard = 0
                                self.hikari = 0
                                self.isp = 0
                                self.tvop = 0
                                self.skp_cs = 0
                                self.skp_pi = 0
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
                            negotiation: 0,
                            customer: 0,
                            hs: 0,
                            pi: 0,
                            migration: 0,
                            st_total: 0,
                            dcard: 0,
                            hikari: 0,
                            isp: 0,
                            tvop: 0,
                            skp_cs: 0,
                            skp_pi: 0,
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

    /* */
</style>


