<template>
        <!-- 獲得進捗率 -->
    <div class="w-full xl:w-4/12 px-4">
        <div
            class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
        >
            <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div class="flex flex-wrap items-center">
                <div class="relative w-full max-w-full flex-grow flex-1">
                <h6
                    class="uppercase mb-1 text-xs font-semibold"
                >
                    Performance
                </h6>
                <h2 class="text-xl font-semibold">
                    獲得進捗率
                </h2>
                </div>
            </div>
            </div>
            <div class="p-4 flex-auto">
            <div class="relative h-350-px overflow-x-auto">
                <div class="chartjs-size-monitor">
                <div class="chartjs-size-monitor-expand">
                    <div class=""></div>
                </div>
                <div class="chartjs-size-monitor-shrink">
                    <div class=""></div>
                </div>
                </div>
                <canvas
                id="bar-chart"
                width="320"
                height="350"
                class="chartjs-render-monitor"
                style="display: block; height: 350px; width: 320px;"
                ></canvas>
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
            kojin_data: this.$store.state.kojin_data,
            pending: false,
        }
    },
    beforeCreate() {
        this.$store.dispatch("setKojinData")
    },
    mounted() {
        setTimeout(() => {
            // if(this.pending) {
                this.$nextTick(() =>  {
                let config = {
                    type: "bar",
                    data: {
                    labels: [
                        "PI",
                        "HS/タブ",
                        "マイグレ",
                        "総販",
                        "dカード",
                        "ドコモ光",
                        "ISP付帯",
                        "TVOP付帯",
                        "SKP顧客",
                        "SKPIC",
                    ],
                    datasets: [
                        {
                        label: "店舗達成率",
                        fill: false,
                        backgroundColor: "#F59E0B",
                        borderColor: "#F59E0B",
                        // data: [
                        //     this.kojin_data.hs_kojin,
                        //     this.kojin_data.pi_kojin,
                        //     56, 34, 100, 45, 13, 20, 20, 30],
                        data: this.kojin_data,
                        barThickness: 15,
                        },
                        {
                        label: "個人達成率",
                        fill: false,
                        backgroundColor: "#3B82F6",
                        borderColor: "#3B82F6",
                        data: [40, 68, 86, 74, 10, 4, 87, 40, 30, 60],
                        barThickness: 15,
                        },
                    ],
                    },
                    options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    title: {
                        display: false,
                        text: "Orders Chart",
                    },
                    tooltips: {
                        mode: "index",
                        intersect: false,
                    },
                    hover: {
                        mode: "nearest",
                        intersect: true,
                    },
                    legend: {
                        labels: {
                        fontColor: "rgba(0,0,0,.4)",
                        },
                        align: "end",
                        position: "bottom",
                    },
                    scales: {
                        xAxes: [
                        {
                            display: true,
                            scaleLabel: {
                            display: true,
                            },
                            gridLines: {
                            borderDash: [2],
                            borderDashOffset: [2],
                            color: "rgba(33, 37, 41, 0.3)",
                            zeroLineColor: "rgba(33, 37, 41, 0.3)",
                            zeroLineBorderDash: [2],
                            zeroLineBorderDashOffset: [2],
                            },
                        },
                        ],
                        yAxes: [
                        {
                            display: true,
                            scaleLabel: {
                            display: false,
                            labelString: "Value",
                            },
                            gridLines: {
                            borderDash: [2],
                            drawBorder: false,
                            borderDashOffset: [2],
                            color: "rgba(33, 37, 41, 0.2)",
                            zeroLineColor: "rgba(33, 37, 41, 0.15)",
                            zeroLineBorderDash: [2],
                            zeroLineBorderDashOffset: [2],
                            },
                        },
                    ],
                },
            },
        };
        let ctx = document.getElementById("bar-chart").getContext("2d");
        window.myBar = new Chart(ctx, config);
        });

        console.log("jikkou")
            // }
        }, 500);
        // データ作成

    },
};
</script>


<style lang="">
</style>