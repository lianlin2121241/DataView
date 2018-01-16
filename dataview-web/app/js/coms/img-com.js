/*
 * @Author: limingle
 * @Date:   2017-12-26 09:48:10
 * @Last Modified by: Synway SFE
 * @Last Modified time: 2018-01-05 12:44:48
 * @description:轮播列表
 */

'use strict';

(function (namespace) {
    var imgCom = Com.extends({
        init: function () {
            var self = this;
            //合并后的参数
            this.currentOptions = $.extend(true, {}, this.defaultOptions, this.options || {});
            this.html = $(this.getContentHtml());
            this.html.css(this.currentOptions.innerStyle);
            this.node.append(this.html);
            this.loadData();
            this.oldData = null;//记录老的数据
            this.idDataChange = false;//标记数据是否变化
            if (this.currentOptions.poll) {
                setInterval(this.loadData.bind(this), this.currentOptions.timeout)
            }
            // this.restart();
        },
        defaultOptions: {
            dataType: "static",
            url:"",//url
            inSilder: false,
            showTime: 3000,
            sliderIndex: 0,
            poll: false,
            timeout: 5000,
            innerStyle: {}
        },
        restart: function () {
            var self = this;
            if (this.currentOptions.inSilder) {
                self.emit("broadcast", {
                    evtname: "sliderInnerCom.showStart",
                    data: self.currentOptions.sliderIndex
                })
                !!self.oldData && self.renderData(self.oldData);
            }
        },
        start:function(){
            var self = this;
            function showEndHandel() {
                self.emit("broadcast", {
                    evtname: "sliderInnerCom.showEnd",
                    data: self.currentOptions.sliderIndex
                })
            }
            if(this.sliderTime){
                clearInterval(self.sliderTime);
                this.sliderTime=null;
            }
            this.sliderTime = setTimeout(showEndHandel, this.currentOptions.showTime);

            this.node.off("mouseover").on("mouseover", function () {
                self.isMouseovered=true;
                clearInterval(self.sliderTime);
                this.sliderTime = null;
            })
            this.node.off("mouseout").on("mouseout", function () {
                if(!self.isMouseovered){
                    return;
                }
                self.isMouseovered=false;
                self.sliderTime = setTimeout(showEndHandel, self.currentOptions.showTime);
            })
        },
        stop: function () {
            this.isMouseovered=false;
            clearTimeout(this.sliderTime);
            this.sliderTime = null;
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
                        var responseData = data.data;
                        if (!self.oldData || JSON.stringify(responseData) != JSON.stringify(self.oldData)) {
                            self.oldData = responseData;
                            self.idDataChange = true;
                        }
                        self.renderData();
                    }
                })
            } else if (this.currentOptions.dataType == "static") {
                if (!self.oldData || JSON.stringify(this.currentOptions.data) != JSON.stringify(self.oldData)) {
                    self.oldData = this.currentOptions.url;
                    self.idDataChange = true;
                }
                self.renderData();
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
        renderData: function () {
            var self = this;
            var imgHtml = '<img src="' + globalVar.staticUrl+self.currentOptions.url + '" style="max-width:100%;max-height:100%;"/>';
            this.html.append(imgHtml);
        },


        /**@method 获取页面html
    	 * @return string 页面html
    	 */
        getContentHtml: function () {
            var html = "";
            html = '<div class="list-img-event" style="overflow:hidden;width:100%;height:100%;text-align: center;">' +
                '</div>'
            return html;
        }
    });
    namespace.imgCom = imgCom;
})(window);