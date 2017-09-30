<template>
    <div>
        <!-- 头部预留 -->
		<lottery-header></lottery-header>
        
        <!-- 主体 -->
        <div class="container bet">
            <lottery-top></lottery-top>
            <div class="betContent fix">
                <bet6-h-c></bet6-h-c>
                <lottery-right></lottery-right>
            </div>
        </div>

        <!-- 底部预留 -->
		<lottery-footer></lottery-footer>
    </div>
</template>
<script>
import LotteryHeader from '../../components/LotteryHeader.vue';
import LotteryFooter from '../../components/LotteryFooter.vue';
import LotteryTop from '../../components/LotteryTop.vue';
import LotteryRight from '../../components/LotteryRight.vue';
import Bet6HC from '../../components/Bet6HC.vue';
export default {
    components: {
        LotteryTop,
        LotteryRight,
        Bet6HC,
        LotteryHeader,
		LotteryFooter
    },
    data() {
        return {
            caiName: {
                SSC: "时时彩",
                XYNC: "幸运农场",
                PK10: "北京PK10",
                KL8: "北京快乐8",
                PL35: "排列3",
                FC3D: "福彩3D",
                SYX5: "11选5",
                K3: "快3",
                "6HC": "六合彩"
            },
        }
    },
    methods: {
        
    },
    mounted() {
        this.$NProgress.done();
    }
}
</script>
<style lang="scss" scoped>
@import url('../../assets/style/common/normalize.css');
@import url('../../assets/style/common/reset.css');
@import url('../../assets/style/lottery/lottery.scss');
.betContent {
    border-top: 1px solid #ddd;
}
</style>


