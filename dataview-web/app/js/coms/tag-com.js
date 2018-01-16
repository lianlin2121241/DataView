/*
 * @Author: limingle
 * @Date:   2017-12-26 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2018-01-02 20:32:47
 * @Last Modified time: 2018-01-11 16:53:04
 * @description:柱状图
 */

'use strict';

(function(namespace) {
    var tagCom = Com.extends({
        init: function() {
        	var self = this;
            //合并后的参数
            this.currentOptions=$.extend(true,{},this.defaultOptions,this.options||{});
        	this.html=$(this.getContentHtml());
        	this.bindEvent();
            this.node.append(this.html);
            this.render();
            
            
        },
        eventList: ["sliderInnerCom.showStart", "sliderInnerCom.showEnd"],
        defaultOptions:{
            data:[
                {
                    url:'images/border/s3.png',
                    title:'我是第一条数据'
            }
            ]
        },
        /**
         * @method 事件绑定
         * @return undefined
         */
        bindEvent:function(){
            var self=this;
            this.on("sliderInnerCom.showStart", function (data) {
                var len = $('.tag-item').length;
                for(i=0;i<len;i++){
                    $('.tag-item').eq(i).find('.tag-div').removeClass('active');
                }
                if(data<7){
                    $('.tag-item').eq(data).find('.tag-div').addClass('active');
                }else if( data>6 && data<14){
                    $('.tag-item').eq(7).find('.tag-div').addClass('active');
                }else{
                    var dataIndex = data-6
                    $('.tag-item').eq(dataIndex).find('.tag-div').addClass('active');
                }
                
            })
            this.node
                .on('click','li',function () {
                    /* var thisIndex = $(this).attr("data-index");
                    var passIndex = 0;
                    if (thisIndex<7){
                        passIndex = thisIndex
                    } else if (6<thisIndex<14){
                        passIndex = 7
                    }else{
                        passIndex = thisIndex
                    } */
                    var len = $('.tag-item').length;
                        
                        for (i = 0; i < len; i++) {
                            $('.tag-item').eq(i).find('.tag-div').removeClass('active');
                        }
                        $(this).find('.tag-div').addClass('active');
                        console.log($(this).attr("data-index"))
                        self.emit("broadcast", {
                            evtname: "sliderInnerCom.showIndex",
                            data: parseInt($(this).attr("data-index"))
                        })
                    }
                    
                )
            this.node
                .on('mouseover','li',function(){
                    $(this).css('cursor','pointer');
                })
                
            
        },
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
            var len = this.currentOptions.data.length
            var ulHtml = $("<ul></ul>");
            
            for (var i = 0; i < len; i++) {
                var thisIndex = i
                var liHtml = '<li class="tag-item" data-index="' + thisIndex + '"><div class="tag-div"><div class="tag-title">' + this.currentOptions.data[i].title + '</div><img class="tag-img" src="' + globalVar.staticUrl+ this.currentOptions.data[i].url +'" /></div></li>';
                ulHtml.append(liHtml)
            }
            
            this.html.append(ulHtml);
           
            
        },
        
        /**@method 销毁方法
         * @return undefined
         */
        destroy: function () {
          this.node.html('');
        }
        
    });
    namespace.tagCom = tagCom;
})(window);