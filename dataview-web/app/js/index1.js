/*
 * @Author: limingle
 * @Date:   2017-12-26 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2018-01-02 17:29:49
 */

'use strict';

var bigScreenIndex = Container.extends({
    init:function(){
        var self = this;
        this.computeSize();
        /* this.coms.barCom = new barCom({
            dataType:"api",
            data:baseUrl.getObjectOrder,
            poll:true,
            timeout:5000
        }, "#objectOrder"); */
        /* this.coms.barCom = new barCom({
            dataType: "api",
            data: baseUrl.getObjectOrder,
            poll: true,
            timeout: 5000
        }, "#cartogram1"); */
        this.coms.barCom = new barCom({
            dataType: "api",
            data: baseUrl.getObjectOrder,
            poll: true,
            timeout: 5000,
            showLegend: true,
            xAxisOption: {
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    }
                }
            },
            yAxisOption: {
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    }
                }
            }
        }, "#objectOrder23"); 
        this.coms.barCom = new barCom({
            dataType: "api",
            data: baseUrl.getObjectOrder,
            poll: true,
            timeout: 5000
        }, "#objectOrder32");
        this.coms.barCom = new barCom({
            dataType: "api",
            data: baseUrl.getObjectOrder,
            poll: true,
            timeout: 5000
        }, "#objectOrder33");
       this.coms.barCom = new barCom({
            dataType:"static",
            data:[{
                name:"项目11",
                value:14,
                legend:"去年"
            },{
                name:"项目12",
                value:12,
                legend:"去年"
            },{
                name:"项目12",
                value:13,
                legend:"今年"
            },{
                name:"项目11",
                value:24,
                legend:"今年"
            },{
                name:"项目13",
                value:18,
                legend:"去年"
            },{
                name:"项目13",
                value:19,
                legend:"今年"
            }],
            showLegend:true,
            xAxisOption:{
                axisLine:{
                    lineStyle:{
                        color:"#fff"
                    }
                }
            },
            yAxisOption:{
                axisLine:{
                    lineStyle:{
                        color:"#fff"
                    }
                }
            }
        }, "#objectOrder1");
        
        this.coms.sliderCom = new sliderCom({
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
            }]
        }, "#silderDemo");

        
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
        this.coms.modal2 = new modalCom({
            children: [
                {
                    itemStyle: {
                        position: "absolute",
                        top: "100px",
                        left: "100px",
                        bottom: "100px",
                        right: "100px"
                    },
                    itemType: "carousel",
                    itemOptions: {
                        dataType: "api",
                        data: baseUrl.getObjectOrder,
                        poll: true,
                        timeout: 5000
                    }
                }
            ]
        }, "#modal2");
       /*  this.coms.modal2 = new modalCom({
            children: [
                {
                    itemStyle: {
                        position: "absolute",
                        top: "100px",
                        left: "100px",
                        bottom: "100px",
                        right: "100px"
                    },
                    itemType: "bar",
                    itemOptions: {
                        dataType: "api",
                        data: baseUrl.getObjectOrder,
                        poll: true,
                        timeout: 5000
                    }
                }
            ]
        }, "#modal2"); */
        
        this.coms.titleCom = new titleCom({
            dataType: "static",
            title:'2342',
            itemStyle:{
                "display": "flex",
                "align-items": "center",
                "justify-content": "center",
                "color": "rgb(255, 255, 255)",
                "font-weight": "normal",
                "font-family": "tahoma, Arial, sans-serif",
                "font-size": "40px"

            }
        },"#title");
        this.coms.titleCom = new titleCom({
            dataType: "static",
            title: '年底损耗情况',
            itemStyle: {
                "display": "flex",
                "align-items": "center",
                "justify-content": "left",
                "color": "rgb(255, 255, 255)",
                "font-weight": "normal",
                "font-family": "tahoma, Arial, sans-serif",
                "font-size": "14px"

            }
        }, "#title1"); 
        this.coms.titleCom = new titleCom({
            dataType: "static",
            title: '柱状图',
            itemStyle: {
                "display": "flex",
                "align-items": "center",
                "justify-content": "left",
                "color": "rgb(255, 255, 255)",
                "font-weight": "normal",
                "font-family": "tahoma, Arial, sans-serif",
                "font-size": "14px"

            }
        }, "#title1-1");
        this.coms.titleCom = new titleCom({
            dataType: "static",
            title: '玫瑰图',
            itemStyle: {
                "display": "flex",
                "align-items": "center",
                "justify-content": "left",
                "color": "rgb(255, 255, 255)",
                "font-weight": "normal",
                "font-family": "tahoma, Arial, sans-serif",
                "font-size": "14px"

            }
        }, "#title22"); 
        this.coms.titleCom = new titleCom({
            dataType: "static",
            title: '统计图',
            itemStyle: {
                "display": "flex",
                "align-items": "center",
                "justify-content": "left",
                "color": "rgb(255, 255, 255)",
                "font-weight": "normal",
                "font-family": "tahoma, Arial, sans-serif",
                "font-size": "14px"

            }
        }, "#title23"); 
        this.coms.titleCom = new titleCom({
            dataType: "static",
            title: '折线图',
            itemStyle: {
                "display": "flex",
                "align-items": "center",
                "justify-content": "left",
                "color": "rgb(255, 255, 255)",
                "font-weight": "normal",
                "font-family": "tahoma, Arial, sans-serif",
                "font-size": "14px"

            }
        }, "#title3-1");
        this.coms.titleCom = new titleCom({
            dataType: "static",
            title: '年底损耗情况',
            itemStyle: {
                "display": "flex",
                "align-items": "center",
                "justify-content": "left",
                "color": "#ffffff",
                "font-weight": "normal",
                "font-family": "tahoma, Arial, sans-serif",
                "font-size": "14px"

            }
        }, "#title2-1");
        this.coms.titleCom = new titleCom({
            dataType: "static",
            title: '年底损耗情况',
            itemStyle: {
                "display": "flex",
                "align-items": "center",
                "justify-content": "left",
                "color": "#ffffff",
                "font-weight": "normal",
                "font-family": "tahoma, Arial, sans-serif",
                "font-size": "14px"

            }
        }, "#title2-2");
       /*  function (constructor, options, node) */
        this.coms.tagCom = this.factory(tagCom,{
            data:[]
        }, "#list");
        this.coms.titleCom = new titleCom({
            dataType: "static",
            title: '年底损耗情况',
            itemStyle: {
                "display": "flex",
                "align-items": "center",
                "justify-content": "left",
                "color": "#ffffff",
                "font-weight": "normal",
                "font-family": "tahoma, Arial, sans-serif",
                "font-size": "14px"

            }
        }, "#title2-3");
        this.coms.titleCom = new titleCom({
            dataType: "static",
            title: '宣展厅',
            itemStyle: {
                "display": "flex",
                "align-items": "center",
                "justify-content": "center",
                "color": "rgb(255, 255, 255)",
                "font-weight": "normal",
                "font-family": "tahoma, Arial, sans-serif",
                "font-size": "20px",
                "width":"20px",
                "word-wrap":"break-word",
                "margin-left":"34px"

            }
        }, "#title2");
        this.coms.titleCom = new titleCom({
            dataType: "static",
            title: '表扬栏',
            itemStyle: {
                "display": "flex",
                "align-items": "center",
                "justify-content": "center",
                "color": "rgb(255, 255, 255)",
                "font-weight": "normal",
                "font-family": "tahoma, Arial, sans-serif",
                "font-size": "16px"
            }
        }, "#title3");
        this.coms.titleCom = new titleCom({
            dataType: "static",
            title: '批评栏',
            itemStyle: {
                "display": "flex",
                "align-items": "center",
                "justify-content": "center",
                "color": "rgb(255, 255, 255)",
                "font-weight": "normal",
                "font-family": "tahoma, Arial, sans-serif",
                "font-size": "16px"
            }
        }, "#title4");
        this.coms.titleCom = new titleCom({
            dataType: "static",
            title: '日程安排',
            itemStyle: {
                "display": "flex",
                "align-items": "center",
                "justify-content": "center",
                "color": "rgb(255, 255, 255)",
                "font-weight": "normal",
                "font-family": "tahoma, Arial, sans-serif",
                "font-size": "16px"
            }
        }, "#title5");
        this.coms.titleCom = new titleCom({
            dataType: "static",
            title: '企业面试安排',
            itemStyle: {
                "display": "flex",
                "align-items": "center",
                "justify-content": "center",
                "color": "rgb(255, 255, 255)",
                "font-weight": "normal",
                "font-family": "tahoma, Arial, sans-serif",
                "font-size": "16px"
            }
        }, "#title6");
        /* this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: { */
                /* backgroundSize:"cover" */
            /* },
            borderType: "style2"
        },"#bgBorderModule"); */
       /*  this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: { */
                /* backgroundSize:"cover" */
            /* },
            borderType: "style2"
        }, "#bgBorderModule1"); */
        this.coms.borderCom = new borderCom({
            borderStyle: "s3"
        }, "#bgBorderModule"); 
       
        this.coms.borderCom = new borderCom({
            borderStyle: "s7"
        }, "#bgBorderModule1");
        this.coms.borderCom = new borderCom({
            borderStyle: "s7"
        }, "#bgBorderModule2");
        this.coms.borderCom = new borderCom({
            borderStyle: "s7"
        }, "#bgBorderModule21");
        this.coms.borderCom = new borderCom({
            borderStyle: "s2"
        }, "#bgBorderModule3");
        this.coms.borderCom = new borderCom({
            borderStyle: "s2"
        }, "#bgBorderModule4");
        this.coms.borderCom = new borderCom({
            borderStyle: "s2"
        }, "#bgBorderModule41");
        this.coms.borderCom = new borderCom({
            borderStyle: "s4"
        }, "#bgBorderModule5");
        /* this.coms.borderCom = new borderCom({
            borderStyle: "s6"
        }, "#bgBorderModule6"); */
       /*  this.coms.borderCom = new borderCom({
            borderStyle: "s7"
        }, "#bgBorderModule7"); */
       this.coms.borderCom = new borderCom({
            borderStyle: "s2"
        }, "#bgBorderModule8");
        this.coms.borderCom = new borderCom({
            borderStyle: "s3"
        }, "#bgBorderModule81");
        this.coms.borderCom = new borderCom({
            borderStyle: "s3"
        }, "#bgBorderModule82");
        this.coms.borderCom = new borderCom({
            borderStyle: "s2"
        }, "#bgBorderModule9");
        this.coms.borderCom = new borderCom({
            borderStyle: "s3"
        }, "#bgBorderModule91");
        this.coms.borderCom = new borderCom({
            borderStyle: "s3"
        }, "#bgBorderModule92");
        this.coms.borderCom = new borderCom({
            borderStyle: "s2"
        }, "#bgBorderModule10");
        this.coms.borderCom = new borderCom({
            borderStyle: "s7"
        }, "#bgBorderModule11");
        this.coms.borderCom = new borderCom({
            borderStyle: "s2"
        }, "#bgBorderModule12");
        this.coms.borderCom = new borderCom({
            borderStyle: "s6"
        }, "#bgBorderModule13");
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style12"
        }, "#bgBorder1");
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style11"
        }, "#bgBorderBr"); 
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style7"
        }, "#bgBorder2");
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style12"
        }, "#bgBorder3");
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style7"
        }, "#bgBorder4");
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style8"
        }, "#bgBorder5");
        /* this.coms.borderCom = new borderCom({
            borderStyle: "s9"
        }, "#bgBorderModule9"); */
       /*  this.coms.borderCom = new borderCom({
            borderStyle: "s10"
        }, "#bgBorderModule10");
        this.coms.borderCom = new borderCom({
            borderStyle: "s11"
        }, "#bgBorderModule11");
        this.coms.borderCom = new borderCom({
            borderStyle: "s12"
        }, "#bgBorderModule12"); */

  /*       this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style2"
        }, "#bgBorderModule2");
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style2"
        }, "#bgBorderModule3");
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style2"
        }, "#bgBorderModule4");
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style2"
        }, "#bgBorderModule5");
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style2"
        }, "#bgBorderModule6");
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style2"
        }, "#bgBorderModule7");
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style2"
        }, "#bgBorderModule8");
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style2"
        }, "#bgBorderModule9");
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style2"
        }, "#bgBorderModule10");
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style2"
        }, "#bgBorderModule11");
        this.coms.bgBorderCom = new bgBorderCom({
            itemStyle: {
            },
            borderType: "style2"
        }, "#bgBorderModule12"); */
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
        }, "#carouselList1");
        
        this.coms.carouselCom = new carouselCom({
            dataType: "api",
            data: baseUrl.getObjectOrder1,
            poll: true,
            timeout: 5000,
            innerStyle:{
                "fontSize":"14px",
                "color":"#fff",
                "lineHeight":"28px",
            }
        }, "#carouselListApi");
        this.coms.carouselCom = new carouselCom({
            dataType: "api",
            data: baseUrl.getObjectOrder1,
            poll: true,
            timeout: 5000,
            innerStyle: {
                "fontSize": "14px",
                "color": "#fff",
                "lineHeight": "28px",
            }
        }, "#carouselListApi1");
       
        this.coms.projectOrderCom = new projectOrderComPic({
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
        	name:"",
            itemColor:"#24feb4"
        }, "#objectOrder2");
        this.coms.projectOrderCom = new projectOrderComPic({
            dataType: "static",
            data: [{
                name: "项目21",
                value: 10,
            }, {
                name: "项目22",
                value: 28,
            }, {
                name: "项目23",
                value: 40,
            }, {
                name: "项目24",
                value: 56,
            }, {
                name: "项目25",
                value: 23,
            }, {
                name: "项目26",
                value: 30,
            }, {
                name: "项目27",
                value: 34,
            }, {
                name: "项目28",
                value: 28,
            }],
            tooltipTrigger: "axis", //""||"axis"
            lineColor: "#a00",   //折现颜色
            xLineColor: "#fff", //x轴线颜色
            yLineColor: "#fff",  //y轴线颜色
            xFontSize: 12,
            yFontSize: 12,
            xDeg: -45,
            yDeg: 0,
            name: "",
            /* itemColor: "#fff" */
        }, "#objectOrder2-1");
       /*  this.coms.projectOrderCom = new projectOrderComPic({
            dataType: "static",
            roseType:"",
            data: [{
                name: "项目21",
                value: 10,
            }, {
                name: "项目22",
                value: 28,
            }, {
                name: "项目23",
                value: 40,
            }, {
                name: "项目24",
                value: 56,
            }, {
                name: "项目25",
                value: 23,
            }, {
                name: "项目26",
                value: 30,
            }, {
                name: "项目27",
                value: 34,
            }, {
                name: "项目28",
                value: 28,
            }],
            name: "",
            itemColor: "#d6e6e6"
        }, "#objectOrder2-2"); */
        this.coms.projectOrderCom = new projectOrderComPic({
            dataType: "static",
            data: [{
                name: "项目21",
                value: 10,
            }, {
                name: "项目22",
                value: 28,
            }, {
                name: "项目23",
                value: 40,
            }, {
                name: "项目24",
                value: 56,
            }, {
                name: "项目25",
                value: 23,
            }, {
                name: "项目26",
                value: 30,
            }, {
                name: "项目27",
                value: 34,
            }, {
                name: "项目28",
                value: 28,
            }],
            name: "",
            itemColor: "#5d804d"
        }, "#objectOrder2-3");
        this.coms.projectOrderCom = new projectOrderComPic({
            dataType: "static",
            data: [{
                name: "项目21",
                value: 10,
            }, {
                name: "项目22",
                value: 28,
            }, {
                name: "项目23",
                value: 40,
            }, {
                name: "项目24",
                value: 56,
            }, {
                name: "项目25",
                value: 23,
            }, {
                name: "项目26",
                value: 30,
            }, {
                name: "项目27",
                value: 34,
            }, {
                name: "项目28",
                value: 28,
            }],
            name: "",
            itemColor: "#c23531"
        }, "#objectOrder22");
        /* this.coms.projectOrderCom = new projectOrderComPic({
            dataType: "static",
            data: [{
                name: "项目21",
                value: 10,
            }, {
                name: "项目22",
                value: 28,
            }, {
                name: "项目23",
                value: 40,
            }, {
                name: "项目24",
                value: 56,
            }, {
                name: "项目25",
                value: 23,
            }, {
                name: "项目26",
                value: 30,
            }, {
                name: "项目27",
                value: 34,
            }, {
                name: "项目28",
                value: 28,
            }],
            roseType:'',
            name: "",
            itemColor: "#c23531"
        }, "#objectOrder23"); */
        
	
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
        this.coms.projectOrderCom = new projectOrderComLine({
            dataType: "static",
            data: [{
                name: "项目21",
                value: 10,
            }, {
                name: "项目22",
                value: 28,
            }, {
                name: "项目23",
                value: 40,
            }, {
                name: "项目24",
                value: 56,
            }, {
                name: "项目25",
                value: 23,
            }, {
                name: "项目26",
                value: 30,
            }, {
                name: "项目27",
                value: 34,
            }, {
                name: "项目28",
                value: 28,
            }],
            tooltipTrigger: "axis", //""||"axis"
            lineColor: "#a00",   //折现颜色
            xLineColor: "#fff", //x轴线颜色
            yLineColor: "#fff",  //y轴线颜色
            xFontSize: 12,
            yFontSize: 12,
            xDeg: -45,
            yDeg: 0
        }, "#objectOrder2-2");
        this.factory(projectOrderDate, {
            innerStyle: {
                fontSize: 26,
                color: '#fff'
            }
        }, "#objectOrder4");
        this.coms.projectOrderDate = new mapCom({
            dataType: "static",
            data: [{
                name: '北京',
                value: Math.round(Math.random() * 1000)
            }, {
                name: '天津',
                value: Math.round(Math.random() * 1000)
            }, {
                name: '上海',
                value: Math.round(Math.random() * 1000)
            }, {
                name: '重庆',
                value: Math.round(Math.random() * 1000)
            }, {
                name: '河北',
                value: Math.round(Math.random() * 1000)
            }, {
                name: '河南',
                value: Math.round(Math.random() * 1000)
            }, {
                name: '云南',
                value: Math.round(Math.random() * 1000)
            }, {
                name: '辽宁',
                value: Math.round(Math.random() * 1000)
            }, {
                name: '黑龙江',
                value: Math.round(Math.random() * 1000)
            }, {
                name: '湖南',
                value: Math.round(Math.random() * 1000)
            }, {
                name: '安徽',
                value: Math.round(Math.random() * 1000)
            }, {
                name: '山东',
                value: Math.round(Math.random() * 1000)
            }, {
                name: '新疆',
                value: Math.round(Math.random() * 1000)
            }]
        }, "#map");
        
	
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