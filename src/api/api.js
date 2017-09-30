import $axios from 'axios';
var BaseURL = process.env.API_ROOT;
export const api = {
    // 获取往期开奖列表
    todayLottery(fn,data) {
        var o = {
            Action: 'GetLotteryOpen',
            LotteryCode: '1301',
            IssueNo: '0',
            DataNum: '10',
            SourceName: 'PC'
        }
        var s,a = [];
        for(let i in o) {
            s = o[i];
            a.push(i + '=' + s);
        }
        a = a.join('&');
        $axios({
            method: 'POST',
            url:  BaseURL + '?A=GetLotteryOpen&S=dafa&U=c001',
            data: a,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        }).then(res => {
            fn(res);
        }).catch(err => {
            console.log('获取今日开奖列表失败');
        });
    },
    // 请求服务器时间
    getServerTime(fn,data) {
        var o = {
            Action: 'GetServerTimeMillisecond',
            SourceName: 'PC'
        }
        var s,a = [];
        for(let i in o) {
            s = o[i];
            a.push(i + '=' + s);
        }
        a = a.join('&');
        $axios({
            method: 'POST',
            url:  BaseURL + '?A=GetServerTimeMillisecond&S=dafa&U=c001',
            data: a,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        }).then(res => {
            fn(res);
        }).catch(err => {
            console.log('获取服务器时间失败');
        });
    }
}

export default api;
