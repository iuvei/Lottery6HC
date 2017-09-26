<template>
    <div class="header">
        <div id="HeaderTop" class="betHeader">
            <div class="snav">
                <div class="container">
                    <div class="snavAll" @mouseleave="MoreLotteryTypeHide">
                        <a href="/index" class=""></a>
                        <ins> | </ins>
                        <a class="betNavMore" @mouseenter="MoreLotteryType">全部彩票</a>
                    </div>
                    <ul class="snavInfo">
                        <li class="userName MsgShow">
                            <a class="_personalInfo" @mouseenter="MyCardShow" @mouseleave="MyCardShowClose"><img alt="" src="//imagess-google.com/system/common/headimg/9A9C9E1A719CE536.jpg">
                                <i>{{ userName }}</i>
                            </a>
                            <span id="unreadMsgNum" onclick="window.location='letter'">
                                0
                            </span>
                            <!---->
                        </li>
                        <li class="HoverShow">
                            <a href="/securityCenter" class="">我的账户
                                <i class="iconfont"></i>
                            </a>
                            <div class="accountList HoverShowContent" style="display: none;">
                                <i></i>
                                <a href="/BetRecord" class="">投注记录</a>
                                <a href="/BillRecord" class="">交易记录</a>
                                <a href="/personalInfo" class="">个人信息</a>
                                <a href="/securityCenter" class="">安全中心</a>
                                <a href="/agentReport" class="">代理中心</a>
                            </div>
                        </li>
                        <li>余额：
                            <!---->
                            <span class="GetMoney getMoney" v-if="GetMoneyShow">
                                <em>{{ UserBalance }}</em>
                                <i id="icon" class="iconfont" @click="UserBalanceShow"></i>
                                <i @click="GetMoneyShow = false;">隐藏</i>
                            </span>
                            <span class="ShowMoney showMoney" v-else>已隐藏
                                <i @click="UserBalanceShow">显示</i>
                            </span>
                        </li>
                        <li>
                            <a href="/ebankPay" class="">充值</a>
                        </li>
                        <li>
                            <a href="/withdraw" class="">提现</a>
                        </li>
                        <li class="LoginOut">退出</li>
                        <a class="serviceLink ServiceBtn">
                            <i class="iconfont"></i>
                            <span></span>
                        </a>
                    </ul>
                </div>
                <div v-if="cardBoxFlag">
                    <div class="cardBox" style="left: 755px; top: 35px;overflow:hidden;">
                        <div class="card fix">
                            <div class="cardLeft"><img :src="'//imagess-google.com/system/common/headimg/' + userCardAllInfo.userCardInfo.UserPhoto" alt="" width="80" height="80">
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
                            <ul class="cardIcon fix">
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
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!---->
        <table class="betMoreList" style="display: none;">
            <tbody>
                <tr>
                    <th style="width: 214px;">快3</th>
                    <th>时时彩</th>
                    <th>快乐彩</th>
                    <th>11选5</th>
                    <th>低频彩</th>
                </tr>
                <tr>
                    <td>
                        <a :href="'/lottery/' + item.LotteryType + '/' + item.LotteryCode" v-for="(item,index) in K3Arr" :key="index">
                            {{ item.LotteryName }}
                        </a>
                    </td>
                    <td>
                        <a :href="'/lottery/' + item.LotteryType + '/' + item.LotteryCode" v-for="(item,index) in SSCArr" :key="index">
                            {{ item.LotteryName }}
                        </a>
                    </td>
                    <td>
                        <a :href="'/lottery/' + item.LotteryType + '/' + item.LotteryCode" v-for="(item,index) in KLCArr" :key="index">
                            {{ item.LotteryName }}
                        </a>
                    </td>
                    <td>
                        <a :href="'/lottery/' + item.LotteryType + '/' + item.LotteryCode" v-for="(item,index) in SYX5Arr" :key="index">
                            {{ item.LotteryName }}
                        </a>
                    </td>
                    <td>
                        <a :href="'/lottery/' + item.LotteryType + '/' + item.LotteryCode" v-for="(item,index) in DPCArr" :key="index">
                            {{ item.LotteryName }}
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
        <!---->
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 全部彩票
            LotteryList: [],
            // 快3
            K3Arr: [],
            // 时时彩
            SSCArr: [],
            // 快乐彩
            KLCArr: [],
            // 11选5
            SYX5Arr: [],
            // 低频彩
            DPCArr: [],
            // 余额
            UserBalance: '',
            // 余额组件条件渲染
            GetMoneyShow: false,
            // 我的卡片
            userCardAllInfo: {
                userCardInfo: {},
                LotteryTypeList: [],
                hueLotteryTypeList: []
            },
            // 我的卡片Model
            cardBoxFlag: false,
        }
    },
    filters: {
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
    computed: {
        userName() {
            return this.$store.state.userName;
        }
    },
    methods: {
        init() {
            var LotteryList = localStorage.getItem('LotteryList');
            this.LotteryList = JSON.parse(LotteryList);
            this.LotteryList.map(item => {
                if (item.LotteryType === 'SSC') {
                    this.SSCArr.push(item);
                } else if (item.LotteryType === 'K3') {
                    this.K3Arr.push(item);
                } else if (item.LotteryType === 'SYX5') {
                    this.SYX5Arr.push(item);
                } else if (["FC3D", "PL35"].indexOf(item.LotteryType) !== -1) {
                    this.DPCArr.push(item);
                } else if (["KL8", "PK10", "6HC"].indexOf(item.LotteryType) !== -1) {
                    this.KLCArr.push(item);
                }
            });
        },
        // 全部彩票
        MoreLotteryType() {
            var $this = $('a.betNavMore');
            var top = $this.offset().top - $(document).scrollTop() + 26;
            var left = $this.offset().left - $(document).scrollLeft() + 291 + 24;
            $('table.betMoreList').show().css({
                top: top + 'px',
                left: left + 'px'
            });
        },
        MoreLotteryTypeHide() {
            $('table.betMoreList').hide();
        },
        // 用户余额显示
        UserBalanceShow() {
            // 刷新小圆圈
            $('#icon').addClass('click');
            this.$axios({
                method: 'GET',
                url: this.getApi('getUserBalance'),
                data: {
                    Action: 'GetInitData',
                    Requirement: ["UserBalance", "UserUnread"],
                    SourceName: 'PC'
                }
            }).then(res => {
                this.UserBalance = res.data.BackData.UserBalance;
                $('#icon').removeClass('click');
                this.GetMoneyShow = true;
            });
        },
        // 提取我的 Card
        getMyCard(cardID, fn) {
            var f = sessionStorage.getItem('Card' + cardID);
            if (f !== null) {
                this.userCardAllInfo = JSON.parse(f);
                // console.log('有缓存的啦, 小样~', this.userCardAllInfo);
                fn();
                this.cardBoxFlag = true;
                return;
            }
            this.$axios({
                method: 'GET',
                url: this.getApi('getMyCard'),
                data: {
                    Action: 'GetCard',
                    UserId: cardID,
                    SourceName: 'PC'
                }
            }).then(res => {
                var allTypeList = ["SSC", "PK10", "KL8", "PL35", "FC3D", "SYX5", "K3", "SYNC"];
                this.userCardAllInfo.userCardInfo = res.data.BackData;
                this.userCardAllInfo.hueLotteryTypeList = res.data.BackData.LotteryType.split(',');
                var arr = [];
                allTypeList.map((i, index) => {
                    if (this.userCardAllInfo.hueLotteryTypeList.indexOf(i) == -1) {
                        arr.push(i);
                    }
                });
                setTimeout(() => {
                    this.userCardAllInfo.LotteryTypeList = arr;
                    this.cardBoxFlag = true;
                    sessionStorage.setItem('Card' + cardID, JSON.stringify(this.userCardAllInfo));
                    fn();
                }, 0);
            }).catch(err => {
                console.log(err);
            });
        },
        // MyCard
        MyCardShow() {
            var cardID = '0';
            var $this = $('a._personalInfo');
            this.getMyCard(cardID, function() {
                $('.header .cardBox').show();
                var top = $this.offset().top - $(document).scrollTop() + 26;
                var left = $this.offset().left - $(document).scrollLeft() - 80;
                $('.header .cardBox').css({
                    top: top + 'px',
                    left: left + 'px'
                });
            });
        },
        // 隐藏我的卡片
        MyCardShowClose() {
            $('.header .cardBox').hide();
        },
        jqAction() {
            $('#app').on('mouseenter', 'table.betMoreList', function(e) {
                $(this).show();
            });
            $('#app').on('mouseleave', 'table.betMoreList', function(e) {
                $(this).hide();
            });

            $('#app').on('mouseenter', '.header .cardBox', function(e) {
                $(this).show();
            });
            $('#app').on('mouseleave', '.header .cardBox', function(e) {
                $(this).hide();
            });

            $('#app').on('mouseenter', '.HoverShow a:contains("我的账户")', function(e) {
                $('.accountList.HoverShowContent').show();
            });
            $('#app').on('mouseleave', '.HoverShow', function(e) {
                $('.accountList.HoverShowContent').hide();
            });

        }
    },
    mounted() {
        this.init();
        this.jqAction();
    }
}
</script>

