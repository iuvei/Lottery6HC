<template>
    <div class="betRight">
        <!-- 今日开奖 -->
        <div class="today box">
            <h3>今日开奖</h3>
            <div class="more">
                <a href="###" target="_blank">走势图</a>
                <a href="###">玩法推荐</a>
            </div>
            <div class="ResultList">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" id="fn_getoPenGame" class="ty_table_gameBet curr">
                    <tbody>
                        <tr>
                            <th>期号</th>
                            <th>开奖号</th>
                            <th>开奖日期</th>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr v-for="(item, index) in LotteryOpenList" :key="index">
                            <td class="c_green">
                                <i class="o_qi">{{ item.IssueNo }}</i>
                            </td>
                            <td>
                                <i class="numbers">{{ item.LotteryOpen }}</i>
                                <!---->
                            </td>
                            <td>{{ item.OpenTime | formatTime }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="mybet box">
            <h3>我的投注</h3>
            <table width="100%" border="0" cellspacing="0" cellpadding="0" class="_mybetContent">
                <tbody>
                    <tr>
                        <th>期号</th>
                        <th>投注金额</th>
                        <th>奖金</th>
                    </tr>
                    <tr v-for="(item, index) in mybetContentList" :key="index">
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <table class="more">
                <tbody>
                    <tr>
                        <td>
                            <a href="###">更多>></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="winningList box">
            <h3 @click="lotteryInfoShow">中奖信息</h3>
            <h3 @click="moneyListShow" class="notSelect">昨日奖金榜</h3>
            <div id="Ranking" class="winnerListSlide" style="width: 100%; box-sizing: content-box;">
                <div id="lotteryInfo" style="width:100%">
                    <table width="100%">
                        <tbody>
                            <tr>
                                <th>中奖信息实时更新</th>
                            </tr>
                        </tbody>
                    </table>
                    <div id="bd">
                        <div class="tempWrap" style="overflow: hidden; height: 510px;">
                            <ul class="winnerList">
                                <li v-for="(item, index) in newestBonusList" :key="index" data-card :card-id="'cardA' + index">
                                    <img :src="'//imagess-google.com/system/common/headimg/'+ item.UserPhoto" alt="">
                                    <p>{{ item.Nickname !== '' ? item.Nickname : item.UserName }} 大发时时彩<br/>喜中
                                        <span>￥{{ item.Bonus }}</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div id="moneyList" style="width:100%">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="position:relative">
                        <tr>
                            <th colspan="2">昨日累计奖金排行榜</th>
                        </tr>
                        <tr v-for="(item, index) in yesterdayBonusList" :key="index" data-card :card-id="'cardB' + index">
                            <td>
                                <img :src="'//imagess-google.com/system/common/headimg/' + item.UserPhoto" alt="">
                                <p>
                                    账号昵称：{{ item.NickName ? item.NickName : item.UserName }}
                                    <br/> 昨日奖金：
                                    <i>¥{{ item.Bonus }}</i>
                                </p>
                            </td>
                            <td>
                                <ins>{{ item.Ranking }}</ins>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <!-- 卡片 -->
        <div class="cardBox">
            <div class="card fix" v-if="cardBoxFlag">
                <div class="cardLeft">
                    <img :src="'//imagess-google.com/system/common/headimg/' + userCardAllInfo.userCardInfo.UserPhoto" alt="" width="80" height="80">
                    <h6>{{ userCardAllInfo.userCardInfo.NickName ? userCardAllInfo.userCardInfo.NickName : '昵称未设置' }}</h6>
                </div>
                <div class="cardInfo">
                    <ul>
                        <li>性别：{{ userCardAllInfo.userCardInfo.Sex | SexFilter }}</li>
                        <li>账号：{{ userCardAllInfo.userCardInfo.UserName }}</li>
                        <li>等级：{{ userCardAllInfo.userCardInfo.GroupTitle }}</li>
                        <li>头衔：{{ userCardAllInfo.userCardInfo.Rank }}</li>
                        <li>累计中奖：{{ userCardAllInfo.userCardInfo.Award }}</li>
                    </ul>
                </div>
                <div class="cardIcon fix">
                    <li v-for="(item, index) in userCardAllInfo.hueLotteryTypeList" :key="index">
                        <a href="###">
                            <i class="iconfont" :class="'L_' + item"></i>
                        </a>
                    </li>
                    <li v-for="(item, index) in userCardAllInfo.LotteryTypeList" :key="index">
                        <a href="###">
                            <i class="iconfont noActive" :class="'L_' + item"></i>
                        </a>
                    </li>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
var addZero = function(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
};
export default {
    data() {
        return {
            LotteryOpenList: [],
            mybetContentList: [{}, {}, {}, {}, {}],
            newestBonusList: [],
            yesterdayBonusList: [],
            userCardAllInfo: {
                userCardInfo: {},
                LotteryTypeList: [],
                hueLotteryTypeList: []
            },
            cardBoxFlag: false
        }
    },
    filters: {
        formatTime(value) {
            var res = value.split(' ')[0];
            var arr = res.split('/');
            arr[2] = addZero(arr[2]);
            arr[1] = addZero(arr[1]);
            arr[0] = addZero(arr[0]);
            res = arr[2] + '.' + arr[0] + '.' + arr[1];
            return res;
        },
        SexFilter(value) {
            switch (value) {
                case 0:
                    return '女';
                    break;
                case 1:
                    return '男';
                    break;
            
                default:
                return '保密'
                    break;
            }
        }
    },
    methods: {
        // 彩票信息榜
        lotteryInfoShow() {
            $('#lotteryInfo').show();
            $('#moneyList').hide();
            $('.winningList h3:contains("中奖信息")')[0].className = '';
            $('.winningList h3:contains("昨日奖金榜")')[0].className = 'notSelect';
        },
        moneyListShow() {
            $('#lotteryInfo').hide();
            $('#moneyList').show();
            $('.winningList h3:contains("昨日奖金榜")')[0].className = '';
            $('.winningList h3:contains("中奖信息")')[0].className = 'notSelect';
        },
        // 昨日奖金榜
        loadData() {
            this.$axios({
                method: 'GET',
                url: this.getApi('getUserBonusRanking'),
            }).then(res => {
                this.yesterdayBonusList = res.data.BackData.RankingList;
            }).catch(err => {
                alert('数据请求错误');
            });
        },
        // 今日开奖 (往期开奖展示列表)
        todayLottery() {
            this.$axios({
                method: 'GET',
                url: this.getApi('getLotteryOpenList'),
            }).then(res => {
                this.LotteryOpenList = res.data.BackData;
            }).catch(err => {
                alert('获取今日开奖列表失败');
            });
        },
        // 获取中奖信息列表
        getNewestBonusList() {
            this.$axios({
                method: 'GET',
                url: this.getApi('getNewestBonusList'),
            }).then(res => {
                var addArr = [];
                addArr = res.data.BackData.NewestBonusList.slice(-10);
                var resData = res.data.BackData.NewestBonusList.concat(addArr);
                this.newestBonusList = resData;
                setTimeout(() => {
                    this.BonusListAnimation();
                }, 0);
            }).catch(err => {
                alert('获取最新的奖金列表失败');
            });
        },
        // 奖金列表动画
        BonusListAnimation() {
            var obj = document.getElementsByClassName('winnerList')[0];
            var topLimit = obj.offsetHeight - 510;
            var limit = 51;
            var t;
            var animationFunc = function() {
                t = setInterval(() => {
                    if (parseInt(limit) > parseInt(topLimit)) {
                        obj.style.top = '0px';
                        limit = 51;
                    }
                    obj.style.top = - limit + 'px';
                    limit += 51;
                }, 3000);
            };
            animationFunc();
            obj.onmouseenter = function() {
                clearInterval(t);
            }
            obj.onmouseleave = function() {
                animationFunc();
            }
        },
        getCard(cardID, fn) {
            var f = sessionStorage.getItem(cardID);
            if(f !== null) {
                this.userCardAllInfo = JSON.parse(f);
                // console.log('有缓存的啦, 小样~',this.userCardAllInfo);
                fn();
                return;
            }
            this.$axios({
                method: 'GET',
                url: this.getApi('getCard'),
            }).then(res => {
                var allTypeList = ["SSC", "XYNC", "PK10", "KL8", "PL35", "FC3D", "SYX5", "K3"];
                this.userCardAllInfo.userCardInfo = res.data.BackData;
                this.userCardAllInfo.hueLotteryTypeList = res.data.BackData.LotteryType.split(',');
                allTypeList.map((i,index) => {
                    var r = RegExp(i);  
                    var flag = r.test(res.data.BackData.LotteryType);
                    if(flag) {
                        allTypeList.splice(index, 1);
                    }
                });
                setTimeout(() => {
                    this.userCardAllInfo.LotteryTypeList = allTypeList;
                    this.cardBoxFlag = true;
                    sessionStorage.setItem(cardID, JSON.stringify(this.userCardAllInfo));
                    fn();
                },0);
            }).catch(err => {
                alert('获取用户卡片信息失败');
            })
        },
        $jqAction() {
            var _this = this;
            $('#Ranking').on('mouseenter', '[data-card]', function(e) {
                var self = this;
                var cardID = $(self).attr('card-id');
                _this.getCard(cardID,function() {
                    $('.betRight .cardBox').show();
                    var top = $(self).offset().top-$(document).scrollTop();
                    var left = $(self).offset().left-$(document).scrollLeft() - 300;
                    $('.betRight .cardBox').css({
                        top: top + 'px',
                        left: left + 'px'
                    });
                });
                
            });
            $('#app').on('mouseleave', '#Ranking', function(e) {
                $('.betRight .cardBox').hide();
            });
            $('#app').on('mouseenter', '.betRight .cardBox', function(e) {
                $(this).show();
            });
            $('#app').on('mouseleave', '.betRight .cardBox', function(e) {
                $(this).hide();
            });
        }
    },
    mounted() {
        this.$jqAction();
        this.todayLottery();
        this.loadData();
        this.getNewestBonusList();
    }
}
</script>
<style lang="scss" scoped>
.betRight {
    float: left;
    width: 258px;
    min-height: 500px;
    border-left: 1px solid #ddd;
    box-sizing: border-box;
    .box {
        .notSelect {
            background: #d6d6d6;
            color: #666;
        }
        table {
            text-align: center;
            tr:hover {
                background: #f8f8fa;
            }
            th {
                background: #f2f4f7;
                height: 28px;
                line-height: 28px;
                text-align: center;
                font-weight: 400;
                color: #666;
                border-bottom: 1px solid #ddd;
            }
            td {
                height: 24px;
                line-height: 24px;
                text-align: center;
                color: #666;
                border-right: 1px dotted #ebebeb;
                border-bottom: 1px dashed #ebebeb;
                &:first-child {
                    color: #555;
                }
                &:nth-child(2) {
                    color: #ff9600;
                }
            }
        }
        h3 {
            border-bottom: 1px solid #ddd;
            background: #455467;
            color: #fff;
            border-radius: 3px;
            display: inline-block;
            margin: 15px 0 6px 8px;
            text-align: center;
            height: 26px;
            line-height: 26px;
            font-weight: 100;
            font-size: 12px;
            padding: 0 6px;
        }
        .more {
            width: 100%;
            td {
                text-align: right;
                padding-right: 15px;
            }
        }
    }
    .today {
        a {
            color: #ff9831;
        }
        .more {
            display: inline-block;
            width: 156px!important;
            margin: 0 8px;
            height: 26px;
            text-align: right;
            a {
                background: #fff;
                display: inline-block;
                line-height: 13px;
                color: #555;
                padding-right: 5px;
                &:last-child {
                    padding-left: 5px;
                    background: #fff;
                    border-left: 1px solid #555;
                }
                &:hover {
                    color: #f37036;
                    text-decoration: underline;
                }
            }
        }
        .ResultList {
            min-height: 279px;
        }
    }
    .mybet a:hover {
        color: #e4393c!important;
        text-decoration: underline;
    }
    .winningList {
        tr:nth-child(2) ins {
            background: #c12f33;
            background: radial-gradient(circle at 25px 25px, #c12f33, #ca9293);
            color: #fff;
            border-radius: 50%;
            text-align: center;
            line-height: 25px;
        }
        tr:nth-child(3) ins {
            background: #53b0fe;
            background: radial-gradient(circle at 25px 25px, #2b82cc, #53b0fe);
            color: #fff;
            border-radius: 50%;
            text-align: center;
            line-height: 25px;
        }
        tr:nth-child(4) ins {
            background: #f8a968;
            background: radial-gradient(circle at 25px 25px, #c57532, #f8a968);
            color: #fff;
            border-radius: 50%;
            text-align: center;
            line-height: 25px;
        }
        ins {
            display: block;
            width: 25px;
            height: 25px;
            margin: 0 auto;
            color: #555;
        }
        h3 {
            cursor: pointer;
        }
        table {
            td {
                text-align: left;
                padding: 7px 15px;
                padding-right: 12px;
                border-right: none;
                img {
                    height: 36px;
                    width: 36px;
                    float: left;
                    border-radius: 50%;
                    margin-right: 9px;
                    transition: .5s;
                }
                p {
                    margin: 0;
                    margin-top: 0;
                    line-height: 1.7;
                    height: 36px;
                    i {
                        color: red;
                    }
                }
                &:nth-child(2) {
                    color: #cc0a2f;
                    width: 32px;
                    text-align: center;
                }
            }
        }
    }
    .winnerList {
        cursor: pointer;
        position: relative;
        top: 0px;
        transition: all .3s linear;
        table {
            td:nth-child(1) {
                width: 280px;
            }
        }
        li {
            height: 40px;
            padding: 15px;
            padding-bottom: 5px;
            cursor: default;
            img {
                height: 36px;
                width: 36px;
                border-radius: 50%;
                float: left;
                margin-top: 2px;
                margin-right: 9px;
                transition: .5s;
            }
            p {
                margin: 0;
                float: left;
                line-height: 1.7;
                span {
                    color: #f63745;
                    margin: 0 5px;
                }
            }
        }
        div {
            float: left;
            width: 78%;
            line-height: 1.5;
        }
        .tempWrap {
            vertical-align: initial;
            overflow: hidden;
            height: 510px;
        }
        .bd {
            width: 100%;
            padding: 0;
            .tempWrap {
                width: 100%;
                padding: 0;
            }
        }
    }
    .winnerListSlide {
        li {
            border-bottom: 1px dotted #ddd;
            padding-top: 5px;
            &:hover {
                background: #f8f8fa;
            }
        }
    }
    #moneyList {
        display: none;
    }
}

.cardBox {
    top: 0;
    position: fixed;
    z-index: 119;
    .card {
        color: #666;
        width: 300px;
        height: 202px;
        background: #fff;
        border: 1px solid #d9d9d9;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, .3);
        font: 14px/1.8 Microsoft YaHei, SimSun, Arial;
        box-sizing: border-box;
    }
    .cardLeft,
    .cardInfo {
        float: left;
        height: 150px;
    }
    .cardLeft {
        width: 135px;
        img {
            border-radius: 50%;
            margin-top: 20px;
            margin-left: 28px;
        }
        h6 {
            margin: 5px 0;
            color: #1d93d8;
            font-weight: 100;
            text-align: center;
            font-size: 14px;
        }
    }
    .cardInfo {
        width: 160px;
        font-size: 14px;
        padding-top: 15px;
    }
    .cardIcon {
        clear: both;
        height: 50px;
        background: #f5f5f5;
        padding: 0 2%;
        li {
            float: left;
            width: 12.5%;
            i {
                font-size: 25px;
                display: block;
                text-align: center;
                line-height: 55px;
                &:before {
                    font-size: 23px;
                    transform: translate(8px);
                    color: #fff!important;
                }
            }
            .noActive:before {
                text-shadow: 0 4px 5px hsla(0, 0%, 60%, .42)!important;
            }
            .noActive:after {
                color: #999!important;
            }
        }
    }
}
</style>
