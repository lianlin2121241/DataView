/*
 * @Author: limingle
 * @Date:   2017-12-26 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2018-01-11 16:20:32
 */

'use strict';

var bigScreenIndex = Container.extends({
    init: function () {
        var self = this;
        this.computeSize();


        /****** 头部开始 ******/
       /*  this.coms.titleCom = new titleCom({
            dataType: "static",
            title: '2018年度公安技侦专用器材列装评审会',
            itemStyle: {
                "display": "flex",
                "align-items": "center",
                "justify-content": "center",
                "color": "rgb(255, 255, 255)",
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
        /****** 头部结束 ******/
        /****** 左侧开始 ******/
        this.coms.titleCom = new titleCom({
            dataType: "static",
            title: '信息栏',
            itemStyle: {
                "display": "flex",
                "align-items": "center",
                "justify-content": "center",
                "color": "rgb(255, 255, 255)",
                "font-weight": "normal",
                "font-family": "tahoma, Arial, sans-serif",
                "font-size": "26px"

            }
        }, "#leftTitle");
        this.coms.borderCom = new borderCom({
            borderStyle: "s2"
        }, "#leftBorder"); 
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style8"
        }, "#leftBorderBackground"); 
        this.coms.borderCom = new borderCom({
            borderStyle: "s2"
        }, "#messageCarouselBorder");
        this.coms.carouselCom = new carouselCom({
            dataType: "api",
            data: baseUrl.getAllNotice,
            poll: true,
            timeout: 10000,
            marqueeStep:1,
            innerStyle: {
                color:"#fff",
                fontSize:"20px"
            },
            rollingType: "seamless",  //"seam","seamless","wait"
            carouselType: "other",//"other","img"
            waitTime: 2000,
        }, "#messageCarousel");
        /****** 左侧结束 ******/
        /****** 右侧开始 ******/
        
        this.coms.titleIndexCom = this.factory(titleIndexCom,{
            itemStyle:{
                color:"#fff",
                fontSize:"26px"
            },
            seePersonType: "CS",
           data:[{
               content:'全国省级单位申报数量及分布图'
                },{
                   content: '合作单位分布'
                }, {
                   content: '试用单位分布图'
                }, {
                   content: '近三年列装总量统计'
                }, {
                   content: '近三年手段列装统计'
                }, {
                   content: '试用数量统计'
                }, {
                   content: '试用通过率统计'
                }, {
                   content: '申报总量情况'
                }, {
                   content: '93124申报情况'
                }, {
                   content: '933申报情况'
                }, {
                   content: '935申报情况'
                }, {
                   content: '936申报情况'
                }, {
                   content: '937申报情况'
                }, {
                   content: '其他申报情况'
                }, {
                   content: '填报模板栏'
                }, {
                   content: '器材信息模板栏'
                }
        ]
        }, "#tagTitle");
        this.coms.borderCom = new borderCom({
            borderStyle: "s2"
        }, "#centerBorder");
        this.coms.eventSliderCom = this.factory(eventSliderCom, {
            blockCount: 3
        }, "#eventSilderDemo")
        var barPanel = this.coms.eventSliderCom.getContent(0);
        this.coms.sliderImgCom = this.factory(imgCom, {
            dataType: "static",
            sliderIndex: 0,
            url:"sjdwsbsltNew.png",//url
            inSilder: true,
            showTime: 8000
        }, barPanel);
        this.coms.eventSliderCom.addCom(this.coms.sliderImgCom, 0);
        var barPanel = this.coms.eventSliderCom.getContent(1);
        this.coms.sliderImgCom = this.factory(imgCom, {
            dataType: "static",
            sliderIndex: 1,
            url: "sydwfbtNew.png",//url
            inSilder: true,
            showTime: 8000
        }, barPanel);
        this.coms.eventSliderCom.addCom(this.coms.sliderImgCom, 1);
        /* 模板开始 */
        var carousePanel = this.coms.eventSliderCom.getContent(2);
        this.coms.sliderCarouselCom = this.factory(carouselCom, {
            dataType: "static",
            /*  data: baseUrl.getObjectOrder1, */
            data: [{
                url: "y13.png"
            }],
            inSilder: true,
            sliderIndex: 2,
            rollingType: "wait",
            poll: false,
            timeout: 5000,
            marqueeStep:1,
            carouselType: "img",
            innerStyle: {
                "fontSize": "24px",
                "color": "#fff",
                "lineHeight": "28px",
            }
        }, carousePanel);
        this.coms.eventSliderCom.addCom(this.coms.sliderCarouselCom, 2);
        /* 模板结束 */
        



        this.coms.eventSliderCom.showBlock(0);

        /****** 右侧结束 ******/


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