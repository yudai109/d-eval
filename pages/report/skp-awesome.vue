<template>
    <div class="nipo_conatiner bg-white border rounded-lg py-2 mt-4 shadow-lg">
        <div class="text-left ml-4 mt-4">
            <nuxt-link to="/report">
                <i class="far fa-arrow-alt-circle-left fa-2x text-gray-600"></i>
            </nuxt-link>
        </div>
        <h1 class="text-3xl pb-2">スカパー｜優良事例</h1>
        <p>稼働終了後に必ず報告してください。</p>
        <hr class="my-3">
                <div class="mb-4">
            <label class="label">名前 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="username" type="text" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">稼動店舗 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <v-select name="hoge" :options="shops" v-model="selected" ></v-select>
        </div>

        <div class="mb-4">
            <label class="label">指導内容 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <textarea v-model="activity_aw_repo" rows="6" placeholder="指導内容" type="text" class="border rounded-lg p-2 w-11/12"></textarea>
        </div>

        <div class="mb-4">
            <label class="label">反応 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <textarea v-model="reaction_aw_repo" rows="6" placeholder="反応" type="text" class="border rounded-lg p-2 w-11/12"></textarea>
        </div>

        <div class="mb-4">
            <label class="label">改善提案 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <textarea v-model="next_aw_repo" rows="6" placeholder="改善提案" type="text" class="border rounded-lg p-2 w-11/12"></textarea>
        </div>
        <div class="mb-4">
            <label class="label">結果 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <textarea v-model="result_aw_repo" rows="6" placeholder="結果" type="text" class="border rounded-lg p-2 w-11/12"></textarea>
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
            activity_aw_repo: '',
            reaction_aw_repo: '',
            next_aw_repo: '',
            result_aw_repo: '',
            selected: "",
            shops: [

            ],
        }
    },
    methods: {
        PushNipo: function() {
            var CurrentUser = auth().currentUser;
            var usersSkpCol = firestore().collection(`users/${CurrentUser.uid}/skp_aw_repo`)
            usersSkpCol.add({
                createdAt: firestore.FieldValue.serverTimestamp(),
                name: this.username,
                shop: this.selected,
                reaction_aw_repo: this.reaction_aw_repo,
                next_aw_repo: this.next_aw_repo,
                result_aw_repo: this.result_aw_repo,
            })
            .then(() => {
                alert('送信しました')
                this.username = '';
                this.selected = '';
                this.reaction_aw_repo = '';
                this.next_aw_repo = '';
                this.result_aw_repo = '';
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