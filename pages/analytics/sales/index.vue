<template>
    <div class="mt-14 mb-40">
        <div class="w-full lg:w-8/12 px-4">
        <div class="text-left ml-4">
            <nuxt-link to="/analytics">
                <i class="far fa-arrow-alt-circle-left fa-2x text-gray-600"></i>
            </nuxt-link>
        </div>
        <h2 class="uppercase font-bold text-2xl mb-6 pb-6 border-b-2">
            営業担当を選ぶ
        </h2>
            <div
            v-for="(staff, index) in staffs" :key="index"
            class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 shadow-lg"
            >
            <nuxt-link :to="{name: 'analytics-sales-userid', params: { userid: staff.userid }}">
                <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                            <div class="relative w-full pr-4 max-w-full flex-grow flex-1 text-left">
                                <h5 class="uppercase font-bold text-lg">
                                {{ staff.name }}
                                </h5>
                            </div>
                            <div class="relative w-auto pl-4 flex-initial">
                                <div
                                class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500"
                                >
                                <i class="fas fa-check"></i>
                                </div>
                            </div>
                    </div>
                    <p class="text-sm mt-4">
                    <span class="mr-2 text-emerald-500"
                        ><i class="fas fa-arrow-up"></i> 3.48% </span
                    ><span class="whitespace-nowrap">Since last month</span>
                    </p>
                </div>
            </nuxt-link>
            </div>
        </div>
    </div>
</template>


<script>
import { auth } from '~/plugins/firebase.js'
import { firestore } from '~/plugins/firebase.js'

export default {
    layout: 'default',
    data() {
        return {
            staffs: [],
        }
    },
    mounted() {
        var self = this;

        var user_group = firestore().collectionGroup('users').where('uid', '!=', auth().currentUser.uid);

        user_group.get().then((qs) => {
            qs.forEach((doc) => {
                console.log(doc.data().name)
                self.staffs.push(...[
                    {
                        "name": doc.data().name,
                        "userid": doc.data().uid,
                    },
                    ])
            })
        })

    }
}
</script>
<style lang="">
    
</style>