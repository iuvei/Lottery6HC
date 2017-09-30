var BaseURL = process.env.API_ROOT;
export default{
	install(Vue,options)
	{
		Vue.prototype.getApi = function (api) {
			const api_port = {
				// 头部请求
				// 余额显示
				getUserBalance: BaseURL,
				// 获取我的卡片
				getMyCard: BaseURL,
				
				// getInitData
				getInitData: BaseURL,

				// 获取中奖信息列表
				getNewestBonusList: BaseURL,
				// 获取昨日奖金榜
				getUserBonusRanking: BaseURL,
				// 获取用户卡片信息
				getCard: BaseURL,
				// 支付提交投注订单
				getPay: BaseURL,
				// 获取我的投注信息
				getMyBetting: BaseURL, 

				// 获取 Lottery 1301 计划
				getLotteryPlan: BaseURL,
			}
			return api_port[api];
		}
	}
}