<style lang="scss" scoped>
#icon {
    &.click {
        animation: Myrotate 1s linear infinite;
        -webkit-animation: Myrotate 1s linear infinite;
        -moz-animation: Myrotate 1s linear infinite;
        -o-animation: Myrotate 1s linear infinite;
    }
}

@keyframes Myrotate {
    0%   {
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
    }
    100% {
        transform: rotate(720deg);
        -webkit-transform: rotate(720deg);
        -moz-transform: rotate(720deg);
        -o-transform: rotate(720deg);
    }
}

.header {
    font-size: 12px;
}

.snav {
    height: 30px;
    line-height: 30px;
    background: #f8f8f8;
    border-bottom: 1px solid #e8e8e8;
}

.snav,
.snav a {
    color: #666;
}

#HeaderTop {
    margin-bottom: 15px;
}

.betHeader .snav {
    background: #232323;
    color: #fff;
    height: 40px;
    line-height: 40px;
    a {
        color: #fff;
    }
}

.container {
    width: 1000px;
    margin: 0 auto;
}

.snavAll {
    float: left;
    padding-right: 20px;
}

.betHeader .snavAll a:first-child:after {
    cursor: pointer;
    content: "\8FD4\56DE\9996\9875";
    margin-left: 2px;
    font-family: Microsoft YaHei;
}

