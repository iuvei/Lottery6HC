function(t, e, a) {
    "use strict";
    function s(t) {
        return t && t.__esModule ? t: {
        default:
            t
        }
    }
    function n(t, e, a, s, n) {
        var r = t.lt;
        t.lt.bet;
        this.lottery_code = r.lottery.LotteryCode,
        this.play_detail_code = r.lottery.LotteryCode + r.mode.mode,
        this.betting_number = e,
        this.betting_count = s,
        this.betting_money = 0,
        this.betting_point = a + "-" + r.Rebate[r.lottery.LotteryType],
        this.betting_model = 1,
        this.betting_issuseNo = r.NowIssue,
        this.graduation_count = 1,
        this.text = n
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = a(11),
    i = a(79),
    o = s(i),
    l = a(24),
    c = a(3);
    n.prototype.setUnitPrice = function(t) {
        this.betting_money = t * this.betting_count
    },
    n.prototype.setRebate = function(t, e) {
        var a = e.lt;
        this.betting_point = t + "-" + a.Rebate[a.lottery.LotteryType]
    },
    e.
default = {
        components: {
            modeSelect: o.default
        },
        created: function() {
            var t = this,
            e = function(e) {
                return e.map(function(e) {
                    return (0, l.getAnimalIndex)(e, t.natal)
                }).sort(function(t, e) {
                    return t - e
                })
            };
            this.poultry = e(this.poultry),
            this.wild = e(this.wild),
            this.$store.commit({
                type: "lt_updateTmp",
                alias: "6HC",
                arr: []
            })
        },
        data: function() {
            return {
                itemArr: (0, c.createStringArray)(1, 49),
                red: ["01", "02", "07", "08", "12", "13", "18", "19", "23", "24", "29", "30", "34", "35", "40", "45", "46"],
                blue: ["03", "04", "09", "10", "14", "15", "20", "25", "26", "31", "36", "37", "41", "42", "47", "48"],
                green: ["05", "06", "11", "16", "17", "21", "22", "27", "28", "32", "33", "38", "39", "43", "44", "49"],
                perbet: "",
                poultry: ["牛", "马", "羊", "鸡", "狗", "猪"],
                wild: ["鼠", "虎", "兔", "龙", "蛇", "猴"],
                ellipsisWidth: 46,
                detailLength: 26
            }
        },
        methods: {
            getTag: function(t, e) {
                return t + e
            },
            showBetDetail: function(t, e) {
                layer.msgWarn("[" + t + "] " + e)
            },
            deleteBet: function(t) {
                this.$store.commit("lt_deleteBet", t)
            },
            getModeArr: function() {
                var t = [];
                return this.basket.forEach(function(e) {
                    t.push("[" + e.text + "]  " + e.betting_number + "<br>")
                }),
                t.join("")
            },
            getModeName: function() {
                var t = this.nowMode;
                return t.group + "," + t.tag
            },
            changeUnitPrice: function(t, e) {
                var a = 1 * e.value.replace(/\D/g, "").replace(/^0+/, ""),
                s = 1e6;
                a && (a > s && (a = s, layer.msg("最高投注额为" + s + "元")), this.basket[t].betting_unitPrice = a, this.basket[t].betting_money = a * this.basket[t].betting_count)
            },
            maxAward: function(t) {
                var e = t.betCount,
                a = t.award,
                s = t.mode;
                if (0 === e) return 0;
                if (["A01", "B03", "B04", "B05", "B06", "B07", "B08"].indexOf(s) !== -1) return console.log("号码直选玩法"),
                1 * a;
                if ("B01" === s) return console.log("正码任选"),
                e > 6 ? 6 * a: e * a;
                if (["E01", "E02"].indexOf(s) !== -1) return 1 === this.betStr.length && this.betStr === this.natal ? 1 * a[0] : 1 * a[1];
                if (["E03", "E04", "E05"].indexOf(s) !== -1) {
                    var n = ["E03", "E04", "E05"].indexOf(s) + 2;
                    if (this.betStr.length > 13) return (0, c.C)(7, n) * a[1];
                    var r = this.betStr.split(","),
                    i = r.indexOf(this.natal) === -1 ? 0 : 1;
                    return r = r.length - i,
                    i * (0, c.C)(r, n - 1) * a[0] + (0, c.C)(r, n) * a[1]
                }
                if (["C01", "C02"].indexOf(s) !== -1) {
                    var a = "C01" === s ? a: a[1],
                    o = this.betStr.split(",").length;
                    return o > 6 && (o = 6),
                    a * (0, c.C)(o, 3)
                }
                if ("C03" === s) {
                    var o = this.betStr.split(",").length;
                    return o > 6 && (o = 6),
                    a * (0, c.C)(o, 2)
                }
                if ("C05" === s) {
                    var o = this.betStr.split(",").length;
                    return o > 7 && (o = 7),
                    a * (o - 1)
                }
                if ("C04" === s) {
                    var o = this.betStr.split(",").length;
                    o > 7 && (o = 7);
                    var l = a[1] * (o - 1);
                    return o > 2 && (l += (0, c.C)(o - 1, 2) * a[0]),
                    l
                }
                if ("G" === s.charAt(0)) {
                    var n = 1 * s.charAt(2) + 4,
                    o = this.betStr.split(",").length;
                    return o > 42 && (o = 42),
                    (0, c.C)(o, n) * a
                }
                if ("F" === s.charAt(0)) {
                    var n = 1 * s.charAt(2);
                    if (this.betStr.length > 20) return (0, c.C)(7, n) * a[1];
                    var r = this.betStr.split(","),
                    i = r.indexOf("0尾") === -1 ? 0 : 1;
                    return r = r.length - i,
                    i * r * a[0] + (0, c.C)(r, n) * a[1]
                }
                return - 2
            },
            addBet: function(t) {
                if (this.betCount) {
                    var e = this.basket.slice(0),
                    a = new n(this.$store.state, this.betStr, 0, this.betCount, this.getModeName());
                    t && +t > 0 ? a.maxAward = t: a.maxAward = this.maxAward({
                        betCount: this.betCount,
                        award: this.award,
                        mode: this.mode
                    }),
                    a.betting_unitPrice = "",
                    e.unshift(a),
                    this.$store.commit("lt_setBasket", e),
                    this.firstInputFocus(),
                    this.$store.commit({
                        type: "lt_updateTmp",
                        alias: "6HC",
                        arr: []
                    }),
                    c.bus.$emit("clearNoteStr")
                }
            },
            getAnimalEg: function(t, e) {
                if (l.animals.indexOf(t) === -1) return ! 1;
                var a = [],
                s = (0, l.getAnimalIndex)(t, e);
                for (0 === s && (s = 12); s <= 49;) a.push(s),
                s += 12;
                return a.join(",")
            },
            firstInputFocus: function() {
                var t = this;
                this.$nextTick(function() {
                    t.$refs.lhcBasket.querySelector("input").focus()
                })
            },
            choose: function(t, e, a) {
                var s = this.chosen.slice();
                if (s.indexOf(t) === -1) s.push(t),
                s.sort(function(t, a) {
                    var s = e.indexOf(t),
                    n = e.indexOf(a);
                    return s - n
                });
                else {
                    var n = s.indexOf(t);
                    s.splice(n, 1)
                }
                if (this.$store.commit({
                    type: "lt_updateTmp",
                    alias: "6HC",
                    arr: s
                }), (a || 0 == a) && null !== this.renderOdds) {
                    var r = this.renderOdds[a],
                    i = this;
                    this.basket.forEach(function(e, a, n) {
                        e.betting_number == t && e.play_detail_code.substr( - 3) === i.mode && (n.splice(a, 1), i.chosen.splice(e.betting_number, 1), s.splice(e.betting_number, 1))
                    }),
                    this.addBet(r)
                }
            },
            clearBet: function() {
                this.perbet = "",
                this.$store.commit({
                    type: "lt_updateTmp",
                    alias: "6HC",
                    arr: []
                })
            },
            confirmBet: function() {
                var t = this;
                if ("停止销售" === state.lt.TimeBar || "暂停销售" === state.lt.TimeBar) return void layer.alert(state.lt.TimeBar);
                if (!this.basketBets) return void layer.alert("请至少选择一注号码投注");
                if (!+this.basketTotal) return void layer.alert("请填写您要投注的金额");
                var e = this.$refs.lhcInput;
                for (var a in e) if ("" == e[a]._value) return void layer.alert("投注金额未填写完成");
                var s = this.$store.state.lt,
                n = s.lottery.LotteryCode,
                r = s.NowIssue,
                i = s.lottery.LotteryName,
                o = (this.betCount * this.perbet, s.Rebate[this.lottery], n + this.mode, this.basket.slice(0)),
                c = ["1301E01", "1301E02", "1301E03", "1301E04", "1301E05"],
                u = ["1301A02", "1301B09", "1301B10", "1301B11", "1301B12", "1301B13", "1301B14"],
                d = ["1301F02", "1301F03", "1301F04"],
                v = '<div id="CheckBetLayer" class="lotteryConfirm"><ul>\n                  <li><span>彩种：</span><em class="fill">' + i + '</em></li>\n                  <li><span>期号：</span>第<em class="fill">' + r + '</em>期</li>\n                  <li><span>详情：</span><div class="fill textarea"><p>' + this.getModeArr() + '</p></div></li>\n                  <li><span>投注总金额：</span><em><em class="fill">' + this.basketTotal + "</em>元</em></li>\n              </ul>\n          </div>",
                m = this;
                layer.open({
                    title: "投注确认",
                    style: "width:18em;font-size:.7em",
                    shadeClose: !1,
                    className: "layerBet",
                    content: v,
                    btn: ["确定", "取消"],
                    yes: function() {
                        o.forEach(function(t) {
                            var e = t.betting_number;
                            if (c.indexOf(t.play_detail_code) > -1) {
                                var a = e.split(",");
                                a.length > 0 ? (a = a.map(function(t) {
                                    return (0, l.getAnimalIndex)(t, m.natal)
                                }), e = a.join(",")) : e = (0, l.getAnimalIndex)(t.betting_number, m.natal)
                            }
                            if (d.indexOf(t.play_detail_code) > -1) {
                                var a = e.split(",");
                                a = a.map(function(t) {
                                    return t.split("")[0]
                                }),
                                e = a.join(",")
                            }
                            if (u.indexOf(t.play_detail_code) > -1) {
                                var a = e.split(",");
                                a = a.map(function(t) {
                                    var e = t;
                                    return "家禽" === t ? e = "家禽(" + m.poultry.join(" ") + ")": "野兽" === t && (e = "野兽(" + m.wild.join(" ") + ")"),
                                    e
                                }),
                                e = a.join(",")
                            }
                            t.betting_number = e,
                            "E" === t.play_detail_code.charAt(4) && (t.betting_number += "@" + m.natal),
                            delete t.text
                        }),
                        t.$store.dispatch({
                            type: "lt_confirmBet",
                            basket: o,
                            success: function() {
                                m.perbet = "",
                                o = ""
                            }
                        }),
                        m.clearBet()
                    },
                    no: function() {}
                })
            }
        },
        computed: (0, r.mapState)({
            renderConfig: function() {
                var t = this,
                e = ["E01", "E02", "E03", "E04", "E05"];
                return e.forEach(function(e) {
                    l.renderConfig[e].egArr = l.animals.map(function(e) {
                        return t.getAnimalEg(e, t.natal)
                    })
                }),
                l.renderConfig
            },
            egText: function() {
                return this.renderItem.egArr.map(function(t) {
                    return t.split(",")
                })
            },
            nowMode: function(t) {
                return t.lt.mode
            },
            award: function() {
                return state.lt.award
            },
            nowArr: function() {
                var t = [];
                return this.basket.forEach(function(e) {
                    t.push(e.betting_number + "-" + e.play_detail_code.substr( - 3))
                }),
                t
            },
            natal: function() {
                return this.$store.getters.lt_natal
            },
            renderOdds: function() {
                var t = this;
                if (!Array.isArray(this.award)) return null;
                var e = this.mode,
                a = this.award.map(function(t) {
                    return t
                }),
                s = [],
                n = function() {
                    var e = [];
                    if (t.wild.indexOf(t.natal) > -1) {
                        var s = a[4];
                        a[4] = a[5],
                        a[5] = s
                    }
                    for (var n = [4, 4, 4, 2, 1, 1, 1, 2], r = 0; r < a.length; r++) for (var i = 0; i < n[r]; i++) e.push(a[r]);
                    return e
                },
                r = function() {
                    for (var e = [], s = l.animals.indexOf(t.natal), n = 0; n < 12; n++) n === s ? e.push(a[0]) : e.push(a[1]);
                    return e
                },
                i = function() {
                    for (var t = [], e = [1, 4, 1, 9], s = 0; s < a.length; s++) for (var n = 0; n < e[s]; n++) t.push(a[s]);
                    return t
                };
                if (Array.isArray(a)) switch (e) {
                case "A02":
                case "B09":
                case "B10":
                case "B11":
                case "B12":
                case "B13":
                case "B14":
                    s = n();
                    break;
                case "E01":
                case "E02":
                    s = r();
                    break;
                case "E03":
                case "E04":
                case "E05":
                    s = [];
                    break;
                case "F01":
                    s = i();
                    break;
                default:
                    s = a
                }
                return s
            },
            mode: function() {
                return state.lt.mode.mode
            },
            renderItem: function() {
                return this.renderConfig[this.mode]
            },
            chosen: function() {
                return state.lt.tmp["6HC"]
            },
            betStr: function() {
                return this.chosen.join(",")
            },
            basket: function() {
                return state.lt.basket
            },
            basketBets: function() {
                return this.$store.getters.basketBets
            },
            basketTotal: function() {
                return this.$store.getters.basketTotal
            },
            betCount: function() {
                return Math.round((0, c.C)(this.chosen.length, this.renderItem.alg))
            }
        })
    }
},