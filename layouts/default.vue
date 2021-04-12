<template>
    <div class="container bg-gray-100 ml-0 md:">
        <div class="hidden md:block">
            <sidebar-menu :menu="menu" :collapsed="iscollapsed" />
        </div>
        <Nuxt class="md:ml-12"/>
        <Bottom-nav />
    </div>
</template>

<script>
import Bottom_nav from '~/components/Bottom_nav.vue';

export default {
  components: { Bottom_nav },
    data() {
        return {
            iscollapsed: true,
            menu: [
                {
                header: true,
                title: "Main Navigation",
                hiddenOnCollapse: true,
                },
                {
                href: "/",
                title: "ダッシュボード",
                icon: "fa fa-home",
                },
                {
                href: "/report",
                title: "日報報告",
                icon: "fa fa-edit",
                },
                {
                href: "/analytics",
                title: "分析",
                icon: "fa fa-chart-bar",
                },
                {
                href: "/test",
                title: "理解度テスト",
                icon: "fa fa-tasks",
                },
                {
                href: "/export",
                title: "csvエクスポート",
                icon: "fa fa-file-csv",
                },
                {
                href: "/scrape",
                title: "スクレイピング",
                icon: "fa fa-file-csv",
                },
                {
                href: "/account",
                title: "設定",
                icon: "fa fa-cog",
                },
                // {
                // href: "/logout",
                // title: "ログアウト",
                // icon: "fa fa-sign-out-alt",
                // },
            ],
        };
    },
};
</script>

<style>
@import url("https://use.fontawesome.com/releases/v5.6.1/css/all.css");

.container {
    margin: 0;
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 15px;
}
</style>