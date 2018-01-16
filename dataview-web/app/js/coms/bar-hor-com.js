/*
 * @Author: limingle
 * @Date:   2018-01-03 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2018-01-11 15:49:32
 * @description:柱状图
 */

'use strict';

(function(namespace) {
    var barHorCom = Com.extends({
        init: function() {
        	var self = this;
            //合并后的参数
            this.currentOptions=$.extend(true,{},this.defaultOptions,this.options||{});
        	this.html=$(this.getContentHtml());
        	this.bindEvent();
            this.node.append(this.html);
            this.initEchart();
            this.loadData();
            if(this.currentOptions.poll){
                setInterval(this.loadData.bind(this),this.currentOptions.timeout)
            }
            // this.restart();
        },
        eventList:["projectOrderDate.dataChange"],
        defaultOptions:{
            dataType:"static",
            data:[],
            poll:false,
            timeout:5000,
            showLegend:false,
            showTooltip:true,
            inSilder:false,
            showTime:3000,
            sliderIndex:0,
            showDataLabel: true,
            dataLabelStyle:{
                fontSize:20,
                color:"#fff"
            },
            tooltipOption:{
                trigger:"axis",
                textStyle:{
                    fontSize:20
                },
                axisPointer:{
                    type:"shadow"
                }
            },
            legendOption:{
                orient:"vertical",
                right:0,
                top:0,
                itemWidth:18,
                itemHeight:18,
                textStyle:{
                    fontSize:18,
                    color:"#fff"
                },
                data:[]
            },
            gridOption:{
                left: '10',
                right: '76',
                bottom: '42',
                top:'20',
                containLabel: true
            },
            xAxisOption:{
                type : 'value',
                axisLine:{
                    show:true,
                    lineStyle:{
                        color:"#fff"
                    }
                },
                axisLabel:{
                    textStyle:{
                        fontSize:24
                    }
                },
                nameTextStyle:{
                    fontSize:20
                },
                splitLine:{
                    show:false
                }
            },
            yAxisOption:{
                type : 'category',
                data : [],
                axisLine:{
                    show:true,
                    lineStyle:{
                        color:"#fff"
                    }
                },
                areaLine:{
                    show:false
                },
                axisLabel:{
                    rotate:0,
                    textStyle:{
                        fontSize:24
                    },
                    interval:0
                },
                splitLine:{
                    show:false
                }
            },
            seriesItemsOption:[
                /* {
                    normal:{
                        color:"#24FEB4"
                    }
                },
                {
                    normal:{
                        color:"#3C9DE4"
                    }
                } */
            ]
        },
        restart:function(){
            var self=this;
            if(this.currentOptions.inSilder){
                self.emit("broadcast",{
                    evtname:"sliderInnerCom.showStart",
                    data:self.currentOptions.sliderIndex
                })
                !!self.oldData&&self.renderEchart(self.oldData);
            }
        },
        start:function(){
            var self=this;
            function showEndHandel(){
                self.emit("broadcast",{
                    evtname:"sliderInnerCom.showEnd",
                    data:self.currentOptions.sliderIndex
                })
            }
            if(this.sliderTime){
                clearInterval(self.sliderTime);
                this.sliderTime=null;
            }
            this.sliderTime=setTimeout(showEndHandel,this.currentOptions.showTime);


            this.node.off("mouseover").on("mouseover", function () {
                self.isMouseovered=true;
                clearInterval(self.sliderTime);
                this.sliderTime=null;
            })
            this.node.off("mouseout").on("mouseout", function () {
                if(!self.isMouseovered){
                    return;
                }
                self.isMouseovered=false;
                self.sliderTime = setTimeout(showEndHandel, self.currentOptions.showTime);
            })
        },
        stop:function(){
            this.isMouseovered=false;
            clearTimeout(this.sliderTime);
            this.sliderTime=null;
        },

        /**
         * @method 事件绑定
         * @return undefined
         */
        bindEvent:function(){
        },

        /**
         * @method 根据类型获取数据
         * @param String cids 类型ID
         * @return undefined
         */
        loadData:function(){
            var self=this;
            if(this.currentOptions.dataType=="api"){
                $.common.ajax({
                    url: this.currentOptions.data,
                    type:"get",
                    success: function(data) {
                        self.oldData=data.data;
                        self.renderEchart(data.data);
                    }
                })
            }else if(this.currentOptions.dataType=="static"){
                self.oldData=this.currentOptions.data;
                self.renderEchart(this.currentOptions.data);
            }
        },

        /**
         * @method 初始化echart
         * @return undefined
         */
        initEchart:function(){
        	var node=$(".block-content",this.node);
        	this.myChart = echarts.init(node[0]);
        },

        /**
         * @method 组装tooltip
         * @return undefined
         */
        mergeTooltip:function(){
            //组装legend
            if(this.currentOptions.showTooltip){
                this.echartOption.tooltip=this.currentOptions.tooltipOption;
            }else{
                this.echartOption.tooltip={
                    show:false
                }
            }
        },

        /**
         * @method 组装Legend
         * @return undefined
         */
        mergeLegend:function(){
            //组装legend
            if(this.currentOptions.showLegend){
                this.echartOption.legend=this.currentOptions.legendOption;
            }else{
                this.echartOption.legend={
                    show:false
                }
            }
        },
        
        /**
         * @method 组装Legend
         * @return undefined
         */
        mergeGrid:function(){
            //组装grid
            this.echartOption.grid=this.currentOptions.gridOption;
        },
        
        /**
         * @method 组装xAxis
         * @return undefined
         */
        mergexAxis:function(){
            //组装grid
            this.echartOption.xAxis.push(this.currentOptions.xAxisOption);
        },
        
        /**
         * @method 组装yAxis
         * @return undefined
         */
        mergeyAxis:function(){
            //组装grid
            this.echartOption.yAxis.push(this.currentOptions.yAxisOption);
        },

        /**
         * @method 渲染echart
         * @param Object data 查询返回的数据结构
         *  例：
         *  {
         *      data:Array
         *      legend:Array
         *      provinces:Array
         *  }
         * @return undefined
         */
        renderEchart:function(data){
            var self=this;
            var dataObj={};
            self.echartOption=this.getEchartOption();
            this.mergeTooltip();
            this.mergeLegend();
            this.mergeGrid();
            this.mergexAxis();
            this.mergeyAxis();
            if(data.length==0){
                self.myChart.setOption(self.echartOption, true);
                return;
            }
            if(!!data[0].legend){
                dataObj=this.parseData(data);
                self.echartOption.legend.data=dataObj.legend;
            }else{
                dataObj.nameArr=[];
                dataObj.valueArr=[];
                for(var i=0,len=data.length;i<len;i++){
                    dataObj.nameArr.push(data[i].name);
                    dataObj.valueArr.push(data[i].value);
                }
            }
    		self.echartOption.yAxis[0].data=dataObj.nameArr;
    		var dataArr=[];
            if(!!data[0].legend){
                for(var i=0,len=dataObj.legend.length;i<len;i++){
                    var data={
                        name:dataObj.legend[i],
                        type:'bar',
                        barMaxWidth:30,
                        data:dataObj.valueArr[dataObj.legend[i]],
                        itemStyle:this.currentOptions.seriesItemsOption[i]
                    }
                    if(this.currentOptions.showDataLabel){
                        data["label"]={
                            normal:{
                                show:true,
                                position:"right"
                            }
                        }
                        $.extend(data["label"].normal,this.currentOptions.dataLabelStyle);
                    }
                    dataArr.push(data)
                }
            }else{
                var data={
                    type:'bar',
                    barMaxWidth:30,
                    data:dataObj.valueArr,
                    itemStyle:this.currentOptions.seriesItemsOption[0]
                };
                if(this.currentOptions.showDataLabel){
                    data["label"]={
                        normal:{
                            show:true,
                            position:"right"
                        }
                    }
                    $.extend(data["label"].normal,this.currentOptions.dataLabelStyle);
                }
                dataArr.push(data)
            }
    		// var maxValue=this.getMaxValue(valueArr)
    		// if(maxValue==1||maxValue==2||maxValue==3){
            //     //如果最大值为1则设置splitNumber为此值，解决显示小数问题
    		// 	self.echartOption.yAxis[0]['splitNumber']=maxValue;
    		// }else if(maxValue==0){
    		// 	self.echartOption.yAxis[0]['splitNumber']=1;
    		// }else if(!!self.echartOption.yAxis[0]['splitNumber']){
    		// 	delete self.echartOption.yAxis[0]['splitNumber'];
    		// }
    		// self.echartOption.yAxis[0]['max']=maxValue;
            self.echartOption.series=dataArr;
            if(this.currentOptions.inSilder){
                self.myChart.clear();
            }
    		self.myChart.setOption(self.echartOption, true);
        },
        
        /**
         * @method 解析数据
         * @param Array data 数据
         * @return Object
         *  例：
         *  {
         *      legend:Array
         *      nameArr:Array
         *      valueArr:Object
         *  }
         */
        parseData:function(data){
            var legendMap={};
            var legendArr=[];//系列
            var legendFirstNameArr=[];//横坐标
            data.forEach(function(item,index){
                var legend=item["legend"];
                if(legendMap[legend]){
                    legendMap[legend][item.name]=item.value;
                }else{
                    legendMap[legend]={};
                    legendMap[legend][item.name]=item.value;
                }
                //添加系列
                if(legendArr.indexOf(legend)==-1){
                    legendArr.push(legend);
                }
                //添加横坐标
                if(legendFirstNameArr.indexOf(item.name)==-1){
                    legendFirstNameArr.push(item.name);
                }
            })
            var valueObj={};
            for(var key in legendMap){
                valueObj[key]=[];
                for(var i=0,lng=legendFirstNameArr.length;i<lng;i++){
                    valueObj[key].push(legendMap[key][legendFirstNameArr[i]]);
                }
            }
            return {
                legend:legendArr,
                nameArr:legendFirstNameArr,
                valueArr:valueObj
            }
        },

        /**
         * @method 获取最大值
         * @param Array data 数字数组
         * @return Number 最大值
         */
        getMaxValue:function(data){
        	if(data.length>0){
        		var data1=data[0];
            	var max=0;
            	for(var i=0,len=data1.length;i<len;i++){
            		var sum=0;
            		for(var j=0,lenj=data.length;j<lenj;j++){
            			sum+=data[j][i];
            		}
            		if(sum>max){
            			max=sum;
            		}
            	}
        	}else{
        		var max=0;
        	}
        	
        	return max;
        },

        /**
         * @method 重新计算图表大小
         * @return undefined
         */
        resize:function(){
			this.myChart.resize();
        },
        
        //图表配置
        getEchartOption:function(){
            return {
                color:globalVar.dataColorArr||[],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {},
                grid: {},
                xAxis : [],
                yAxis : [],
                // dataZoom: [
                //     {
                //         show: false,
                //         realtime: true,
                //         start: 0,
                //         end: 100,
                //         height:10,
                //         handleSize:10,
                //         showDetail:false,
                //         bottom:0
                //     },
                //     {
                //         type: 'inside',
                //         realtime: true,
                //         start: 0,
                //         end: 50
                //     }
                // ],
                series : []
            }
        },
        load: function(opt) {
        },
        
        /**@method 获取页面html
    	 * @return string 页面html
    	 */
        getContentHtml:function(){
        	/*href="'+this.options.moreHref+'"*/
        	var html="";
        	html='<div class="block-content" style="height:100%;">'+
		        '</div>';
        	return html;
        },
        render: function () {
        },
        
        /**@method 销毁方法
         * @return undefined
         */
        destroy: function () {
          this.node.html('');
        }
    });
    namespace.barHorCom = barHorCom;
})(window);