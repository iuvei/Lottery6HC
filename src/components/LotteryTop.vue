<template>
    <div class="betTitle fix head6HC">
        <!-- Logo -->
        <div class="betLogo">
            <h2>{{ Lotterytitle }}</h2>
            <i class="iconfont L_6HC"></i>
        </div>
        <!-- 定时器 -->
        <div class="time">
            <div class="timeTitle">距<b>{{ parseInt(itemData.IssueNo) + 1 }}</b>期投注截止还有：</div>
            <em>{{ endTime }}</em>
        </div>
        <!-- 上期开奖号码 -->
        <div id="Results" class="announced">
            <div class="announcedTitle">第<b>{{ parseInt(itemData.IssueNo) }}</b>期开奖号码：</div>
            <div class="openNumber">
                <div class="number-box" v-for="item in LotteryOpenArr">
                    <em :class=" item.number | color(red,blue,green)">{{ item.number }}</em>
                    <span class="number-box-text">{{ item.animal }}</span>
                </div>
                <!---->
                <div class="number-box plus">
                    <em class="symbol">+</em>
                </div>
                <div class="number-box">
                    <em class="red">{{ LotteryOpenRes.number }}</em>
                    <span class="number-box-text">{{ LotteryOpenRes.animal }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
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
            Lotterytitle: '六合彩',
            LotteryCode: this.$route.params.code,
            itemData: {},
            endTime: '',
            LotteryOpenArr:[
        		{"animal":"蛇", "number":"41"},
        		{"animal":"鸡", "number":"25"},
        		{"animal":"龙", "number":"42"},
        		{"animal":"鸡", "number":"49"},
        		{"animal":"猴", "number":"26"},
        		{"animal":"鼠", "number":"34"},
            ],
            LotteryOpenRes: {"animal":"鸡", "number":"01"},
            red: ["01", "02", "07", "08", "12", "13", "18", "19", "23", "24", "29", "30", "34", "35", "40", "45", "46"],
            blue: ["03", "04", "09", "10", "14", "15", "20", "25", "26", "31", "36", "37", "41", "42", "47", "48"],
            green: ["05", "06", "11", "16", "17", "21", "22", "27", "28", "32", "33", "38", "39", "43", "44", "49"],
        }
    },
    filters: {
        color(value,r,b,g) {
            if (!value) return '';
            var r_flag = filterColor(r, value);
            var b_flag = filterColor(b, value);
            var g_flag = filterColor(g, value);
            if(r_flag) {
                return 'red';
            }else if(b_flag) {
                return 'blue';
            }else if(g_flag) {
                return 'green';
            }
        }
    },
    methods: {
        loadData() {
            this.$axios({
                method: 'GET',
                url: '/mock/lotteryTop.json',
                data: {
                    Action: 'GetLotteryOpen',
                    LotteryCode: this.LotteryCode,
                    IssueNo: 0,
                    DataNum: 10,
                    SourceName: 'PC'
                }
            }).then(res => {
                this.itemData = res.data.BackData[0];
                // 保存当前期号到仓库。
                this.$store.state.issueNo = parseInt(this.itemData.IssueNo) + 1;
            }).catch(err => {
                alert('请求数据错误');
            });
        },
        abortTimer() {
            // 六合彩开奖日期  246 21：30
            var abort = this.itemData.OpenTime;
            this.$axios({
                method: 'GET',
                url: '/mock/getServerTime.json',
                data: {
                    Action: 'GetServerTimeMillisecond',
                    SourceName: 'PC'
                }
            }).then(res => {
                // 服务器时间保存到仓库去。
                this.$store.state.serverTime = res.data.Data;
                var surplus = parseInt(res.data.Close - res.data.Data);
                var addZero = function(i) {
                    if (i < 10) {
                        i = '0' + i;
                    }
                    return i;
                };
                if (surplus <= 0) {
                    return;
                }
                var t = setInterval(() => {
                    var h = Math.floor(surplus / (1000 * 60 * 60));
                    h = addZero(h);
                    var m = Math.floor(surplus / (1000 * 60) % 60);
                    m = addZero(m);
                    var s = Math.floor((surplus / 1000) % 60);
                    s = addZero(s);
                    var final = `${h}:${m}:${s}`;
                    this.endTime = final;
                    surplus = surplus - 1000;
                    if (surplus <= 0 || this.endTime === '00:00:00') {
                        clearInterval(t);
                    }
                }, 1000);
            }).catch(err => {
                alert('请求数据错误');
            });
        },

    },
    mounted() {
        this.loadData();
        this.abortTimer();
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
