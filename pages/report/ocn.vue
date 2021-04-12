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
            <label class="label" for="text-area-ocn2">名前 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="username" type="text" name="name" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label" for="text-area-ocn3">稼動店舗 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <v-select name="hoge" :options="shops" v-model="selected" ></v-select>
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
            var usersNipoCol = firestore().collection(`users/${CurrentUser.uid}/ocn_repo`)
            usersNipoCol.add({
                createdAt: firestore.FieldValue.serverTimestamp(),
                name: this.username,
                shop: this.selected,
                task_repo: this.task_repo,
                next_repo: this.next_repo,
                other_repo: this.other_repo,
            })
            .then(() => {
                alert('送信しました')
                this.username = '';
                this.selected = '';
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