<template>
    <div class="mt-14">
        <div class="w-full lg:w-8/12 px-4">
        <h2 class="uppercase font-bold text-2xl mb-6 pb-6 border-b-2">
            分析方法
        </h2>
            <div
            class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 shadow-lg"
            >
            <nuxt-link to="analytics/sales">
                <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                    <div
                        class="relative w-full pr-4 max-w-full flex-grow flex-1 text-left"
                    >
                        <h5 class="uppercase font-bold text-lg">
                        営業担当別
                        </h5>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                        <div
                        class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500"
                        >
                        <i class="far fa-user"></i>
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
        <div class="w-full lg:w-8/12 px-4">
            <div
            class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 shadow-lg"
            >
            <nuxt-link to="analytics/talks">
                <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                    <div
                        class="relative w-full pr-4 max-w-full flex-grow flex-1 text-left"
                    >
                        <h5 class="uppercase font-bold text-lg">
                        優良事例集
                        </h5>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                        <div
                        class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-green-500"
                        >
                        <i class="far fa-comments"></i>
                        </div>
                    </div>
                    </div>
                    <p class="text-sm mt-4">
                    <span class="mr-2 text-emerald-500"
                        ><i class="fas fa-arrow-up"></i> 3.48% </span>
                    </p>
                </div>
            </nuxt-link>
            </div>
        </div>
        <div class="w-full lg:w-8/12 px-4">
            <div
            class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 shadow-lg"
            >
            <nuxt-link to="analytics/reports">
                <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                    <div
                        class="relative w-full pr-4 max-w-full flex-grow flex-1 text-left"
                    >
                        <h5 class="uppercase font-bold text-lg">
                        自分の報告
                        </h5>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                        <div
                        class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-blue-500"
                        >
                        <i class="far fa-comments"></i>
                        </div>
                    </div>
                    </div>
                    <p class="text-sm mt-4">
                    <span class="mr-2 text-emerald-500"
                        ><i class="fas fa-arrow-up"></i> 3.48% </span>
                    </p>
                </div>
            </nuxt-link>
            </div>
        </div>
        <!-- <div class="w-full lg:w-8/12 px-4">
            <div
            class="relative flex flex-col min-w-0 break-words bg-white rounded-lg mb-6 shadow-lg"
            >
            <nuxt-link to="analytics/talks">
                <div class="flex-auto p-4">
                    <div class="flex flex-wrap">
                    <div
                        class="relative w-full pr-4 max-w-full flex-grow flex-1 text-left"
                    >
                        <h5 class="uppercase font-bold text-lg">
                        トーク事例別
                        </h5>
                    </div>
                    <div class="relative w-auto pl-4 flex-initial">
                        <div
                        class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-green-500"
                        >
                        <i class="far fa-comments"></i>
                        </div>
                    </div>
                    </div>
                    <p class="text-sm mt-4">
                    <span class="mr-2 text-emerald-500"
                        ><i class="fas fa-arrow-up"></i> 3.48% </span>
                    </p>
                </div>
            </nuxt-link>
            </div>
        </div> -->
    </div>
</template>
<script>
export default {
    layout: 'default'
}
</script>
<style lang="">
    
</style>