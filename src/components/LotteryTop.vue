<template>
    <div class="betTitle fix head6HC">
        <!-- Logo -->
        <div class="betLogo">
            <h2>{{ Lotterytitle }}</h2>
            <i class="iconfont L_6HC"></i>
        </div>
        <!-- 定时器 -->
        <div class="time">
            <div class="timeTitle">距<b>{{ NowIssue }}</b>期投注截止还有：</div>
            <em>{{ endTime }}</em>
        </div>
        <!-- 上期开奖号码 -->
        <div id="Results" class="announced">
            <div class="announcedTitle">第<b>{{ OldIssue }}</b>期开奖号码：</div>
            <div class="openNumber" v-if="openNumberModel">
                <div class="number-box" v-for="(item,index) in LotteryOpenArr" :key="index">
                    <em :class=" item.number | color(red,blue,green)">{{ item.number }}</em>
                    <span class="number-box-text">{{ item.animal }}</span>
                </div>
                <!---->
                <div class="number-box plus">
                    <em class="symbol">+</em>
                </div>
                <div class="number-box">
                    <em :class=" LotteryOpenRes.number | color(red,blue,green)">{{ LotteryOpenRes.number }}</em>
                    <span class="number-box-text">{{ LotteryOpenRes.animal }}</span>
                </div>
            </div>
            <div class="openNumber" v-else>
                <div class="number-box" v-for="(item,index) in openNumberModelArr" :key="index">
                    <em class="red">{{ item }}</em>
                </div>
                <!---->
                <div class="number-box plus">
                    <em class="symbol">+</em>
                </div>
                <div class="number-box">
                    <em class="red">{{ openNumberModelArr[0] }}</em>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { formDataInit } from '../common/js/util.js';
