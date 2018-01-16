/*
 * @Author: limingle
 * @Date:   2017-12-26 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2018-01-12 16:29:27
 */

'use strict';

var bigScreenIndex = Container.extends({
    init:function(){
        var self = this;
        this.computeSize();
        this.coms.barCom = new barHorCom({
            dataType:"api",
            data:baseUrl.getObjectOrder,
            poll:false,
            timeout:5000,
            showDataLabel:true
        }, "#objectOrder");
        this.coms.barCom = this.factory(barLineCom,{
            dataType:"api",
            data:baseUrl.getThreeYearDeclareData,
            /* data:[{
                name:"项目11",
                value:24,
                legend:"今年"
            },{
                name:"项目11",
                value:14,
                legend:"去年",
                secondAxis:1
            },{
                name:"项目12",
                value:12,
                legend:"去年",
                secondAxis:1
            },{
                name:"项目12",
                value:13,
                legend:"今年"
            },{
                name:"项目13",
                value:18,
                legend:"去年",
                secondAxis:1
            },{
                name:"项目13",
                value:19,
                legend:"今年"
            }], */
            showLegend:true,
            showDataLabel:true,
            dataLabelStyle:{
                fontSize:20
            },
            yAxisOption:[{
                type : 'value',
                name:"申报量(个)",
                axisLine:{
                    show:true,
                    lineStyle:{
                        color:"#fff"
                    }
                },
                splitLine:{
                    show:false
                }
            },{
                type : 'value',
                name:"数据量(Gb)",
                axisLine:{
                    show:true,
                    lineStyle:{
                        color:"#fff"
                    }
                },
                splitLine:{
                    show:false
                }
            }]
        }, "#objectOrder1");
        
        /* this.coms.sliderCom = new sliderCom({
            dataType:"static",
            data:[{
                text:"周杰伦",
                url:"1.jpg"
            },{
                text:"周杰伦",
                url:"2.jpg"
            },{
                text:"周杰伦",
                url:"3.jpg"
            },{
                text:"周杰伦",
                url:"4.jpg"
            },{
                text:"周杰伦",
                url:"5.jpg"
            },{
                text:"周杰伦",
                url:"6.jpg"
            }],
            imageLoopOption:{
                isLibs: true, //是否创建底部小圆点(样式均可自定义调整),默认向lib添加单独类名，详情见调用后dom结构
                isArrows: true, //是否创建左右箭头(样式均可自定义调整)
                autoPlay: true, //是否自动播放
                playTime: 2000, //自动播放间隔时间
                playSpeed: 700, //图片切换速度 
                effect: 'left' //轮播的改变方式 top(向上) left(向左) fade(淡入淡出)
            },
        }, "#silderDemo"); */
        
        this.coms.borderCom = new borderCom({
            borderStyle:"s4"
        }, "#borderDemo");

        
        this.coms.modal1 = new modalCom({
            children:[
                {
                    itemStyle:{
                        position:"absolute",
                        top:"100px",
                        left:"100px",
                        bottom:"100px",
                        right:"100px"
                    },
                    itemType:"bar",
                    itemOptions:{
                        dataType:"api",
                        data:baseUrl.getObjectOrder,
                        poll:true,
                        timeout:5000
                    }
                }
            ] 
        }, "#modal1");
        
        this.coms.titleCom = new titleCom({
            dataType: "static",
            title:'体重',
            itemStyle:{
                "fontSize": "14px",
                "color": "#fff",
                "textAlign":"center"

            }
        },"#title");
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
                /* backgroundSize:"cover" */
            },
            borderType: "style3"
        },"#bgBorderModule");
        this.coms.carouselCom = new carouselCom({
            dataType: "static",
            data: [
                {
                    name: "项目13",
                    value: 18,
                }, {
                    name: "项目13",
                    value: 19,
                }, {
                    name: "项目13",
                    value: 18,
                }, {
                    name: "项目13",
                    value: 19,
                }, {
                    name: "项目13",
                    value: 18,
                }, {
                    name: "项目13",
                    value: 19,
                }, {
                    name: "项目13",
                    value: 18,
                }, {
                    name: "项目13",
                    value: 19,
                }, {
                    name: "项目13",
                    value: 18,
                }, {
                    name: "项目13",
                    value: 19,
                }, {
                    name: "项目13",
                    value: 18,
                }, {
                    name: "项目13",
                    value: 19,
                }, {
                    name: "项目13",
                    value: 18,
                }, {
                    name: "项目13",
                    value: 19,
                }
            ],
            poll: false,
            timeout: 5000
        }, "#carouselList");
        
        this.coms.carouselCom = new carouselCom({
            dataType: "api",
            data: baseUrl.getAllNotice,
            rollingType:"seamless",
            poll: true,
            timeout: 5000,
            innerStyle:{
                "fontSize":"14px",
                "color":"#fff",
                "lineHeight":"28px",
            }
        }, "#carouselListApi");
       
        this.coms.projectOrderCom = new projectOrderComPic({
        	dataType: "static",
            seriesItemsOption: [{
                name: '',
                type: 'pie',
                radius: '80%',//饼图半径
                center: ['50%', '50%'],//饼图位置
                label: {//饼图标签设置（位置、字体大小、颜色）
                    normal: {
                        position: 'center bottom',
                        textStyle: {
                            fontSize: 8,
                            color: '#fff'
                        }
                    }

                }, 
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: '#fff'
                        },
                        smooth: 0.2,
                        length: 10,
                        length: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'red',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0,0,0,0.5)'
                    }
                },
                data: [{
        		name: "项目21",
        		value:10,
        	},{
        		name: "项目22",
        		value:28,
        	},{
        		name: "项目23",
        		value:40,
        	},{
        		name: "项目24",
        		value:56,
        	},{
        		name: "项目25",
        		value:23,
        	},{
        		name: "项目26",
        		value:30,
        	},{
        		name: "项目27",
        		value:34,
        	},{
        		name: "项目28",
        		value:28,
        	}]
            }]
        }, "#objectOrder2");
	
        this.coms.projectOrderCom = new projectOrderComLine({
        	dataType: "static",
        	data: [{
        		name: "项目21",
        		value:10,
        	},{
        		name: "项目22",
        		value:28,
        	},{
        		name: "项目23",
        		value:40,
        	},{
        		name: "项目24",
        		value:56,
        	},{
        		name: "项目25",
        		value:23,
        	},{
        		name: "项目26",
        		value:30,
        	},{
        		name: "项目27",
        		value:34,
        	},{
        		name: "项目28",
        		value:28,
        	}],
        	tooltipTrigger:"axis", //""||"axis"
            lineColor:"#a00",   //折现颜色
            xLineColor:"#fff", //x轴线颜色
            yLineColor:"#fff",  //y轴线颜色
            xFontSize: 12,
            yFontSize: 12,
            xDeg: -45,
            yDeg: 0
        }, "#objectOrder3");
        this.coms.projectOrderDate = this.factory(projectOrderDate,{
        	innerStyle:{
        		fontSize:26,
        		color: '#fff'
        	}
        },"#objectOrder4");
   /*      this.coms.projectOrderDate = new mapCom({
        	dataType: "static",
        	data: [{
        		name:'北京',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'天津',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'上海',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'重庆',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'河北',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'河南',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'云南',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'辽宁',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'黑龙江',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'湖南',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'安徽',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'山东',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'新疆',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'江苏',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'浙江',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'江西',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'湖北',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'广西',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'甘肃',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'山西',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'内蒙古',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'陕西',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'吉林',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'福建',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'贵州',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'广东',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'青海',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'西藏',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'四川',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'宁夏',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'海南',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'台湾',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'香港',
        		value: Math.round(Math.random()*1000)
        	},{
        		name:'澳门',
        		value: Math.round(Math.random()*1000)
        	}],
        	name: "地图",
            inRangeColor: ['#9ddbe8','#6a9fea','#6a8dea'], //地图颜色
            textColor: "#fff", //地图省份文字颜色
            pointerColor: "#fff", //地图上点的颜色
            borderColor: "#fff", //边框颜色
            textPosition: "left", //地图省份文字相对点的位置
            dataRange: [0, 2500], //数值范围
            dataRangeText: ["高","低"], 
            dataRangePosition: ["left","bottom"],
            dataRangeTextColor:"#333"
        },"#map"); */

        this.coms.eventSliderCom=this.factory(eventSliderCom,{
            blockCount:4
        },"#eventSilderDemo")
        var barPanel=this.coms.eventSliderCom.getContent(0);
        this.coms.sliderBarCom = this.factory(barCom,{
            dataType:"api",
            data:baseUrl.getThreeYearMeansDeclareData,
            inSilder:true,
            showLegend:true,
            showDataLabel:true,
            dataLabelStyle:{
                fontSize:20
            },
            xAxisOption:{
                axisLine:{
                    lineStyle:{
                        color:"#fff"
                    }
                }
            },
            yAxisOption:{
                name:"申报量(个)",
                axisLine:{
                    lineStyle:{
                        color:"#fff",
                        width:3,
                        shadowBlur:10,
                        shadowColor:'rgba(0,0,0,.5)'
                    }
                }
            }
        }, barPanel);
        this.coms.eventSliderCom.addCom(this.coms.sliderBarCom,0);
        
        var carousePanel=this.coms.eventSliderCom.getContent(1);
        this.coms.sliderCarouselCom =this.factory(carouselCom,{
            dataType: "api",
            data: baseUrl.getAllNotice,
            inSilder:true,
            sliderIndex:1,
            rollingType:"wait",
            poll: true,
            timeout: 5000,
            marqueeTimeout:8,
            innerStyle:{
                "fontSize":"14px",
                "color":"#fff",
                "lineHeight":"28px",
            }
        }, carousePanel);
        this.coms.eventSliderCom.addCom(this.coms.sliderCarouselCom,1);
        
        var linePanel=this.coms.eventSliderCom.getContent(2);
        this.coms.eventLineCom =this.factory(projectOrderComLine,{
        	dataType: "api",
            inSilder:true,
            sliderIndex:2,
        	data: baseUrl.getTrialPassStatus,
        	tooltipTrigger:"axis", //""||"axis"
            lineColor:"#a00",   //折现颜色
            xLineColor:"#fff", //x轴线颜色
            yLineColor:"#fff",  //y轴线颜色
            xFontSize: 12,
            yFontSize: 12,
            xDeg: -45,
            yDeg: 0
        }, linePanel);
        this.coms.eventSliderCom.addCom(this.coms.eventLineCom,2);
        
        var linePanel=this.coms.eventSliderCom.getContent(3);
        this.coms.eventLineCom =this.factory(carouselEchartCom,{
            inSilder:true,
            sliderIndex:3,
            height:"1600",
            rollingType:"wait",
            echartsOptions:{
                dataType: "api",
                data: baseUrl.getTrialStatus,
                poll:false,
                showDataLabel:true
            }
        }, linePanel);
        this.coms.eventSliderCom.addCom(this.coms.eventLineCom,3);
        
        this.coms.eventSliderCom.showBlock(0);

        this.coms.tagCom = this.factory(tagCom, {
            data: [
                {
                    url: '../app/images/border/s1.png',
                    title: '我是第二条数据'
                },{
                    url: '../app/images/border/s3.png',
                    title: '我是第三条数据'
                }, {
                    url: '../app/images/border/s4.png',
                    title: '我是第四条数据'
                }, {
                    url: '../app/images/border/s5.png',
                    title: '我是第五条数据'
                }]
        }, "#list");
	
        this.bindEvent();
    },
    load:function(){

    },
    render:function(data){
    	var self = this;
    },
    bindEvent:function(){
        $(window).on("resize",this.resize.bind(this));
    },
    destroy:function(){},
    computeSize:function(){
        var screenW=globalVar.screenSize.width,
            screenH=globalVar.screenSize.height,
            bodyW=$(window).width(),
            bodyH=$(window).height();
        $("body").css({
            width:screenW+"px",
            height:screenH+"px"
        })
        var scaleW=bodyW/screenW;
        var scaleH=bodyH/screenH;
        $("body").css({
            transform:"scale("+scaleW+","+scaleH+")",
            transformOrigin: "left top"
        })
    },
    resize:function(){
        this.computeSize();
    }
})

$(function(){
    new bigScreenIndex()
})