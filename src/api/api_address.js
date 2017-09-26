export default{
	install(Vue,options)
	{
		Vue.prototype.getApi = function (api) {
			const api_port = {
				// APP
				// 登录判断,及保留用户名
				getLogin: '/mock/getLogin.json',
				// 获取用户信息
				getUserInfo: '/mock/getUserInfo.json',

				// 头部请求
				// 余额显示
				getUserBalance: '/mock/getUserBalance.json',
				// 获取我的卡片
				getMyCard: '/mock/getMyCard.json',
				
				// getInitData
				getInitData: '/mock/getInitData.json',
				// 获取彩票计划
				getLotteryPlan: '/mock/getLotteryPlan.json',
				// 获取上期开奖号码
				getOldLotteryOpenRes: '/mock/getOldLotteryOpenRes.json',
				// 获取服务器时间
				getServerTime: '/mock/getServerTime.json',
				// 获取往期开奖列表
				getLotteryOpenList: '/mock/getLotteryOpenList.json',
				// 获取中奖信息列表
				getNewestBonusList: '/mock/getNewestBonusList.json',
				// 获取昨日奖金榜
				getUserBonusRanking: '/mock/getUserBonusRanking.json',
				// 获取用户卡片信息
				getCard: '/mock/getCard.json',
				// 支付提交投注订单
				getPay: ''
			}
			return api_port[api];
		}
	}
}