/*
 * @Author: limingle
 * @Date:   2017-12-26 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2018-01-08 16:53:27
 * @description:轮播列表
 */

'use strict';

(function(namespace) {
    var carouselCrosswiseCom = Com.extends({
        init: function() {
        	var self = this;
            //合并后的参数
            this.currentOptions=$.extend({},this.defaultOptions,this.options||{});
            this.html=$(this.getContentHtml());
            this.html.css(this.currentOptions.innerStyle);
            this.node.append(this.html);
            this.oldData=null;//记录老的数据
            this.loadData();
            this.idDataChange=false;//标记数据是否变化
            this.isScroll=false;//是否滚动
            this.animationFrameTag=true;//requireAnimationFrame标记
            if(this.currentOptions.poll){
                setInterval(this.loadData.bind(this),this.currentOptions.timeout)
            }
            // this.restart();
        },
        defaultOptions:{
            dataType:"static",
            data: [],
            inSilder:false,
            showTime:3000,
            sliderIndex:0,
            poll:false,
            timeout:5000,
            marqueeStep:2,
            marqueeTimeout:32,
            innerStyle:{},
            rollingType: "seam",  //"seam","seamless","wait","seamlessWithBlank"
            BlankWidth:20,
            waitTime:2000,
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
                var panel=$(".list-table-event", this.node);
                panel.off("mouseover");
                panel.off("mouseout");
            }
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
                        var responseData=data.data;
                        if(!self.oldData||JSON.stringify(responseData)!=JSON.stringify(self.oldData)){
                            self.oldData=responseData;
                            self.idDataChange=true;
                        }
                        self.renderList();
                    }
                })
            }else if(this.currentOptions.dataType=="static"){
                if(!self.oldData||JSON.stringify(this.currentOptions.data)!=JSON.stringify(self.oldData)){
                    self.oldData=this.currentOptions.data;
                    self.idDataChange=true;
                }
                self.renderList();
            }
        },
        /**
        * @method
        * @desc 列表滚动
        */
        listScroll: function () {
            var self=this;
            var panel = $(".listCross-table-event", this.node);
            var panelW=panel.width();
            var panelTotle = $(".panelTotle",this.node);
            var ulHtml=$(".panelTotle>ul", this.node);
            var oldList=ulHtml;
            var ulHtmlW=oldList.width();
            var oldListW=ulHtmlW;
            var marquee=null;
            if (this.currentOptions.rollingType == "seam") {
                panelTotle.prepend("<div class='rollCross-space-div'></div>");
                panelTotle.append("<div class='rollCross-space-div'></div>");
                $(".rollCross-space-div", this.node).width(panel.width());
                $(".rollCross-space-div", this.node).css("visibility", "hidden");
                var panelWidth = panelW * 2 + ulHtml.width();
                panelTotle.css("width", panelWidth);
                marquee=function() {
                    // var oldList = $(".panelTotle ul", self.node);
                    if (oldList[0].offsetWidth + panelW - panel[0].scrollLeft <= 0) {
                        if (self.idDataChange) {
                            self.animationFrameTag=false;
                            // clearInterval(self.myMar);
                            self.renderList(true);
                            return;
                        } else {
                            panel[0].scrollLeft -= (oldList[0].offsetWidth + panelW);
                        }
                        
                    } else {
                        panel[0].scrollLeft+=self.currentOptions.marqueeStep;
                    }
                    if(self.animationFrameTag){
                        requestAnimationFrame(marquee);
                    }
                }
            } else if (this.currentOptions.rollingType == "seamless"){
                panelTotle.append(ulHtml.clone());
                var panelWidth = ulHtml.width() * 2 + 1;
                panelTotle.css("width", panelWidth);
                marquee=function() {
                    // var oldList = $(".panelTotle ul", self.node);
                    if (oldList[0].offsetWidth - panel[0].scrollLeft <= 0) {
                        if (self.idDataChange) {
                            self.animationFrameTag=false;
                            // clearInterval(self.myMar);
                            self.renderList(true);
                            return;
                        } else {
                            panel[0].scrollLeft -= (ulHtmlW);
                        }
                    } else {
                        panel[0].scrollLeft+=self.currentOptions.marqueeStep;
                    }
                    if(self.animationFrameTag){
                        requestAnimationFrame(marquee);
                    }
                }
            } else if (this.currentOptions.rollingType == "wait"){
                var panelWidth = ulHtml.width();
                panelTotle.css("width", panelWidth);
                marquee=function() {
                    // var oldList = $(".panelTotle ul", self.node);
                    if (oldList[0].offsetWidth - panel[0].scrollLeft <= panelW) {
                        if (self.idDataChange) {
                            self.animationFrameTag=false;
                            // clearInterval(self.myMar);
                            self.renderList(true);
                            return;
                        } 
                        /* else {
                            panel[0].scrollTop -= (oldList[0].offsetHeight-panel.height());
                        } */
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
                                this.isSliderShow = false;
                            },self.currentOptions.waitTime)
                        }
                    } else {
                        panel[0].scrollLeft+=self.currentOptions.marqueeStep;
                    }
                    if(self.animationFrameTag){
                        requestAnimationFrame(marquee);
                    }
                }
                var timeout1=setTimeout(function(){
                    clearTimeout(timeout1);
                    timeout1=null;
                    // if (self.myMar) {
                        // clearInterval(self.myMar);
                        // self.myMar = null;
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
            } else if (this.currentOptions.rollingType == "seamlessWithBlank"){
                
                panelTotle.append("<div class='Blankdiv' ></div>")
                panelTotle.append(ulHtml.clone());
                $('.Blankdiv').css("width", this.currentOptions.BlankWidth);
                var panelWidth = ulHtmlW * 2 + this.currentOptions.BlankWidth+1;
                panelTotle.css("width", panelWidth);
                marquee = function () {
                    // var oldList = $(".panelTotle ul", self.node);
                    if (oldList[0].offsetWidth + self.currentOptions.BlankWidth - panel[0].scrollLeft <= 0) {
                        if (self.idDataChange) {
                            self.animationFrameTag=false;
                            // clearInterval(self.myMar);
                            self.renderList(true);
                            return;
                        } else {
                            panel[0].scrollLeft -= (ulHtmlW + self.currentOptions.BlankWidth);
                        }
                    } else {
                        panel[0].scrollLeft += self.currentOptions.marqueeStep;
                    }
                    if(self.animationFrameTag){
                        requestAnimationFrame(marquee);
                    }
                }
            }

            if (this.currentOptions.rollingType == "seam" || this.currentOptions.rollingType == "seamless" || this.currentOptions.rollingType == "seamlessWithBlank"){
                /* if (self.myMar) {
                    clearInterval(self.myMar);
                    self.myMar = null;
                } */
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
            if(!mustRender&&(!self.idDataChange||self.isScroll)){
                return;
            }
            var data=this.oldData;
          /*   clearInterval(self.myMar); */
           /*  self.eventListPanel.empty(); */
            $(".listCross-table-event", this.node)[0].scrollLeft = 0;
            if (data.length == 0) {
                return;
            }
            $(".listCross-table-event .panelTotle",this.node).empty();
            var ulHtml = $("<ul></ul>");
            for(var i=0;i<data.length;i++){
                var title = data[i].value
                var liHtml = '<li class="eventCross-item" style="display:inline-block;">'+title+'</li>';
                ulHtml.append(liHtml)
            }
            
            this.html.find(".panelTotle").append(ulHtml);

            self.idDataChange=false;
            
            var isOverflow = $.common.isOverflow($(".listCross-table-event", this.node)[0]);
            if (isOverflow) {
                this.isScroll=true;
                this.listScroll();
            }else{
                this.isScroll=false;
            }
        },

        
        /**@method 获取页面html
    	 * @return string 页面html
    	 */
        getContentHtml: function () {
            var html = "";
            html = '<div class="listCross-table-event box" style="overflow:hidden;height: 33px;line-height: 33px;overflow: hidden;white-space: nowrap;width:100%;"><div class="panelTotle">'+
            '</div></div>'
            return html;
        }
    });
    namespace.carouselCrosswiseCom = carouselCrosswiseCom;
})(window);