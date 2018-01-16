/*
 * @Author: limingle
 * @Date:   2017-12-26 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2018-01-02 20:32:47
 * @Last Modified time: 2018-01-05 11:13:45
 * @description:柱状图
 */

'use strict';

(function(namespace) {
    var titleIndexCom = Com.extends({
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
        eventList: ["sliderInnerCom.showStart"],
        defaultOptions:{
            data:[
                
        ],
            itemStyle:{

            },
            seePersonType:"other"//CS,other
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
           /*  $.each(this.currentOptions.data, function (i) {

            }) */
            this.on("sliderInnerCom.showStart", function (res) {
                this.html.find('span').remove();
                console.log(this.currentOptions.data[res].content);
                var titleTagHtml = '';
                if (this.currentOptions.seePersonType=="other"){
                    titleTagHtml = '<span>' + this.currentOptions.data[res].content + '</span>';
                    this.html.append(titleTagHtml);
                } else if (this.currentOptions.seePersonType == "CS"){
                    if (res==0){
                        titleTagHtml = '<span>' + this.currentOptions.data[0].content + '</span>';
                    } else if (res==1){
                        titleTagHtml = '<span>' + this.currentOptions.data[2].content + '</span>';
                    } else if (res ==2){
                        titleTagHtml = '<span>' + this.currentOptions.data[14].content + '</span>';
                    }
                    
                    this.html.append(titleTagHtml);
                }
                
            });
            
            
            
            
            
           
            
        },
        
        /**@method 销毁方法
         * @return undefined
         */
        destroy: function () {
          this.node.html('');
        }
        
    });
    namespace.titleIndexCom = titleIndexCom;
})(window);