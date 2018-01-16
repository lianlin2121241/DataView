/*
 * @Author: limingle
 * @Date:   2017-12-26 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2018-01-11 16:26:31
 * @description:轮播列表
 */

'use strict';

(function(namespace) {
    var carouselCom = Com.extends({
        init: function() {
        	var self = this;
            //合并后的参数
            this.currentOptions=$.extend(true,{},this.defaultOptions,this.options||{});
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
            data:[],//value,url
            inSilder:false,
            showTime:3000,
            sliderIndex:0,
            poll:false,
            timeout:5000,
            marqueeStep:2,
            marqueeTimeout:32,
            innerStyle:{},
            rollingType: "seam",  //"seam","seamless","wait","seamlessWithBlank"
            carouselType: "other",//"other","img"
            waitTime:2000,
            BlankHeight: 20,
            imgWidth:'100%',
            isRoll:'yes'//"yes","no"
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
            var panel = $(".list-table-event", this.node);
            var panelH=panel.height();
            var ulHtml = $(".list-table-event>ul", this.node);
            var ulHtmlH=ulHtml.height();
            var marquee=null;
            if (this.currentOptions.rollingType == "seam") {
                panel.prepend("<div class='roll-space-div'></div>");
                panel.append("<div class='roll-space-div'></div>");
                $(".roll-space-div", this.node).height(panel.height());
                $(".roll-space-div", this.node).css("visibility", "hidden");
                marquee=function() {
                    // var oldList = $(".list-table-event ul", self.node);
                    if (ulHtml[0].offsetHeight + panelH - panel[0].scrollTop <= 0) {
                        if (self.idDataChange) {
                            self.animationFrameTag=false;
                            // clearInterval(self.myMar);
                            self.renderList(true);
                            return;
                        } else {
                            panel[0].scrollTop -= (ulHtml[0].offsetHeight + panelH);
                        }
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
                    // var oldList = $(".list-table-event ul", self.node);
                    if (ulHtml[0].offsetHeight - panel[0].scrollTop <= 0) {
                        if (self.idDataChange) {
                            self.animationFrameTag=false;
                            // clearInterval(self.myMar);
                            self.renderList(true);
                            return;
                        } else {
                            panel[0].scrollTop -= ulHtmlH;
                        }
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
                    // var oldList = $(".list-table-event ul", self.node);
                    if (ulHtml[0].offsetHeight - panel[0].scrollTop <= panelH) {
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
                            self.waitTimeoutEnd=setTimeout(function(){
                                clearTimeout(self.waitTimeoutEnd);
                                self.waitTimeoutEnd=null;
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
                self.waitTimeoutStart=setTimeout(function(){
                    clearTimeout(self.waitTimeoutStart);
                    self.waitTimeoutStart=null;
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
            } else if (this.currentOptions.rollingType == "seamlessWithBlank") {

                panel.append("<div class='Blankdiv-vertical'></div>")
                panel.append(ulHtml.clone());
                $('.Blankdiv-vertical').css("height", this.currentOptions.BlankHeight);
                marquee = function () {
                    if (ulHtml[0].offsetHeight + self.currentOptions.BlankHeight - panel[0].scrollTop <= 0) {
                        if (self.idDataChange) {
                            self.animationFrameTag = false;
                            self.renderList(true);
                            return;
                        } else {
                            panel[0].scrollTop -= (ulHtmlH + self.currentOptions.BlankHeight);
                        }
                        if (self.isSliderShow) {
                            self.emit("broadcast", {
                                evtname: "sliderInnerCom.showEnd",
                                data: self.currentOptions.sliderIndex
                            })
                            this.isSliderShow = false;
                        }
                    } else {
                        panel[0].scrollTop += self.currentOptions.marqueeStep;
                    }
                    if (self.animationFrameTag) {
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
            var self = this;
            if (this.currentOptions.isRoll == 'yes') {
                var divWidth = this.html.parent().width() + 28;
                this.html.parent().css('overflow', 'hidden');
                this.html.css({ 'overflow': 'auto', 'width': divWidth, 'padding-right': '18px' })

            } else if (this.currentOptions.isRoll == 'no') {
                this.html.css({ 'overflow': 'hidden', 'width': '100%' })
            }
            /* console.log(data) */
            
            if(!mustRender&&(!self.idDataChange||self.isScroll)){
                return;
            }
            var data=this.oldData;
          /*   clearInterval(self.myMar); */
           /*  self.eventListPanel.empty(); */
            /* var divWidth = $(".list-table-event").parent().width();
            $('.list-table-event').css('width', divWidth+15); */
            $(".list-table-event", this.node)[0].scrollTop = 0;
            if (data.length == 0) {
                return;
            }
            $(".list-table-event",this.node).empty();
            var ulHtml = $("<ul></ul>");
            if(this.currentOptions.carouselType == "img"){
                for (var i = 0; i < data.length; i++) {
                    var imgUrl = data[i].url
                    var liHtml = '<li class="event-item" style="text-align:center;"><img src="' + globalVar.staticUrl + imgUrl + '" style="width:' + this.currentOptions.imgWidth+';" /></li>';
                    ulHtml.append(liHtml)
                }  
            } else if (this.currentOptions.carouselType == "other"){
                for (var i = 0; i < data.length; i++) {
                    var title = data[i].value
                    var liHtml = '<li class="event-item">' + title + '</li>';
                    ulHtml.append(liHtml)
                }
            }
            
            
            this.html.append(ulHtml);

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
    namespace.carouselCom = carouselCom;
})(window);