// Date format
Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
                (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
function filterColor(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}
export default {
    data() {
        return {
            Lotterytitle: this.$store.state.LHC.LotteryName,
            LotteryCode: this.$store.state.LHC.lotteryCode,
            itemData: {},
            endTime: '00:00:00',
            animalFlag: false,
            // 揭示上期开奖结果
            openNumberModel: false,
            openNumberModelArr: ['01', '01', '01', '01', '01', '01'],
            LotteryOpenArr: [],
            LotteryOpenRes: {},
            red: ["01", "02", "07", "08", "12", "13", "18", "19", "23", "24", "29", "30", "34", "35", "40", "45", "46"],
            blue: ["03", "04", "09", "10", "14", "15", "20", "25", "26", "31", "36", "37", "41", "42", "47", "48"],
            green: ["05", "06", "11", "16", "17", "21", "22", "27", "28", "32", "33", "38", "39", "43", "44", "49"],
        }
    },
    filters: {
        color(value, r, b, g) {
            if (!value) return '';
            var r_flag = filterColor(r, value);
            var b_flag = filterColor(b, value);
            var g_flag = filterColor(g, value);
            if (r_flag) {
                return 'red';
            } else if (b_flag) {
                return 'blue';
            } else if (g_flag) {
                return 'green';
            }
        }
    },
    computed: {
        NowIssue() {
            return this.$store.state.LHC.NowIssue;
        },
        OldIssue() {
            return this.$store.state.LHC.OldIssue;
        },
        natal() {
            return this.$store.state.LHC.natal;
        },
        LotteryOpenArrC() {
            return this.$store.state.LHC.LotteryOpenArr;
        },
        LotteryOpenResC() {
            return this.$store.state.LHC.LotteryOpenRes;
        },
        numberToAnimalList() {
            return this.$store.state.LHC.numberToAnimal;
        },
        userName() {
            return this.$store.state.userName;
        }
    },
    methods: {
        getLotteryPlanData(fn) {
            var o = {
                Action: 'GetLotteryPlan',
                Qort: '1301',
                SourceName: 'PC',
            };
            var a = formDataInit(o);
            this.$axios({
                method: 'POST',
                url: this.getApi('getLotteryPlan'),
                params: {
                    A: 'GetLotteryPlan',
                    S: this.$store.state.Attach,
                    U: this.userName
                },
                data: a,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(res => {
                fn(res.data);
            }).catch(err => {
                console.log(err);
            });
        },
        abortTimer() {
            
            var abort = this.itemData.OpenTime;
            this.$store.dispatch('getServerTime',{
                url: this.getApi('getServerTime')
            }).then(res => {
                var _this = this;
                // 服务器时间保存到仓库去。
                _this.$store.state.LHC.serverTime = res.data.Data;
                var serverYear = new Date(Number(res.data.Data)).getFullYear();
                var serverMonth = new Date(Number(res.data.Data)).getMonth() + 1;
                var serverDay = new Date(Number(res.data.Data)).getDate();
                var NextLotteryOpenTime, NextLotteryOpenDay, lotteryIssue;

                var p = localStorage.getItem('lotteryPlan' + _this.LotteryCode);
                p = JSON.parse(p);
                if (p === null || p.Month !== serverMonth) {
                    _this.getLotteryPlanData(function(r) {
                        if(r.Code === 0) {
                            return;
                        }
                        localStorage.setItem('lotteryPlan' + _this.LotteryCode, JSON.stringify(r.Data));
                        let f = Number(r.Data.Month) === Number(serverMonth);
                        let ScheduleArr = r.Data.Schedule.split(',');
                        if (f) {
                            for (let i = 0; i < ScheduleArr.length; i++) {
                                if (serverDay <= Number(ScheduleArr[i])) {
                                    NextLotteryOpenDay = Number(ScheduleArr[i]);
                                    lotteryIssue = Number(r.Data.BeforeIssue) + (i + 1);
                                    break;
                                }
                            }
                            _this.$store.state.LHC.OldIssue = serverYear + '' + (lotteryIssue - 1);
                            _this.$store.state.LHC.NowIssue = serverYear + '' + lotteryIssue;
                        }
                        var NextLotteryOpenTime = new Date('' + serverYear + '-' + serverMonth + '-' + NextLotteryOpenDay + ' 21:25').getTime();
                        var Difftime = (new Date().getTime()) - Number(res.data.Data);
                        _this.$store.state.Difftime = Difftime;
                        localStorage.setItem('Difftime', Difftime);
                        _this.TimerAction({
                            NextLotteryOpenTime: NextLotteryOpenTime,
                            nowTime: res.data.Data
                        });
                    });
                    
                } else {
                    let f = Number(p.Month) === Number(serverMonth);
                    let ScheduleArr = p.Schedule.split(',');
                    if (f) {
                        for (let i = 0; i < ScheduleArr.length; i++) {
                            if (serverDay <= Number(ScheduleArr[i])) {
                                NextLotteryOpenDay = Number(ScheduleArr[i]);
                                lotteryIssue = Number(p.BeforeIssue) + (i + 1);
                                break;
                            }
                        }
                    }
                    var NextLotteryOpenTime = new Date('' + serverYear + '-' + serverMonth + '-' + NextLotteryOpenDay + ' 21:25').getTime();
                    _this.TimerAction({
                        NextLotteryOpenTime: NextLotteryOpenTime,
                        nowTime: res.data.Data
                    });
                    
                }
                
                this.$store.state.LHC.OldIssue = serverYear + '' + (lotteryIssue - 1);
                this.$store.state.LHC.NowIssue = serverYear + '' + lotteryIssue;


            });
        },
        // 开奖
        openLottery() {
            var _this = this;
            // 关闭所有的弹窗。
            layer.closeAll();
            // 重新请求服务器时间重置定时器
            _this.abortTimer();
            // 重新请求往期开奖列表重新渲染模板
            _this.$store.dispatch('LHC/todayLottery',{
                url: _this.getApi('getLotteryOpenList')
            });
            var s = _this.$store.state.LHC.serverTime;
            var g = new Date(parseInt(s)).getFullYear;
            layer.open({
                title: "温馨提示",
                style: "width:18em;font-size:.7em",
                skin: "layerBet timeConfirm",
                type: 1,
                area: ['380px', '226px'],
                shadeClose: true, //点击遮罩关闭
                btn: ["确定"],
                content: _this.$store.state.LHC.OldIssue.replace(g, "") + '期已截止</br>当前期号<span style="color:red">' + _this.$store.state.LHC.NowIssue.replace(g, "") + "</span></br>投注时请注意期号",
            });
        },
        TimerAction(o) {
            var _this = this;
            var surplus = parseInt(o.NextLotteryOpenTime - o.nowTime);
            if (surplus <= 0) {
                return;
            }
            var t = setInterval(() => {
                var s = Math.floor(surplus / (1000 * 60 * 60));
                var n = Math.floor(surplus / (1000 * 60) % 60);
                var r = Math.floor((surplus / 1000) % 60);
                s = s > 9 ? s : "0" + s;
                n = n > 9 ? n : "0" + n;
                r = r > 9 ? r : "0" + r;
                var final = `${s}:${n}:${r}`;
                _this.endTime = final;
                _this.$store.state.LHC.TimeBar = _this.endTime;
                surplus = surplus - 1000;
                if (surplus <= 0 || _this.endTime === '00:00:00') {
                    _this.openLottery();
                    clearInterval(t);
                }
            }, 1000);
        },
        // 号码对应生肖算法
        numberToAnimal(s) {
            this.animalFlag = true;
            var opArr = [];
            var op = this.LotteryOpenArrC;
            var ed = String(this.LotteryOpenResC);
            var edRes = {};
            var a = this.numberToAnimalList;
            for (let i = 0; i < op.length; i++) {
                let o = {};
                for (let j = 0; j < a.length; j++) {
                    let f = a[j].eg.some(function(item) {
                        return item === op[i];
                    });
                    if (f) {
                        o.animal = a[j].name;
                        o.number = op[i];
                        opArr.push(o);
                        break;
                    } else {
                        continue;
                    }
                }
            }

            for (let k = 0; k < a.length; k++) {
                let f = a[k].eg.some(function(item) {
                    return item === ed;
                });
                if (f) {
                    edRes.animal = a[k].name;
                    edRes.number = ed;
                    break;
                } else {
                    continue;
                }
            }
            this.LotteryOpenArr = opArr;
            this.LotteryOpenRes = edRes;
            this.openNumberModel = true;
        },
        openNumberModelAnimation() {
            var _this = this;
            setInterval(() => {
                this.openNumberModelArr.map((ele,index) => {
                    if(Number(ele) >= 10) {
                        ele = 1;
                    }
                    ele = Number(ele) + 1;
                    if(ele < 10) {
                        ele = '0' + ele;
                    }
                    this.$set(this.openNumberModelArr, index, ele);
                });
            },60);
        }
    },
    mounted() {
        this.abortTimer();
        this.openNumberModelAnimation();
    },
    updated() {
        if (this.LotteryOpenArrC.length !== 0 && this.animalFlag === false) {
            this.numberToAnimal();
        }
    }
}
</script>
<style lang="scss" scoped>
.betTitle {
    padding: 15px;

    .announced,
    .betLogo,
    .time {
        background: url(http://imagess-google.com/system/pc/k3/betBg.png);
        float: left;
        height: 140px;
        border-radius: 6px;
    }

    /* Logo */
    .betLogo {
        width: 284px;
        margin-right: 10px;
        text-align: center;
        h2 {
            font-size: 24px;
            text-align: center;
            margin: 15px 0;
            color: #333;
            font-weight: 700;
        }
        i {
            font-size: 60px;
            line-height: 70px;
            border-radius: 50%;
            padding: 4px;
            position: relative;
            margin-left: -52px;
            top: -3px;
            &:before {
                content: "";
                position: absolute;
                display: block;
                height: 1px;
                width: 36px;
                box-shadow: 0 0 10px 2px #b7a4a4;
                background: #dac9c9;
                z-index: 1;
                left: 12px;
                bottom: 3px;
            }
            &:after {
                position: absolute;
                z-index: 2;
                left: 0;
                top: 0;
            }
        }
    }
    /* 定时器 */
    .time {
        width: 380px;
        text-align: center;
        margin-right: 10px;
        .timeTitle {
            text-align: center;
            margin: 15px 0;
            font-size: 14px;
            color: #333;
            font-weight: 700;
            b {
                color: red;
                margin: 0 5px;
            }
        }
        em {
            display: inline-block;
            height: 52px;
            color: #fff;
            font-size: 38px;
            line-height: 52px;
            font-family: Microsoft Yahei;
            margin-top: 6px;
            width: 200px;
            background: #455467;
            border-radius: 3px;
            text-shadow: 0 1px 1px #000;
        }
    }
    .announced {
        width: 284px;
        text-align: center;
        position: relative;
        overflow: hidden;
        .announcedTitle {
            margin-bottom: 0;
            text-align: center;
            margin: 15px 0 0 0;
            font-size: 14px;
            color: #333;
            font-weight: 700;
            b {
                color: red;
                margin: 0 5px;
            }
        }
        .openNumber {
            width: 100%;
            padding: 0 .6em;
            margin-top: .46em;
            font-size: .7em;
            display: table;
            table-layout: fixed;
            padding-top: 15px;
            .number-box {
                margin-right: 0;
                vertical-align: top;
                display: table-cell;
                margin: 0 .3em;
                text-align: center;
                &.plus {
                    width: 1em;
                    em {
                        color: #333;
                        box-shadow: none;
                        width: 100%!important;
                    }
                }
                em,
                span {
                    width: 100%;
                    display: block;
                    margin: 0 auto;
                    text-align: center;
                }
                span {
                    font-size: 14px;
                    color: #333;
                    line-height: 1.4;
                }
                em {
                    height: 1.8em;
                    width: 1.8em;
                    line-height: 1.8em;
                    box-shadow: 0 1px 1px #bbb59c;
                    border-radius: 50%;
                    color: #fff;
                    font-size: .8em;
                    margin-bottom: .4em;
                }
                em {
                    height: 30px;
                    width: 30px;
                    line-height: 30px;
                    font-size: 14px;
                }
                em.blue {
                    background: linear-gradient(0deg, #6ebefa 0, #218ddd 75%);
                    background: -webkit-linear-gradient(top, #6ebefa, #218ddd 75%);
                }
                em.green {
                    background: linear-gradient(0deg, #69d893 0, #38b366 75%);
                    background: -webkit-linear-gradient(top, #69d893, #38b366 75%);
                }
                em.red {
                    background: linear-gradient(0deg, #f87b7e 0, #dc3b40 75%);
                    background: -webkit-linear-gradient(top, #f87b7e, #dc3b40 75%);
                }
            }
        }
    }
}
</style>
