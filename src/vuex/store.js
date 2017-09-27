import Vue from 'vue';
import Vuex from 'vuex';

// 加载 api 方法
import $api from '../api/api.js';

Vue.use(Vuex);

// 六合彩模块仓库
const LHC = {
    // 添加命名空间, 否则无法处理模块作用域问题。
    namespaced: true,
    state: {
        LotteryName: '六合彩',
        // 现在是哪一期
        NowIssue: '',
        lotteryCode: '1301',
        // 上期是哪一期
        OldIssue: '',
        // 服务器时间
        serverTime: 0,
        // 6HC 期号
        issuseNo: '',
        // 本命
        natal: '',
        // 上期开什么
        LotteryOpenArr:[],
        LotteryOpenRes: {},
        // 定时器
        TimeBar: '00:00:00',
        // 生肖对应表
        numberToAnimal:[],
        // 往期开奖列表保存
        LotteryOpenList: [],
    },
    mutations: {
        UPDATE_LotteryOpenList(state,res) {         // 更新往期彩票列表
            state.LotteryOpenList = res;
        },
        UPDATE_LotteryOpenArr(state,res) {          //  更新上期彩票开奖结果前六位正码
            state.LotteryOpenArr = res;
        },
        UPDATE_LotteryOpenRes(state,res) {          //  更新上期彩票开奖结果最后一位特码
            state.LotteryOpenRes = res;
        }
    },
    actions: {
        todayLottery(context,data) {
            return new Promise((resolve,reject) => {
                $api.todayLottery((res) => {
                    var r = res.data.BackData[0].LotteryOpen.split(',');
                    context.commit('UPDATE_LotteryOpenList', res.data.BackData);
                    context.commit('UPDATE_LotteryOpenArr', r.slice(0, -1));
                    context.commit('UPDATE_LotteryOpenRes', r[r.length - 1]);
                    resolve();
                }, data);
            });
        }
    },
    getters: {

    }
}

// 创建 store 实例
export default new Vuex.Store({
    state: {
        // 用户名
        userName: '',
        myCard: [],
    },
    mutations: {},
    actions: {
        getServerTime(context,data) {
            return new Promise((resolve,reject) => {
                $api.getServerTime((res) => {
                    resolve(res);
                }, data);
            });
        }
    },
    modules: {
        LHC: LHC
    },
})

