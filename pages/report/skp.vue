<template>
    <div class="nipo_conatiner bg-white border rounded-lg py-2 mt-4 shadow-lg">
        <div class="text-left ml-4 mt-4">
            <nuxt-link to="/report">
                <i class="far fa-arrow-alt-circle-left fa-2x text-gray-600"></i>
            </nuxt-link>
        </div>
        <h1 class="text-3xl pb-2">スカパー｜日報</h1>
        <p>稼働終了後に必ず報告してください。</p>
        <hr class="my-3">
        <div class="mb-4">
            <label class="label" for="text-area-ocn2">名前 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="username" type="text" name="name" class="border rounded-lg p-2 w-11/12 ease-linear transition-all duration-150">
        </div>

        <div class="mb-4">
            <label class="label" for="text-area-ocn3">稼動店舗 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <v-select name="hoge" :options="shops" v-model="selected" ></v-select>
        </div>

        <div class="mb-4">
            <label class="label text-gray-700">稼働種別 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <div class="mt-2 ml-8 text-left">
                <label class="inline-flex items-center">
                <input  v-model="skp_type" type="radio" class="form-radio" name="accountType" value="ラウンド">
                <span class="ml-2">ラウンド</span>
                </label>
                <label class="inline-flex items-center ml-6">
                <input  v-model="skp_type" type="radio" class="form-radio" name="accountType" value="研修">
                <span class="ml-2">研修</span>
                </label>
            </div>
        </div>

        <div class="mb-4">
            <label class="label" for="text-area-ocn5">活動内容 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <textarea v-model="activity_repo" placeholder="活動内容" rows="4" type="text" name="name" class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm  w-11/12 ease-linear transition-all duration-150"></textarea>
        </div>

        <div class="mb-4">
            <label class="label" for="text-area-ocn5">課題 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <textarea v-model="task_repo" placeholder="課題" rows="4" type="text" name="name" class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm  w-11/12 ease-linear transition-all duration-150"></textarea>
        </div>

        <div class="mb-4">
            <label class="label" for="text-area-ocn5">次回アクション <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <textarea v-model="next_repo" placeholder="次回アクション" rows="4" type="text" name="name" class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm  w-11/12 ease-linear transition-all duration-150"></textarea>
        </div>

        <div class="mb-4">
            <label class="label" for="text-area-ocn5">備考 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <textarea v-model="other_repo" placeholder="備考" rows="4" type="text" name="name" class="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm  w-11/12 ease-linear transition-all duration-150"></textarea>
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
            skp_type: '',
            activity_repo: '',
            task_repo: '',
            next_repo: '',
            other_repo: '',
            selected: "",
            shops: [

            ],
        }
    },
    methods: {
        PushNipo: function() {
            var CurrentUser = auth().currentUser;
            var usersSkpCol = firestore().collection(`users/${CurrentUser.uid}/skp_repo`)
            usersSkpCol.add({
                createdAt: firestore.FieldValue.serverTimestamp(),
                name: this.username,
                shop: this.selected,
                skp_type: this.skp_type,
                task_repo: this.task_repo,
                next_repo: this.next_repo,
                other_repo: this.other_repo,
            })
            .then(() => {
                alert('送信しました')
                this.username = '';
                this.selected = '';
                this.skp_type = '';
                this.task_repo = '';
                this.next_repo = '';
                this.other_repo = '';
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