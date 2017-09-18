<template>
    <div class="betLeft">
        <div>
            <!-- 头部 -->
            <div>
                <ul class="betFilter">
                    <li v-for="(item, index) in AllData" :key="index" @click="selectRender(index)">{{ index }}</li>
                </ul>
                <ul class="betFilterAnd">
                    <li>
                        <span >{{ nowGroupItem.groupTitle }}</span>
                        <div>
                            <a v-for="(item, index) in nowGroupItem.BackData" :key="index">{{ item.name }}</a>
                        </div>
                    </li>
                </ul>
                <div class="betTip">
                    <i class="iconfont"></i>{{ tip }} 赔率
                    <ins>{{ odds() }}</ins>
                    <div class="hoverContent">
                        <table>
                            <tr>
                                <th>猜中</th>
                                <th>单注最高奖金</th>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <!-- 选号码 -->
            <div class="sscCheckNumber colorbox">
                <ul class="fix">
                    <li>
                        <div class="fix selectMini">
                            <span class="buyNumberTitle">
                                号码
                                <i></i>
                            </span>
                            <div class="buyNumber fix">
                                <a :class="item | color(red,blue,green)" v-for="(item, index) in allBall" :key="index" active="0">
                                    <span>{{ item }}</span>
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 下注 -->
            <div class="Panel">
                <p class="betTotal">
                    您选择了
                    <em>0</em>
                    注
                </p>
                <a class="betBtn ClickShade">确认选号</a>
            </div>
            <!-- 编辑区 -->
            <div class="checkedList">
                <table>
                    <tbody></tbody>
                </table>
            </div>
            <!-- 方案 -->
            <div class="Bet">
                <p class="betTotal">
                    方案注数
                    <em>0</em>
                    注，金额
                    <i class="money">0</i>
                    元
                </p>
                <a class="betBtn ClickShade UnClick">立即投注</a>
            </div>
        </div>
    </div>
