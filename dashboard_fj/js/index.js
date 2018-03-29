var app = new Vue({
    el: "#container",
    data: {
        baseURL:'http://10.99.2.103:8182/rest/',
        charts:{}  //存储echarts实例

    },
    mounted:function(){
        this.$nextTick(function(){
            var _this = this;
            _this.themeAjax();
            // setTimeout(function(){
            //     // setInterval(function(){
            //     _this.themeAjax();
            // },1000)
        });
    },
    methods:{
        // themeAjax:function(){
        //     //交通综合行政执法热力图
        //     $.ajax({
        //         url: this.baseURL + 'FJ_13',
        //         success: function (res) {
        //             let style = {
        //                 color:'#8FD1AA'
        //             }
        //             // 第一次绘制时，初始化实例
        //             if (!app.charts.map) {
        //                 app.charts.map = echarts.init(document.getElementById('l-t')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
        //             }
        //             //传入设置项
        //             app.charts.map.setOption(Map(res)); //显示图形
        //         }
        //     })
        //
        //
        //     //抽检合格占比
        //     $.ajax({
        //         url: this.baseURL + 'FJ_01',
        //         success: function (res) {
        //             //第一次绘制时，初始化实例
        //             if (!app.charts.pie_1) {
        //                 app.charts.pie_1 = echarts.init(document.getElementById('c-t')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
        //             }
        //             //传入设置项
        //             app.charts.pie_1.setOption(Pie(res)); //显示图形
        //         }
        //     })
        //     //数据单位抽检数据合格率
        //     $.ajax({
        //         url: this.baseURL + 'FJ_02',
        //         success: function (res) {
        //             let style = {
        //                 color:'#8FD1AA'
        //             }
        //             //第一次绘制时，初始化实例
        //             if (!app.charts.barline_1) {
        //                 app.charts.barline_1 = echarts.init(document.getElementById('c-r-t')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
        //             }
        //             //传入设置项
        //             app.charts.barline_1.setOption(BarLine(res,style)); //显示图形
        //         }
        //     })
        //     //主要抽检项目合格率
        //     $.ajax({
        //         url: this.baseURL + 'FJ_03',
        //         success: function (res) {
        //             let style = {
        //                 color:'#8FD1AA'
        //             }
        //             //第一次绘制时，初始化实例
        //             if (!app.charts.barline_2) {
        //                 app.charts.barline_2 = echarts.init(document.getElementById('c-r-c')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
        //             }
        //             //传入设置项
        //             app.charts.barline_2.setOption(BarLine(res,style)); //显示图形
        //         }
        //     })
        //     //企业信用值区间分布
        //     $.ajax({
        //         url: this.baseURL + 'FJ_04',
        //         success: function (res) {
        //             let style = {
        //                 color:'#2168D2'
        //             }
        //             //第一次绘制时，初始化实例
        //             if (!app.charts.bar_1) {
        //                 app.charts.bar_1 = echarts.init(document.getElementById('c-r-b-1')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
        //             }
        //             //传入设置项
        //             app.charts.bar_1.setOption(Bar(res,style)); //显示图形
        //         }
        //     })
        //     //企业信用评价占比
        //     $.ajax({
        //         url: this.baseURL + 'FJ_05',
        //         success: function (res) {
        //             //第一次绘制时，初始化实例
        //             if (!app.charts.pie_2) {
        //                 app.charts.pie_2 = echarts.init(document.getElementById('c-c')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
        //             }
        //             //传入设置项
        //             app.charts.pie_2.setOption(Pie(res)); //显示图形
        //         }
        //     })
        //     //数据单位企业信用评价占比
        //     $.ajax({
        //         url: this.baseURL + 'FJ_06',
        //         success: function (res) {
        //             //第一次绘制时，初始化实例
        //             if (!app.charts.lineStack) {
        //                 app.charts.lineStack = echarts.init(document.getElementById('r-t')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
        //             }
        //             //传入设置项
        //             app.charts.lineStack.setOption(LineStack(res)); //显示图形
        //         }
        //     })
        //     //每年获表彰企业
        //     $.ajax({
        //         url: this.baseURL + 'FJ_07',
        //         success: function (res) {
        //             let style = {
        //                 color:'#FF8402'
        //             }
        //             //第一次绘制时，初始化实例
        //             if (!app.charts.bar_2) {
        //                 app.charts.bar_2 = echarts.init(document.getElementById('c-r-b-2')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
        //             }
        //             //传入设置项
        //             app.charts.bar_2.setOption(Bar(res,style)); //显示图形
        //         }
        //     })
        //     //守信红名单发布单位
        //     $.ajax({
        //         url: this.baseURL + 'FJ_09',
        //         success: function (res) {
        //             let style = {
        //                 color:'#FF8402'
        //             }
        //             //第一次绘制时，初始化实例
        //             if (!app.charts.fallsBar_1) {
        //                 app.charts.fallsBar_1 = echarts.init(document.getElementById('l-b-1')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
        //             }
        //             //传入设置项
        //             app.charts.fallsBar_1.setOption(FallsBar(res,style)); //显示图形
        //         }
        //     })
        //     //失信黑名单分类
        //     $.ajax({
        //         url: this.baseURL + 'FJ_10',
        //         success: function (res) {
        //             let style = {
        //                 color:'#2168D2'
        //             }
        //             //第一次绘制时，初始化实例
        //             if (!app.charts.fallsBar_2) {
        //                 app.charts.fallsBar_2 = echarts.init(document.getElementById('l-b-2')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
        //             }
        //             //传入设置项
        //             app.charts.fallsBar_2.setOption(FallsBar(res,style)); //显示图形
        //         }
        //     })
        //
        //     //行政处罚量年度分布
        //     $.ajax({
        //         url: this.baseURL + 'FJ_12',
        //         success: function (res) {
        //             let style = {
        //                 color:'#2BC3CB'
        //             }
        //             //第一次绘制时，初始化实例
        //             if (!app.charts.bar_3) {
        //                 app.charts.bar_3 = echarts.init(document.getElementById('c-b')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
        //             }
        //             //传入设置项
        //             app.charts.bar_3.setOption(Bar(res,style)); //显示图形
        //         }
        //     })
        //
        //     //小微企业享受扶持量
        //     $.ajax({
        //         url: this.baseURL + 'FJ_11',
        //         success: function (res) {
        //             let style = {
        //                 color:'#8FD1AA'
        //             }
        //             //第一次绘制时，初始化实例
        //             if (!app.charts.barStack) {
        //                 app.charts.barStack = echarts.init(document.getElementById('r-b')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
        //             }
        //             //传入设置项
        //             app.charts.barStack.setOption(BarStack(res,style)); //显示图形
        //         }
        //     })
        //     //获各级别表彰企业
        //     $.ajax({
        //         url: this.baseURL + 'FJ_08',
        //         success: function (res) {
        //             let style = {
        //                 color:'#2BC3CB'
        //             }
        //             //第一次绘制时，初始化实例
        //             if (!app.charts.bar_4) {
        //                 app.charts.bar_4 = echarts.init(document.getElementById('r-c')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
        //             }
        //             //传入设置项
        //             app.charts.bar_4.setOption(Bar(res,style)); //显示图形
        //         }
        //     })
        //
        // },

        themeAjax:function(){
            //交通综合行政执法热力图
            $.getJSON('./json/FJ13.json',function (res) {
                let style = {
                    color:'#8FD1AA'
                }
                // 第一次绘制时，初始化实例
                if (!app.charts.map) {
                    app.charts.map = echarts.init(document.getElementById('l-t')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
                }
                //传入设置项
                app.charts.map.setOption(Map(res)); //显示图形
            })

            //抽检合格占比
            $.getJSON('./json/FJ01.json',function (res) {
                //第一次绘制时，初始化实例
                if (!app.charts.pie_1) {
                    app.charts.pie_1 = echarts.init(document.getElementById('c-t')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
                }
                //传入设置项
                app.charts.pie_1.setOption(Pie(res)); //显示图形
            })
            //数据单位抽检数据合格率
            $.getJSON('./json/FJ02.json',function (res) {
                let style = {
                    color:'#8FD1AA'
                }
                //第一次绘制时，初始化实例
                if (!app.charts.barline_1) {
                    app.charts.barline_1 = echarts.init(document.getElementById('c-r-t')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
                }
                //传入设置项
                app.charts.barline_1.setOption(BarLine(res,style)); //显示图形
            })

            //主要抽检项目合格率
            $.getJSON('./json/FJ03.json',function (res) {
                let style = {
                    color:'#8FD1AA'
                }
                //第一次绘制时，初始化实例
                if (!app.charts.barline_2) {
                    app.charts.barline_2 = echarts.init(document.getElementById('c-r-c')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
                }
                //传入设置项
                app.charts.barline_2.setOption(BarLine(res,style)); //显示图形
            })
            //企业信用值区间分布
            $.getJSON('./json/FJ04.json',function (res) {
                let style = {
                    color:'#2168D2'
                }
                //第一次绘制时，初始化实例
                if (!app.charts.bar_1) {
                    app.charts.bar_1 = echarts.init(document.getElementById('c-r-b-1')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
                }
                //传入设置项
                app.charts.bar_1.setOption(Bar(res,style)); //显示图形
            })
            //企业信用评价占比
            $.getJSON('./json/FJ05.json',function (res) {
                //第一次绘制时，初始化实例
                if (!app.charts.pie_2) {
                    app.charts.pie_2 = echarts.init(document.getElementById('c-c')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
                }
                //传入设置项
                app.charts.pie_2.setOption(Pie(res)); //显示图形
            })
            //数据单位企业信用评价占比
            $.getJSON('./json/FJ06.json',function (res) {
                //第一次绘制时，初始化实例
                if (!app.charts.lineStack) {
                    app.charts.lineStack = echarts.init(document.getElementById('r-t')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
                }
                //传入设置项
                app.charts.lineStack.setOption(LineStack(res)); //显示图形
            })
            //每年获表彰企业
            $.getJSON('./json/FJ07.json',function (res) {
                let style = {
                    color:'#FF8402'
                }
                //第一次绘制时，初始化实例
                if (!app.charts.bar_2) {
                    app.charts.bar_2 = echarts.init(document.getElementById('c-r-b-2')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
                }
                //传入设置项
                app.charts.bar_2.setOption(Bar(res,style)); //显示图形
            })
            //守信红名单发布单位
            $.getJSON('./json/FJ09.json',function (res) {
                let style = {
                    color:'#FF8402'
                }
                //第一次绘制时，初始化实例
                if (!app.charts.fallsBar_1) {
                    app.charts.fallsBar_1 = echarts.init(document.getElementById('l-b-1')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
                }
                //传入设置项
                app.charts.fallsBar_1.setOption(FallsBar(res,style)); //显示图形
            })
            //失信黑名单分类
            $.getJSON('./json/FJ10.json',function (res) {
                let style = {
                    color:'#2168D2'
                }
                //第一次绘制时，初始化实例
                if (!app.charts.fallsBar_2) {
                    app.charts.fallsBar_2 = echarts.init(document.getElementById('l-b-2')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
                }
                //传入设置项
                app.charts.fallsBar_2.setOption(FallsBar(res,style)); //显示图形
            })

            //行政处罚量年度分布
            $.getJSON('./json/FJ12.json',function (res) {
                let style = {
                    color:'#2BC3CB'
                }
                //第一次绘制时，初始化实例
                if (!app.charts.bar_3) {
                    app.charts.bar_3 = echarts.init(document.getElementById('c-b')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
                }
                //传入设置项
                app.charts.bar_3.setOption(Bar(res,style)); //显示图形
            })

            //小微企业享受扶持量
            $.getJSON('./json/FJ11.json',function (res) {
                let style = {
                    color:'#8FD1AA'
                }
                //第一次绘制时，初始化实例
                if (!app.charts.barStack) {
                    app.charts.barStack = echarts.init(document.getElementById('r-b')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
                }
                //传入设置项
                app.charts.barStack.setOption(BarStack(res,style)); //显示图形
            })
            //获各级别表彰企业
            $.getJSON('./json/FJ08.json',function (res) {
                let style = {
                    color:'#2BC3CB'
                }
                //第一次绘制时，初始化实例
                if (!app.charts.bar_4) {
                    app.charts.bar_4 = echarts.init(document.getElementById('r-c')); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
                }
                //传入设置项
                app.charts.bar_4.setOption(Bar(res,style)); //显示图形
            })

        }
    }
});




//图表自适应重绘
window.onresize =function(){
    app.themeAjax();
};

//全屏
// fullScreen();
function fullScreen(){
    var flag = true;
    document.getElementById("full").onclick=function(){

        // window.parent.onOpen();
        // window.parent.requestFullScreen(document.documentElement);


        if(flag){
            requestFullScreen(document.documentElement);// 整个网页

            //切换value值
            $(this).val('退出全屏');
            flag = false;
        }else{
            exitFull(document.documentElement);// 整个网页
            //切换value值
            $(this).val('全屏');
            flag = true;
        }
    };

    function requestFullScreen(element) {
        // 判断各种浏览器，找到正确的方法
        var requestMethod = element.requestFullScreen || //W3C
            element.webkitRequestFullScreen ||    //Chrome等
            element.mozRequestFullScreen || //FireFox
            element.msRequestFullScreen; //IE11
        if (requestMethod) {
            requestMethod.call(element);
        }
        else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }

//退出全屏 判断浏览器种类
    function exitFull() {
        // 判断各种浏览器，找到正确的方法
        var exitMethod = document.exitFullscreen || //W3C
            document.mozCancelFullScreen ||    //Chrome等
            document.webkitExitFullscreen || //FireFox
            document.webkitExitFullscreen; //IE11
        if (exitMethod) {
            exitMethod.call(document);
        }
        else if (typeof window.ActiveXObject !== "undefined") {//for Internet Explorer
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }
}


//判断token
var token = '';
if(top.location != location){
    token = getToken();
}else{
    token = 'Bearer e4e89e47-a0a9-4d9d-b2e7-4db4554bab2d';
}


//获取地址参数 token
function getToken(){
    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    if(GetQueryString("token") != null && GetQueryString("token").toString().length>1){
        return GetQueryString("token");
    }
}

window.onresize = function () {
    setTimeout(() => {
        Object.entries(app.charts).forEach(([key, value]) => {
            value.resize()
        });
    }, 200)
}
