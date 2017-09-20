<template>
    <div class="betLeft">
        <div>
            <!-- 头部 -->
            <div>
                <ul class="betFilter">
                    <li v-for="(item, index) in AllData" :key="index" @click="selectRender(item,index)">{{ index }}</li>
                </ul>
                <ul class="betFilterAnd">
                    <li>
                        <span>{{ nowGroupItem.groupTitle }}</span>
                        <div>
                            <a v-for="(item, index) in nowGroupItem.BackData" :key="index" @click="clickTab2(item, index)">{{ item.name }}</a>
                        </div>
                    </li>
                </ul>
                <div class="betTip">
                    <i class="iconfont"></i>{{ tip }}
                    <span v-if="oddShow">
                        赔率
                        <ins>{{ oddCount() }}</ins>
                    </span>
                    <div class="hoverMoney" v-if="nowItem.lottery.bonusMode == 1 ? parseInt(nowItem.lottery.bonusMode) : false">奖金奖励</div>
                    <div class="hoverContent" v-if="nowItem.lottery.bonusMode == 1 ? parseInt(nowItem.lottery.bonusMode) : false">
                        <table>
                            <tr>
                                <th>猜中</th>
                                <th>单注最高奖金</th>
                            </tr>
                            <tr v-for="(item, index) in nowItem.lottery.odd" :key="index">
                                <td>{{ item.name }}</td>
                                <td>{{ (Math.floor(item.odd[0] * 100) / 100).toFixed(2) }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div v-if="!parseInt(nowItem.lottery.mode)">
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
                                    <a :class="item | color(red,blue,green)" v-for="(item, index) in nowItem.lottery.data" :key="index" active="0" @click="clickNumber(item,index)">
                                        <span>{{ item }}</span>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- number下注 -->
                <div class="Panel">
                    <p class="betTotal">
                        您选择了
                        <em>{{ betCount !== undefined ? betCount : 0 }}</em>
                        注
                    </p>
                    <a class="betBtn ClickShade" @click="affirmNum">确认选号</a>
                </div>
            </div>

            <div v-else>
                <!-- 选非号码 -->
                <div class="checkNumber normalbox" :class="nowItem.mode">
                    <ul class="fix">
                        <li v-for="(item, index) in nowItem.lottery.data" :key="index" @click="clickNoNumber(item,index)">
                            <a class="ClickShade">
                                {{ item.name }}
                                <div class="bet-item-eg-box fix">
                                    <span class="bet-item-eg" v-for="(subItem, subIndex) in item.eg" :key="subIndex">{{ subItem }}</span>
                                </div>
                            </a>
                            <span class="bet-item-rate">{{ (item.odd !== undefined) ? "赔率" + (Math.floor(item.odd[0] * 100) / 100).toFixed(2) : ''}}</span>
                        </li>
                    </ul>
                </div>
                <!-- 非 number 下注 -->
                <div class="Panel" v-if="nowItem.lottery.bonusMode == 1 ? parseInt(nowItem.lottery.bonusMode) : false">
                    <p class="betTotal">
                        您选择了
                        <em>{{ betCount !== undefined ? betCount : 0 }}</em>
                        注
                    </p>
                    <a class="betBtn ClickShade" @click="affirmNoNum">确认选号</a>
                </div>
            </div>
            
            <!-- 编辑区 -->
            <div class="checkedList">
                <table>
                    <tbody>
                        <tr v-for="(item,index) in chosenLotteryItems" :key="index">
                            <td>
                                <i class="order_type">[{{ item.text }}] {{ item.betting_number }}</i>
                                <a class="orderDetail" style="display:none">详情</a>
                            </td>
                            <td>
                                <span class="order_zhushu">
                                    总共
                                    <i class="order_num c_red">{{ item.betting_count }}</i>
                                    注
                                </span>
                            </td>
                            <td>
                                <i class="order_price">
                                    每注
                                    <input type="text" class="eachPrice" v-model="item.betting_unitPrice">
                                    元
                                </i>
                            </td>
                            <td>
                                <i class="c_3">
                                    <span class="hide_this">
                                        可中金额
                                        <i class="orderMoney c_red">{{ (parseInt(item.betting_unitPrice) * parseFloat(item.maxAward)).toFixed(2) }}</i>
                                        元
                                    </span>
                                </i>
                            </td>
                            <td>
                                <i class="orderCancel" @click="cancelItem(index)">删除</i>
                            </td>
                        </tr>
                    </tbody>
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
import $store from '../vuex/store.js';
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
function allNum() {
    return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49"];
}
function mode1Data() {
    return [
        { name: '大', odd: [1.98042, 1.77625] },
        { name: '小', odd: [1.98042, 1.77625] },
        { name: '单', odd: [1.98042, 1.77625] },
        { name: '双', odd: [1.98042, 1.77625] },
        { name: '大单', odd: [3.96083, 3.5525] },
        { name: '大双', odd: [3.96083, 3.5525] },
        { name: '小单', odd: [3.96083, 3.5525] },
        { name: '小双', odd: [3.96083, 3.5525] },
        { name: '合大', odd: [1.98042, 1.77625] },
        { name: '合小', odd: [1.98042, 1.77625] },
        { name: '合单', odd: [1.98042, 1.77625] },
        { name: '合双', odd: [1.98042, 1.77625] },
        { name: '尾大', odd: [1.98042, 1.77625] },
        { name: '尾小', odd: [1.98042, 1.77625] },
        { name: '家禽', odd: [1.9012, 1.7052] },
        { name: '野兽', odd: [1.98042, 1.77625] },
        { name: '红波', odd: [2.79588, 2.50765] },
        { name: '绿波', odd: [2.97063, 2.66438] },
        { name: '蓝波', odd: [2.97063, 2.66438] }
    ];
}
// 服务器获取时间
function getServerYear() {
    var s;
    var url = '/mock/getServerTime.json';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            s = JSON.parse(xhr.responseText);
        } else {
            s = false;
            console.log(xhr.statusText);
        }
    };
    xhr.send();
    return s;
}
// 算本命年
function animalData(params) {
    var lottery = {};
    lottery.mode = '1';
    lottery.flag = '1';
    var base = 2017;
    // 特肖
    var b_odd1 = [9.31, 8.33];
    var no_b_odd1 = [11.6375, 10.4125];
    // 一肖
    var b_odd2 = [1.71512, 1.53458];
    var no_b_odd2 = [2.01391, 1.80192];

    var animal = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
    var benmingArr = ["鸡", "狗", "猪", "鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴"];
    var egs = [
        ["10", "22", "34", "46"],
        ["09", "21", "33", "45"],
        ["08", "20", "32", "44"],
        ["07", "19", "31", "43"],
        ["06", "18", "30", "42"],
        ["05", "17", "29", "41"],
        ["04", "16", "28", "40"],
        ["03", "15", "27", "39"],
        ["02", "14", "26", "38"],
        ["01", "13", "25", "37", "49"],
        ["12", "24", "36", "48"],
        ["11", "23", "35", "47"],
    ];
    lottery.data = [];
    var yearResponse = getServerYear();
    if (yearResponse) {
        var year = parseInt(new Date(parseInt(yearResponse.Data)).getFullYear());
        var remainder = (year - 1) % 12 + 1;
        $store.state.natal = benmingArr[remainder - 1];
        var step = parseInt(remainder - base);
        // remainder  0 
        if (params === 'odd1' || params === 'odd2') {
            if(params === 'odd1') lottery.award = ["9.31","11.63"];
            if(params === 'odd2') lottery. award = ["1.715","2.013"];
            for (let i = 0; i < animal.length; i++) {
                var o = {};
                o.name = animal[i];
                var e = parseInt((i - step) % 12);
                o.eg = egs[e];
                if (animal[i] == benmingArr[remainder - 1]) {
                    var od = params === 'odd1' ? b_odd1 : b_odd2;
                    o.odd = od;
                } else {
                    var no_od = params === 'odd1' ? no_b_odd1 : no_b_odd2;
                    o.odd = no_od;
                }
                lottery.data.push(o);
            }
            return lottery;
        } else if (params === 'noOdd1' || params === 'noOdd2' || params === 'noOdd3') {
            lottery.bonusMode = '1';
            var r = {};
            if (params === 'noOdd1') {
                lottery.award = ["3.62","4.28"];
                lottery.odd = [
                    { name: "含本命", odd: [3.62659, 3.21448] },
                    { name: "不含本命", odd: [4.28935, 3.80193] }
                ];
            } else if (params === 'noOdd2') {
                lottery.award = ["9.17","10.93"];
                lottery.odd = [
                    { name: "含本命", odd: [9.17145, 8.12924] },
                    { name: "不含本命", odd: [10.9363, 9.69354] }
                ];
            } else if (params === 'noOdd3') {
                lottery.award = ["26.57","31.97783"];
                lottery.odd = [
                    { name: "含本命", odd: [26.5703, 23.55095] },
                    { name: "不含本命", odd: [31.97783, 28.34398] }
                ];
            }
            for (let i = 0; i < animal.length; i++) {
                var o = {};
                o.name = animal[i];
                var e = parseInt((i - step) % 12);
                o.eg = egs[e];
                lottery.data.push(o);
            }
            return lottery;
        }
    }
}
// 尾数算法
function mantissa(n) {
    var lottery = {};
    lottery.mode = '1';
    lottery.flag = '1';
    if (n === 'odd') {
        lottery.award = ["5.17","4.655","11.6375","9.31"];
        lottery.data = [
            { name: '0头', odd: [5.17222, 4.62778] },
            { name: '1头', odd: [4.655, 4.165] },
            { name: '2头', odd: [4.655, 4.165] },
            { name: '3头', odd: [4.655, 4.165] },
            { name: '4头', odd: [4.655, 4.165] },
            { name: '0尾', odd: [11.6375, 10.4125] },
            { name: '1尾', odd: [9.31, 8.33] },
            { name: '2尾', odd: [9.31, 8.33] },
            { name: '3尾', odd: [9.31, 8.33] },
            { name: '4尾', odd: [9.31, 8.33] },
            { name: '5尾', odd: [9.31, 8.33] },
            { name: '6尾', odd: [9.31, 8.33] },
            { name: '7尾', odd: [9.31, 8.33] },
            { name: '8尾', odd: [9.31, 8.33] },
            { name: '9尾', odd: [9.31, 8.33] }
        ];
        return lottery;
    } else {
        lottery.bonusMode = '1';
        lottery.data = [
            { name: '0尾' },
            { name: '1尾' },
            { name: '2尾' },
            { name: '3尾' },
            { name: '4尾' },
            { name: '5尾' },
            { name: '6尾' },
            { name: '7尾' },
            { name: '8尾' },
            { name: '9尾' }
        ];
        if (n === 'noOdd1') {
            lottery.award = ["3.62","3.06"];
            lottery.odd = [
                { name: "含0尾", odd: [3.62659, 3.21448] },
                { name: "不含0尾", odd: [3.06783, 2.71921] }
            ];
        } else if (n === 'noOdd2') {
            lottery.award = ["7.69","6.45"];
            lottery.odd = [
                { name: "含0尾", odd: [7.69518, 6.82072] },
                { name: "不含0尾", odd: [6.45975, 5.72569] }
            ];
        } else if (n === 'noOdd3') {
            lottery.award = ["18.36","15.28"];
            lottery.odd = [
                { name: "含0尾", odd: [18.36832, 16.28101] },
                { name: "不含0尾", odd: [15.28279, 13.54611] }
            ];
        }
        return lottery;
    }
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
                        lottery: {
                            // mode 0 代表 number 型彩票
                            mode: '0',
                            odd: [48.51, 43.61],
                            award: "48.51",
                            data: allNum()
                        },
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
                        tag: "特码两面",
                        lottery: {
                            // mode 代表非 number 型数据
                            mode: '1',
                            award: ["1.980","3.960","1.980","1.980","1.901","1.980","2.795","2.970"],
                            data: mode1Data()
                        }
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
                        lottery: {
                            mode: '0',
                            odd: [8.00333, 7.18667],
                            award: "8.00",
                            data: allNum()
                        },
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
                        eg: [],
                        lottery: {
                            mode: '0',
                            odd: [47.04, 42.14],
                            award: "47.04",
                            data: allNum()
                        },
                    },
                    {
                        name: "正１两面",
                        mode: "B09",
                        tip: u("一"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正１两面",
                        eg: [],
                        lottery: {
                            mode: '1',
                            award: ["1.980","3.960","1.980","1.980","1.901","1.980","2.795","2.970"],
                            data: mode1Data()
                        },
                    },
                    {
                        name: "正２特",
                        mode: "B04",
                        tip: l("二"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正２特",
                        eg: [],
                        lottery: {
                            mode: '0',
                            odd: [47.04, 42.14],
                            award: "47.04",
                            data: allNum()
                        }
                    },
                    {
                        name: "正２两面",
                        mode: "B10",
                        tip: u("二"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正２两面",
                        eg: [],
                        lottery: {
                            mode: '1',
                            award: ["1.980","3.960","1.980","1.980","1.901","1.980","2.795","2.970"],
                            data: mode1Data()
                        },
                    },
                    {
                        name: "正３特",
                        mode: "B05",
                        tip: l("三"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正３特",
                        eg: [],
                        lottery: {
                            mode: '0',
                            odd: [47.04, 42.14],
                            award: "47.04",
                            data: allNum()
                        }
                    },
                    {
                        name: "正３两面",
                        mode: "B11",
                        tip: u("三"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正３两面",
                        eg: [],
                        lottery: {
                            mode: '1',
                            award: ["1.980","3.960","1.980","1.980","1.901","1.980","2.795","2.970"],
                            data: mode1Data()
                        },
                    },
                    {
                        name: "正４特",
                        mode: "B06",
                        tip: l("四"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正４特",
                        eg: [],
                        lottery: {
                            mode: '0',
                            odd: [47.04, 42.14],
                            award: "47.04",
                            data: allNum()
                        }
                    },
                    {
                        name: "正４两面",
                        mode: "B12",
                        tip: u("四"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正４两面",
                        eg: [],
                        lottery: {
                            mode: '1',
                            award: ["1.980","3.960","1.980","1.980","1.901","1.980","2.795","2.970"],
                            data: mode1Data()
                        },
                    },
                    {
                        name: "正５特",
                        mode: "B07",
                        tip: l("五"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正５特",
                        eg: [],
                        lottery: {
                            mode: '0',
                            odd: [47.04, 42.14],
                            award: "47.04",
                            data: allNum()
                        }
                    },
                    {
                        name: "正５两面",
                        mode: "B13",
                        tip: u("五"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正５两面",
                        eg: [],
                        lottery: {
                            mode: '1',
                            award: ["1.980","3.960","1.980","1.980","1.901","1.980","2.795","2.970"],
                            data: mode1Data()
                        },
                    },
                    {
                        name: "正６特",
                        mode: "B08",
                        tip: l("六"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正６特",
                        eg: [],
                        lottery: {
                            mode: '0',
                            odd: [47.04, 42.14],
                            award: "47.04",
                            data: allNum()
                        }
                    },
                    {
                        name: "正６两面",
                        mode: "B14",
                        tip: u("六"),
                        group: "正码",
                        subGroup: "正码",
                        tag: "正６两面",
                        eg: [],
                        lottery: {
                            mode: '1',
                            award: ["1.980","3.960","1.980","1.980","1.901","1.980","2.795","2.970"],
                            data: mode1Data()
                        },
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
                        lottery: {
                            mode: '0',
                            odd: [663.264, 571.144],
                            award: "663.26",
                            data: allNum()
                        },
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
                        eg: [],
                        lottery: {
                            mode: '0',
                            bonusMode: '1',
                            flag: '1',
                            odd: [
                                { name: "中二", odd: [20.88053, 18.424] },
                                { name: "中三", odd: [109.6228, 96.726] },
                            ],
                            award: ["20.88", "109.62"],
                            data: allNum()
                        },
                    },
                    {
                        name: "二全中",
                        mode: "C03",
                        tip: "至少选择两个号码，每二个码号为一组合，二个号码都是开奖码号之正码（不含特码），即为中奖。",
                        group: "连码",
                        subGroup: "连码",
                        tag: "连码二全中",
                        eg: [],
                        lottery: {
                            mode: '0',
                            odd: [66.64, 58.8],
                            award: '66.64',
                            data: allNum()
                        },
                    },
                    {
                        name: "二中特",
                        mode: "C04",
                        tip: "至少选择两个号码，每二个号码为一组合，二个号码都是开奖号码（含特码），即为中奖。若两个都是正码，叫二中特之二中。若选号中包含特码，叫二中特之中特。",
                        group: "连码",
                        subGroup: "连码",
                        tag: "连码二中特",
                        eg: [],
                        lottery: {
                            mode: '0',
                            bonusMode: '1',
                            flag: '1',
                            odd: [
                                { name: '二中', odd: [53.312, 47.04] },
                                { name: '中特', odd: [33.32, 29.4] },
                            ],
                            award: ["53.31","33.32"],
                            data: allNum()
                        },
                    },
                    {
                        name: "特串",
                        mode: "C05",
                        tip: "至少选择两个号码，每二个号码为一组合，其中一个是正码，一个是特别号码，即为中奖。",
                        group: "连码",
                        subGroup: "连码",
                        tag: "连码特串",
                        eg: [],
                        lottery: {
                            mode: '0',
                            odd: [160.72, 141.12],
                            award: "160.72",
                            data: allNum()
                        },
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
                        lottery: {
                            mode: '1',
                            award: ["6.650","4.655","5.818","5.172","5.172","5.818","5.818","6.650","5.818","6.650","6.650","5.818","5.172","6.650","5.818","5.818","5.818","5.818"],
                            data: [
                                { name: "红大", odd: [6.65, 5.95], eg: ["29", "30", "34", "35", "40", "45", "46"] },
                                { name: "红小", odd: [4.655, 4.165], eg: ["01", "02", "07", "08", "12", "13", "18", "19", "23", "24"] },
                                { name: "红单", odd: [5.81875, 5.20625], eg: ["01", "07", "13", "19", "23", "29", "35", "45"] },
                                { name: "红双", odd: [5.17222, 4.62778], eg: ["02", "08", "12", "18", "24", "30", "34", "40", "46"] },
                                { name: "红合单", odd: [5.17222, 4.62778], eg: ["01", "07", "12", "18", "23", "29", "30", "34", "45"] },
                                { name: "红合双", odd: [5.81875, 5.20625], eg: ["02", "08", "13", "19", "24", "35", "40", "46"] },
                                { name: "绿大", odd: [5.81875, 5.20625], eg: ["27", "28", "32", "33", "38", "39", "43", "44"] },
                                { name: "绿小", odd: [6.65, 5.95], eg: ["05", "06", "11", "16", "17", "21", "22"] },
                                { name: "绿单", odd: [5.81875, 5.20625], eg: ["05", "11", "17", "21", "27", "33", "39", "43"] },
                                { name: "绿双", odd: [6.65, 5.95], eg: ["06", "16", "22", "28", "32", "38", "44"] },
                                { name: "绿合单", odd: [6.65, 5.95], eg: ["05", "16", "21", "27", "32", "38", "43"] },
                                { name: "绿合双", odd: [5.81875, 5.20625], eg: ["06", "11", "17", "22", "28", "33", "39", "44"] },
                                { name: "蓝大", odd: [5.17222, 4.62778], eg: ["25", "26", "31", "36", "37", "41", "42", "47", "48"] },
                                { name: "蓝小", odd: [6.65, 5.95], eg: ["03", "04", "09", "10", "14", "15", "20"] },
                                { name: "蓝单", odd: [5.81875, 5.20625], eg: ["03", "09", "15", "25", "31", "37", "41", "47"] },
                                { name: "蓝双", odd: [5.81875, 5.20625], eg: ["04", "10", "14", "20", "26", "36", "42", "48"] },
                                { name: "蓝合单", odd: [5.81875, 5.20625], eg: ["03", "09", "10", "14", "25", "36", "41", "47"] },
                                { name: "蓝合双", odd: [5.81875, 5.20625], eg: ["04", "15", "20", "26", "31", "37", "42", "48"] },
                            ]
                        },
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
                        lottery: animalData('odd1'),
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
                        eg: [],
                        lottery: animalData('odd2'),
                    },
                    {
                        name: "二肖连",
                        mode: "E03",
                        tip: "至少选择两个生肖，每二个生肖为一组合，开奖号码（含特码）中含有投注所属全部生肖，即为中奖。",
                        group: "生肖",
                        subGroup: "生肖",
                        tag: "二肖连",
                        eg: [],
                        lottery: animalData('noOdd1'),
                    },
                    {
                        name: "三肖连",
                        mode: "E04",
                        tip: "至少选择三个生肖，每三个生肖为一组合，开奖号码（含特码）中含有投注所属全部生肖，即为中奖。",
                        group: "生肖",
                        subGroup: "生肖",
                        tag: "三肖连",
                        eg: [],
                        lottery: animalData('noOdd2'),
                    },
                    {
                        name: "四肖连",
                        mode: "E05",
                        tip: "至少选择四个生肖，每四个生肖为一组合，开奖号码（含特码）中含有投注所属全部生肖，即为中奖。",
                        group: "生肖",
                        subGroup: "生肖",
                        tag: "四肖连",
                        eg: [],
                        lottery: animalData('noOdd3'),
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
                        lottery: mantissa('odd'),
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
                        eg: [],
                        lottery: mantissa('noOdd1'),
                    },
                    {
                        name: "三尾连",
                        mode: "F03",
                        tip: "至少选择三个尾数，每三个尾数为一组合，开奖号码（含特码）中含有投注对应全部尾数，即为中奖。",
                        group: "尾数",
                        subGroup: "尾数",
                        tag: "三尾连",
                        eg: [],
                        lottery: mantissa('noOdd2'),
                    },
                    {
                        name: "四尾连",
                        mode: "F04",
                        tip: "至少选择四个尾数，每四个尾数为一组合，开奖号码（含特码）中含有投注对应全部尾数，即为中奖。",
                        group: "尾数",
                        subGroup: "尾数",
                        tag: "四尾连",
                        eg: [],
                        lottery: mantissa('noOdd3'),
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
                        lottery: {
                            mode: '0',
                            odd: [2.12955, 1.90539],
                            award: '2.21',
                            data: allNum()
                        },
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
                        eg: [],
                        lottery: {
                            mode: '0',
                            odd: [2.53244, 2.26587],
                            award: '2.53',
                            data: allNum()
                        },
                    },
                    {
                        name: "七不中",
                        mode: "G03",
                        tip: c("七"),
                        group: "不中",
                        subGroup: "不中",
                        tag: "七不中",
                        eg: [],
                        lottery: {
                            mode: '0',
                            odd: [3.02486, 2.70645],
                            award: '3.02',
                            data: allNum()
                        },
                    },
                    {
                        name: "八不中",
                        mode: "G04",
                        tip: c("八"),
                        group: "不中",
                        subGroup: "不中",
                        tag: "八不中",
                        eg: [],
                        lottery: {
                            mode: '0',
                            odd: [3.62983, 3.24774],
                            award: '3.62',
                            data: allNum()
                        },
                    },
                    {
                        name: "九不中",
                        mode: "G05",
                        tip: c("九"),
                        group: "不中",
                        subGroup: "不中",
                        tag: "九不中",
                        eg: [],
                        lottery: {
                            mode: '0',
                            odd: [4.37714, 3.91639],
                            award: '4.37',
                            data: allNum()
                        },
                    },
                    {
                        name: "十不中",
                        mode: "G06",
                        tip: c("十"),
                        group: "不中",
                        subGroup: "不中",
                        tag: "十不中",
                        eg: [],
                        lottery: {
                            mode: '0',
                            odd: [5.30563, 4.74714],
                            award: '5.30',
                            data: allNum()
                        },
                    }]
                }
            },
            selectTab: ["特码", "直选"],
            nowGroupItem: {},
            nowItem: {},
            // 赔率显示
            oddShow: true,
            // number 型彩票
            lotteryNumber: false,
            oddNum: this.oddCount,
            // 本命
            natal: this.$store.state.natal,
            selectBetCount: 0,
            tip: '从1-49中任选1个或多个号码，每个号码为一注，所选号码中包含特码，即为中奖。',
            red: ["01", "02", "07", "08", "12", "13", "18", "19", "23", "24", "29", "30", "34", "35", "40", "45", "46"],
            blue: ["03", "04", "09", "10", "14", "15", "20", "25", "26", "31", "36", "37", "41", "42", "47", "48"],
            green: ["05", "06", "11", "16", "17", "21", "22", "27", "28", "32", "33", "38", "39", "43", "44", "49"],
            chosenArr: [],
            chosenLotteryItems:[],
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
        award() {
            return this.nowItem.lottery.award;
        },
        basket() {
            return this.chosenLotteryItems;
        },
        betCount() {
            return this.selectBetCount;
        },
        betStr() {
            return this.chosen.join(",");
        },
        chosen() {
            return this.chosenArr;
        }
    },
    methods: {
        // 一级菜单点击事件
        selectRender(ele, inx) {
            var $this = $('.betFilter li:contains(' + inx + ')');
            $this.siblings().removeClass('curr').end().addClass('curr');
            var msg = $this.text();
            if (msg === '正码') {
                $('.betFilterAnd').addClass('modeZM');
            } else {
                $('.betFilterAnd').removeClass('modeZM');
            }
            for (let i in this.AllData) {
                if (inx === i) {
                    this.nowGroupItem = this.AllData[i];
                    this.nowItem = this.nowGroupItem.BackData[0];
                    this.tip = this.nowGroupItem.BackData[0].tip;
                }
            }
            this.selectTab[0] = inx;
            this.initTab2();
            // 清除其他 tab 选号样式
            this.clearCurr();
            // 清除注数
            this.selectBetCount = 0;
            this.chosenArr = [];
        },
        // 初始化二级菜单
        initTab2() {
            $('.betFilterAnd div a').eq(0).addClass('curr').siblings().removeClass('curr');
            this.selectTab[1] = this.nowGroupItem.BackData[0].name;
        },
        oddCount() {
            var b = this.nowItem.lottery.bonusMode;
            var r = this.nowItem.lottery.mode;
            var f = this.nowItem.lottery.flag;
            if ((b === undefined && r === '1') || f === '1') {
                this.oddShow = false;
            } else {
                this.oddShow = true;
                var res = (Math.floor(this.nowItem.lottery.odd[0] * 100)) / 100;
                res = res.toFixed(2);
                return res;
            }
        },
        // 初始化
        $jqInit() {
            $('.betFilter li').eq(0).addClass('curr');
            setTimeout(() => {
                $('.betFilterAnd div a').eq(0).addClass('curr');
            }, 0);
            $('#app').on('mouseenter', '.hoverMoney', function() {
                var top = $(this).offset().top - $(document).scrollTop();
                var left = $(this).offset().left - $(document).scrollLeft() + 48;
                $('.hoverContent').css({
                    position: 'fixed',
                    top: top + 'px',
                    left: left + 'px'
                });
                $('.hoverContent').show();
            });
            $('#app').on('mouseleave', '.hoverMoney', function() {
                $('.hoverContent').hide();
            });
        },
        // 二级菜单点击事件
        clickTab2(ele, inx) {
            $('.betFilterAnd div a').eq(inx).siblings().removeClass('curr').end().addClass('curr');
            this.tip = this.nowGroupItem.BackData[inx].tip;
            this.nowItem = this.nowGroupItem.BackData[inx];
            this.selectTab[1] = $('.betFilterAnd div a').eq(inx).text();
            // 清除其他 tab 选号样式
            this.clearCurr();
            // 清除注数
            this.selectBetCount = 0;
            this.chosenArr = [];
        },
        // 清除所有选号
        clearCurr() {
            $('.sscCheckNumber .buyNumber a').removeClass('curr');
            $('.checkNumber li a').removeClass('curr');
        },
        // 选号点击事件
        clickNumber(ele, inx) {
            var $this = $('.sscCheckNumber .buyNumber a').eq(inx);
            var t = $this.text();
            var flag = $this.hasClass('curr');
            var mode = this.selectTab.join(',');
            var modeFirst = this.selectTab[0];
            if (flag) {
                $this.removeClass('curr');
                for(let i = 0;i < this.chosenArr.length;i++) {
                    if(this.chosenArr[i] === t) {
                        this.chosenArr.splice(i,1);
                    }
                }

                // 判断注数
                if(mode === '特码,直选' || modeFirst === '正码') {
                    this.selectBetCount--;
                }

            } else {
                $this.addClass('curr');
                this.chosenArr.push(t);

                // 判断注数
                if(mode === '特码,直选' || modeFirst === '正码') {
                    this.selectBetCount++;
                }


            }

            

        },
        // 非选号点击事件
        clickNoNumber(ele, inx) {
            var $this = $('.checkNumber li a').eq(inx);
            var flag = $this.hasClass('curr');
            var a = $this.siblings('.bet-item-rate').text().replace('赔率','');
            var res = $this.contents().filter(function() { return this.nodeType === 3; }).text(); 
            res = res.replace(/\n/g,'');
            res = res.replace(/ /g,'');
            var excludeTab = this.selectTab[1];
            if (flag) {
                $this.removeClass('curr');

                // 取消
                for(let i = 0;i < this.chosenLotteryItems.length;i++) {
                    let num = this.chosenLotteryItems[i].betting_number;
                    var tab = this.chosenLotteryItems[i].text;
                    if(num === res && this.selectTab.join(',') === tab) {
                        this.chosenLotteryItems.splice(i,1);
                    }
                }

                if(excludeTab === '二肖连' || excludeTab === '三肖连' || excludeTab === '四肖连' || excludeTab === '二尾连' || excludeTab === '三尾连'|| excludeTab === '四尾连') {
                    for(let k = 0; k < this.chosenArr.length; k++) {
                        if(this.chosenArr[k] === res) {
                            // 切除取消选中的。
                            this.chosenArr.splice(k,1);
                        }
                    }
                }

                // 多选非 number 处理中心
                if(excludeTab === '二肖连') {
                    let n = this.chosenArr.length;
                    let limit = 2;
                    let count = (n * (n-1)) / 2;
                    this.selectBetCount = count;
                }


            } else {
                $this.addClass('curr');
                
                this.chosenArr.push(res)

                if(excludeTab === '二肖连' || excludeTab === '三肖连' || excludeTab === '四肖连' || excludeTab === '二尾连' || excludeTab === '三尾连'|| excludeTab === '四尾连') {
                    
                    

                    
                    // 多选非 number 处理中心
                    if(excludeTab === '二肖连') {
                        let n = this.chosenArr.length;
                        let limit = 2;
                        let count = (n * (n-1)) / 2;
                        this.selectBetCount = count;
                    }

                    
                    
                    return;
                }else {
                    var obj = {};
                    obj.betting_count = this.chosenArr.length;
                    obj.betting_issuseNo = this.$store.state.issuseNo;
                    obj.betting_money = '';
                    obj.betting_number = this.chosenArr.join(',');
                    obj.betting_unitPrice = 1;
                    obj.maxAward = parseFloat(a);
                    obj.text = this.selectTab.join(',');
                    this.chosenLotteryItems.push(obj);
                    this.chosenArr = [];
                }
            }
        },
        // number 确认选号
        affirmNum() {
            if(this.chosenArr.length === 0) return;
            var len = $('.sscCheckNumber .buyNumber').find('a.curr').length;
            var obj = {};
            obj.betting_count = this.chosenArr.length;
            obj.betting_issuseNo = this.$store.state.issuseNo;
            obj.betting_money = '';
            obj.betting_number = this.chosenArr.join(',');
            obj.betting_unitPrice = 1;
            obj.maxAward = this.award;
            obj.text = this.selectTab.join(',');
            this.chosenLotteryItems.push(obj);
            // 清除其他 tab 选号样式
            $('.sscCheckNumber .buyNumber a').removeClass('curr');
            // 清除注数
            this.selectBetCount = 0;
            this.chosenArr = [];
        },
        // 非 number 确认选号
        affirmNoNum() {
            var modeTab = this.selectTab[1];
            if(modeTab === '二肖连') {
                var len = this.chosenArr.length;
                // 注数
                var zs = this.selectBetCount;
                // 含不含本命
                var flag = new RegExp(this.natal).test(this.chosenArr.join());
                // true 为含本命, false 不含本命
                if(flag) {

                }else {
                    
                }
                var obj = {};
                obj.betting_count = this.chosenArr.length;
                obj.betting_issuseNo = this.$store.state.issuseNo;
                obj.betting_money = '';
                obj.betting_number = this.chosenArr.join(',');
                obj.betting_unitPrice = 1;
                // obj.maxAward = parseFloat(a);
                obj.text = this.selectTab.join(',');
                this.chosenLotteryItems.push(obj);
                this.chosenArr = [];
            }
        },
        // 删除选号
        cancelItem(i) {
            var o = $('.checkNumber li a');
            // 取消
            let num = this.chosenLotteryItems[i].betting_number;
            var tab = this.chosenLotteryItems[i].text;
            for(let j = 0;j < o.length;j++) {
                var res = o.eq(j).contents().filter(function() { return this.nodeType === 3; }).text(); 
                res = res.replace(/\n/g,'');
                res = res.replace(/ /g,'');
                if(num === res && this.selectTab.join(',') === tab) {
                    o.eq(j).removeClass('curr');
                }
            }
            this.chosenLotteryItems.splice(i,1);
        }
    },
    created() {
        this.nowGroupItem = this.AllData["特码"];
        this.nowItem = this.nowGroupItem.BackData[0];
    },
    mounted() {
        this.$jqInit();
    },
    updated() {
        this.oddCount();
    }
}
</script>
<style lang="scss" scoped>
@import url('../assets/style/lottery/bet6HC.min.css');
</style>