</template>
<script>
function filterColor(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}
function o() {
    return '从1-49中任选1个或多个号码，每个号码为一注，所选号码在开奖号码前六位中存在，即为中奖。'
}
function l(t) {
    return "从1-49中任选1个或多个号码，每个号码为一注，所选号码与开奖号码第" + t + "位相同，即为中奖。";
}
function c(t) {
    return "至少选择" + t + "个号码，每" + t + "个号码为一注，所有号码均未在开奖号码中出现，即为中奖。"
}
function u(t) {
    return "开奖号码第" + t + "位，大于或等于25为大，小于或等于24为小；奇数为单，偶数为双；和单和双为两个数相加后得数的单双；尾大尾小即看个位数值，小于等于4为小，大于4为大；为49时为和，不算任何大小单双，但算波色。"
}
export default {
    data() {
        return {
            AllData: {
                "特码": {
                    groupTitle: "特码",
                    BackData: [{
                        name: "直选",
                        mode: "A01",
                        tip: "从1-49中任选1个或多个号码，每个号码为一注，所选号码中包含特码，即为中奖。",
                        group: "特码",
                        subGroup: "特码",
                        tag: "特码直选",
                        eg: [],
                        default:
                        !0
                    },
                    {
                        name: "两面",
                        mode: "A02",
                        tip: "开奖号码最后一位为特码。大于或等于25为特码大，小于或等于24为特码小；奇数为单，偶数为双；特码两个数相加后得数，奇数为合单，偶数为合双，小于等于6为合小，大于6为合大；尾大尾小即看特码个位数值，小于等于4为小，大于4为大；特码为49时为和，不算任何大小单双，但算波色。",
                        group: "特码",
                        subGroup: "特码",
                        eg: ["01 02", "01 02 03 04 05 06 07 08 21 22 71 72 73 74 75 76 77 78 79 80"],
                        tag: "特码两面"
                    }]
                },
                "正码": {
                    groupTitle: "正码",
                    BackData: [{
                        name: "任选",
                        mode: "B01",
                        tip: o(),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正码任选",
                        eg: [],
                        default:
                        !0
                    },
                    {
                        name: "正１特",
                        mode: "B03",
                        tip: l("一"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正１特",
                        eg: []
                    },
                    {
                        name: "正１两面",
                        mode: "B09",
                        tip: u("一"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正１两面",
                        eg: []
                    },
                    {
                        name: "正２特",
                        mode: "B04",
                        tip: l("二"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正２特",
                        eg: []
                    },
                    {
                        name: "正２两面",
                        mode: "B10",
                        tip: u("二"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正２两面",
                        eg: []
                    },
                    {
                        name: "正３特",
                        mode: "B05",
                        tip: l("三"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正３特",
                        eg: []
                    },
                    {
                        name: "正３两面",
                        mode: "B11",
                        tip: u("三"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正３两面",
                        eg: []
                    },
                    {
                        name: "正４特",
                        mode: "B06",
                        tip: l("四"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正４特",
                        eg: []
                    },
                    {
                        name: "正４两面",
                        mode: "B12",
                        tip: u("四"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正４两面",
                        eg: []
                    },
                    {
                        name: "正５特",
                        mode: "B07",
                        tip: l("五"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正５特",
                        eg: []
                    },
                    {
                        name: "正５两面",
                        mode: "B13",
                        tip: u("五"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正５两面",
                        eg: []
                    },
                    {
                        name: "正６特",
                        mode: "B08",
                        tip: l("六"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正６特",
                        eg: []
                    },
                    {
                        name: "正６两面",
                        mode: "B14",
                        tip: u("六"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正６两面",
                        eg: []
                    }]
                },
                "连码": {
                    groupTitle: "连码",
                    BackData: [{
                        name: "三全中",
                        mode: "C01",
                        tip: "至少选择三个号码，每三个号码为一组合，若三个号码都是开奖号码之正码，即为中奖。",
                        group: "连码",
                        subGroup: "连码",
                        tag: "连码三全中",
                        eg: [],
                        default:
                        !0
                    },
                    {
                        name: "三中二",
                        mode: "C02",
                        tip: "至少选择三个号码，每三个号码为一组合，若其中至少有两个是开奖号码中的正码，即为中奖。若中两码，叫三中二之中二;若三码全中，叫三中二之中三。",
                        group: "连码",
                        subGroup: "连码",
                        tag: "连码三中二",
                        eg: []
                    },
                    {
                        name: "二全中",
                        mode: "C03",
                        tip: "至少选择两个号码，每二个码号为一组合，二个号码都是开奖码号之正码（不含特码），即为中奖。",
                        group: "连码",
                        subGroup: "连码",
                        tag: "连码二全中",
                        eg: []
                    },
                    {
                        name: "二中特",
                        mode: "C04",
                        tip: "至少选择两个号码，每二个号码为一组合，二个号码都是开奖号码（含特码），即为中奖。若两个都是正码，叫二中特之二中。若选号中包含特码，叫二中特之中特。",
                        group: "连码",
                        subGroup: "连码",
                        tag: "连码二中特",
                        eg: []
                    },
                    {
                        name: "特串",
                        mode: "C05",
                        tip: "至少选择两个号码，每二个号码为一组合，其中一个是正码，一个是特别号码，即为中奖。",
                        group: "连码",
                        subGroup: "连码",
                        tag: "连码特串",
                        eg: []
                    }]
                },
                "半波": {
                    groupTitle: "半波",
                    BackData: [{
                        name: "特码半波",
                        mode: "D01",
                        tip: "根据特码对应的特性来区分。分为红蓝绿三个波色，以及号码大于或等于25为大，小于或等于24为小；奇数为单，偶数为双；合单合双为开奖号的十位与个位相加后得数的单双。下注内容与号码特性完全吻合即为中奖。",
                        group: "半波",
                        subGroup: "半波",
                        tag: "特码半波",
                        eg: [],
                        default:
                        !0
                    }]
                },
                "生肖": {
                    groupTitle: "生肖",
                    BackData: [{
                        name: "特肖",
                        mode: "E01",
                        tip: "从十二生肖中任选1个或多个，每个生肖为一注，所选生肖与特码对应的生肖相同，即为中奖。",
                        group: "生肖",
                        subGroup: "生肖",
                        tag: "特肖",
                        eg: [],
                        default:
                        !0
                    },
                    {
                        name: "一肖",
                        mode: "E02",
                        tip: "从十二生肖中任选1个或多个，每个生肖为一注，开奖号码（含特码）中含有投注所属生肖，即为中奖。",
                        group: "生肖",
                        subGroup: "生肖",
                        tag: "一肖",
                        eg: []
                    },
                    {
                        name: "二肖连",
                        mode: "E03",
                        tip: "至少选择两个生肖，每二个生肖为一组合，开奖号码（含特码）中含有投注所属全部生肖，即为中奖。",
                        group: "生肖",
                        subGroup: "生肖",
                        tag: "二肖连",
                        eg: []
                    },
                    {
                        name: "三肖连",
                        mode: "E04",
                        tip: "至少选择三个生肖，每三个生肖为一组合，开奖号码（含特码）中含有投注所属全部生肖，即为中奖。",
                        group: "生肖",
                        subGroup: "生肖",
                        tag: "三肖连",
                        eg: []
                    },
                    {
                        name: "四肖连",
                        mode: "E05",
                        tip: "至少选择四个生肖，每四个生肖为一组合，开奖号码（含特码）中含有投注所属全部生肖，即为中奖。",
                        group: "生肖",
                        subGroup: "生肖",
                        tag: "四肖连",
                        eg: []
                    }]
                },
                "尾数": {
                    groupTitle: "尾数",
                    BackData: [{
                        name: "特码头尾",
                        mode: "F01",
                        tip: "选择特码头（十位）尾（个位）的数字进行投注，与特码相同，即为中奖",
                        group: "尾数",
                        subGroup: "尾数",
                        tag: "特码头尾",
                        eg: [],
                        default:
                        !0
                    },
                    {
                        name: "二尾连",
                        mode: "F02",
                        tip: "至少选择两个尾数，每两个尾数为一组合，开奖号码（含特码）中含有投注对应全部尾数，即为中奖。",
                        group: "尾数",
                        subGroup: "尾数",
                        tag: "二尾连",
                        eg: []
                    },
                    {
                        name: "三尾连",
                        mode: "F03",
                        tip: "至少选择三个尾数，每三个尾数为一组合，开奖号码（含特码）中含有投注对应全部尾数，即为中奖。",
                        group: "尾数",
                        subGroup: "尾数",
                        tag: "三尾连",
                        eg: []
                    },
                    {
                        name: "四尾连",
                        mode: "F04",
                        tip: "至少选择四个尾数，每四个尾数为一组合，开奖号码（含特码）中含有投注对应全部尾数，即为中奖。",
                        group: "尾数",
                        subGroup: "尾数",
                        tag: "四尾连",
                        eg: []
                    }]
                },
                "不中": {
                    groupTitle: "不中",
                    BackData: [{
                        name: "五不中",
                        mode: "G01",
                        tip: c("五"),
                        group: "不中",
                        subGroup: "不中",
                        tag: "五不中",
                        eg: [],
                        default:
                        !0
                    },
                    {
                        name: "六不中",
                        mode: "G02",
                        tip: c("六"),
                        group: "不中",
                        subGroup: "不中",
                        tag: "六不中",
                        eg: []
                    },
                    {
                        name: "七不中",
                        mode: "G03",
                        tip: c("七"),
                        group: "不中",
                        subGroup: "不中",
                        tag: "七不中",
                        eg: []
                    },
                    {
                        name: "八不中",
                        mode: "G04",
                        tip: c("八"),
                        group: "不中",
                        subGroup: "不中",
                        tag: "八不中",
                        eg: []
                    },
                    {
                        name: "九不中",
                        mode: "G05",
                        tip: c("九"),
                        group: "不中",
                        subGroup: "不中",
                        tag: "九不中",
                        eg: []
                    },
                    {
                        name: "十不中",
                        mode: "G06",
                        tip: c("十"),
                        group: "不中",
                        subGroup: "不中",
                        tag: "十不中",
                        eg: []
                    }]
                }
            },
            ListArr: {
                Rebate: [10, 0],
                List: [{
                    Mode: "特码-直选",
                    Odd: [48.51, 43.61]
                },
                {
                    Mode: "特码-两面-大小单双",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "特码-两面-大单",
                    Odd: [3.96083, 3.5525]
                },
                {
                    Mode: "特码-两面-大双",
                    Odd: [3.96083, 3.5525]
                },
                {
                    Mode: "特码-两面-小单",
                    Odd: [3.96083, 3.5525]
                },
                {
                    Mode: "特码-两面-小双",
                    Odd: [3.96083, 3.5525]
                },
                {
                    Mode: "特码-两面-合单",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "特码-两面-合双",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "特码-两面-合大",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "特码-两面-合小",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "特码-两面-尾大",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "特码-两面-尾小",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "特码-两面-红波",
                    Odd: [2.79588, 2.50765]
                },
                {
                    Mode: "特码-两面-蓝绿波",
                    Odd: [2.97063, 2.66438]
                },
                {
                    Mode: "特码-两面-家禽含本命",
                    Odd: [1.9012, 1.7052]
                },
                {
                    Mode: "特码-两面-家禽不含本命",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "特码-两面-野兽含本命",
                    Odd: [1.9012, 1.7052]
                },
                {
                    Mode: "特码-两面-野兽不含本命",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "正码-任选",
                    Odd: [8.00333, 7.18667]
                },
                {
                    Mode: "正码-正特",
                    Odd: [47.04, 42.14]
                },
                {
                    Mode: "正码-两面-大",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "正码-两面-小",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "正码-两面-单",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "正码-两面-双",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "正码-两面-大单",
                    Odd: [3.96083, 3.5525]
                },
                {
                    Mode: "正码-两面-大双",
                    Odd: [3.96083, 3.5525]
                },
                {
                    Mode: "正码-两面-小单",
                    Odd: [3.96083, 3.5525]
                },
                {
                    Mode: "正码-两面-小双",
                    Odd: [3.96083, 3.5525]
                },
                {
                    Mode: "正码-两面-合单",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "正码-两面-合双",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "正码-两面-合大",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "正码-两面-合小",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "正码-两面-尾大",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "正码-两面-尾小",
                    Odd: [1.98042, 1.77625]
                },
                {
                    Mode: "正码-两面-红波",
                    Odd: [2.79588, 2.50765]
                },
                {
                    Mode: "正码-两面-蓝绿波",
                    Odd: [2.97063, 2.66438]
                },
                {
                    Mode: "连码-三全中",
                    Odd: [663.264, 571.144]
                },
                {
                    Mode: "连码-三中二之中二",
                    Odd: [20.88053, 18.424]
                },
                {
                    Mode: "连码-三中二之中三",
                    Odd: [109.6228, 96.726]
                },
                {
                    Mode: "连码-二全中",
                    Odd: [66.64, 58.8]
                },
                {
                    Mode: "连码-二中特之二中",
                    Odd: [53.312, 47.04]
                },
                {
                    Mode: "连码-二中特之中特",
                    Odd: [33.32, 29.4]
                },
                {
                    Mode: "连码-特串",
                    Odd: [160.72, 141.12]
                },
                {
                    Mode: "半波-特码半波-红大",
                    Odd: [6.65, 5.95]
                },
                {
                    Mode: "半波-特码半波-红小",
                    Odd: [4.655, 4.165]
                },
                {
                    Mode: "半波-特码半波-红单",
                    Odd: [5.81875, 5.20625]
                },
                {
                    Mode: "半波-特码半波-红双",
                    Odd: [5.17222, 4.62778]
                },
                {
                    Mode: "半波-特码半波-红合单",
                    Odd: [5.17222, 4.62778]
                },
                {
                    Mode: "半波-特码半波-红合双",
                    Odd: [5.81875, 5.20625]
                },
                {
                    Mode: "半波-特码半波-绿大",
                    Odd: [5.81875, 5.20625]
                },
                {
                    Mode: "半波-特码半波-绿小",
                    Odd: [6.65, 5.95]
                },
                {
                    Mode: "半波-特码半波-绿单",
                    Odd: [5.81875, 5.20625]
                },
                {
                    Mode: "半波-特码半波-绿双",
                    Odd: [6.65, 5.95]
                },
                {
                    Mode: "半波-特码半波-绿合单",
                    Odd: [6.65, 5.95]
                },
                {
                    Mode: "半波-特码半波-绿合双",
                    Odd: [5.81875, 5.20625]
                },
                {
                    Mode: "半波-特码半波-蓝大",
                    Odd: [5.17222, 4.62778]
                },
                {
                    Mode: "半波-特码半波-蓝小",
                    Odd: [6.65, 5.95]
                },
                {
                    Mode: "半波-特码半波-蓝单",
                    Odd: [5.81875, 5.20625]
                },
                {
                    Mode: "半波-特码半波-蓝双",
                    Odd: [5.81875, 5.20625]
                },
                {
                    Mode: "半波-特码半波-蓝合单",
                    Odd: [5.81875, 5.20625]
                },
                {
                    Mode: "半波-特码半波-蓝合双",
                    Odd: [5.81875, 5.20625]
                },
                {
                    Mode: "生肖-特肖-本命",
                    Odd: [9.31, 8.33]
                },
                {
                    Mode: "生肖-特肖-非本命",
                    Odd: [11.6375, 10.4125]
                },
                {
                    Mode: "生肖-一肖-本命",
                    Odd: [1.71512, 1.53458]
                },
                {
                    Mode: "生肖-一肖-非本命",
                    Odd: [2.01391, 1.80192]
                },
                {
                    Mode: "生肖-二肖连-含本命",
                    Odd: [3.62659, 3.21448]
                },
                {
                    Mode: "生肖-二肖连-不含本命",
                    Odd: [4.28935, 3.80193]
                },
                {
                    Mode: "生肖-三肖连-含本命",
                    Odd: [9.17145, 8.12924]
                },
                {
                    Mode: "生肖-三肖连-不含本命",
                    Odd: [10.9363, 9.69354]
                },
                {
                    Mode: "生肖-四肖连-含本命",
                    Odd: [26.5703, 23.55095]
                },
                {
                    Mode: "生肖-四肖连-不含本命",
                    Odd: [31.97783, 28.34398]
                },
                {
                    Mode: "尾数-特码头尾-0头",
                    Odd: [5.17222, 4.62778]
                },
                {
                    Mode: "尾数-特码头尾-非0头",
                    Odd: [4.655, 4.165]
                },
                {
                    Mode: "尾数-特码头尾-0尾",
                    Odd: [11.6375, 10.4125]
                },
                {
                    Mode: "尾数-特码头尾-非0尾",
                    Odd: [9.31, 8.33]
                },
                {
                    Mode: "尾数-二尾连-含0",
                    Odd: [3.62659, 3.21448]
                },
                {
                    Mode: "尾数-二尾连-不含0",
                    Odd: [3.06783, 2.71921]
                },
                {
                    Mode: "尾数-三尾连-含0",
                    Odd: [7.69518, 6.82072]
                },
                {
                    Mode: "尾数-三尾连-不含0",
                    Odd: [6.45975, 5.72569]
                },
                {
                    Mode: "尾数-四尾连-含0",
                    Odd: [18.36832, 16.28101]
                },
                {
                    Mode: "尾数-四尾连-不含0",
                    Odd: [15.28279, 13.54611]
                },
                {
                    Mode: "不中-五不中",
                    Odd: [2.12955, 1.90539]
                },
                {
                    Mode: "不中-六不中",
                    Odd: [2.53244, 2.26587]
                },
                {
                    Mode: "不中-七不中",
                    Odd: [3.02486, 2.70645]
                },
                {
                    Mode: "不中-八不中",
                    Odd: [3.62983, 3.24774]
                },
                {
                    Mode: "不中-九不中",
                    Odd: [4.37714, 3.91639]
                },
                {
                    Mode: "不中-十不中",
                    Odd: [5.30563, 4.74714]
                }]
            },
            selectTab: ["特码", "直选"],
            nowGroupItem: {
                groupTitle: "特码",
                BackData: [{
                    name: "直选",
                    mode: "A01",
                    tip: "从1-49中任选1个或多个号码，每个号码为一注，所选号码中包含特码，即为中奖。",
                    group: "特码",
                    subGroup: "特码",
                    tag: "特码直选",
                    eg: [],
                    default:
                    !0
                },
                {
                    name: "两面",
                    mode: "A02",
                    tip: "开奖号码最后一位为特码。大于或等于25为特码大，小于或等于24为特码小；奇数为单，偶数为双；特码两个数相加后得数，奇数为合单，偶数为合双，小于等于6为合小，大于6为合大；尾大尾小即看特码个位数值，小于等于4为小，大于4为大；特码为49时为和，不算任何大小单双，但算波色。",
                    group: "特码",
                    subGroup: "特码",
                    eg: ["01 02", "01 02 03 04 05 06 07 08 21 22 71 72 73 74 75 76 77 78 79 80"],
                    tag: "特码两面"
                }]
            },
            nowMode: {},
            tip: '',
            red: ["01", "02", "07", "08", "12", "13", "18", "19", "23", "24", "29", "30", "34", "35", "40", "45", "46"],
            blue: ["03", "04", "09", "10", "14", "15", "20", "25", "26", "31", "36", "37", "41", "42", "47", "48"],
            green: ["05", "06", "11", "16", "17", "21", "22", "27", "28", "32", "33", "38", "39", "43", "44", "49"],
            allBall: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49"]
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
    methods: {
        selectRender(m1) {
            for(let i in this.AllData) {
                if(m1 === i) {
                    this.nowGroupItem = this.AllData[i];
                }
            }
        },
        // 赔率
        odds() {
            var mode = this.selectTab.join('-');
            var s;
            this.ListArr.List.map(i => {
                if (i.Mode === mode) {
                    s = i.Odd[0];
                }
            });
            return s;
        },
        $jqAction() {
            $('.betFilter li').eq(0).addClass('curr');
            $('.betFilterAnd div a').eq(0).addClass('curr');
            $('#app').on('click', '.betFilter li', function() {
                $(this).siblings().removeClass('curr').end().addClass('curr');
                var msg = $(this).text();
                if(msg === '正码') {
                    console.log('1')
                    $('.betFilterAnd').addClass('modeZM');
                }else {
                    $('.betFilterAnd').removeClass('modeZM');
                }
            });
            $('#app').on('click', '.betFilterAnd div a', function() {
                $(this).siblings().removeClass('curr').end().addClass('curr');
            });
            $('#app').on('click', '.sscCheckNumber .buyNumber a', function() {
                var flag = $(this).attr('active');
                if (flag === '1') {
                    $(this).removeClass('curr');
                    $(this).attr('active', '0');
                } else {
                    $(this).addClass('curr');
                    $(this).attr('active', '1');
                }
            });
        }
    },
    mounted() {
        this.$jqAction();
    }
}
</script>
<style lang="scss" scoped>
.betLeft {
    float: left;
    width: 740px;
    min-height: 500px;
    position: relative;
}

.betFilter {
    text-align: left;
    width: 739px;
    box-sizing: border-box;
    padding: 10px 15px;
    border-bottom: 1px solid #ddd;
    background: #f2f4f7;
    border-top: 1px solid #ddd;
    height: 52px;
    li {
        display: inline;
        padding: 4px 5px;
        line-height: 30px;
        border-radius: 3px;
        cursor: pointer;
        text-align: center;
        color: #555;
        font-size: 14px;
        margin-right: 13px;
        margin-bottom: 5px;
    }
    .curr {
        background: #ff9726;
        color: #fff;
    }
}

.betFilterAnd {
    padding: 10px 15px;
    font-size: 12px;
    border-bottom: 1px solid #ccc;
    line-height: 2.2;
    &.modeZM span:before {
        height: 80px;
    }
    li {
        margin: 4px 0;
    }
    span {
        vertical-align: top;
        display: inline-block;
        font-weight: 700;
        color: #555;
        width: 64px;
        position: relative;
        margin-left: 22px;
        &:before {
            content: "";
            display: block;
            width: 1px;
            height: 54px;
            background: #e7e7e8;
            position: absolute;
            top: -14px;
            left: -16px;
        }
        &:after {
            background: #fff;
            border: 1px solid #e7e7e8;
            border-radius: 50%;
            content: "";
            display: block;
            height: 11px;
            left: -21px;
            position: absolute;
            top: 7px;
            width: 11px;
        }
    }
    div {
        display: inline-block;
        max-width: 620px;
        a {
            color: #555;
            margin-right: 15px;
            padding: 4px 6px;
            border-radius: 3px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        .curr {
            background: #ff9726;
            color: #fff;
        }
    }
}

.betTip {
    padding: 3px 15px;
    color: #555;
    background: #fdfdfd;
    i {
        color: #ff9831;
        font-size: 14px;
        margin-right: 3px;
    }
    ins {
        color: red;
    }
}

.hoverContent table th,
.hoverContent table td {
    white-space: nowrap;
    padding: 4px 10px;
    text-align: center;
    box-shadow: 0 1px 0 #505e70, 1px 0 0 #505e70;
}

.hoverContent {
    display: none;
    background: #2e4158;
    margin-left: 8px;
    color: #fff;
    border-radius: 4px;
    position: relative;
    z-index: 999;
    background: initial;
    margin-left: 4px;
    table {
        background: #455467;
        border-radius: 4px;
        overflow: hidden;

        th {
            font-weight: 400;
        }
    }
}

.sscCheckNumber {
    margin: 24px 15px;
    padding: 25px 0;
    background: url(http://imagess-google.com/system/pc/k3/betBg.png);
    border-radius: 6px;
    padding: 15px 0!important;
    padding-bottom: 5px!important;
    ul {
        li {
            display: table;
            margin: 10px 0;
        }
    }
}


.buyNumber a,
.buyNumber ins {
    display: inline-block;
    margin: 0 6px;
    background: #cecece;
    border: 1px solid #c0c5d2;
    line-height: 38px;
    font-size: 18px;
    color: #000;
    box-shadow: 0 1px 3px #d4d4d4, inset 0 -1px 5px #fff;
    text-align: center;
    background: linear-gradient(180deg, #fff 0, #f1efef);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff", endColorstr="#f1efef", GradientType=0);
    filter: none;
    cursor: pointer;
    margin-bottom: 10px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}


.buyNumber {
    min-width: 500px;
    text-align: center;
    margin: 5px 0;
    a {
        filter: none!important;
        width: 38px;
        height: 38px;
        border-radius: 50%;
    }
    .red {
        color: #dc3b40;
    }
    .blue {
        color: #218ddd;
    }
    .green {
        color: #38b366;
    }
    .curr {
        background: linear-gradient(180deg, #d64b15 30%, #ea6a31);
        background: -moz-linear-gradient(to bottom, #d64b15 30%, #ea6a31 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#d64b15", endColorstr="#ea6a31", GradientType=0);
        border: 1px solid #d24c10;
        color: #fff!important;
        text-decoration: blink;
        box-shadow: inherit;
    }
    .curr.red {
        background: linear-gradient(180deg, #ff6669 30%, #e53a3d);
        background: -moz-linear-gradient(to bottom, #ff6669 30%, #e53a3d 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff6669", endColorstr="#e53a3d", GradientType=0);
        border: 1px solid #e94548;
    }
    .curr.blue {
        background: linear-gradient(180deg, #33a8ff 30%, #228ede);
        background: -moz-linear-gradient(to bottom, #33a8ff 30%, #228ede 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#33a8ff", endColorstr="#228ede", GradientType=0);
        border: 1px solid #2994e3;
    }
    .curr.green {
        background: linear-gradient(180deg, #41e07c 30%, #38b467);
        background: -moz-linear-gradient(to bottom, #41e07c 30%, #38b467 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#41e07c", endColorstr="#38b467", GradientType=0);
        border: 1px solid #3cb569;
    }
}

.buyNumber,
.buyNumberFilter,
.buyNumberTitle {
    display: block;
    float: left;
}

.buyNumberTitle {
    width: 63px;
    height: 26px;
    background: #455467;
    color: #fff;
    text-align: center;
    font-size: 14px;
    line-height: 26px;
    border-radius: 0 3px 3px 0;
    margin: 11px 0;
    margin-right: 25px;
    position: relative;
}

.selectMini {
    .buyNumberTitle {
        margin-right: 20px;
        i {
            position: absolute;
            display: block;
            right: -5px;
            top: 8px;
            border-top: 5px solid transparent;
            border-left: 5px solid #455467;
            border-bottom: 5px solid transparent;
        }
    }
    .buyNumber {
        width: 610px;
    }
}

.selectMini .buyNumber,
.selectSYX5 .buyNumber {
    text-align: left;
    padding: 0 4px;
}

.betTotal {
    padding: 10px;
    text-align: center;
    font-size: 16px;
    .money {
        color: red;
    }
}

.betTotal em,
.betTotal i {
    color: #f37036;
}

.betBtn {
    display: block;
    margin: 0 auto;
    line-height: 44px;
    font-size: 20px;
    border-radius: 5px;
    width: 150px;
    text-align: center;
    background: #ea6a31;
    color: #fff;
    margin-bottom: 40px;
}

.checkedList {
    border: 1px solid #ddd;
    margin: 15px;
    padding: 10px;
    height: 188px;
    overflow-y: auto;
    margin-top: 40px;
    background: #fff;
    table {
        width: 100%;
    }
}
</style>