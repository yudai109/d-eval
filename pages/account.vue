<template>
    <div>
        <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
        >
        <div class="rounded-t bg-white mb-0 px-6 py-6">
            <div class="text-center flex justify-between">
            <h6 class="text-blueGray-700 text-xl font-bold">アカウント設定</h6>
            <div>
                <button
                    class="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                    type="button"
                >
                    設定変更
                </button>
                <nuxt-link to="/logout">
                    <button
                        class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        type="button"
                    >
                        ログアウト
                    </button>
                </nuxt-link>
            </div>
            </div>
        </div>
        <div class="flex-auto px-4 lg:px-10 py-40 pt-0">
            <form>
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                ユーザー情報
            </h6>
            <div class="flex flex-wrap">
                <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                    <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-password"
                    >
                    ユーザー名 </label
                    ><input
                    v-model="username"
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="ユーザー名"
                    />
                </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                    <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-password"
                    >
                    メールアドレス </label
                    ><input
                    v-model="useremail"
                    type="email"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="メールアドレス"
                    />
                </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                    <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-password"
                    >
                    所属 </label
                    ><input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="所属"
                    />
                </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                    <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-password"
                    >
                    担当店舗 </label
                    >
                    <input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="店舗1"
                    />
                </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                    <input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="店舗2"
                    />
                </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                    <input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="店舗3"
                    />
                </div>
                </div>
                <div class="w-full lg:w-6/12 px-4">
                <div class="relative w-full mb-3">
                    <input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="店舗4"
                    />
                </div>
                </div>
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Contact Information
            </h6>
            <div class="flex flex-wrap">
                <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                    <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-password"
                    >
                    所属年数 </label
                    ><input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="所属年数"
                    />
                </div>
                </div>
                <div class="w-full lg:w-4/12 px-4">
                <div class="relative w-full mb-3">
                    <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-password"
                    >
                    理解度テストスコア </label
                    ><input
                    type="email"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                </div>
                </div>
                <div class="w-full lg:w-4/12 px-4">
                <div class="relative w-full mb-3">
                    <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-password"
                    >
                    タレントスコア </label
                    ><input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                </div>
                </div>
                <div class="w-full lg:w-4/12 px-4">
                <div class="relative w-full mb-3">
                    <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-password"
                    >
                    ユーザーコード </label
                    ><input
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                </div>
                </div>
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />
            <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                About Me
            </h6>
            <div class="flex flex-wrap">
                <div class="w-full lg:w-12/12 px-4">
                <div class="relative w-full mb-3">
                    <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    for="grid-password"
                    >
                    About me </label
                    ><textarea
                    type="text"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    rows="4"
                    placeholder="メモ"
                    > </textarea
                    >
                </div>
                </div>
            </div>
            </form>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: "",
            useremail: "",
        }
    },
    mounted() {
        this.username = this.$store.state.username
        this.useremail = this.$store.state.useremail
    }
}
</script>
<style lang="">
    
</style>