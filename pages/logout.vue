<template>
    <div>
        <h1>ログアウトページ</h1>
    </div>
</template>
<script>
export default {
    layout: 'authLayout',
    middleware({store, redirect}) {
        if (store.getters.isAuthenticated) {
            store
            .dispatch('signOut')
            .then(() => {
                redirect('/login')
            })
            // this.$router.push({
            //     name: 'index'
            // })
        }
    }
}
</script>