<template>
    <div class="nipo_conatiner bg-white border rounded-lg py-2 mt-4 shadow-lg">
        <div class="text-left ml-4 mt-4">
            <nuxt-link to="/report">
                <i class="far fa-arrow-alt-circle-left fa-2x text-gray-600"></i>
            </nuxt-link>
        </div>
        <h1 class="text-3xl pb-2">OCN｜日報報告</h1>
        <p>稼働終了後に必ず報告してください。</p>
        <hr class="my-3">
        <div class="mb-4">
            <label class="label">日付 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="date" type="date" name="date" class="border rounded-lg p-2 w-11/12 ease-linear transition-all duration-150">
        </div>

        <div class="mb-4">
            <label class="label">店舗名 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <v-select name="shop" :options="shops" v-model="shop" ></v-select>
        </div>

        <div class="mb-4">
            <label class="label">訪問先 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="attend" type="text" name="attend" class="border rounded-lg p-2 w-11/12 ease-linear transition-all duration-150">
        </div>

        <div class="mb-4">
            <label class="label text-gray-700">手段 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <div class="mt-2 ml-8 text-left">
                <label class="inline-flex items-center">
                <input  v-model="ocn_type" type="radio" class="form-radio" name="type" value="商談">
                <span class="ml-2">商談</span>
                </label>
                <label class="inline-flex items-center ml-6">
                <input  v-model="ocn_type" type="radio" class="form-radio" name="type" value="外販支援">
                <span class="ml-2">外販支援</span>
                </label>
                <label class="inline-flex items-center ml-6">
                <input  v-model="ocn_type" type="radio" class="form-radio" name="type" value="コンサルタント">
                <span class="ml-2">コンサルタント</span>
                </label>
            </div>
        </div>

        <div class="mb-4">
            <label class="label" for="text-area-ocn2">名前RD <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="username" type="text" name="name" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">活動内容、実績進捗など<span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <textarea v-model="activity_repo" placeholder="活動内容、実績進捗など" rows="4" type="text" name="activity" class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm  w-11/12 ease-linear transition-all duration-150"></textarea>
        </div>

        <div class="mb-4">
            <label class="label">所感 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <textarea v-model="impression_repo" placeholder="所感" rows="4" type="text" name="impressions" class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm  w-11/12 ease-linear transition-all duration-150"></textarea>
        </div>

        <div class="mb-4">
            <label class="label" for="text-area-ocn5">要望など <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <textarea v-model="request_repo" placeholder="要望など" rows="4" type="text" name="request" class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm  w-11/12 ease-linear transition-all duration-150"></textarea>
        </div>

        <div class="mb-4">
            <label class="label" for="text-area-ocn5">競合・支援情報 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <textarea v-model="conflict_repo" placeholder="競合・支援情報" rows="4" type="text" name="conflict" class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm  w-11/12 ease-linear transition-all duration-150"></textarea>
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
            date: null,
            shop: '',
            attend: '',
            ocn_type: '',
            username: '',
            activity_repo: '',
            impression_repo: '',
            request_repo: '',
            conflict_repo: '',
            shops: [

            ],
        }
    },
    methods: {
        PushNipo: function() {
            var CurrentUser = auth().currentUser;
            var usersSkpCol = firestore().collection(`users/${CurrentUser.uid}/ocn_repo`)
            usersSkpCol.add({
                createdAt: firestore.FieldValue.serverTimestamp(),
                date: this.date,
                shop: this.shop,
                attend: this.attend,
                ocn_type: this.ocn_type,
                username: this.username,
                activity_repo: this.activity_repo,
                impression_repo: this.impression_repo,
                request_repo: this.request_repo,
                conflict_repo: this.conflict_repo,
            })
            .then(() => {
                alert('送信しました')
                this.shop = '';
                this.attend = '';
                this.ocn_type = '';
                this.username = '';
                this.activity_repo = '';
                this.impression_repo = '';
                this.request_repo = '';
                this.conflict_repo = '';
            })
            .then(() => {
                setTimeout(() => {
                    this.$router.push({
                        name: 'index'
                    })
                }, 500);
            })
        }
    },
    mounted() {
        this.username = this.$store.state.username
        var shops = this.$store.getters.getShops
        shops.forEach((info) => {
            this.shops.push(info.shopname)
        })
    }
}
</script>

<style scoped>
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
</style>