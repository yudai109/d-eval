<template >
    <!-- 獲得実数 -->
    <div class="flex flex-wrap">
        <div class="w-full mb-12 xl:mb-0 px-4">
        <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
                <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h2 class="font-semibold text-xl">
                    獲得実数
                </h2>
                </div>
                <div
                class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                    class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button">
                    See all
                </button>
                </div>
            </div>
            </div>
            <div class="block w-full overflow-x-auto">
            <table
                class="items-center w-full bg-transparent border-collapse">
                <thead>
                <tr>
                    <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    項目
                    </th>
                    <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    獲得実数
                    </th>
                    <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    店舗目標
                    </th>
                    <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    差分
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    PI販売数
                    </th>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {{ pi_kojin }}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    マイグレ販売数
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"> <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>
                    46,53%
                    </td>
                </tr>
                <tr>
                    <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    HS/タブ新規件数
                    </th>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {{ hs_kojin }}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    319
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"> <i class="fas fa-arrow-down text-orange-500 mr-4"></i>
                    46,53%
                    </td>
                </tr>
                <tr>
                    <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    マイグレ販売数
                    </th>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {{ migration_kojin }}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    294
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"> <i class="fas fa-arrow-down text-orange-500 mr-4"></i>
                    36,49%
                    </td>
                </tr>
                <tr>
                    <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    スマタブ総販数
                    </th>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {{ st_total_kojin }}
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    147
                    </td>
                    <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"> <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>
                    50,87%
                    </td>
                </tr>
                <tr> <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    dカードGOLD総数
                    </th> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {{ dcard_gold_kojin }}
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    190
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"> <i class="fas fa-arrow-down text-red-500 mr-4"></i>
                    46,53%
                    </td>
                </tr>
                <tr> <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    dカードレギュラー総数
                    </th> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {{ dcard_regu_kojin }}
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    190
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"> <i class="fas fa-arrow-down text-red-500 mr-4"></i>
                    46,53%
                    </td>
                </tr>
                <tr> <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    ドコモ光新規
                    </th> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {{ hikari_kojin }}
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    190
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"> <i class="fas fa-arrow-down text-red-500 mr-4"></i>
                    46,53%
                    </td>
                </tr>
                <tr> <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    ドコモ光転用
                    </th> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {{ hikari_tenyo_kojin }}
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    190
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"> <i class="fas fa-arrow-down text-red-500 mr-4"></i>
                    46,53%
                    </td>
                </tr>
                <tr> <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    ドコモ光事業者変更
                    </th> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {{ hikari_henko_kojin }}
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    190
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"> <i class="fas fa-arrow-down text-red-500 mr-4"></i>
                    46,53%
                    </td>
                </tr>
                <tr> <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    OCN
                    </th> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {{ hikari_ocn_kojin }}
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    190
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"> <i class="fas fa-arrow-down text-red-500 mr-4"></i>
                    46,53%
                    </td>
                </tr>
                <tr> <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    TVOP販売数
                    </th> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {{ tvop_kojin }}
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    190
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"> <i class="fas fa-arrow-down text-red-500 mr-4"></i>
                    46,53%
                    </td>
                </tr>
                <tr> <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    SKP販売数 顧客
                    </th> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {{ skp_cs_kojin }}
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    190
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"> <i class="fas fa-arrow-down text-red-500 mr-4"></i>
                    46,53%
                    </td>
                </tr>
                <tr> <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    SKP販売数 IC
                    </th> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {{ skp_ic_kojin }}
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    190
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"> <i class="fas fa-arrow-down text-red-500 mr-4"></i>
                    46,53%
                    </td>
                </tr>
                <tr> <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                    スカパー工事
                    </th> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {{ sj_kouji_kojin }}
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    190
                    </td> <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"> <i class="fas fa-arrow-down text-red-500 mr-4"></i>
                    46,53%
                    </td>
                </tr>

                </tbody>
            </table>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import { auth } from '~/plugins/firebase.js'
import { firestore } from '~/plugins/firebase.js'
export default {
    data() {
        return {
            negotiation_count: 0,
            customer_count: 0,
            hs_kojin: 0,
            pi_kojin: 0,
            migration_kojin: 0,
            st_total_kojin: 0,
            dcard_gold_kojin: 0,
            dcard_regu_kojin: 0,
            hikari_kojin: 0,
            hikari_tenyo_kojin: 0,
            hikari_henko_kojin: 0,
            hikari_ocn_kojin: 0,
            tvop_kojin: 0,
            skp_cs_kojin: 0,
            skp_ic_kojin: 0,
            sj_kouji_kojin: 0,
        }
    },
    methods: {
        setDefault: function() {
            var self = this;
            var current_user = auth().currentUser;
            var preformance_col = firestore().collection(`users/${current_user.uid}/Performance`)

            preformance_col.orderBy("createdAt", "desc").limit(1).get().then((qs) => {
                qs.forEach((doc) => {
                    self.negotiation_count =  doc.data().negotiation
                    self.customer_count =  doc.data().customer
                    self.hs_kojin =  doc.data().hs_kojin
                    self.pi_kojin =  doc.data().pi_kojin
                    self.migration_kojin =  doc.data().migration_kojin
                    self.st_total_kojin =  doc.data().st_total_kojin
                    self.dcard_gold_kojin =  doc.data().dcard_gold_kojin
                    self.dcard_regu_kojin =  doc.data().dcard_regu_kojin
                    self.hikari_kojin =  doc.data().hikari_kojin
                    self.hikari_tenyo_kojin =  doc.data().hikari_tenyo_kojin
                    self.hikari_henko_kojin =  doc.data().hikari_henko_kojin
                    self.hikari_ocn_kojin =  doc.data().hikari_ocn_kojin
                    self.tvop_kojin =  doc.data().tvop
                    self.skp_cs_kojin =  doc.data().skp_cs
                    self.skp_ic_kojin =  doc.data().skp_ic
                    self.sj_kouji_kojin =  doc.data().sj_kouji
                })
            })
        }
    },
    mounted() {
        this.setDefault()
    }
}
</script>