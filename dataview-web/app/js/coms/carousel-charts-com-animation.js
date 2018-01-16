/*
 * @Author: limingle
 * @Date:   2018-01-03 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2018-01-10 17:52:24
 * @description:轮播图表列表
 */

'use strict';

(function(namespace) {
    var carouselEchartCom = Com.extends({
        init: function() {
        	var self = this;
            //合并后的参数
            this.currentOptions=$.extend(true,{},this.defaultOptions,this.options||{});
            this.html=$(this.getContentHtml());
            this.html.css(this.currentOptions.innerStyle);
            this.node.append(this.html);
            this.renderList();
            this.animationFrameTag=true;//requireAnimationFrame标记
            if(this.currentOptions.poll){
                setInterval(this.loadData.bind(this),this.currentOptions.timeout)
            }
            // this.restart();
        },
        defaultOptions:{
            inSilder:false,
            showTime:3000,
            sliderIndex:0,
            marqueeStep:2,
            marqueeTimeout:32,
            innerStyle:{},
            rollingType:"seam",  //"seam","seamless","wait"
            waitTime:2000,
            isRoll:'yes',//"yes","no"
            height:"100%",
            isMouseovered:false,
            echartsOptions:{
                xAxisOption:{
                    show:false
                }
            }
        },
        restart:function(){
            var self=this;
            if(this.currentOptions.inSilder){
                self.emit("broadcast",{
                    evtname:"sliderInnerCom.showStart",
                    data:self.currentOptions.sliderIndex
                })
                this.renderList(true);
                this.isSliderShow=true;
                var isOverflow = $.common.isOverflow($(".list-table-event", this.node)[0], "v");
                if (isOverflow) {
                    this.isScroll=true;
                }else{
                    this.isScroll=false;
                }
            }
        },
        start:function(){
            var self=this;
            if(this.isScroll){
                this.listScroll();
            }else{
                this.sliderTime=setTimeout(function(){
                    self.emit("broadcast",{
                        evtname:"sliderInnerCom.showEnd",
                        data:self.currentOptions.sliderIndex
                    })
                },this.currentOptions.showTime);
            }
        },
        stop:function(){
            this.isSliderShow=false;
            if(!this.isScroll){
                this.animationFrameTag=false;
                // clearTimeout(this.sliderTime);
            }else{
                this.animationFrameTag=false;
                // clearInterval(this.myMar);
                // this.myMar=null;
                if(this.waitTimeoutStart){
                    clearInterval(this.waitTimeoutStart);
                    this.waitTimeoutStart=null;
                }
                if(this.waitTimeoutEnd){
                    clearInterval(this.waitTimeoutEnd);
                    this.waitTimeoutEnd=null;
                }
                var panel=$(".list-table-event", this.node);
                panel.off("mouseover");
                panel.off("mouseout");
            }
        },
        /**
        * @method
        * @desc 列表滚动
        */
        listScroll: function () {
            var self=this;
            var panel = $(".list-table-event", this.node);
            var panelH=panel.height();
            var ulHtml = $(".list-table-event>div", this.node);
            var ulHtmlH=ulHtml.height();
            var marquee=null;
            if (this.currentOptions.rollingType == "seam") {
                panel.prepend("<div class='roll-space-div'></div>");
                panel.append("<div class='roll-space-div'></div>");
                $(".roll-space-div", this.node).height(panel.height());
                $(".roll-space-div", this.node).css("visibility", "hidden");
                marquee=function() {
                    // var oldList = $(".list-table-event>div", self.node);
                    if (ulHtml[0].offsetHeight + panelH - panel[0].scrollTop <= 0) {
                        panel[0].scrollTop -= (ulHtml[0].offsetHeight + panelH);
                        if (self.isSliderShow) {
                            self.emit("broadcast", {
                                evtname: "sliderInnerCom.showEnd",
                                data: self.currentOptions.sliderIndex
                            })
                            this.isSliderShow = false;
                        }
                    } else {
                        panel[0].scrollTop+=self.currentOptions.marqueeStep;
                    }
                    if(self.animationFrameTag){
                        requestAnimationFrame(marquee);
                    }
                }
            } else if (this.currentOptions.rollingType == "seamless"){
                panel.append(ulHtml.clone());
                marquee=function() {
                    // var oldList = $(".list-table-event>div", self.node);
                    if (ulHtml[0].offsetHeight - panel[0].scrollTop <= 0) {
                        panel[0].scrollTop -= ulHtmlH;
                        if (self.isSliderShow) {
                            self.emit("broadcast", {
                                evtname: "sliderInnerCom.showEnd",
                                data: self.currentOptions.sliderIndex
                            })
                            this.isSliderShow = false;
                        }
                    } else {
                        panel[0].scrollTop+=self.currentOptions.marqueeStep;
                    }
                    if(self.animationFrameTag){
                        requestAnimationFrame(marquee);
                    }
                }
            } else if (this.currentOptions.rollingType == "wait"){
                marquee=function() {
                    // var oldList = $(".list-table-event>div", self.node);
                    if (ulHtml[0].offsetHeight - panel[0].scrollTop <= panelH) {
                        if (self.isSliderShow) {
                            // if (self.myMar) {
                                self.animationFrameTag=false;
                                // clearInterval(self.myMar);
                                // self.myMar = null;
                            // }
                            panel.off("mouseover");
                            panel.off("mouseout");
                            var timeout2=setTimeout(function(){
                                clearTimeout(timeout2);
                                timeout2=null;
                                self.emit("broadcast", {
                                    evtname: "sliderInnerCom.showEnd",
                                    data: self.currentOptions.sliderIndex
                                })
                                this.isSliderShow = false;
                            },self.currentOptions.waitTime)
                        }
                    } else {
                        panel[0].scrollTop+=self.currentOptions.marqueeStep;
                    }
                    if(self.animationFrameTag){
                        requestAnimationFrame(marquee);
                    }
                }
                var timeout1=setTimeout(function(){
                    clearTimeout(timeout1);
                    timeout1=null;
                    // if (self.myMar) {
                    //     clearInterval(self.myMar);
                    //     self.myMar = null;
                    // }
                    self.animationFrameTag=true;
                    requestAnimationFrame(marquee); 
                    // self.myMar = setInterval(marquee, self.currentOptions.marqueeTimeout);
                    panel.off("mouseover").on("mouseover", function () {
                        self.isMouseovered=true;
                        self.animationFrameTag=false;
                        // clearInterval(self.myMar);
                        // self.myMar = null;
                    })
                    panel.off("mouseout").on("mouseout", function () {
                        if(!self.isMouseovered){
                            return;
                        }
                        self.isMouseovered=false;
                        self.animationFrameTag=true;
                        requestAnimationFrame(marquee); 
                        // self.myMar = setInterval(marquee, self.currentOptions.marqueeTimeout);
                    })
                },self.currentOptions.waitTime)
            }

            if(this.currentOptions.rollingType == "seam"||this.currentOptions.rollingType == "seamless"){
                // if (self.myMar) {
                //     clearInterval(self.myMar);
                //     self.myMar = null;
                // }
                self.animationFrameTag=true;

                requestAnimationFrame(marquee); 

                // self.myMar = setInterval(marquee, self.currentOptions.marqueeTimeout);
                panel.off("mouseover").on("mouseover", function () {
                    self.isMouseovered=true;
                    self.animationFrameTag=false;
                    // clearInterval(self.myMar);
                    // self.myMar = null;
                })
                panel.off("mouseout").on("mouseout", function () {
                    if(!self.isMouseovered){
                        return;
                    }
                    self.isMouseovered=false;
                    self.animationFrameTag=true;
                    requestAnimationFrame(marquee);
                    // self.myMar = setInterval(marquee, self.currentOptions.marqueeTimeout);
                })
            }
        },
        /**
         * @method 渲染list
         * @param {object} data 查询返回的数据结构
         * *  例：
         *  {
         *      data:Array
         *      legend:Array
         *      provinces:Array
         *  }
         * @desc
         */
        renderList: function (mustRender) {
            /* console.log(data) */
            var self = this;
            if (this.currentOptions.isRoll == 'yes') {
                var divWidth = this.html.parent().width() + 28;
                this.html.parent().css('overflow', 'hidden');
                this.html.css({ 'overflow': 'auto', 'width': divWidth, 'padding-right': '18px' })

            } else if (this.currentOptions.isRoll == 'no') {
                this.html.css({ 'overflow': 'hidden', 'width': '100%' })
            } 
            if(!mustRender&&(!self.idDataChange||self.isScroll)){
                return;
            }
            var data=this.oldData;
          /*   clearInterval(self.myMar); */
           /*  self.eventListPanel.empty(); */
            $(".list-table-event", this.node)[0].scrollTop = 0;
            $(".list-table-event",this.node).empty();
            var ulHtml = $("<div></div>").height(this.currentOptions.height);
            this.html.append(ulHtml);

            this.echartsBar=new barHorCom(this.currentOptions.echartsOptions, ulHtml);

            self.idDataChange=false;
            
            if(!self.currentOptions.inSilder){
                var isOverflow = $.common.isOverflow($(".list-table-event", this.node)[0], "v");
                if (isOverflow) {
                    this.isScroll=true;
                    this.listScroll();
                }else{
                    this.isScroll=false;
                }
            }
        },

        
        /**@method 获取页面html
    	 * @return string 页面html
    	 */
        getContentHtml: function () {
            var html = "";
            html = '<div class="list-table-event" style="height:100%;padding:8px;">'+
            '</div>'
            return html;
        }
    });
    namespace.carouselEchartCom = carouselEchartCom;
})(window);