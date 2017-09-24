import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 创建 store 实例
export default new Vuex.Store({
    state: {
        "LHC": {
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
        }
    },
    mutations: {
        intrement(state, payload) {
            // 变更状态
            state.count += payload.num
        }
    },
    actions: {
        intrement ({commit}, payload) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('intrement', payload)
                    resolve()
                }, payload.time)
            })
        }
    }
})