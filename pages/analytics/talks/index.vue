<template>
    <div class="mt-10 mb-40">
        <div class="w-full lg:w-8/12 px-4">
        <div class="text-left ml-4">
            <nuxt-link to="/analytics">
                <i class="far fa-arrow-alt-circle-left fa-2x text-gray-600"></i>
            </nuxt-link>
        </div>
        <div>
            <h2 class="uppercase font-bold text-2xl mb-6 pb-6 border-b-2">
            稼働種別
        </h2>
        </div>
            <div
            class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 shadow-lg"
            >
                <nuxt-link to="/analytics/talks/docomo">
                    <div class="flex-auto p-4">
                        <div class="flex flex-wrap">
                        <div
                            class="relative w-full pr-4 max-w-full flex-grow flex-1 text-left"
                        >
                            <h5 class="uppercase font-bold text-lg">
                            ドコモ
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
            <div
            class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 shadow-lg"
            >
                <nuxt-link to="/analytics/talks/skp">
                    <div class="flex-auto p-4">
                        <div class="flex flex-wrap">
                        <div
                            class="relative w-full pr-4 max-w-full flex-grow flex-1 text-left"
                        >
                            <h5 class="uppercase font-bold text-lg">
                            スカパー
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
            <div
            class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 shadow-lg"
            >
                <nuxt-link to="/analytics/talks/ocn">
                    <div class="flex-auto p-4">
                        <div class="flex flex-wrap">
                        <div
                            class="relative w-full pr-4 max-w-full flex-grow flex-1 text-left"
                        >
                            <h5 class="uppercase font-bold text-lg">
                            OCN
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
    layout: 'default'
}
</script>
<style lang="">
    
</style>