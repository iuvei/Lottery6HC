<template>
    <div class="footer mgt40">
        <div class="ftadCon">
            <div class="container">
                <ul class="ftad fix">
                    <li>
                        <a id="dafaCloud" target="_blank" href="http://www.dafacloud.com">
                            <p>技术支持
                                <i>Technical support</i>
                            </p>
                            <div class="technicalSupport fix"><img src="http://imagess-google.com/test/../system/common/other/dafayun.png" alt="大发云">
                                <p>
                                    大发云系统
                                    <br> 专业的彩票系统平台
                                </p>
                                <i></i>
                            </div>
                        </a>
                    </li>
                    <li>
                        <p>服务体验
                            <i>Service experience</i>
                        </p>
                        <ul class="serviceExperience">
                            <li>昨日充值到账平均时间
                                <p class="footBar">
                                    <span :style="'width:' + ServiceTime.WidthA + '%'"></span>
                                </p>
                                <em>{{ ServiceTime.RechargeTime }}</em>
                                <i>秒</i>
                            </li>
                            <li>昨日提现到账平均时间
                                <p class="footBar">
                                    <span :style="'width:' + ServiceTime.WidthB + '%'"></span>
                                </p>
                                <em>{{ ServiceTime.WithdrawTime }}</em>
                                <i>秒</i>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p>充值方式
                            <i>Recharge method</i>
                        </p>
                        <div class="rechargeMethod">
                            <i class="wechat"></i>
                            <i class="alipay"></i>
                            <i class="cup"></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="container _about aboutText">
            <p class="fix">
                <template v-for="(item,index) in FooterConfig">
                    <a>{{ item.Title }}</a>|
                </template>
            </p>
            <p class="copyright">Copyright ©
                <span class="siteName">大发彩票</span> Reserved | 18+</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 底部文字设置
            FooterConfig: [],
            // 底部服务时间设置
            ServiceRating: {},
            // 服务时间和宽度
            ServiceTime: {
                RechargeTime: 0,
                WithdrawTime: 0,
                WidthA: 0,
                WidthB: 0
            }
        }
    },
    methods: {
        // 渲染底部关于我们, 联系我们等等。
        renderFooter() {
            var f = localStorage.getItem('FooterConfig');
            this.FooterConfig = JSON.parse(f);
        },
        // 设置服务体验时间
        setTime() {
            var s = localStorage.getItem('ServiceRating');
            this.ServiceRating = JSON.parse(s);

            var t = parseFloat(this.ServiceRating.RechargeTime),
                e = parseFloat(this.ServiceRating.WithdrawTime),
                a = t % 60,
                a = a > 9 ? a: "0" + a,
                s = e % 60,
                s = s > 9 ? s: "0" + s,
                n = 60 * Math.round((t + e) / 60);
                this.ServiceTime.RechargeTime = Math.floor(t / 60) + "'" + a,
                this.ServiceTime.WithdrawTime = Math.floor(e / 60) + "'" + s,
                this.ServiceTime.WidthA = t / n * 100,
                this.ServiceTime.WidthB = e / n * 100;
        }
    },
    mounted() {
        this.renderFooter();
        this.setTime();
    }
}
</script>
<style lang="scss" scoped>
.footer {
    width: 100%;
    overflow: hidden;
    background: #fff;
    box-sizing: border-box;
}
.container {
    width: 1000px;
    margin: 0 auto;
}
.ftadCon {
    background: #f8f8f8;
    border: 1px solid #dce1e5;
    border-left: none;
    border-right: none;
    height: 160px;
}

.footer .container {
    height: 100px;
}

.ftad {
    background-size: 998px;
    background-color: #f8f8f8;
    padding: 20px 0;
}

.ftad>li:nth-child(1) {
    width: 280px;
    padding-left: 0;
}

.ftad>li {
    float: left;
    padding-left: 25px;
    height: 118px;
}

.ftad>li p {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    i {
        font-size: 14px;
        margin-left: 10px;
        font-weight: 100;
        color: #b8b8b8;
    }
}

.technicalSupport {
    margin: 25px 0;
    position: relative;
    img {
        float: left;
        width: 90px;
        height: 56px;
    }
    p {
        float: left;
        font-size: 14px!important;
        font-weight: 400!important;
        margin: 5px 15px!important;
    }
    i {
        background: -webkit-linear-gradient(left, hsla(0, 0%, 97%, 0), hsla(0, 0%, 97%, .66) 50%, hsla(0, 0%, 97%, 0));
        position: absolute;
        overflow: hidden;
        width: 40px;
        height: 100px;
        transform: rotate(17deg);
        left: -45px;
        top: -10px;
    }
}

.technicalSupport:hover i {
    left: 260px;
    transition: 1s;
}

.ftad>li:nth-child(2) {
    width: 440px;
}

.ftad>li+li {
    border-left: 1px solid #ebebeb;
}

.serviceExperience {
    padding: 12px 0;
    li {
        line-height: 34px;
        &:nth-child(2) span {
            background: #4aa9db;
            color: #fff;
        }
    }
    em {
        font-size: 26px;
        margin-left: 5px;
    }
    i {
        color: #a6a6a6;
        margin-left: 5px;
    }
}

.footBar {
    background: #e6e6e6;
    width: 180px;
    height: 15px;
    border-radius: 15px;
    position: relative;
    display: inline-block;
    vertical-align: sub;
    margin-left: 5px!important;
    overflow: hidden;
    span {
        background-color: #fd5757;
        position: absolute;
        height: 15px;
        border-radius: 15px 0 0 15px;
    }
}

.ftad>li:nth-child(3) {
    width: 280px;
}

.rechargeMethod {
    margin: 30px 0;
    font-size: 0;
    i {
        display: inline-block;
        background: url(http://imagess-google.com/system/common/other/rechargeMethod.png) no-repeat!important;
        height: 50px;
        width: 72px;
        margin-right: 18px;
    }
    .alipay {
        background-position: 0 -50px!important;
    }
    .cup {
        background-position: 0 -100px!important;
        margin-right: 0;
    }
}

.footer .aboutText {
    padding: 10px 0 20px;
}

.footer>div>p {
    color: #999;
    margin: 0;
    margin: 10px 5px;
    text-align: center;
    a {
        color: #333;
        padding: 0 10px;
        line-height: 1.4;
        margin: 5px 0;
        &:first-child {
            padding-left: 0;
        }
    }
}
</style>

