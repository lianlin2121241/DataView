/*
 * @Author: limingle
 * @Date:   2017-12-26 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2018-01-11 16:37:53
 */

'use strict';

var bigScreenIndex = Container.extends({
    init: function () {
        var self = this;
        this.computeSize();


        /****** 头部开始 ******/
        /* this.coms.titleCom = new titleCom({
            dataType: "static",
            title: '2018年度公安技侦专用器材列装评审会',
            itemStyle: {
                "display": "flex",
                "align-items": "center",
                "justify-content": "center",
                "color": "#fff",
                "font-weight": "normal",
                "font-family": "tahoma, Arial, sans-serif",
                "font-size": "40px"

            }
        }, "#title"); */
        this.coms.borderCom = new borderCom({
            borderStyle: "s3"
        }, "#bgBorderModule");
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style8"
        }, "#bgBorder5");
        this.coms.projectOrderDate = this.factory(projectOrderDate, {
            innerStyle: {
                fontSize: 26,
                color: '#fff'
            }
        }, "#time");
       /*  this.coms.bgBorderCom = new bgBorderCom({
            borderType: "style8"
        }, "#headBorderBackground"); */
        /****** 头部结束 ******/
        
        /****** 底部即时消息轮播开始 ******/ 
        /* this.coms.bgBorderCom = new bgBorderCom({
            borderType: "style9"
        }, "#footerBorderBackgroundLeft"); 
        this.coms.bgBorderCom = new bgBorderCom({
            borderType: "style10"
        }, "#footerBorderBackgroundRight");  */
        this.coms.borderCom = new borderCom({
            borderStyle: "s2"
        }, "#footerBorder"); 
        this.coms.carouselCrosswiseCom = new carouselCrosswiseCom({
            dataType: "api",
            data: baseUrl.getAllNotice,
            inSilder: true,
            sliderIndex: 8,
            rollingType: "seamlessWithBlank",
            poll: true,
            timeout: 10000,
            BlankWidth:600,
            marqueeStep: 1,
            marqueeTimeout: 16,
            innerStyle: {
                "fontSize": "30px",
                "color": "#fff",
                "lineHeight": "33px",
            }
        }, "#footercarousel");
        /****** 底部即时消息轮播结束 ******/
        /****** 左侧开始 ******/
        this.coms.borderCom = new borderCom({
            borderStyle: "s2"
        }, "#leftBorder");
        
        this.coms.borderCom = new borderCom({
            borderStyle: "s2"
        }, "#bgBorderMB"); 
        this.coms.titleCom = new titleCom({
            dataType: "static",
            title: '点击查看填报模板',
            itemStyle: {
                "display": "flex",
                "align-items": "center",
                "justify-content": "center",
                "color": "#fff",
                "font-weight": "normal",
                "font-family": "tahoma, Arial, sans-serif",
                "font-size": "16px"

            }
        }, "#titleMB");
       /*  this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style12"
        }, "#leftBorderBackground"); */
        this.coms.tagCom = this.factory(tagCom, {
            data: [{
                url: 's1.png',
                title: '省级单位申报数'
            },
                {
                    url: 's2.png',
                    title: '合作单位分布'
                }, {
                    url: 's3.png',
                    title: '试用单位分布'
                }, {
                    url: 's4.png',
                    title: '近三年列装总量统计'
                }, {
                    url: 's5.png',
                    title: '近三年手段列装统计'
                }, {
                    url: 's6.png',
                    title: '试用数量统计'
                }, {
                    url: 's7.png',
                    title: '试用通过率统计'
                }, {
                    url: 's8.png',
                    title: '省级单位申报统计'
                }, {
                    url: 's10.png',
                    title: '器材信息模板栏'
                }/* , {
                    url: 's9.png',
                    title: '模板栏'
                } */]
        }, "#list");
        /****** 左侧结束 ******/
        /****** 右侧开始 ******/
        
        this.coms.legendIndexCom = this.factory(legendIndexCom, {
            itemStyle: {
                color: "#fff",
                fontSize: "20px"
            },
            data: [
                {
                    data: []
                }, {
                    data: []
                }, {
                    data: []
                }, {
                    data: []
                }, {
                    data: []
                }, {
                    data: [
                        {
                            content:'试用器材数',
                            className:'rectangle'
                        }, {
                            content: '通过数',
                            className: 'rectangle1'
                        }, {
                            content: '不通过数',
                            className: 'rectangle2'
                        }
                    ]
                }, {
                    data: []
                }, {
                    data: []
                }, {
                    data: []
                }, {
                    data: []
                }, {
                    data: []
                }, {
                    data: []
                }, {
                    data: []
                }, {
                    data: []
                }, {
                    data: []
                }, {
                    data: []
                }
            ],
            
        }, "#legend");
        this.coms.titleIndexCom = this.factory(titleIndexCom,{
            itemStyle:{
                color:"#fff",
                fontSize:"26px"
            },
            seePersonType: "other",
           data:[{
               content:'全国省级单位申报数量及分布图'
                },{
                   content: '参与列装的合作单位数量及分布图'
                }, {
                   content: '试用单位分布图'
                }, {
                   content: '近三年列装数量及数据总量统计'
                }, {
                   content: '近三年各手段申报列装器材统计'
                }, {
                   content: '全国各试用单位使用情况统计图'
                }, {
                   content: '全国各试用单位使用情况通过率统计'
                }, {
                   content: '全国省级单位申报数量排名前七的申报情况—申报总量情况'
                }, {
                   content: '全国省级单位申报数量排名前七的申报情况—931/2/4申报情况'
                }, {
                   content: '全国省级单位申报数量排名前七的申报情况—933申报情况'
                }, {
                   content: '全国省级单位申报数量排名前七的申报情况—935申报情况'
                }, {
                   content: '全国省级单位申报数量排名前七的申报情况—936申报情况'
                }, {
                   content: '全国省级单位申报数量排名前七的申报情况—937申报情况'
                }, {
                   content: '全国省级单位申报数量排名前七的申报情况—其他申报情况'
                },/*  {
                   content: '模板栏'
                }, */ {
                   content: '器材信息模板栏'
                }
        ]
        }, "#tagTitle");
        this.coms.borderCom = new borderCom({
            borderStyle: "s2"
        }, "#centerBorder");
        this.coms.eventSliderCom = this.factory(eventSliderCom, {
            blockCount: 15
        }, "#eventSilderDemo")
        var barPanel0 = this.coms.eventSliderCom.getContent(0);
        this.coms.sliderImgCom0 = this.factory(imgCom, {
            dataType: "static",
            sliderIndex: 0,
            url:"sjdwsbsltNew.png",//url
            inSilder: true,
            showTime: 8000
        }, barPanel0);
        this.coms.eventSliderCom.addCom(this.coms.sliderImgCom0, 0);

        var barPanel1 = this.coms.eventSliderCom.getContent(1);
        this.coms.sliderImgCom1 = this.factory(imgCom, {
            dataType: "static",
            sliderIndex: 1,
            url:"cyhzdwNew.png",//url
            inSilder: true,
            showTime: 8000
        }, barPanel1);
        this.coms.eventSliderCom.addCom(this.coms.sliderImgCom1, 1);

        var barPanel2 = this.coms.eventSliderCom.getContent(2);
        this.coms.sliderImgCom2 = this.factory(imgCom, {
            dataType: "static",
            sliderIndex: 2,
            url:"sydwfbtNew.png",//url
            inSilder: true,
            showTime: 8000
        }, barPanel2);
        this.coms.eventSliderCom.addCom(this.coms.sliderImgCom2, 2);
        /* 近三年列装数量统计开始 */
        var barPanel3 = this.coms.eventSliderCom.getContent(3);
        this.coms.sliderBarCom3= this.factory(barLineCom, {
            inSilder: true,
            showTime: 8000,
            sliderIndex: 3,
            dataType: "api",
            data: baseUrl.getThreeYearDeclareData,
            showLegend: true,
            showDataLabel: true,
            dataLabelStyle: {
                fontSize: 20
            },
            gridOption:{
                right: '196'
            },
            legendOption: {
                textStyle: {
                    fontSize: 20,
                    color: "#fff"
                }
            },        
            xAxisOption: [{
                axisLabel: {
                    textStyle: {
                        fontSize: 20
                    }
                }
                
               
            }],
            yAxisOption: [{
                axisLabel: {
                    textStyle: {
                        fontSize: 20
                    }
                },
                axisLine: {
                    show: true,
                    symbol: ['none', 'arrow']
                },
                type: 'value',
                name: "申报数(个)",
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol:['none', 'arrow']
                },
                splitLine: {
                    show: false
                }
            }, {
                type: 'value',
                name: "数据量(GB)",
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol: ['none', 'arrow']

                },
                splitLine: {
                    show: false
                },
                max:140
            }],
            brokenLine:{
                lineStyle: {
                    width: 3
                },
                symbolSize: [10,10]
            }
            
        }, barPanel3);
        this.coms.eventSliderCom.addCom(this.coms.sliderBarCom3, 3);
        /* 近三年列装数量统计结束 */
        /* 近三年手段列装统计开始 */
        var barPanel4 = this.coms.eventSliderCom.getContent(4);
        this.coms.sliderBarCom4 = this.factory(barCom, {
            sliderIndex: 4,
            showTime: 8000,
            dataType: "api",
            data: baseUrl.getThreeYearMeansDeclareData,
            gridOption:{
                bottom: '52'
            },
            inSilder: true,
            showLegend: true,
            xAxisOption: {
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol:['none','arrow']
                }
            },
            yAxisOption: {
                name: "申报数(个)",
                nameTextStyle:{
                    fontSize:20
                },
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol: ['none', 'arrow']
                }
            }
        }, barPanel4);
        this.coms.eventSliderCom.addCom(this.coms.sliderBarCom4, 4);
        /* 近三年手段列装统计结束 */
        
        /* 试用数量统计开始 */
        var linePanel5 = this.coms.eventSliderCom.getContent(5);
        this.coms.carouselEchartCom5 = this.factory(carouselEchartCom, {
            inSilder: true,
            sliderIndex: 5,
            height: "2800",
            marqueeStep: 1,
            rollingType: "wait",
            echartsOptions: {
                dataType: "api",
                data: baseUrl.getTrialStatus,
                poll: false,
                showDataLabel: true,
                dataLabelStyle:{
                    fontSize:20,
                    color:"#fff"
                }
            }
        }, linePanel5);
        this.coms.eventSliderCom.addCom(this.coms.carouselEchartCom5, 5);
        /* 试用数量统计结束 */
        /* 试用通过率统计开始 */
        var linePanel6 = this.coms.eventSliderCom.getContent(6);
        this.coms.projectOrderComLine6 = this.factory(projectOrderComLine, {
            dataType: "api",
            inSilder: true,
            sliderIndex: 6,
            showTime: 8000,
            data: baseUrl.getTrialPassStatus,
            showLegend: false,
            gridOption:{
                bottom: '72',
            },
            yAxisOption: {
                name: "通过率(%)",
                nameTextStyle:{
                    fontSize:20
                },
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol: ['none', 'arrow']
                }
            
            },
            xAxisOption: {
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol: ['none', 'arrow']
                }

            },
            brokenLine: {
                lineStyle: {
                    width: 3
                },
                symbolSize: [10, 10]
            }
            
        }, linePanel6);
        this.coms.eventSliderCom.addCom(this.coms.projectOrderComLine6, 6);
        /* 试用通过率统计结束 */
        /* 申报总量统计开始 */
        var barPanel7 = this.coms.eventSliderCom.getContent(7);
        this.coms.sliderBarCom7 = this.factory(barCom, {
            sliderIndex: 7,
            showTime: 8000,
            dataType: "api",
            data: baseUrl.getProvinceUnitAll,
            inSilder: true,
            showLegend: true,
            xAxisOption: {
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol: ['none', 'arrow']
                    
                }
            },
            yAxisOption: {
                name: "申报数(个)",
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol: ['none', 'arrow']
                }
            }
        }, barPanel7);
        this.coms.eventSliderCom.addCom(this.coms.sliderBarCom7, 7);
        /* 申报总量统计结束 */
        

        /* 93124申报情况开始 */
        var barPanel8 = this.coms.eventSliderCom.getContent(8);
        this.coms.sliderBarCom8 = this.factory(barCom, {
            sliderIndex: 8,
            showTime: 8000,
            dataType: "api",
            data: baseUrl.getProvinceUnit124,
            inSilder: true,
            showLegend: true,
            xAxisOption: {
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol: ['none', 'arrow']
                }
            },
            yAxisOption: {
                name: "申报数(个)",
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol: ['none', 'arrow']
                    
                }
            }
        }, barPanel8);
        this.coms.eventSliderCom.addCom(this.coms.sliderBarCom8, 8);
        /* 93124申报情况结束 */
        /* 933申报情况开始 */
        var barPanel9 = this.coms.eventSliderCom.getContent(9);
        this.coms.sliderBarCom9 = this.factory(barCom, {
            sliderIndex: 9,
            showTime: 8000,
            dataType: "api",
            data: baseUrl.getProvinceUnit3,
            inSilder: true,
            showLegend: true,
            xAxisOption: {
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol: ['none', 'arrow']
                }
            },
            yAxisOption: {
                name: "申报数(个)",
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol: ['none', 'arrow']
                }
            }
        }, barPanel9);
        this.coms.eventSliderCom.addCom(this.coms.sliderBarCom9, 9);
        /* 933申报情况结束 */
        /* 935申报情况开始 */
        var barPanel10 = this.coms.eventSliderCom.getContent(10);
        this.coms.sliderBarCom10 = this.factory(barCom, {
            sliderIndex: 10,
            showTime: 8000,
            dataType: "api",
            data: baseUrl.getProvinceUnit5,
            inSilder: true,
            showLegend: true,
            xAxisOption: {
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol: ['none', 'arrow']
                }
            },
            yAxisOption: {
                name: "申报数(个)",
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol: ['none', 'arrow']
                }
            }
        }, barPanel10);
        this.coms.eventSliderCom.addCom(this.coms.sliderBarCom10, 10);
        /* 935申报情况结束 */
        /* 936申报情况开始 */
        var barPanel11 = this.coms.eventSliderCom.getContent(11);
        this.coms.sliderBarCom11 = this.factory(barCom, {
            sliderIndex: 11,
            showTime: 8000,
            dataType: "api",
            data: baseUrl.getProvinceUnit6,
            inSilder: true,
            showLegend: true,
            xAxisOption: {
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol: ['none', 'arrow']
                }
            },
            yAxisOption: {
                name: "申报数(个)",
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol: ['none', 'arrow']
                }
            }
        }, barPanel11);
        this.coms.eventSliderCom.addCom(this.coms.sliderBarCom11, 11);
        /* 936申报情况结束 */
        /* 937申报情况开始 */
        var barPanel12 = this.coms.eventSliderCom.getContent(12);
        this.coms.sliderBarCom12 = this.factory(barCom, {
            sliderIndex: 12,
            showTime: 8000,
            dataType: "api",
            data: baseUrl.getProvinceUnit7,
            inSilder: true,
            showLegend: true,
            xAxisOption: {
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol: ['none', 'arrow']
                }
            },
            yAxisOption: {
                name: "申报数(个)",
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol: ['none', 'arrow']
                }
            }
        }, barPanel12);
        this.coms.eventSliderCom.addCom(this.coms.sliderBarCom12, 12);
        /* 937申报情况结束 */
        /* 其他申报情况开始 */
        var barPanel13 = this.coms.eventSliderCom.getContent(13);
        this.coms.sliderBarCom13 = this.factory(barCom, {
            sliderIndex: 13,
            showTime: 8000,
            dataType: "api",
            data: baseUrl.getProvinceUnitOther,
            inSilder: true,
            showLegend: true,
            xAxisOption: {
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol: ['none', 'arrow']
                }
            },
            yAxisOption: {
                name: "申报数(个)",
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    },
                    symbol: ['none', 'arrow']
                }
            }
        }, barPanel13);
        this.coms.eventSliderCom.addCom(this.coms.sliderBarCom13, 13);
        /* 其他申报情况结束 */
        /* 模板开始 */
        /* var carousePanel = this.coms.eventSliderCom.getContent(14);
        this.coms.sliderCarouselCom = this.factory(carouselCom, {
            dataType: "static", */
            /*  data: baseUrl.getObjectOrder1, */
           /*  data: [{
                url: "images/text.png"
            }],
            inSilder: true,
            sliderIndex: 14,
            rollingType: "wait",
            poll: false,
            timeout: 5000,
            // marqueeStep:1,
            marqueeTimeout: 16,
            carouselType: "img",
            innerStyle: {
                "fontSize": "24px",
                "color": "#fff",
                "lineHeight": "28px",
            }
        }, carousePanel);
        this.coms.eventSliderCom.addCom(this.coms.sliderCarouselCom, 14); */
        /* 模板结束 */
        /* 模板开始 */
        var carousePanel14 = this.coms.eventSliderCom.getContent(14);
        this.coms.sliderCarouselCom14 = this.factory(carouselCom, {
            dataType: "static",
            /*  data: baseUrl.getObjectOrder1, */
            data: [{
                url: "syhh02.png"
            }],
            inSilder: true,
            sliderIndex: 14,
            rollingType: "wait",
            poll: false,
            timeout: 5000,
            marqueeStep:1,
            marqueeTimeout: 16,
            carouselType: "img",
            imgWidth:'100%',
            innerStyle: {
                "fontSize": "24px",
                "color": "#fff",
                "lineHeight": "28px",
            }
        }, carousePanel14);
        this.coms.eventSliderCom.addCom(this.coms.sliderCarouselCom14, 14);
        /* 模板结束 */



        this.coms.eventSliderCom.showBlock(0);

        /****** 右侧结束 ******/
        /****** 模板弹窗结束 ******/
        this.coms.modal = new modalCom({
            children: [
                {
                    itemStyle: {
                        position: "absolute",
                        top: "100px",
                        left: "200px",
                        bottom: "100px",
                        right: "200px"
                    },
                    itemType: "carousel",
                    itemOptions: {
                        dataType: "static",
                        /*  data: baseUrl.getObjectOrder1, */
                        data: [{
                            url: "y13.png"
                        }],
                        rollingType: "seamlessWithBlank",
                        poll: false,
                        timeout: 5000,
                        marqueeTimeout: 16,
                        carouselType: "img",
                        BlankHeight: 500,
                        isRoll:'yes',
                        imgWidth: '65%',
                        innerStyle: {
                            "fontSize": "24px",
                            "color": "#fff",
                            "lineHeight": "28px",
                        }
                    }
                }
            ]
        }, "#modal");
        /****** 模板弹窗结束 ******/

        this.bindEvent();
    },
    load: function () {

    },
    render: function (data) {
        var self = this;
    },
    bindEvent: function () {
        $(window).on("resize", this.resize.bind(this));
    },
    destroy: function () { },
    computeSize: function () {
        var screenW = globalVar.screenSize.width,
            screenH = globalVar.screenSize.height,
            bodyW = $(window).width(),
            bodyH = $(window).height();
        $("body").css({
            width: screenW + "px",
            height: screenH + "px"
        })
        var scaleW = bodyW / screenW;
        var scaleH = bodyH / screenH;
        $("body").css({
            transform: "scale(" + scaleW + "," + scaleH + ")",
            transformOrigin: "left top"
        })
    },
    resize: function () {
        this.computeSize();
    }
})

$(function () {
    new bigScreenIndex()
})