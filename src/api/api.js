import $axios from 'axios';
export const api = {
    // 获取往期开奖列表
    todayLottery(fn,data) {
        $axios({
            method: 'GET',
            url: data.url,
        }).then(res => {
            fn(res);
        }).catch(err => {
            console.log('获取今日开奖列表失败');
        });
    },
    // 请求服务器时间
    getServerTime(fn,data) {
        $axios({
            method: 'GET',
            url: data.url,
            data: {
                Action: 'GetServerTimeMillisecond',
                SourceName: 'PC'
            }
        }).then(res => {
            fn(res);
        }).catch(err => {
            console.log('获取服务器时间失败');
        });
    }
}

export default api;
