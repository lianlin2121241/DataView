/*
 * @Author: limingle
 * @Date:   2018-01-02 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2018-01-10 14:31:21
 * @description:事件轮播
 */

'use strict';

(function(namespace) {
    var eventSliderCom = Com.extends({
        init: function() {
        	var self = this;
            //合并后的参数
            this.currentOptions=$.extend(true,{},this.defaultOptions,this.options||{});
        	this.html=$(this.getContentHtml());
        	this.bindEvent();
            this.node.append(this.html);
            this.renderBlockContent();
            this.innerComs=[];
            this.prevCom=null;
            this.currentCom=null;
            this.prevBlock=null;
            this.currentBlock=null;
            this.transitionIsEnd=false;//过度是否结束
            this.notNeedScroll=false;//不需要滚动标记
            this.prevBlockClass="";
            this.showIndex=0;
        },
        defaultOptions:{
            blockCount:4
        },
        renderBlockContent:function(){
            var html=[];
            for(var i=0;i<this.currentOptions.blockCount;i++){
                html.push('<div class="slider-block-item" style="height:100%;"></div>');
            }
            $(".event-slider-content",this.node).append(html.join(""));
        },
        eventList:["sliderInnerCom.showStart","sliderInnerCom.showEnd","sliderInnerCom.showIndex"],
        addCom:function(com,index){
            this.innerComs.push(com);
            $(".slider-block-item:eq("+index+")",this.node).hide();
        },
        getContent:function(index){
            return $(".slider-block-item:eq("+index+")",this.node);
        },
        showBlock:function(index){
            var self=this;
            this.showIndex=index;
            this.prevCom=this.currentCom;
            this.currentCom=this.innerComs[index];
            this.prevBlock=this.currentBlock;
            this.currentBlock=$(".slider-block-item:eq("+index+")",this.node);

            function getNum(){
                return Math.ceil(Math.random()*10);
            }

            if(this.prevBlock){
                self.prevBlock.off("transitionend");
                this.prevCom.stop();
                this.transitionIsEnd=false;
                self.prevBlock.removeClass(self.prevBlockClass);
                this.prevBlock.css("display","none");
                // this.prevBlock.fadeOut(500,function(){
                    var num=getNum();
                    /* self.currentBlock.show(function(){
                        self.currentCom.restart();
                    }) */
                    self.currentBlock.css({
                        "display":"block"
                    })
                    self.currentBlock.addClass("ing"+num);
                    self.currentBlock.css("padding");
                    self.currentBlock.addClass("ed");
                    self.prevBlockClass="ing"+num+" ed";
                    self.currentBlock.off("transitionend").on("transitionend",function(){
                        self.transitionIsEnd=true;
                        self.currentBlock.off("transitionend");
                        self.currentCom.restart();
                        if(!self.notNeedScroll){
                            self.currentCom.start();
                        }
                    })
                    /* self.currentBlock.fadeIn(200,function(){
                        self.currentCom.restart();
                    }); */
                // })
            }else{
                self.currentBlock.fadeIn(200,function(){
                    self.currentCom.restart();
                    self.currentCom.start();
                });
            }
        },

        /**
         * @method 事件绑定
         * @return undefined
         */
        bindEvent:function(){
            var self=this;
            this.on("sliderInnerCom.showStart",function(index){
                console.log("sliderInnerCom.showStart:"+index);
                // self.showBlock(index);
            })
            this.on("sliderInnerCom.showEnd",function(index){
                console.log("sliderInnerCom.showEnd:"+index);
                if(index>=(this.currentOptions.blockCount-1)){
                    index=-1
                }
                self.showBlock(index+1);
            })
            this.on("sliderInnerCom.showIndex",function(index){
                console.log("sliderInnerCom.showIndex:"+index);
                var order=0;
                if(index<=7){
                    order=index;
                }else {
                    order=index+6;
                }
                if(order==self.showIndex){
                    return;
                }
                self.showBlock(order);
                
            })
            this.node.on("mouseover",function(){
                if(!self.transitionIsEnd){
                    self.notNeedScroll=true;
                }
            })
            this.node.on("mouseout",function(){
                if(!!self.transitionIsEnd&&self.notNeedScroll){
                    self.currentCom.start();
                }
                if(!self.transitionIsEnd||(!!self.transitionIsEnd&&self.notNeedScroll)){
                    self.notNeedScroll=false;
                }
            })
        },
        load: function(opt) {
        },
        
        /**@method 获取页面html
    	 * @return string 页面html
    	 */
        getContentHtml:function(){
        	/*href="'+this.options.moreHref+'"*/
        	var html="";
        	html='<div class="event-slider-content" style="height:100%;overflow:hidden;">'+
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
    namespace.eventSliderCom = eventSliderCom;
})(window);