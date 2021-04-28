<template>
    <div class="nipo_conatiner bg-white border rounded-lg py-2 mt-4 shadow-lg">
        <div class="text-left ml-4 mt-4">
            <nuxt-link to="/report/workflow">
                <i class="far fa-arrow-alt-circle-left fa-2x text-gray-600"></i>
            </nuxt-link>
        </div>
        <h1 class="text-3xl pb-2">準備完了/入店報告</h1>
        <p>自宅を出発してから店舗に入店するまでの間に報告してくだいさい。</p>
        <hr class="my-3">
        <div class="mb-4">
            <label class="label" for="text-area-ocn2">氏名 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="username" type="text" name="name" class="border rounded-lg p-2 w-11/12">
        </div>

        <div class="mb-4">
            <label class="label">メールアドレス <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <input v-model="mail" type="mail" name="date" class="border rounded-lg p-2 w-11/12 ease-linear transition-all duration-150">
        </div>

        <div class="mb-4">
            <label class="label">店舗名 <span class="bg-red-500 rounded-lg px-2 text-xs text-white">必須</span></label>
            <v-select name="shop" :options="shops" v-model="shop" ></v-select>
        </div>

        <div class="mb-4">
            <label class="label">イベント実施場所 <span class="bg-gray-400 rounded-lg px-2 text-xs text-white">任意</span></label>
            <input v-model="place" type="text" name="attend" class="border rounded-lg p-2 w-11/12 ease-linear transition-all duration-150">
        </div>

        <div class="mb-4">
            <label class="label">入店予定時間 <span class="bg-red-400 rounded-lg px-2 text-xs text-white">必須</span></label>
            <!-- <input v-model="time" type="time" name="attend" class="border rounded-lg p-2 w-11/12 ease-linear transition-all duration-150"> -->
            <Datetime
                v-model="requestDate"
                :minute-interval="30"
                :format="'HH:mm'"
                :overlay="true"
                :only-time="true"
                label="入店予定時間"
                class="datepicker"
            ></Datetime>
        </div>
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
            mail: '',
            shop: '',
            place: '',
            requestDate: null,
            shops: [

            ],
        }
    },
    methods: {
        PushNipo: function() {
            var CurrentUser = auth().currentUser;
            var usersSkpCol = firestore().collection(`users/${CurrentUser.uid}/event_start`)
            usersSkpCol.add({
                createdAt: firestore.FieldValue.serverTimestamp(),
                type: 'event',
                username: this.username,
                mail: this.mail,
                shop: this.shop,
                place: this.place,
                requestDate: this.requestDate,
            })
            .then(() => {
                alert('送信しました')
                this.username = '';
                this.mail = '';
                this.shop = '';
                this.pwwwlace = '';
                this.requestDate = '';
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
        this.mail = this.$store.state.useremail
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

    .datepicker {
        width: 91.666667%;
        border-radius: 8px;
        border-color: #e5e7eb;
        margin-right: auto;
        margin-left: auto;
    }
</style>