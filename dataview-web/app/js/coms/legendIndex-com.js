/*
 * @Author: limingle
 * @Date:   2017-12-26 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2018-01-02 20:32:47
 * @Last Modified time: 2018-01-10 10:51:37
 * @description:柱状图
 */

'use strict';

(function(namespace) {
    var legendIndexCom = Com.extends({
        init: function() {
        	var self = this;
            //合并后的参数
            this.currentOptions=$.extend(true,{},this.defaultOptions,this.options||{});
        	this.html=$(this.getContentHtml());
        	/* this.bindEvent(); */
            this.node.append(this.html);
            this.html.css(this.currentOptions.itemStyle);
            this.render();
            
            
        },
        eventList: ["sliderInnerCom.showStart", "sliderInnerCom.showIndex","sliderInnerCom.showEnd"],
        defaultOptions:{
            data:[
                {
                    data:[
                        {
                            content:'',
                            className:''
                    }
                    ]
                }
            ],
            itemStyle:{}
        },
        /**
         * @method 事件绑定
         * @return undefined
         */
       /*  bindEvent:function(){
            var self=this;
            this.on("sliderInnerCom.showStart", function (data) {
                this.currentOptions.tagNo = data+1;
                
            });
                
            
        }, */
        /**@method 获取页面html
    	 * @return string 页面html
    	 */
        getContentHtml:function(){
        	var html="";
        	html='<div class="block-content" style="height:100%;">'+
		        '</div>';
            return html;
            
        },
        render: function () {
            var self = this;
            this.on("sliderInnerCom.showStart", function (res) {
                $(".block-content", this.node).empty();
                if(res==5){
                    
                     var len = this.currentOptions.data[res].data.length;
                    for (i = 0; i < len; i++) {
                        var legendHtml = '<div style="height:30px;line-height:30px;"><div class="' + this.currentOptions.data[res].data[i].className + '" style="display:inline-block;vertical-align:middle;"></div><span style="margin-left:4px;vertical-align:middle;">' + this.currentOptions.data[res].data[i].content + '</span></div>';
                        this.html.append(legendHtml);
                    }
                 };
                }
                
            
            
            )
            this.on("sliderInnerCom.showIndex", function (res) {
                $(".block-content", this.node).empty();
                if (res == 5) {

                    var len = this.currentOptions.data[res].data.length;
                    for (i = 0; i < len; i++) {
                        var legendHtml = '<div style="height:30px;line-height:30px;"><div class="' + this.currentOptions.data[res].data[i].className + '" style="display:inline-block;vertical-align:middle;"></div><span style="margin-left:4px;vertical-align:middle;">' + this.currentOptions.data[res].data[i].content + '</span></div>';
                        this.html.append(legendHtml);
                    }
                };
            })
            this.on("sliderInnerCom.showEnd", function (res) {
                $(".block-content", this.node).empty();
                /* if (res == 5) {

                    var len = this.currentOptions.data[res].data.length;
                    for (i = 0; i < len; i++) {
                        var legendHtml = '<div style="height:30px;line-height:30px;"><div class="' + this.currentOptions.data[res].data[i].className + '" style="display:inline-block;vertical-align:middle;"></div><span style="margin-left:4px;vertical-align:middle;">' + this.currentOptions.data[res].data[i].content + '</span></div>';
                        this.html.append(legendHtml);
                    }
                }; */
            }



            )
            
            
           
            
        },
        
        /**@method 销毁方法
         * @return undefined
         */
        destroy: function () {
          this.node.html('');
        }
        
    });
    namespace.legendIndexCom = legendIndexCom;
})(window);