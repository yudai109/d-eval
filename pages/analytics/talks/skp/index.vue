<template>
    <div class="mt-14 mb-40">
        <div class="w-full lg:w-8/12 px-4">
        <div class="text-left ml-4">
            <nuxt-link to="/analytics/talks/">
                <i class="far fa-arrow-alt-circle-left fa-2x text-gray-600"></i>
            </nuxt-link>
        </div>
        <h2 class="uppercase font-bold text-2xl mb-6 pb-6 border-b-2">
            月を選ぶ
        </h2>
            <div
            v-for="(skp_shop, index) in skp_aw_shops" :key="index"
            class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 shadow-lg"
            >
            <nuxt-link :to="{ name: 'analytics-talks-skp-sawesome', params: { sawesome: skp_shop.skp_aw_id }}">
                <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                    <div
                        class="relative w-full pr-4 max-w-full flex-grow flex-1 text-left"
                    >
                        <h5 class="uppercase font-bold text-lg">
                        {{ skp_shop.name }}
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
export default {
    layout: 'default',
    data() {
        return {
            skp_aw_shops: [],
        }
    },
    mounted() {
        var self = this;
        self.skp_aw_shops.push(...[{"name":"二見","skp_aw_id":"1"},{"name":"明石","skp_aw_id":"2"}])
    }
}
</script>
<style lang="">
    
</style>