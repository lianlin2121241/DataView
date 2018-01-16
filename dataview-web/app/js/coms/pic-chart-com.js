'use strict';

(function(namespace) {
    var projectOrderComPic = Com.extends({
        init: function() {
        	var self = this;
        	this.currentOptions=$.extend({},this.defaultOptions,this.options||{});
        	this.html=$(this.getContentHtml());
        	this.bindEvent();
            this.node.append(this.html);
            this.initEchart();
            this.loadData();
            if(this.currentOptions.poll){
                setInterval(this.loadData.bind(this),this.currentOptions.timeout)
            }
        },
        defaultOptions:{
            dataType:"static",
            data:[],
            poll:false,
            timeout:5000,
            showLegend: false,
            showTooltip: true,
            showDataLabel: true,
            dataLabelStyle: {
                fontSize: 18,
                color: "#fff"
            },
            gridOption: {
                left: '20',
                right: '76',
                bottom: '42',
                top: '40',
                containLabel: true
            },
          /*   name:"",
            itemColor:"#c23531",
            textColor:"rgba(255,255,255,0.8)",
            lineColor:"rgba(255,255,255,0.8)",
            roseType:"radius", */ 
            title: {
                /*  show:true,
                 text:'',
                 x:'left' */
            },
            tooltipOption: {
                 trigger: 'item',
                  formatter: "{a}<br/>{b} : {c} ({d}%)" //{a}（系列名称），{b}（数据项名称），{c}（数值），{d}（百分比）
            },
            visualMap: {
                show: false,
                min: 0,
                max: 100,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            seriesItemsOption: [/* {
                name: '',
                type: 'pie',
                radius: '70%',//饼图半径
                center: ['35%', '50%'],//饼图位置
                label: {//饼图标签设置（位置、字体大小、颜色）
                    normal: {
                        position: 'inside',
                        textStyle: {
                            fontSize: 8,
                            color: '#000'
                        }
                    }

                },
                data: []
            } */]
        },

        /**
         * @method 根据类型获取数据
         * @param String cids 类型ID
         * @return undefined
         */
        loadData: function () {
            var self = this;
            if (this.currentOptions.dataType == "api") {
                $.common.ajax({
                    url: this.currentOptions.data,
                    type: "get",
                    success: function (data) {
                        self.renderEchart(data.data);
                    }
                })
            } else if (this.currentOptions.dataType == "static") {
                self.renderEchart(this.currentOptions.data);
            }

        },
        /**
         * @method 事件绑定
         * @return undefined
         */
        bindEvent:function(){
        	var self=this;
        },
        /**
         * @method 组装tooltip
         * @return undefined
         */
        mergeTooltip: function () {
            //组装legend
            if (this.currentOptions.showTooltip) {
                this.echartOption.tooltip = this.currentOptions.tooltipOption;
            } else {
                this.echartOption.tooltip = {
                    show: false
                }
            }
        },
        /**
         * @method 组装Legend
         * @return undefined
         */
        mergeGrid: function () {
            //组装grid
            this.echartOption.grid = this.currentOptions.gridOption;
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
            var self = this;
            var dataObj = {};
            self.echartOption = this.getEchartOption();
            this.mergeTooltip();
            this.mergeGrid();
            data = data.sort(function(a,b){return a.value - b.value;});
           /*  var dataArr=[];
            dataArr.push({
            	name:this.currentOptions.name,
                type:'pie',
                radius: '50%',
                center: ['50%','50%'],
                data:data,
                roseType: this.currentOptions.roseType,
                label: {
                	normal: {
                		textStyle: { 
                			color: this.currentOptions.textColor
                		}
                	}
                },
                labelLine: {
                	normal: {
                		lineStyle: {
                			color: this.currentOptions.lineColor
                		},
                		smooth: 0.2,
                		length: 10,
                		length: 20
                	}
                },
                itemStyle: {
                	normal: {
                		color: this.currentOptions.itemColor,
                		shadowBlur: 200,
                		shadowColor: 'rgba(0,0,0,0.5)'
                	}
                },
                animationType: 'scale'
            }) */
            self.echartOption.series = this.currentOptions.seriesItemsOption;
    		self.myChart.setOption(self.echartOption, true);
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
        echartOption:{
            
        },
        //图表配置
        getEchartOption: function () {
            return {
                color: globalVar.dataColorArr || [],
                visualMap: {
                    show: false,
                    min: 0,
                    max: 100,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a}<br/>{b} : {c} ({d}%)" //{a}（系列名称），{b}（数据项名称），{c}（数值），{d}（百分比）
                },
                legend: {},
                grid: {},
                series: []
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
        	html='<div class="block-content" style="height: 100%;"></div>';
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
    namespace.projectOrderComPic = projectOrderComPic;
})(window);