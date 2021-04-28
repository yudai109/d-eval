<template >
    <!-- 線グラフ -->
    <div class="w-full xl:w-8/12 px-4">
        <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-700"
        >
            <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
            <div class="flex flex-wrap items-center">
                <div class="relative w-full max-w-full flex-grow flex-1">
                <h6
                    class="uppercase text-blueGray-100 mb-1 text-xs font-semibold"
                >
                    Overview
                </h6>
                <h2 class="text-white text-xl font-semibold">
                    獲得率推移
                </h2>
                </div>
            </div>
            </div>
            <div class="p-4 flex-auto">
            <div class="relative h-350-px">
                <div class="chartjs-size-monitor">
                <div class="chartjs-size-monitor-expand">
                    <div class=""></div>
                </div>
                <div class="chartjs-size-monitor-shrink">
                    <div class=""></div>
                </div>
                </div>
                <canvas
                id="line-chart"
                width="500"
                height="350"
                class="chartjs-render-monitor"
                style="display: block; height: 350px; width: 500px;"
                ></canvas>
            </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    mounted() {
        this.$nextTick(function () {
        let config = {
            type: "line",
            data: {
            labels: [
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月",
                "1月",
            ],
            datasets: [
                {
                label: "店舗達成率",
                fill: false,
                backgroundColor: "#F59E0B",
                borderColor: "#F59E0B",
                data: [30, 78, 56, 34, 100, 45, 13, 20, 20, 30],
                barThickness: 15,
                },
                {
                label: "個人達成率",
                fill: false,
                backgroundColor: "#3B82F6",
                borderColor: "#3B82F6",
                data: [20, 68, 86, 74, 10, 4, 87, 40, 30, 60],
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
        var ctx = document.getElementById("line-chart").getContext("2d");
        window.myLine = new Chart(ctx, config);
        });
    }
};
</script>


<style lang="">
</style>