.lottery .betHeader ins {
    margin: 0 4px;
}

.lottery .betHeader .betNavMore,
.lottery .betHeader ins {
    display: inline!important;
}

.snavInfo {
    float: right;
    height: 30px;
}

.betHeader .snavInfo {
    height: 40px;
}

.userName {
    position: relative;
    a {
        line-height: 30px;
        display: inline-block;
    }
    img {
        width: 22px;
        height: 22px;
        vertical-align: middle;
        border-radius: 50%;
        margin-right: 5px;
        margin-bottom: 3px;
    }
    span {
        background: #ffba00;
        margin-left: 10px;
        padding: 2px 7px;
        text-shadow: 1px 1px 1px #333;
        font-size: 13px;
        border-radius: 2px;
        color: #fff;
    }
}

.HoverShowContent {
    a:hover {
        color: #e4393c!important;
        text-decoration: underline;
    }
}

.snavInfo li {
    display: inline-block;
    padding-left: 20px;
    cursor: pointer;
}

.betHeader {
    .userName {
        img {
            height: 24px;
            width: 24px;
        }
    }
}

.accountList {
    position: absolute;
    background: #fff;
    color: #333;
    border: 1px solid #ccc;
    padding: 5px;
    margin-left: -16px;
    z-index: 20;
    a {
        color: #666;
        display: block;
        padding: 0 5px;
        width: 80px;
        text-align: center;
        line-height: 24px;
    }
}

.accountList i,
.messageShow i {
    position: absolute;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #fff;
    margin-left: 36px;
    margin-top: -10px;
}

.betHeader .snav .accountList a,
.betHeader .snav .messageShow a {
    color: #333;
}

.serviceLink {
    background: url(http://imagess-google.com/system/pc/other/service.gif);
    color: #e4393c!important;
    display: block;
    background-position: 0 0;
    height: 25px;
    float: right;
    width: 87px;
    position: relative;
    margin-left: 25px;
}

.lottery .serviceLink.ServiceBtn {
    background-position: 0 0;
}

.lottery #HeaderTop .serviceLink {
    margin-top: 8px;
}

.getMoney,
.showMoney {
    border: 1px dotted #6b6b6b;
    display: inline-block;
    box-sizing: border-box;
    line-height: 18px;
    padding: 0 3px;
}

.getMoney i,
.showMoney i {
    display: inline-block;
}


// 全部彩票
.betMoreList {
    background: #fff;
    color: #fff;
    width: 582px;
    height: 210px;
    margin-left: -379px;
    border-radius: 6px;
    table-layout: fixed;
    vertical-align: top;
    display: none;
    position: absolute;
    z-index: 13;
    left: 379px;
    top: -15px;
    box-shadow: 5px 5px 12px rgba(0, 0, 0, .25);
    border-collapse: inherit\0;
    tr {
        &:nth-child(1) th:nth-child(1) {
            width: 214px;
            &:before {
                content: "";
                position: absolute;
                top: -7px;
                left: 84px;
                width: 0;
                height: 0;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-bottom: 7px solid #fff;
            }
        }
        &:nth-child(2) td:nth-child(1) {
            padding: 16px;
        }
    }
    th {
        color: #333;
        font-size: 16px;
        border-bottom: 1px solid #e4e4e4;
        width: 92px;
        height: 50px;
    }
    td {
        border-right: 1px solid #e4e4e4;
        vertical-align: top;
        padding: 16px;
    }
    a {
        display: block;
        float: left;
        line-height: 2.6;
        min-width: 60px;
        text-align: center;
        &:hover {
            color: #e4393c;
            text-decoration: underline;
        }
    }
    td:last-child {
        border-right: none;
        box-shadow: none;
    }
}

.announcementList li a:hover,
.checkedList a:hover,
.footer>div>p a:hover,
.LoginOut:hover,
.messageShow dt p:hover,
.mybet a:hover,
.noticCon ul a:hover,
.sildeSession a:hover,
.snavInfo a:hover,
.userName span:hover,
.userTitle span:hover {
    color: #e4393c!important;
    text-decoration: underline;
}
</style>
