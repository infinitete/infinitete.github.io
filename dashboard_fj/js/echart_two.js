

/*Echart*/

/**
 *
 *
 */

    /**
        var dataLineBar = {
            id:'lineBar',
            titleText:'各部门目录状态统计',
            subText:'数据模型',
            dataZoomShow:true,//数据区域缩放 是否显示
            markPoint:[false,false,true,true],
            markLine:[false,true,false,true],
            series_type:['bar','bar','line','bar'],
            xArray:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
            yName:'数量',
            data:[
                {name:'待注册',value:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]},
                {name:'待审核',value:[5,6,8,13,4,3, 9,10,12,6,7,8]},
                {name:'待发布',value:[1,13,37,35,15,13,25,21,6,45,32,2]},
                {name:'已发布',value:[51,61,81,78,48,31,91,10,35,20,77,81]}
            ]
        };
    */

    /**
     * @common
     * id               生成图形的容器的id 必须存在宽高
     * titleText        图形标题
     * subText          副标题
     * xArray           x坐标数值，只支持多维度图形。例如：饼状图，liquidFill等类型不存在
     * data             生成图形的数据 以及 name。 (1) line，bar ： value [0,1,0,2,1,0,1]
     *                                           (2) Scatter  ： value：[[x,y,size],[x,y,size]]
     *                                           (3) map,pie,liquidFill : value : number
     * @柱状图折线图
     * dataZoomShow      存在 区域缩放，其他图形不存在; 默认false
     * markPoint         最大值、最小值是否存在
     * markLine          平均值、是否存在
     * series_type       选择line，bar 类型 默认为bar
     * yName             y轴name
     * stack,            柱状图 是否堆积 默认false
     *colorArray         柱体颜色，折线颜色  例如： ['rgb(50,218,221)','rgb(151,181,82)'],
     *
     *
     * @地图
     * center:           地图中心 所处位置 [经纬度] 默认为[113.65, 34.76]
     * zoom :1           地图缩放倍数 默认为1
     *
     * @饼状图
     * radius             饼状图大小     默认 '65%'
     * Center             饼状图所处位置 默认 ['50%,'50%']
     */

function getCtxPath(){
    var path = document.getElementById('ctxpth').value;

    return path;
}

//x轴坐标
function setxAxis(res,dataLen){
    var arr =[];
    for (var i =0;i<dataLen;i++){
    	if(res[i].name.length > 6){
    		
    		if(res[i].name.slice(0,1) == '['){
    			arr.push(res[i].name.slice(1,7).concat('...'))
    		}else{
    			arr.push(res[i].name.slice(0,6).concat('...'))
    		}
    		
    	}else{
    		 arr.push(res[i].name)
    	}
       
        
    }
    return arr;
}
function viewData(res){
    var arr =[];
    for(var i =0;i<res.length;i++){
        arr.push({name:res[i].name,value:res[i].value});
    }
    return arr;
}

/*饼状图pie*/

function EchartPie(data,styleContent){
    var dataValue  = viewData(data.data[0].valueSet);
    dataValue.length = styleContent.amount ? styleContent.amount : dataValue.length;
    var dataTitle = data.title ? data.title : styleContent.titleText;
    //排序
    var dataSort = dataValue.sort(function (a, b) {
        return b.value - a.value;
    });
    //data对象 改为数组
    var legendArr =[],dataArray =[];
    ~function (){
        for(var i=0;i<dataValue.length;i++){
            dataArray.push(dataSort[i].value);
            legendArr.push(dataSort[i].name);
        }
    }();
    var arr =[];
    if(dataArray!='' && legendArr != ''){
        for(var i =0;i<dataArray.length;i++){
            if(dataArray[0] == dataArray[i]){
                arr.push({value:dataArray[i],name:legendArr[i]});
            }else {
                arr.push({value:dataArray[i],name:legendArr[i]});
            }
        }
    }
    var optionpie = {
        title : {
            text: styleContent.amount ? dataTitle.replace('N',styleContent.amount) : dataTitle,
            x:'left',
            textStyle:{
                color:styleContent.color,
                // fontSize:styleContent.titleFontSize || 16,
                fontSize: 16,
                fontFamily:styleContent.titleFontFamily || 'Lato,Helvetica,Arial,sans-serif'
            },
            padding: styleContent.titlePadding || 30
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        color:styleContent.colorArray || ['#00c3c9', '#339999', '#3399cc', '#339933', '#669933',
            '#669933', '#99cc99', '#99ccff', '#0099cc', '#3366cc',
            '#6666cc', '#6666cc'
        ],
        // color:['#00f4ff','#0075e6','#00c2ff','#f7bb1e','#d96b73','#ca8622','#bda29a','#cca413','#e1bda2','#9c6680'],
//        color:['#c23531','#61a0a8','#d48265','#91c7ae','#749f83','#ca8622','#bda29a','#cca413','#e1bda2','#9c6680'],
        legend: {
            orient: 'vertical',
            x: styleContent.legend.x,
            data: legendArr,
            textStyle:{
                color:styleContent.color,
                // fontSize:styleContent.legend.fontSize
                fontSize: 12
            },
            y: styleContent.legend.y,
            itemGap: styleContent.legend.itemGap,
            itemWidth: styleContent.legend.itemWidth,
            itemHeight: styleContent.legend.itemHeight,
            padding: 30
        },
        series : [
            {
                name: '',
                type: 'pie',
                radius :(function(){
                    // var radius = styleContent.radius ? styleContent.radius : '65%';
                    // return radius;
                    return '50%'
                })() ,
                center: (function(){
                    var center = styleContent.Center ? styleContent.Center : ['50%','50%'];
                    return center;
                })(),
                data:arr,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: styleContent.itemStyle.emphasis ? styleContent.itemStyle.emphasis : false,          //是否在圆环中心显示鼠标划入扇形的name
                        position: 'center',
                        textStyle: {
                            // fontSize: '16',
                            fontSize: 16,
                            fontWeight: 'bold'
                        }
                    }
                },
                itemStyle: {
                    normal:{
                        color:'',
                        label: {
                            show: styleContent.itemStyle.label
                        },
                        labelLine: {
                            show: styleContent.itemStyle.labelLine
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    return optionpie;
    // var myChartpie = echarts.init(document.getElementById(styleContent.id));// 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
    // // option = getOptionByArray(json, reportDesign);//得到option图形
    // myChartpie.setOption(optionpie); //显示图形
    // // app.charts.push(myChartpie);
    // return myChartpie;
}

/*地图map*/
function EchartMap(data){
    //经纬度
    var geoCoordMap = {
        '海门':[121.15,31.89],
        '鄂尔多斯':[109.781327,39.608266],
        '招远':[120.38,37.35],
        '舟山':[122.207216,29.985295],
        '齐齐哈尔':[123.97,47.33],
        '盐城':[120.13,33.38],
        '赤峰':[118.87,42.28],
        '青岛':[120.33,36.07],
        '乳山':[121.52,36.89],
        '金昌':[102.188043,38.520089],
        '泉州':[118.58,24.93],
        '莱西':[120.53,36.86],
        '日照':[119.46,35.42],
        '胶南':[119.97,35.88],
        '南通':[121.05,32.08],
        '拉萨':[91.11,29.97],
        '云浮':[112.02,22.93],
        '梅州':[116.1,24.55],
        '文登':[122.05,37.2],
        '上海':[121.48,31.22],
        '攀枝花':[101.718637,26.582347],
        '威海':[122.1,37.5],
        '承德':[117.93,40.97],
        '厦门':[118.1,24.46],
        '汕尾':[115.375279,22.786211],
        '潮州':[116.63,23.68],
        '丹东':[124.37,40.13],
        '太仓':[121.1,31.45],
        '曲靖':[103.79,25.51],
        '烟台':[121.39,37.52],
        '福州':[119.3,26.08],
        '瓦房店':[121.979603,39.627114],
        '即墨':[120.45,36.38],
        '抚顺':[123.97,41.97],
        '玉溪':[102.52,24.35],
        '张家口':[114.87,40.82],
        '阳泉':[113.57,37.85],
        '莱州':[119.942327,37.177017],
        '湖州':[120.1,30.86],
        '汕头':[116.69,23.39],
        '昆山':[120.95,31.39],
        '宁波':[121.56,29.86],
        '湛江':[110.359377,21.270708],
        '揭阳':[116.35,23.55],
        '荣成':[122.41,37.16],
        '连云港':[119.16,34.59],
        '葫芦岛':[120.836932,40.711052],
        '常熟':[120.74,31.64],
        '东莞':[113.75,23.04],
        '河源':[114.68,23.73],
        '淮安':[119.15,33.5],
        '泰州':[119.9,32.49],
        '南宁':[108.33,22.84],
        '营口':[122.18,40.65],
        '惠州':[114.4,23.09],
        '江阴':[120.26,31.91],
        '蓬莱':[120.75,37.8],
        '韶关':[113.62,24.84],
        '嘉峪关':[98.289152,39.77313],
        '广州':[113.23,23.16],
        '延安':[109.47,36.6],
        '太原':[112.53,37.87],
        '清远':[113.01,23.7],
        '中山':[113.38,22.52],
        '昆明':[102.73,25.04],
        '寿光':[118.73,36.86],
        '盘锦':[122.070714,41.119997],
        '长治':[113.08,36.18],
        '深圳':[114.07,22.62],
        '珠海':[113.52,22.3],
        '宿迁':[118.3,33.96],
        '咸阳':[108.72,34.36],
        '铜川':[109.11,35.09],
        '平度':[119.97,36.77],
        '佛山':[113.11,23.05],
        '海口':[110.35,20.02],
        '江门':[113.06,22.61],
        '章丘':[117.53,36.72],
        '肇庆':[112.44,23.05],
        '大连':[121.62,38.92],
        '临汾':[111.5,36.08],
        '吴江':[120.63,31.16],
        '石嘴山':[106.39,39.04],
        '沈阳':[123.38,41.8],
        '苏州':[120.62,31.32],
        '茂名':[110.88,21.68],
        '嘉兴':[120.76,30.77],
        '长春':[125.35,43.88],
        '胶州':[120.03336,36.264622],
        '银川':[106.27,38.47],
        '张家港':[120.555821,31.875428],
        '三门峡':[111.19,34.76],
        '锦州':[121.15,41.13],
        '南昌':[115.89,28.68],
        '柳州':[109.4,24.33],
        '三亚':[109.511909,18.252847],
        '自贡':[104.778442,29.33903],
        '吉林':[126.57,43.87],
        '阳江':[111.95,21.85],
        '泸州':[105.39,28.91],
        '西宁':[101.74,36.56],
        '宜宾':[104.56,29.77],
        '呼和浩特':[111.65,40.82],
        '成都':[104.06,30.67],
        '大同':[113.3,40.12],
        '镇江':[119.44,32.2],
        '桂林':[110.28,25.29],
        '张家界':[110.479191,29.117096],
        '宜兴':[119.82,31.36],
        '北海':[109.12,21.49],
        '西安':[108.95,34.27],
        '金坛':[119.56,31.74],
        '东营':[118.49,37.46],
        '牡丹江':[129.58,44.6],
        '遵义':[106.9,27.7],
        '绍兴':[120.58,30.01],
        '扬州':[119.42,32.39],
        '常州':[119.95,31.79],
        '潍坊':[119.1,36.62],
        '重庆':[106.54,29.59],
        '台州':[121.420757,28.656386],
        '南京':[118.78,32.04],
        '滨州':[118.03,37.36],
        '贵阳':[106.71,26.57],
        '无锡':[120.29,31.59],
        '本溪':[123.73,41.3],
        '克拉玛依':[84.77,45.59],
        '渭南':[109.5,34.52],
        '马鞍山':[118.48,31.56],
        '宝鸡':[107.15,34.38],
        '焦作':[113.21,35.24],
        '句容':[119.16,31.95],
        '北京':[116.46,39.92],
        '徐州':[117.2,34.26],
        '衡水':[115.72,37.72],
        '包头':[110,40.58],
        '绵阳':[104.73,31.48],
        '乌鲁木齐':[87.68,43.77],
        '枣庄':[117.57,34.86],
        '杭州':[120.19,30.26],
        '淄博':[118.05,36.78],
        '鞍山':[122.85,41.12],
        '溧阳':[119.48,31.43],
        '库尔勒':[86.06,41.68],
        '安阳':[114.35,36.1],
        '开封':[114.35,34.79],
        '济南':[117,36.65],
        '德阳':[104.37,31.13],
        '温州':[120.65,28.01],
        '九江':[115.97,29.71],
        '邯郸':[114.47,36.6],
        '临安':[119.72,30.23],
        '兰州':[103.73,36.03],
        '沧州':[116.83,38.33],
        '临沂':[118.35,35.05],
        '南充':[106.110698,30.837793],
        '天津':[117.2,39.13],
        '富阳':[119.95,30.07],
        '泰安':[117.13,36.18],
        '诸暨':[120.23,29.71],
        '郑州':[113.65,34.76],
        '哈尔滨':[126.63,45.75],
        '聊城':[115.97,36.45],
        '芜湖':[118.38,31.33],
        '唐山':[118.02,39.63],
        '平顶山':[113.29,33.75],
        '邢台':[114.48,37.05],
        '德州':[116.29,37.45],
        '济宁':[116.59,35.38],
        '荆州':[112.239741,30.335165],
        '宜昌':[111.3,30.7],
        '义乌':[120.06,29.32],
        '丽水':[119.92,28.45],
        '洛阳':[112.44,34.7],
        '秦皇岛':[119.57,39.95],
        '株洲':[113.16,27.83],
        '石家庄':[114.48,38.03],
        '莱芜':[117.67,36.19],
        '常德':[111.69,29.05],
        '保定':[115.48,38.85],
        '湘潭':[112.91,27.87],
        '金华':[119.64,29.12],
        '岳阳':[113.09,29.37],
        '长沙':[113,28.21],
        '衢州':[118.88,28.97],
        '廊坊':[116.7,39.53],
        '菏泽':[115.480656,35.23375],
        '合肥':[117.27,31.86],
        '武汉':[114.31,30.52],
        '大庆':[125.03,46.58]
    };

//地区value值 和经纬度组合到一起
    var convertData = function (Data) {
        var res = [];
        for (var i = 0; i < Data.data.length; i++) {
            var geoCoord = geoCoordMap[Data.data[i].name];
            if (geoCoord) {
                res.push({
                    name: Data.data[i].name,
                    value: geoCoord.concat(Data.data[i].value)
                });
            }
        }
        return res;
    };

    var optionMap = {
        //color:['rgb(92,137,135)','rgb(0,91,90)','rgb(37,56,107)','rgb(100,52,65)','rgb(234,205,209)','rgb(106,104,52)'],
        title: {
            text: data.titleText,
            subtext: data.subtext,
            x: 'right',
            y:'bottom',
            textStyle:{
                fontSize:'25',
                color:'#c5c5c5',
                fontFamily:'楷体'
            }
        },
        tooltip : {                         //提示框组件
            trigger: 'item'                 //数据项图形触发
        },
        grid: {
            //右侧柱状图位置
            //show:true,
            //backgroundColor:"rgba(0,0,0,0)",
            //borderColor:"rgba(0,0,0,0)",
            right: 30,
            top: 50,
            bottom: 40,
            width: '10%',
            height:'70%'
        },
        xAxis: {
            //柱状图X轴配置项
            type: 'value',
            scale: true,
            position: 'top',
            boundaryGap: false,
            splitLine: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            axisLabel: {margin: 2, textStyle: {color: '#aaa'}}
        },
        yAxis: {
            type: 'category',
            nameGap: 16,
            axisLine: {show: false, lineStyle: {color: '#ddd'}},
            axisTick: {show: false, lineStyle: {color: '#ddd'}},
            axisLabel: {interval: 0, textStyle: {color: '#ddd'}},
            data: []
        },
        legend: {                           //图例组件
//            orient: 'vertical',
            y: 'bottom',
            x:'right',
            data:['销售额'],
            textStyle: {
                color: '#c5c5c5'
            }
        },
        // itemStyle: {
        //     normal: {
        //         areaColor: 'rgba(50, 60, 72, 0.1)',
        //         borderColor: '#fff'
        //     },
        //     emphasis: {
        //         areaColor: '#2a333d'
        //     }
        // },

        geo: {  //地图配置项
            map: 'china',                   //标记地图区域
            label: {
                emphasis: {                 //省会名称是否显示 mouseover
                    show: false
                }
            },
            // layoutCenter: ['50%', '50%'],
            center:(function(){
                return data.center? data.center:[113.65, 34.76]
            })(),  //地图的中心位置
            zoom:data.zoom,                       //当前缩放比例
            roam: true,                     //  是否缩放大小
            itemStyle: {
                normal: {
                    // areaColor: 'rgba(50, 60, 72, 0.1)',
                    areaColor: '#439ff8',
                    // color: 'red',
                    borderColor: '#fff'
                    // borderColor: '#1a1847'
                },
                emphasis: {
                    // areaColor: '#2a333d'
                    areaColor: '#7a60c4'
                }
            }
        },

        series : [
            {
                name: '跨链调用次数',
                type: 'effectScatter',          //带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。
                mapType: 'world',
                coordinateSystem: 'geo',        //使用地理坐标系 geo 代表地理关系
                data: convertData(data),            //
                symbolSize: function (val) {
                    return val[2] / 100;
                },
                showEffectOn: 'render',   //涟漪动画 何时显示 render 页面加载完成之后开始动画  emphasis （hover） 是才能触发动画
                rippleEffect: {            //涟漪动画的配置项
                    brushType: 'stroke'   //线性渐变
                },
                hoverAnimation: true,
                label: {                    //提示框
                    normal: {
                        formatter: '{b}',
                        // formatter: '{b}:{c}',
                        position: 'right',
                        show: true
                    }
                },
                tooltip:{
                    formatter:'{b}'
                },
                itemStyle: {
                    normal: {
                        color: 'red',//涟漪动画的 颜色
                        shadowBlur: 2,
                        shadowColor: '#333',
                        areaStyle:{color:'green'}
                    }
                },
                zlevel: 1
            }
        ]
    };
    var myChartMap = echarts.init(document.getElementById(data.id),data.theme);// 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
    myChartMap.setOption(optionMap); //显示图形
}


function EchartWorldMap(data) {
    var latlong = {};
    latlong.beijing  = {'latitude':40, 'longitude':116};
    latlong.guiyang  = {'latitude':27, 'longitude':107};
    latlong.shanghai = {'latitude':31, 'longitude':121.5};

    var mapData = [
        {'code':'beijing' , 'name':'北京', 'value':6000, 'color':'#FF0033'},
        {'code':'guiyang' , 'name':'贵阳', 'value':6000, 'color':'##FFFF66'},
        {'code':'shanghai' , 'name':'上海', 'value':6000, 'color':'red'},
    ];

    var max = -Infinity;
    var min = Infinity;
    mapData.forEach(function (itemOpt) {
        if (itemOpt.value > max) {
            max = itemOpt.value;
        }
        if (itemOpt.value < min) {
            min = itemOpt.value;
        }
    });

    var option = {
        backgroundColor: 'none',
        tooltip : {
            trigger: 'item',
            formatter : function (params) {
                return params.name;
            }
        },
        geo: {
            type: 'map',
            map: 'world',
            type: 'effectScatter',          //带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。
            roam: true,
            show: true,
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#489df4',
                    borderColor: '#FFF'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series : [
            {
                type: 'effectScatter',          //带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。
                coordinateSystem: 'geo',
                showEffectOn: 'render',   //涟漪动画 何时显示 render 页面加载完成之后开始动画  emphasis （hover） 是才能触发动画
                rippleEffect: {            //涟漪动画的配置项
                    brushType: 'stroke'   //线性渐变
                },
                hoverAnimation: true,
                data: mapData.map(function (itemOpt) {
                    return {
                        name: itemOpt.name,
                        value: [
                            latlong[itemOpt.code].longitude,
                            latlong[itemOpt.code].latitude,
                            itemOpt.value
                        ],
                        label: {
                            emphasis: {
                                position: 'right',
                                show: false 
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: itemOpt.color
                            }
                        }
                    };
                })
            }
        ]
    };

    return option;

    // var chart = echarts.init(document.getElementById(data.id));
    // chart.setOption(option);
}

/*字符云wordCloud*/
function EchartCloud(data){
    var optioncloud = {
        title: {
            text: data.titleText,
            subtext:data.subText,
            x: 'left',
            textStyle: {
                fontSize: 16,
                color:'#c5c5c5'
            }

        },
        //backgroundColor: '#F7F7F7',
        tooltip: {
            show: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        series: [{
            name: 'TOP10',
            type: 'wordCloud',
            size: ['9%', '99%'],
            sizeRange: [6, 66],
            textRotation: [0, 45, 90, -45],
            rotationRange: [-45, 90],
            shape: 'circle',
            textPadding: 0,
            autoSize: {
                enable: true,
                minSize: 6
            },
            textStyle: { // 生成字体颜色
                normal: {
                    color: function() {
                        return 'rgb(' + [
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160),
                                Math.round(Math.random() * 160)
                            ].join(',') + ')';
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: data.Data
        }]
    };
    var chartcloud = echarts.init(document.getElementById(data.id),data.theme);
    chartcloud.setOption(optioncloud,true);
}

/*折线柱状line_bar*/

function EchartBarLine(data, styleContent) {

    // if (styleContent.iStart) {
    //     var iStart = Math.round((1 - styleContent.showAmount / data.data[0].valueSet.length) * 100);
    // }
    var iStart = styleContent.iStart;

    var dataV = data.data[0];
    //    var dataLen = styleContent.dataZoomShow ? dataV.valueSet.length : (dataV.valueSet.length < 10 ? dataV.valueSet.length : 10) ;
    // var dataLen = styleContent.dataZoomShow ? dataV.valueSet.length : (styleContent.showAmount == 0 ? dataV.valueSet.length : 10);
    var dataLen =  dataV.valueSet.length;

    //Mark.yin --- Begin
    if(styleContent.id === 'chart_0_3_11' || styleContent.id === 'chart_0_3_12' || styleContent.id === 'chart_0_3_13') {
        console.log(dataV.valueSet.length);
    }
    //Mark.yin --- End

    var dataTitle = data.title ? data.title : styleContent.titleText;

    var dataV1 = data.data;


    var dataValue = (function () {
        var array = [];
        for (var i = 0; i < dataV1.length; i++) {
            var _index = i;
            array.push({
                name: dataV1[i].topic,
                value: (function () {
                    var arr = [];

                    var result = dataV1[_index].valueSet;
                    for (var i = 0; i < dataLen; i++) {
                        arr.push(result[i].value)
                    }

                    return arr;
                })()
            });
        }
        return array;
    })();
    var topicName = [];
    for (var i = 0; i < dataValue.length; i++) {
        topicName.push(dataValue[i].name)
    }

    var legendArr = [],
        dataArray = [];
    ~ function () {
        for (var i = 0; i < dataValue.length; i++) {
            dataArray.push(dataValue[i].value);
            legendArr.push(dataValue[i].name);
        }
    }();

    if (styleContent.xAxis.show == undefined) {
        styleContent.xAxis.show = true;
    }


    var seriesInfo = []; //series 配置项
    if (dataArray != '' && dataArray.length > 0) {
        for (var i = 0; i < dataArray.length; i++) {
            var seriesItem = {
                name: legendArr[i],
                type: (function () {
                    return styleContent.series_type ? styleContent.series_type[0] : 'bar'
                })(),
                //areaStyle: {normal: ''}, //折线图的是否面积堆积
                "stack": data.stack, //用于bar  堆叠到一起
                label: {
                    normal: {
                        show: styleContent.labelShow || 'true', //是否显示柱体上的数值
                        position: "top"
                        //textStyle:{
                        //    color:'red'
                        //}
                    }
                },
                symbol: styleContent.symbol, //折线上的圆点  'none'不显示
                barGap: 0,
                smooth: styleContent.smooth ? styleContent.smooth : false, //false曲线  true折线
                barWidth: styleContent.barWidth ? styleContent.barWidth : '',
                data: dataArray[i],
                itemStyle: {
                    normal: {
                        color: (function () {
                            var color = '';
                            if (styleContent.colorArray) {
                                color = styleContent.colorArray[i];
                            }
                            return color
                        })()
                    }
                },
                lineStyle: {
                    normal: {
                        color: styleContent.colorArray[i]
                    }
                }
            };

            if (styleContent.areaStyle) {
                seriesItem.itemStyle = {
                    normal: {
                        areaStyle: {
                            color: styleContent.colorArray
                        }
                    }
                }
            }

            if (styleContent.markPoint) {
                if (styleContent.markPoint[i]) {
                    seriesItem.markPoint = {
                        data: [{
                            type: 'max',
                            name: '最大值'
                        },
                            {
                                type: 'min',
                                name: '最小值'
                            }
                        ]
                    }
                } else {
                    seriesItem.markPoint = '';
                }
            }
            seriesInfo.push(seriesItem);
        }
    }

    if (styleContent.boundaryGap == undefined) {
        styleContent.boundaryGap = true;
    }

    //Mark.yin
    if(styleContent.id === 'chart_0_3_11' || styleContent.id === 'chart_0_3_12' || styleContent.id === 'chart_0_3_13'){
        console.log(styleContent.id);
        // console.log(styleContent.gridBottom);

        // option = {
        //     xAxis: [{
        //         axisLabel: {
        //             rotate: 12, //x坐标 倾斜30
        //             interval: 0
        //             }
        //         }]
        //     }
    }

    var option = {
        //backgroundColor: '#fff',
        title: {
            text: dataTitle,
            x: styleContent.titleX || 'left',
            // left: (styleContent.title && styleContent.title.left) || 'auto',
            top: (styleContent.title && styleContent.title.top) || 'auto',
            //subtext: data.subText,
            textStyle: {
                // fontSize: styleContent.title.fontSize,
                color: styleContent.color,
                fontSize: 16
            },
            padding: styleContent.titlePadding || 30
        },
        grid: {
            containLabel:true,
            top: styleContent.gridTop || 75,
            left:30,
            right:30,
            bottom:styleContent.gridBottom || 40
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}"
        },
        legend: {
            data: topicName,
            orient: styleContent.legend.orient,
            x: styleContent.legend.x,
            y: styleContent.legend.y,
            textStyle: {
                color: styleContent.color,
                // fontSize: styleContent.legend.fontSize
                fontSize: 12
            },
            padding:30
        },
        xAxis: [{
            show: styleContent.xAxis.show,
            type: 'category',
            data: setxAxis(data.data[0].valueSet, dataLen),
            //data: xAxisData,
            boundaryGap: styleContent.boundaryGap ? true : styleContent.boundaryGap, //横坐标是否从原点开始
            axisLabel: {
                formatter: styleContent.xAxisAll ? null :
                    function (value) {
                        return value.length > 10 ? value.substring(0, 10).concat('...') : value;
                    },
                // rotate: 30, //x坐标 倾斜30
                rotate: styleContent.rotate || 0, //x坐标 倾斜30
                interval: styleContent.stick || 0,
                textStyle: {
                    color: styleContent.color //坐标值颜色
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#333',
                    // fontSize: styleContent.xAxis.fontSize
                    fontSize: 8
                }
            }
        }],
        yAxis: [{
            splitLine: { //网格线
                show: true,
                lineStyle: {
                    color: '#333'
                }
            },
            // splitArea : {show : true},//保留网格区域
            axisLabel: {
                //formatter: '{value} 万'
                textStyle: {
                    color: styleContent.color //坐标值颜色
                }
            },
            type: 'value',
            name: data.yName,
            axisLine: {
                lineStyle: {
                    color: '#333', //y轴颜色
                    // fontSize: styleContent.yAxis.fontSize
                    fontSize: 8
                }
            },
            min: styleContent.yAxis.min || null
        }],
        //toolbox: {
        //    show : true,
        //    color:'#fff',
        //    feature : {
        //        mark : {show: true},
        //        dataView : {show: true, readOnly: false},
        //        restore : {show: true},
        //        saveAsImage : {show: true}
        //    }
        //
        //
        //},
        calculable: true,
        series: seriesInfo,
    };

    //如果滚动条存在
    if (styleContent.dataZoomShow) {
        option.dataZoom = [{ // 数据区域缩放是否添加
            "show": styleContent.dataZoomShow,
            "height": '4%',
            "xAxisIndex": [0],
            bottom: '1%',
            realtime: true,
            //            start : iStart ? iStart : 10,
            //start: iStart ? (styleContent.showAmount == 0 ? 0 : iStart) : 10,
            start: iStart,
            end: 100,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
                //color:"#d3dee5",
            },
            textStyle: {
                color: "#fff"
            },
            borderColor: "#90979c",
            //backgroundColor: '#fff',
        }, {
            "type": "inside",
            "show": true,
            "height": 15,
            "start": 1,
            "end": 35
        }]
    }

    return option;

    //实例化图表
    // var myChart = echarts.init(document.getElementById(styleContent.id)); // 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
    // // option = getOptionByArray(json, reportDesign);//得到option图形
    // //传入设置项
    // myChart.setOption(option); //显示图形
    //
    // return myChart
}

/*南格丁*/
function EchartFunnl(data){
    var legendArr =[],dataArray =[];
    ~function (){
        for(var i=0;i<data.data.length;i++){
            dataArray.push(data.data[i].value);
            legendArr.push(data.data[i].name);
        }
    }();

    var seriesItem =[];
    if(legendArr){
        for(var i=0;i<legendArr.length;i++){
            seriesItem.push({value:dataArray[i],name:legendArr[i]})
        }
    }
    var optionpie1 = {
        title : {
            text: data.titleText,
            subtext: data.subText,
            x:'center',
            textStyle:{
                fontSize:'25',
                color:'#c5c5c5'
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x : 'center',
            y : 'bottom',
            data:data.dataArray
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'面积模式',
                type:'pie',
                radius : [20, 140],
//                center : ['75%', '50%'],
                roseType : 'area',
                data:seriesItem
            }
        ]
    };
    var myChart = echarts.init(document.getElementById(data.id),data.theme);// 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
    myChart.setOption(optionpie1); //显示图形
}

/*仪表盘gauge*/
function EchartGauge(data){
    var legendArr =[],dataArray =[];
    ~function (){
        for(var i=0;i<data.data.length;i++){
            dataArray.push(data.data[i].value);
            legendArr.push(data.data[i].name);
        }
    }();
    var seriesItem =[];
    if(legendArr && dataArray){
        for(var i =0;i<legendArr.length;i++){
            seriesItem.push({
                name:legendArr[i],
                type:'gauge',
                center:data.Center[i],
                detail: {formatter:'{value}%'},
                data:[{value:dataArray[i],name:legendArr[i]}]
            })
        }
    }


    var optionGauge = {
        title: {
            text: data.titleText,
            textStyle:{
                fontSize:'20',
                color:'#c5c5c5'
            }
        },
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        series: seriesItem
    };

    if(data.id){
        var myChart = echarts.init(document.getElementById(data.id),data.theme);// 图表初始化的地方，在页面中要有一个地方来显示图表，他的ID是main
        myChart.setOption(optionGauge); //显示图形
    }
}

/*雷达图rader*/
// function EchartRader(data){
//      var legendArr =[],dataArray =[];
//      ~function (){
//          for(var i=0;i<data.data.length;i++){
//              dataArray.push(data.data[i].value);
//              legendArr.push(data.data[i].name);
//          }
//      }();
//
//      var optionrader = {
//          title: {
//              text: data.titleText,
//              subtext: data.subText,
//              x:'right',
//              y:'bottom',
//              textStyle:{
//                  fontSize:'25',
//                  color:'#c5c5c5'
//              }
//          },
//          tooltip: {
//              trigger: 'item',
//              backgroundColor : 'rgba(0,0,250,0.2)'
//          },
//          legend: {
//              data: legendArr
//          },
//          visualMap: {                        //视觉映射组件
//              color: ['red', 'green']     //渐变颜色
//          },
//          radar: {
//              indicator : (function(){
//                  var raderIndicator =[];
//                  if(data.raderText){
//                      for(var i=0;i<data.raderText.length;i++){
//                          raderIndicator.push({text:data.raderText[i],max:data.raderMax})
//                      }
//                  }
//
//                  return raderIndicator;
//              })()
//          },
//          series : (function (){
//              var series = [];
//              if(legendArr && dataArray){
//                  for (var i = 0; i < legendArr.length; i++) {
//                      series.push({
//                          //name:'',
//                          type: 'radar',
//                          symbol: 'none',
//                          itemStyle: {
//                              normal: {
//                                  lineStyle: {
//                                      width:1
//                                  }
//                              },
//                              emphasis : {
//                                  areaStyle: {color:'rgba(0,250,0,0.3)'}      //鼠标  hover
//                              }
//                          },
//                          data:[
//                              {
//                                  value:dataArray[i],
//                                  name: legendArr[i]
//                              }
//                          ]
//                      });
//                  }
//              }
//              return series;
//          })()
//      };
//      var chart = echarts.init(document.getElementById(data.id));
//      chart.setOption(optionrader);
//  }
function Echartradar(data, styleContent){

    //legend
    var legend = [],
        data_ = [],
        indicator = [];
    for(var i=1; i<data.data.length; i++){
        legend.push(data.data[i].topic);
        data_.push({
            name:data.data[i].topic,
            value:[],
            areaStyle: {
                normal: {
                    opacity: 0.3
                }
            }
        });
        for(var j=0; j<data.data[i].valueSet.length; j++){
            data_[i-1].value.push(data.data[i].valueSet[j].value)
        }
    }
    var max = data.data[0].valueSet;
    for(var i=0; i<max.length; i++){
        indicator.push({
            text: max[i].name,
            max: max[i].value
        })
    }
    // console.log(legend);
    // console.log(data_);
    // console.log(indicator);

    option = {
        title : {
            text: data.title,
            textStyle:{
                color: styleContent.titleColor || '#333'
            },
            padding:12
        },

        tooltip : {
            trigger: 'item'
        },
        axisLabel:{
            color:styleContent.axisTextColor || '#333'
        },
        legend: {
            x : 'right',
            y:'bottom',
            data:legend,
            padding:12,
            textStyle:{
                color: styleContent.legendColor || '#333'
            },
            orient:'vertical'
        },
        color:styleContent.colorArray || ['#00f4ff','#0075e6','#00c2ff','#f7bb1e','#d96b73','#ca8622','#bda29a','#cca413','#e1bda2','#9c6680'],
//            toolbox: {
//                show : true,
//                feature : {
//                    mark : {show: true},
//                    dataView : {show: true, readOnly: false},
//                    restore : {show: true},
//                    saveAsImage : {show: true}
//                }
//            },
        calculable : true,
        polar : /*[*/
            {
                // axisLabel:{
                //     textStyle:{
                //         color: styleContent.axisTextColor || '#333'
                //     }
                // },
                // radiusAxis:{
                //     nameTextStyle:{
                //         color: styleContent.axisTextColor || '#333'
                //     }
                // },
                indicator: indicator,
                radius : 110,
                name:{
                    show: true, // 是否显示文字
                    formatter: null, // 文字的显示形式
                    textStyle: {
                        color:styleContent.axisTextColor || '#333' // 文字颜色
                    }
                },

            }
        /*]*/,
        series : [
            {
                type: 'radar',
                // itemStyle: {
                //     normal: {
                //         opacity: 0.2,
                //         // areaStyle: {
                //         //     type: 'default',
                //         //     shadowColor: 'rgba(0, 0, 0, 0.1)',
                //         // }
                //     }
                // },
                data: data_
            }
        ]

        // series: [
        //     {
        //         name: '雷达图',
        //         type: 'radar',
        //         itemStyle: {
        //             emphasis: {
        //                 // color: 各异,
        //                 lineStyle: {
        //                     width: 4
        //                 }
        //             }
        //         },
        //         data: [
        //             {
        //                 value: [100, 8, 0.40, -80, 2000],
        //                 name: '图一',
        //                 symbol: 'rect',
        //                 symbolSize: 5,
        //                 lineStyle: {
        //                     normal: {
        //                         type: 'dashed'
        //                     }
        //                 }
        //             },
        //             {
        //                 value: [60, 5, 0.30, -100, 1500],
        //                 name: '图二',
        //                 areaStyle: {
        //                     normal: {
        //                         color: 'rgba(255, 255, 255, 0.5)'
        //                     }
        //                 }
        //             }
        //         ]
        //     },
        //     {
        //         name: '成绩单',
        //         type: 'radar',
        //         radarIndex: 1,
        //         data: [
        //             {
        //                 value: [120, 118, 130, 100, 99, 70],
        //                 name: '张三',
        //                 label: {
        //                     normal: {
        //                         show: true,
        //                         formatter:function(params) {
        //                             return params.value;
        //                         }
        //                     }
        //                 }
        //             },
        //             {
        //                 value: [90, 113, 140, 30, 70, 60],
        //                 name: '李四',
        //                 areaStyle: {
        //                     normal: {
        //                         opacity: 0.9,
        //                         color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
        //                             {
        //                                 color: '#B8D3E4',
        //                                 offset: 0
        //                             },
        //                             {
        //                                 color: '#72ACD1',
        //                                 offset: 1
        //                             }
        //                         ])
        //                     }
        //                 }
        //             }
        //         ]
        //     }
        // ]
    };
    var chart = echarts.init(document.getElementById(styleContent.id));
    chart.setOption(option);
}

/*散点图*/
function EchartScatter(data){
    var legendArr =[],dataArray =[];
    ~function (){
        for(var i=0;i<data.data.length;i++){
            dataArray.push(data.data[i].value);
            legendArr.push(data.data[i].name);

        }
    }();
    function randomColor(){
        var rgb = '';
        var r = Math.floor(Math.random()*255);
        var g = Math.floor(Math.random()*255);
        var b = Math.floor(Math.random()*255);
        rgb = 'rgb('+r+','+g+','+b+')';
        return rgb
    }
    var optionScatter = {
        title : {
            text: data.titleText,
            subtext: data.subText,
            x:80,
            textStyle:{
                color:'#fff'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        tooltip : {
            trigger: 'item',
            showDelay : 0,
            axisPointer:{
                show: true,
                type : 'cross',
                lineStyle: {
                    type : 'dashed',
                    width : 1
                }
            }
        },
        legend: {
            data: legendArr,
            left: 'right'
        },
        xAxis : [
            {
                type : 'value',
                scale:true,
                //position:'top',
                axisLabel : {
                    formatter: '{value}'
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            }
        ],
        yAxis : [
            {
                type : 'value',
                scale:true,
                //position:'right',
                axisLabel : {
                    formatter: '{value}'
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
            }
        ],
        series : (function(){
            var series =[];
            if(dataArray){
                for(var i=0;i<dataArray.length;i++){

                    series.push({
                        name: legendArr[i],
                        data: dataArray[i],
                        type: 'scatter',
                        //data.data.value [x,y,size]
                        symbolSize: function (dataArray) {
                            var size = 0;
                            if(dataArray[2]){
                                size = Math.sqrt(dataArray[2]);
                            }else {
                                size = 20
                            }
                            return size;
                        },
                        itemStyle: {
                            normal: {
                                shadowBlur: 10,
                                shadowColor: randomColor(),
                                shadowOffsetY: 3,
                                color: new echarts.graphic.RadialGradient(0.4, 0.2, 1, [{
                                    offset: 0,
                                    color: randomColor()
                                }, {
                                    offset: 1,
                                    color: randomColor()
                                }])
                            }
                        },
                        markLine : {
                            data : [
                                {type : 'average', name: '平均值'}   //平均值
                            ]
                        }
                    })
                }
            }

            return series
        })()
    };
    var myChart = echarts.init(document.getElementById(data.id));
    myChart.setOption(optionScatter);
}

/*水球*/
function EchartLiquidfill(data){
    function randomNum(min,max){
        return Math.floor(Math.random()*(max-min) + min);
    }
    function randomColor(){
        var r = Math.floor(Math.random()*255);
        var g = Math.floor(Math.random()*255);
        var b = Math.floor(Math.random()*255);
        return 'rgb('+r+','+g+','+b+')';
    }


    var option = {
        series: (function(){
            var series =[];
            for(var i=0;i<data.Data.length;i++){
                var r =data.Data[i].value;
                series.push({
                    type: 'liquidFill',
                    radius: data.Data[i].value+'%',
                    //水球位置
                    center: (function(){
                        var arr=[];
                        var divisionNum = 100/(data.Data.length);
                        var x = randomNum(divisionNum*i-r/30,divisionNum*i+r/4);
                        if(x<4){
                            x = randomNum(4,8)
                        }
                        if(x>98){
                            x = randomNum(92,95)
                        }
                        var y = randomNum(r,100-r);
                        arr.push(x+'%',y+'%');
                        return arr ;

                    })(),
                    data: [{
                        name: 'First Data',
                        value: 0.2,
                        itemStyle: {
                            normal: {
                                color: randomColor()
                            }
                        }
                    }],
                    label: {
                        normal: {
                            formatter: (function(){
                                // 水球中的字 “，”替换成 换行符
                                return  data.Data[i].name.replace(/,/g,'\n');
                            })(),
                            textStyle: {
                                fontSize: data.Data[i].value/3,   //字体大小
                                color:randomColor()
                            }
                        }
                    },
                    //外边框颜色
                    outline: {
                        itemStyle: {
                            borderColor: randomColor(),
                            shadowBlur: 30,
                            shadowColor: 'rgba(255, 0, 0, 1)'
                        }
                    },
                    backgroundStyle: {
                        borderWidth: 5,
                        color: randomColor()
                    }
                })
            }
            return series;
        })()
        //series  end
    };
    var myChart = echarts.init(document.getElementById(data.id));
    myChart.setOption(option);
}

/*关系图*/
function EchartGraph(data){
    function randomColor(){
        var rgb = '';
        var r = Math.floor(Math.random()*255);
        var g = Math.floor(Math.random()*255);
        var b = Math.floor(Math.random()*255);
        rgb = 'rgb('+r+','+g+','+b+')';
        return rgb
    }
    var SizeArr = [];
    for (var i = 0;i<data.data.length;i++){
        SizeArr.push(data.data[i].value)
    }


    var option = {
        title: {
            text: data.title
        },
        series: [{
            type: 'graph',
            layout: 'circular',   //force   circular 圆形 与 树状图 转换
            circular: {
                rotateLabel: true
            },
            symbolSize: 45,
            focusNodeAdjacency: true,
            roam: true,
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 12
                    },
                }
            },
            force: {
                repulsion: 1000
            },
            itemStyle:{
                normal: {
                    label: {
                        rotate: true,
                        show: true,
                        textStyle: {
                            color: '#333',
                            fontWeight: 'bold'
                        }
                    }
                }
            },
            data: (function(){
                var DataArr = [];
                for (var i = 0;i<data.data.length;i++){
                    DataArr.push({
                        name:(function(){
                            // 水球中的字 “，”替换成 换行符
                            return  data.data[i].name.replace(/,/g,'\n');
                        })(),
                        symbolSize: SizeArr[i],   //SizeArr[i]
                        itemStyle:{
                            normal:{
                                color:randomColor()
                            }
                        }
                    })
                }
//                console.log(DataArr);
                return DataArr
            })(),
            zoom:0.8,
            lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 2,           //线宽
                    curveness: 0.2      //直线的弯曲程度
                }
            }
        }
        ]
    };
    var myChart = echarts.init(document.getElementById(data.id));
    myChart.setOption(option);
}

/*堆叠条形图*/
// function EchartsStackBar(data,styleContent){
//
// 	if(styleContent.iStart){
// 		var iStart = Math.round((1 - 10/data.data[0].valueSet.length)*100);
// 	}
//     var dataV = data.data;
//     var maxLen = data.data.length < 10 ? data.data.length : 10;
//     var dataValue  = (function(){
//             var array =[];
//             //var data = res.data.data;
//             for(var i = 0; i < maxLen;i++){
//                 var _index = i;
//                 array.push({name:dataV[i].topic,value:(function(){
//                     var arr =[];
//                     var result = dataV[_index].valueSet;
//                     for(var item of result){
//                         if (item.value != 0)
//                             arr.push(item.value);
//                         else
//                             arr.push(null);
//                     }
//                     return arr;
//                 })()});
//             }
//             return array;
//         })();
//     var xArray = (function(){
//             var arr =[];
//             for (var i =0;i<dataV[0].valueSet.length;i++){
//                 arr.push(dataV[0].valueSet[i].name)
//             }
//             return arr;
//         })();
//
//     var legendArr =[],dataArray =[];
//     ~function (){
//         for(var i=0;i<dataValue.length;i++){
//             dataArray.push(dataValue[i].value);
//             legendArr.push(dataValue[i].name);
//         }
//     }();
//
//     var xMaxLength = styleContent.xAmount ?
//         (styleContent.xAmount > xArray.length ? xArray.length : styleContent.xAmount) :
//         xArray.length;
//
//     var arr = [];
//     for(var i = 0; i < xMaxLength; i++){
//         arr.push(xArray[i]);
//     }
//     var dataArrayArr = [];
//     for(var j = 0; j < dataArray.length; j++){
//         var arrA = [];
//         for(var n = 0 ; n < xMaxLength ; n ++){
//             var value = dataArray[j][n];
//             arrA.push(value);
//         }
//         dataArrayArr.push(arrA);
//     }
//
//     var seriesInfo =[];   //series 配置项
//
// //    console.log('===============',styleContent.label)
// //    if(!styleContent.label){
// //    	console.log(1)
// //    	styleContent.label.show = true
// //    }
//
//     for(var i = 0; i < dataArray.length; i++){
//         var obj = {};
//         obj.name = legendArr[i];
//         obj.type = 'bar';
//         obj.barWidth = styleContent.barWidth;
//         obj.stack = "总量";
//         obj.label = {
//             normal: {
//                 show:styleContent.label.show,
//                 position: 'insideRight'
//             }
//         };
//         obj.data = dataArrayArr[i];
//         seriesInfo.push(obj);
//     }
//
//     var option =  {
//         title : {
//             text: data.title,
//             x:'center',
//             textStyle:{
//                 color:styleContent.color
//             }
//         },
//         tooltip : {
//             trigger: 'axis',
//             axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//                 type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//             }
//         },
//         color:['#c23531','#61a0a8','#d48265','#91c7ae','#749f83','#ca8622','#bda29a','#cca413','#e1bda2','#9c6680'],
//         legend: {
//             data: legendArr,
//             orient: styleContent.legend.orient,
//             x: styleContent.legend.x,
//             y:styleContent.legend.y,
//             textStyle:{
//                 color:styleContent.color
//             }
//         },
//         grid: {
//         	top: styleContent.grid.top,
//             left: styleContent.grid.left,
//             right: styleContent.grid.right,
//             bottom: styleContent.grid.bottom,
//             containLabel: true
//         },
//         yAxis:  {
//             type: 'value',
//             label: {
//                 normal: {
//                     show: false,           //柱体上的文字
//                     formatter: '{b}'
//                 }
//             },
//             axisLine:{
//                 lineStyle:{
//                     color:styleContent.lineColor ? styleContent.lineColor : styleContent.color         //y轴颜色
//                 }
//             },
//             axisLabel: {
//                 textStyle: {
//                     color:styleContent.color //坐标值颜色
//                 }
//             }
//         },
//         xAxis: {
//             type: 'category',
//             data: arr,
//             axisLabel: {
//             	rotate: 30,
//             	interval:0,
//             	textStyle: {
//                     color:styleContent.color //坐标值颜色
//                 }
//         	}, //x坐标 倾斜30
//             axisLine:{
//                 lineStyle:{
//                     color:styleContent.lineColor ? styleContent.lineColor : styleContent.color         //x轴颜色
//                 }
//             }
//         },
//         series:seriesInfo
//
//     };
//     if(styleContent.dataZoomShow){
//         option.dataZoom=[{   // 数据区域缩放是否添加
//             "show": styleContent.dataZoomShow ? true : false,
//             "height": '4%',
//             "xAxisIndex": [0],
//             bottom: '1%',
// 	        realtime : true,
//             start : iStart ? iStart : 10,
//             end : 100,
//             handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
//             handleSize: '110%',
//             handleStyle:{
//                 //color:"#d3dee5",
//             },
//             textStyle:{
//                 color:"#fff"},
//             borderColor:"#90979c",
//             //backgroundColor: '#fff',
//         }, {
//             "type": "inside",
//             "show": true,
//             "height": 15,
//             "start": 1,
//             "end": 35
//         }]
//     }
//     var mychart = echarts.init(document.getElementById(styleContent.id));
//     mychart.setOption(option);
// }

function EchartsStackBar(data, styleContent) {
    var iStart = styleContent.iStart;
    var iEnd = styleContent.iEnd;
    // if (styleContent.iStart) {
    //     var iStart = Math.round((1 - 10 / data.data[0].valueSet.length) * 100);
    // }
    var dataV = data.data;
    //var maxLen = data.data.length < 10 ? data.data.length : 10;
    var maxLen = data.data.length;
    var dataValue = (function () {
        var array = [];
        //var data = res.data.data;
        for (var i = 0; i < maxLen; i++) {
            var _index = i;
            array.push({
                name: dataV[i].topic,
                value: (function () {
                    var arr = [];
                    var result = dataV[_index].valueSet;
                    for (var item of result) {
                        if (styleContent.toFixedValue) { // 小数位数过长的进行截取
                            arr.push(item.value.toFixed(4));
                        } else {
                            arr.push(item.value);
                        }
                    }
                    return arr;
                })()
            });
        }
        return array;
    })();
    var xArray = (function () {
        var arr = [];
        if (dataV[0]) {
            for (var i = 0; i < dataV[0].valueSet.length; i++) {
                arr.push(dataV[0].valueSet[i].name)
            }
        }

        return arr;
    })();

    var legendArr = [],
        dataArray = [];
    ~ function () {
        for (var i = 0; i < dataValue.length; i++) {
            dataArray.push(dataValue[i].value);
            legendArr.push(dataValue[i].name);
        }
    }();

    var xMaxLength = styleContent.xAmount ?
        (styleContent.xAmount > xArray.length ? xArray.length : styleContent.xAmount) :
        xArray.length;

    var arr = [];
    for (var i = 0; i < xMaxLength; i++) {
        arr.push(xArray[i]);
    }
    var dataArrayArr = [];
    for (var j = 0; j < dataArray.length; j++) {
        var arrA = [];
        for (var n = 0; n < xMaxLength; n++) {
            var value = dataArray[j][n];
            arrA.push(value);
        }
        dataArrayArr.push(arrA);
    }

    var seriesInfo = []; //series 配置项

    //    console.log('===============',styleContent.label)
    //    if(!styleContent.label){
    //    	console.log(1)
    //    	styleContent.label.show = true
    //    }

    for (var i = 0; i < dataArray.length; i++) {
        var obj = {};
        obj.name = legendArr[i];

        // obj.type = 'bar';
        obj.type = styleContent.type || 'bar';//堆叠面积图
        obj.barWidth = styleContent.barWidth || 'auto';
        obj.areaStyle = { normal: {} };
        obj.smooth = styleContent.smooth || true;

        obj.stack = "总量";
        obj.label = {
            normal: {
                show: styleContent.label.show,
                position: styleContent.labelPosition || 'insideRight',
            },
        };
        obj.data = dataArrayArr[i];
        seriesInfo.push(obj);
    }
    var option = {
        title: {
            text: data.title,
            // left: 30,
            // top: 30,
            padding: [30, 0, 0, 30],
            textStyle: {
                color: styleContent.color,
                // fontSize: (styleContent.title && styleContent.title.fontSize) || 16,
                fontSize: 16,
            }
        },
        tooltip: {
            textStyle: {
                fontSize: 13,
            },
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        color: styleContent.colorArray || ['#00c3c9', '#339999', '#3399cc', '#339933', '#669933',
            '#669933', '#99cc99', '#99ccff', '#0099cc', '#3366cc',
            '#6666cc', '#6666cc'
        ],
        legend: {
            // type: styleContent.legend.type || 'plain',
            show: styleContent.legend.show == false ? false : true,
            data: legendArr,
            padding: 0,
            orient: styleContent.legend.orient,
            left: styleContent.legend.left || 'auto',
            top: styleContent.legend.top || 'auto',
            right: styleContent.legend.right || 'auto',
            bottom: styleContent.legend.bottom || 'auto',
            itemWidth: 16,
            itemHeight: 8,
            textStyle: {
                color: styleContent.color,
                fontSize: 12
            },
        },
        grid: {
            containLabel: true,
            top: (styleContent.grid && styleContent.grid.top) || 70,
            left: 30,
            right: 30,
            bottom: (styleContent.grid && styleContent.grid.bottom) || 30,
        },
        yAxis: {
            type: 'value',
            // max: styleContent.max || null,
            min: styleContent.min || null,
            label: {
                normal: {
                    show: false, //柱体上的文字
                    formatter: '{b}'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#333' //y轴颜色
                }
            },
            axisLabel: {
                textStyle: {
                    color: styleContent.color //坐标值颜色
                }
            },
            splitLine:{
                lineStyle: {
                    // color: styleContent.lineColor ? styleContent.lineColor : styleContent.color //y轴颜色
                    color: '#333' //y轴颜色
                }
            }
        },
        xAxis: {
            show: styleContent.xAxisShow == false ? false : true,
            type: 'category',
            boundaryGap: styleContent.boundaryGap == false ? false : true,
            data: arr,
            axisLabel: {
                formatter: function (value) {
                    return value.length > 6 ? value.substring(0, 6).concat('...') : value;
                },
                interval: styleContent.stick || 0,
                rotate: styleContent.rotate || 0, //x坐标 倾斜30
                textStyle: {
                    color: styleContent.color //坐标值颜色
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#333' //x轴颜色
                }
            }
        },
        series: seriesInfo

    };
    if (styleContent.dataZoomShow) {
        option.dataZoom = [{ // 数据区域缩放是否添加
            "show": styleContent.dataZoomShow ? true : false,
            "height": '3%',
            "xAxisIndex": [0],
            bottom: 20,
            realtime: true,
            start: iStart ? iStart : 10,
            end: iEnd ? iEnd : 100,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '100%',
            handleStyle: {
                color: "#aaa",

            },
            textStyle: {
                color: "#666"
            },
            fillerColor:'rgba(255,255,255,.2)',
            borderColor: "rgba(255,255,255,0.15)",
            backgroundColor: 'rgba(255,255,255,0.1)',
            dataBackground: {
                lineStyle: {
                    shadowBlur: 0, //图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY
                    opacity: 0, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                }
            },
            showDetail: false,
            // fillerColor :'red', //选中范围的填充颜色。
        }, {
            "type": "inside",
            "show": true,
            "height": 15,
            "start": 1,
            "end": 35
        }]
    }
    return option;
    // var mychart = echarts.init(document.getElementById(styleContent.id));
    // mychart.setOption(option);
    // return mychart
}

/*预测折线图*/
function dashLine(data,styleContent){
    var legendArr =[],dataArray =[];
    var maxLen = data.data[0].valueSet.length;
    for(var i = 0 ; i < data.data.length; i ++){
        if(maxLen < data.data[i].valueSet.length){
            var minLen = maxLen;
            var maxLen = data.data[i].valueSet.length;
            var index = i;
            break;
        }
    }
    var xAxisData = data.data[index].valueSet;
    var iStart = Math.round((1 - 17/xAxisData.length)*100);
    for(var j = 0; j < xAxisData.length;j++){
        dataArray.push(xAxisData[j].name);
    }

    var seriesInfo =[];   //series 配置项
    for(var n = 0; n < data.data.length;n++){
        if(maxLen === data.data[n].valueSet.length) {
            var topic = '预测'+data.data[n].topic;
            
            if(data.data[n].valueSet.length != 0){
            	legendArr.push(topic);
            }
            	
            var predictDone = [],futureData = [];
            //预测已经实现
            for(var i = 0; i < minLen; i++){
                if(i < minLen - 1){
                    var obj = {};
                    obj.name = data.data[n].valueSet[i].name;
                    obj.value = '';
                    futureData.push(obj);
                }
                predictDone.push(data.data[n].valueSet[i])
            }
            var predictDoneObj = createData(predictDone,topic);

            seriesInfo.push(predictDoneObj);

            //预测未来
            for(var i = minLen - 1; i < maxLen; i++){
                futureData.push(data.data[n].valueSet[i])
            }
            var predictFutureObj = createData(futureData,topic);
            predictFutureObj.lineStyle = {
                normal:{
                    type:'dotted'
                }
            };
            seriesInfo.push(predictFutureObj);
        }else{
            var topic = data.data[n].topic;
//            legendArr.push(topic);
            if(data.data[n].valueSet.length != 0){
            	legendArr.push(topic);
            }
            var realObj = createData(data.data[n].valueSet,topic);
            seriesInfo.push(realObj);
        }
    }

    var option = {
        title: {
            text:data.title
        },
        tooltip: {
            trigger: 'axis'
        },
        grid:{
            x:styleContent.grid.x,
            y:styleContent.grid.y,
            x2:styleContent.grid.x2,
            y2:styleContent.grid.y2
        },
        dataZoom: [
            {
                show : true,
                realtime : true,
                start : iStart,
                end : 100
            },{
                type:'inside'
            }
        ],
        legend: {
            data:legendArr
        },
//        toolbox: {
//            show: true,
//            feature: {
//                dataZoom: {
//                    yAxisIndex: 'none'
//                },
//                dataView: {readOnly: false},
//                magicType: {type: ['line', 'bar']},
//                restore: {},
//                saveAsImage: {}
//            }
//        },
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data:dataArray
        },
        yAxis: {
            type: 'value'
        },
        series: seriesInfo
    };
    var mychart = echarts.init(document.getElementById(styleContent.id));
    mychart.setOption(option);
}

//预测折线图  data封装
function createData(data,topic){
    var seriesObj = {};
    seriesObj.name = topic;
    seriesObj.type = 'line';
    seriesObj.data = data;
    return seriesObj;
}

//横向柱状图
function horizontalBar(data,styleContent){
    var xLen = data.data[0].valueSet.length
        ? (data.data[0].valueSet.length > styleContent.xAmount ? styleContent.xAmount : data.data[0].valueSet.length)
        : data.data[0].valueSet.length;
    var legendArr =[],dataArray =[];

    ~function (){
        for(var i = 0;i < xLen;i++){
            dataArray.push(data.data[0].valueSet[i].value);
            // if(data.data[0].valueSet[i].name.length > 5){
            // 	var legendArrName = data.data[0].valueSet[i].name.slice(0,5).concat('...');
            // 	legendArr.push(legendArrName);
            // }else{
            // 	legendArr.push(data.data[0].valueSet[i].name);
            // }
            legendArr.push(data.data[0].valueSet[i].name);
            
        }
    }();
    var labelRight = {
        normal: {
            position: 'right'
        }
    };
    
    var option = {
        color:[styleContent.barColor],
        title: {
            text: data.title.replace('N',5),
            textStyle:{
                fontSize:styleContent.title.fontSize,
                color:styleContent.color
            },
            padding:12
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: "{b} : {c}"

        },
        grid: {
            top: styleContent.grid.top,
            bottom:styleContent.grid.bottom,
            left:styleContent.grid.left

        },
        xAxis: {
            show:styleContent.xAxis.show,        //显示横轴坐标刻度
            type : 'value',
            position: 'top',
            splitLine: {lineStyle:{type:'dashed'}},
            axisLine:{
                lineStyle:{
                    color:styleContent.color,
                    fontSize:styleContent.xAxis.fontSize
                }
            }
        },
        yAxis: {
            show:true,
            type : 'category',
            // axisLabel: {show: true},
            axisTick: {show: styleContent.yAxis.show},     //纵轴刻度线
            splitLine: {show: styleContent.yAxis.show},    //横向网格
            data:legendArr.reverse(),
            axisLine:{
                show: styleContent.yAxis.show,      //纵轴是否显示
                lineStyle:{
                    color:styleContent.color,
                    fontSize:styleContent.xAxis.fontSize
                }
            },
            axisLabel: {
                show: true,
                formatter: function (value) {
                    return value.length > 5 ? value.substring(0, 5).concat('...') : value;
                }
            }
        },
        series : [
            {
                type: 'bar',
                stack: '总量',
                barWidth: styleContent.barWidth,
                label: {
                    normal: {
                        show: false,           //柱体上的文字
                        formatter: '{b}'
                    }
                },
                data: dataArray.reverse(),
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                            [
                                {offset: 0, color: '#258cff'},
                                {offset: 1, color: '#12ddea'}
                            ]
                        )
                    },
                }
            }
        ]
    };
    var mychart = echarts.init(document.getElementById(styleContent.id));
    mychart.setOption(option);
}
//百度地图

function getBDMap(data,styleContent){
    var marker=[];

    for(var i=0;i<data.length;i++){
        marker.push(data[i])
    }

    var map = new BMap.Map(styleContent.id);
    var ppoint = new BMap.Point(116.422, 39.963);
    map.centerAndZoom(ppoint, 11);
    map.enableScrollWheelZoom(true);

    function addMarker(point,label){
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
        marker.setLabel(label);
        label.setStyle({
            "borderColor": "white",
            "color": "#333",
            "cursor": "pointer"
        });

    }

    for(var j=0;j<marker.length;j++){
        var point=new BMap.Point(marker[j].lon,marker[j].lat);
        var lable=new BMap.Label("推荐排名："+marker[j].d_level,{offset:new BMap.Size(20,-10)});
        addMarker(point,lable);
    }

}

//魔力象限
function magicQuadrant(data,styleContent){
	d3.select("#msvg").remove();
	var width = styleContent.width,height = styleContent.height;
	
	var dataset=[];
	for(var i=0;i<data.length;i++){
	    var row=data[i];
	
	    var newRow={};
	    newRow.Year=String(row.bizdate).substr(0, 4);
	    newRow.Month=String(row.bizdate).substr(4, 6);
	    newRow.Name=row.name;
	    newRow.Sqty=row.sqty;
	    newRow.Profits=row.profits;
	    newRow.rank_sqty=Number(row.rank_sqty);
	    newRow.rank_amount=Number(row.rank_amount);
	    dataset.push(newRow)
//	    console.log('=========================',String(row.bizdate))
	}
	
	var color=d3.scale.category20c();
	var svg=d3.select("#"+styleContent.id).append("svg").attr("width",width+200).attr("height",height).attr("id","msvg");
	
	var xScale = d3.scale.linear()
	    .domain([1,40])
	    .range([0.8*width,0.1*width]);
	
	var yScale = d3.scale.linear()
	    .domain([1,40])
	    .range([0.1*height,0.8*height]);
	
	var rScale = d3.scale.linear()
	    .domain([0,60000])
	    .range([height/120,3*(height/120)]);
	
	var xAxis = d3.svg.axis()
	    .scale(xScale)
	    .orient("bottom");
	
	var yAxis = d3.svg.axis()
	    .scale(yScale)
	    .orient("left");
	
	svg.append("g")
	    .attr("class","axis")
	    .attr("transform","translate(0," +(height/2.5)+ ")")
	    .call(xAxis);
	
	svg.append("g")
	    .attr("class","axis")
	    .attr("transform","translate(" +(width/1.7)+ ",0)")
	    .call(yAxis);
	
	var circles = svg.selectAll("circle")
	    .data(dataset)
	    .enter()
	    .append("circle")
	    .attr("transform","translate(0,0)")
	    .attr("cx", function(d,i){
	        if(d.Month==styleContent.month) {
	            return xScale(d.rank_amount);
	        }
	    } )
	    .attr("cy",function(d){
	        if(d.Month==styleContent.month) {
	            return yScale(d.rank_sqty);
	        }
	    })
	    .attr("r",function(d){
	        if(d.Month==styleContent.month) {
	            return rScale(d.Profits);
	        }
	    })
	    .attr("fill",function(d,i){
	        if(d.Month==styleContent.month) {
	            return color(i)
	        }
	        else return "none"
	    })
	    .attr("opacity",.9)
	    .on("mouseover",function(d,i){
	        d3.select(this)
	            .transition()
	            .duration(500)
	            .attr("fill","red")
	            .text(d.NAME)
	    })
	    .on("mouseout",function(d,i){
	        d3.select(this)
	            .transition()
	            .duration(500)
	            .attr("fill",color(i))
	    })
	    .on("click",function(d){
	        labletext(d.Name,d.Sqty, d.Profits)
	    });
	
	function labletext(a,b,c){
	
	
	
	    d3.select("#lableg").remove();
	
	    var gg=svg.append("g").attr().attr("id","lableg");
	
	    var twidth= 0;
	    var theight=0;
	
	    if(width<750) twidth=750;
	    else if (width>1000) twidth=1000;
	    else twidth=width;
	
	    if(height<800) theight=800;
	    else if (height>1000) theight=1000;
	    else theight=height;
	
	
	
	    gg.append("text").attr("id","text1").attr("class","labletext")
	        .attr("x",0.1*twidth-30)
	        .attr("y",0.05*theight-20)
	        .attr("dx",twidth/15)
	        .attr("dy",50)
	        .text("产品名称："+a);
	
	
	    gg.append("text").attr("id","text1").attr("class","labletext")
	        .attr("x",0.1*twidth-30)
	        .attr("y",0.09*theight-20)
	        .attr("dx",twidth/15)
	        .attr("dy",50)
	        .text("当月销量："+b);
	
	    gg.append("text").attr("id","text1").attr("class","labletext")
	        .attr("x",0.1*twidth-30)
	        .attr("y",0.13*theight-20)
	        .attr("dx",twidth/15)
	        .attr("dy",50)
	        .text("当月利润："+c);
	
	}
	
	function labletext_(){
	
	    var twidth= 0;
	    var theight=0;
	
	    if(width<750) twidth=750;
	    else if (width>1000) twidth=1000;
	    else twidth=width;
	
	    if(height<800) theight=800;
	    else if (height>1000) theight=1000;
	    else theight=height;
	
	    d3.select("#r1").remove();
	    d3.select("#t1").remove();
	    d3.select("#t2").remove();
	    svg.append("rect").attr("id","r1").attr("class","lablerect").attr("x",0.1*twidth).attr("y",0.05*theight).attr("width",twidth/3.5).attr("height",theight/7);
	    /*svg.append("text").attr("class","labletext_").attr("x",-30).attr("y",165).attr("dx",50).attr("dy",50).text("利润排名");*/
	    svg.append("text").attr("id","t1").attr("class","labletext_").attr("x",0.7*width).attr("y",0).attr("dx",50).attr("dy",50).text("多利多销");
	    svg.append("text").attr("id","t2").attr("class","labletext_").attr("x",0.05*width).attr("y",0.7*height).attr("dx",50).attr("dy",50).text("少利少销");
	    /*svg.append("text").attr("class","labletext_").attr("x",320).attr("y",520).attr("dx",50).attr("dy",50).text("销量排名");*/
	}
	
	if(styleContent.month){
	    var firstdata=[];
	    for(var m=0;m<dataset.length;m++){
	        if(dataset[m].Month==styleContent.month){
	            firstdata.push(dataset[m])
	        }
	    }
	
	    labletext(firstdata[0].Name,firstdata[0].Sqty,firstdata[0].Profits);
	}
	
	labletext_()
	

}

//折线柱状混合图
function lineBar(datas,styleContent){

    var legendArr =[],dataArray =[],dataType = [],yAxisIndexData = [];
    ~function (){
        for(var i=0;i<datas.data.length;i++){
        	
        	 if(datas.data[i].topic.indexOf('-') > 0){
                 legendArr.push(datas.data[i].topic.split('-')[0]);
             }else{
                 legendArr.push(datas.data[i].topic)
                 
             }

            if(i < datas.data.length -1){
                dataType.push('bar');
                yAxisIndexData.push(0);
            }else{
                dataType.push('line');
                yAxisIndexData.push(1);
            }
            dataArray.push(datas.data[i].valueSet);
        }
    }();


    //x轴坐标
    var xAxisData = [];
    for(var i = 0; i < dataArray[0].length ; i++){
    	//字符处理，保留留个字符
		if(dataArray[0][i].name.length > 6){
			xAxisData.push(dataArray[0][i].name.slice(0,6).concat('...'))
    	}else{
    		xAxisData.push(dataArray[0][i].name)
    	}
    }

    if(datas.data[0].topic.indexOf('-') > 0){
	    var leftyAxisName = datas.data[0].topic.split('-')[1];
	    var leftformatter = datas.data[0].topic.split('-')[2];
	
	    var rightyAxisName = datas.data[datas.data.length - 1].topic.split('-')[1];
	    var rightformatter = datas.data[datas.data.length - 1].topic.split('-')[2];
	    
    }
    //y轴
    var seriesItems = [];
    for(var j = 0 ; j < legendArr.length ; j++){
        var obj = {};
        obj.name = legendArr[j];
        obj.type = dataType[j];
        if(obj.type == 'bar' && styleContent.barWidth){
            obj.barWidth = styleContent.barWidth
        }
        if(obj.type == 'bar' && styleContent.barGap){
            obj.barGap = styleContent.barGap
        }
        obj.yAxisIndex = yAxisIndexData[j];
        obj.data = [];
        obj.label ={
            normal:{
                "show": styleContent.label.show,   //是否显示柱体上的数值
                "position": "top"
            }
        };
        for(var n = 0 ; n < dataArray[0].length ; n++){
            obj.data.push(dataArray[j][n].value);
        }
        seriesItems.push(obj);
    }

    var option = {
		title:{
            text: datas.title,
            x:styleContent.title.x,
            //subtext: data.subText,
            textStyle:{
                fontSize:styleContent.title.fontSize,
                color:styleContent.color
            },
            padding:12
        },
        color:styleContent.colorArray,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
//        toolbox: {
//            feature: {
//                dataView: {show: true, readOnly: false},
//                magicType: {show: true, type: ['line', 'bar']},
//                restore: {show: true},
//                saveAsImage: {show: true}
//            }
//        },
//         itemStyle : {
// 		    normal: {
// 		        label : {
// 		            show: styleContent.itemLabel || true,
//                     position: 'top'
// 		        }
// 		    }
// 		    },
        legend: {
            data:legendArr,
            orient: styleContent.legend.orient,
            // x: styleContent.legend.x,
            // y:styleContent.legend.y,
            top: styleContent.legend.top,
            right: styleContent.legend.right || '',
            textStyle:{
                color:styleContent.color
            },
            padding:12
        },
        grid:{
        	x:styleContent.grid.x,
        	y:styleContent.grid.y,
        	x2:styleContent.grid.x2,
        	y2:styleContent.grid.y2
        },
        xAxis: [
            {
                type: 'category',
                data: xAxisData,
                axisPointer: {
                    type: 'shadow'
                },
                axisLabel: {             //x坐标 倾斜30
                    rotate: 30,
                    interval:0,
                    textStyle: {
                        color:styleContent.color //坐标值颜色
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:styleContent.lineColor,
                        fontSize:styleContent.xAxis.fontSize
                    }
                },
                axisLine:{
                    lineStyle:{
                    	color:styleContent.lineColor ? styleContent.lineColor : styleContent.color,
                        fontSize:styleContent.xAxis.fontSize
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine:{                 //去除网格线
                    show: true,
                    lineStyle:{
                        color:styleContent.lineColor
                    }
                },
                nameTextStyle:{
                	color:styleContent.color
                },
                name: !leftyAxisName ? '' : leftyAxisName,
                // min: 0,
                // max: 50,
                // interval: 10,
                axisLabel: {
                    formatter: '{value} ' +  (!leftformatter ? '' : leftformatter),
                    textStyle: {
                        color:styleContent.color //坐标值颜色
                    }
                },
                axisLine:{
                    lineStyle:{
                    	color:styleContent.lineColor ? styleContent.lineColor : styleContent.color,
                        fontSize:styleContent.xAxis.fontSize
                    }
                }
            },
            {
                type: 'value',
                splitLine:{                 //去除网格线
                    show: true,
                    lineStyle:{
                        color:styleContent.lineColor
                    }
                },
                nameTextStyle:{
                	color:styleContent.color
                },
                name: !rightyAxisName ? '' : rightyAxisName,
                // min: 0,
                // max: 25,
                // interval: 5,
                axisLabel: {
                    formatter: '{value} ' + (!rightformatter ? '' : rightformatter),
                    textStyle: {
                        color:styleContent.color //坐标值颜色
                    }
                },
                axisLine:{
                    lineStyle:{
                    	color:styleContent.lineColor ? styleContent.lineColor : styleContent.color,
                        fontSize:styleContent.xAxis.fontSize
                    }
                }
            }
        ],
        series: seriesItems
    };
    var mychart = echarts.init(document.getElementById(styleContent.id));
    mychart.setOption(option);

}


//雷达图
// function radar(datas,styleContent){
//
//     var legendArr =[],dataArray =[];
//     ~function (){
//         for(var i = 0;i < datas.data.length ; i++){
//             legendArr.push(datas.data[i].topic);
//
//             dataArray.push(datas.data[i].valueSet);
//         }
//     }();
//
//
//     var seriesItems = [];
//
//     for(var i = 0 ; i < legendArr.length; i ++){
//         var obj = {};
//         obj.name = legendArr[i];
//         obj.value = [];
//         // obj.areaStyle= {       //topic面积颜色
//         //     normal: {}
//         // };
//         for(var j = 0 ; j < dataArray[0].length; j ++){
//             obj.value.push(dataArray[i][j].value)
//         }
//         seriesItems.push(obj);
//     }
//
//     var maxData = [];
//     for(var n = 0; n < dataArray[0].length ; n ++){
//         var compareArr = [];
//         var obj = {};
//         obj.name = dataArray[0][n].name;
//         for(var m = 0; m  < legendArr.length ; m ++){
//             compareArr.push(dataArray[m][n].value)
//         }
//         compareArr.sort(function(a,b){
//             return b-a;
//         });
//         var random  = (parseInt(Math.random()  * 10) % 2 + 1)/10 + 1;
//         obj.max = parseInt(compareArr[0] *random);
//
//         maxData.push(obj)
//     }
//
//
//
//     var option = {
//         title: {
//             text: datas.title,
//             textStyle:{
//                 fontSize:styleContent.title.fontSize,
//                 color:styleContent.color
//             }
//         },
//         // color:['red','blue'],         //默认颜色
//         tooltip: {},
//         legend: {
//             data: legendArr,
//             textStyle:{
//                 fontSize:styleContent.legend.fontSize,
//                 color:styleContent.color
//             }
//         },
//         radar: {
//             // shape: 'circle',
//             name:{
//                 textStyle:{            //坐标值颜色
//                     color:styleContent.color
//                 }
//             },
//             // splitArea: {           //背景网格颜色
//             //     areaStyle: {
//             //         color: ['rgba(114, 172, 209, 0.2)',
//             //             'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
//             //             'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)'],
//             //         shadowColor: 'rgba(0, 0, 0, 0.3)',
//             //         shadowBlur: 10
//             //     }
//             // },
//             indicator: maxData
//         },
//         series: [{
//             type: 'radar',
//             data : seriesItems
//         }]
//     };
//
//     var mychart = echarts.init(document.getElementById(styleContent.id));
//     mychart.setOption(option);
// }

//瀑布柱状图
function fallsBar(datas,styleContent){

    var legendArr =[],dataArray =[] , assistData = [], sum = 0 ;
    ~function (){
        for(var i = 0;i < datas.data[0].valueSet.length ; i++){
            legendArr.push(datas.data[0].valueSet[i].name);

            dataArray.push(datas.data[0].valueSet[i].value);
            sum += datas.data[0].valueSet[i].value;
        }
        legendArr.unshift('总量');
        dataArray.unshift(sum);

        for(var j = 0; j < dataArray.length ; j ++ ){
            if(assistData.length === 0){
                assistData.push(0);
            }else{
                var amount = 0;
                for(var n = 1; n <= assistData.length ; n ++ ) {
                    amount += dataArray[n];
                }

                assistData.push(dataArray[0] - amount);
            }

        }
    }();



    var option = {
        title: {
            text: datas.title,
            textStyle:{
                color: styleContent.titleColor || '#333'
            },
            padding:12
        },
        color:styleContent.barColor || ['#b6a2de'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
                var tar = params[1];
                return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
            }
        },
        grid:{
            top:'20%',
            left:'13%',
            bottom:'16%',
            right:'6%'
        },
        toolbox: {
            show : false,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        xAxis : [
            {
                type : 'category',
                splitLine: {show:false},
                data : legendArr,
                axisLine:{
                    lineStyle:{
                        color: styleContent.axisLineColor || "#333"
                    }
                },
                boundaryGap : true,  //横坐标是否从原点开始
                axisLabel: {						//x坐标 倾斜30
                    rotate: 30,
                    interval:0,
                    textStyle: {
                        color:styleContent.color || '#fff'  //坐标值颜色
                    }
                },
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel: {
                    textStyle: {
                        color: '#fff'//坐标值得具体的颜色
                    }
                },
                axisLine:{
                    lineStyle:{
                        color: styleContent.axisLineColor || "#333"
                    }
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:styleContent.axisLineColor || '#333'
                    }
                }
            }
        ],
        series : [
            {
                name:'辅助',
                type:'bar',
                stack: '总量',
                itemStyle:{
                    normal:{
                        barBorderColor:'rgba(0,0,0,0)',
                        color:'rgba(0,0,0,0)'
                    },
                    emphasis:{
                        barBorderColor:'rgba(0,0,0,0)',
                        color:'rgba(0,0,0,0)'
                    }
                },
                barWidth: styleContent.barWidth ? styleContent.barWidth : '',
                data:assistData
            },
            {
                name:'库存量',
                type:'bar',
                stack: '总量',
                itemStyle : { normal: {label : {show: false, position: 'inside'}}},
                data:dataArray
            }
        ]
    };

    var mychart = echarts.init(document.getElementById(styleContent.id));
    mychart.setOption(option);
}

//和弦图
function chordDiagram(datas,styleContent){
     function randomColor(){
         var rgb = '';
         var r = Math.floor(Math.random()*255);
         var g = Math.floor(Math.random()*255);
         var b = Math.floor(Math.random()*255);
         rgb = 'rgb('+r+','+g+','+b+')';
         return rgb
     }

     var legendArr =[],dataArray =[],linksArray = [],topic = 0;
     ~function (){
         var data = datas.data;
         for(var i = 0;i < data.length ; i++){

             legendArr.push(data[i].topic);

             topic = data[i].topic;

             for(var j = 0; j < data[i].valueSet.length ; j ++){
                 var obj = {};
                 obj.source = topic;
                 obj.target = data[i].valueSet[j].name;
                 obj.weight = 1;

                 linksArray.push(obj);

                 if(data[i].valueSet[j].value === 0 ){
                     data[i].valueSet[j].value = 20;
                 }

                 var obj1 = {};
                 obj1.name = data[i].valueSet[j].name;
                 obj1.itemStyle = {
                     normal:{
                         color:randomColor()
                     }
                 };
                 obj1.value = data[i].valueSet[j].value;

                 obj1.symbolSize = data[i].valueSet[j].value;
                 dataArray.push(obj1);
             }
         }
     }();



     for(var i = 0 ; i < legendArr.length; i ++){
         var obj = {};
         obj.name = legendArr[i];

         obj.value = 20;


         dataArray.push(obj);
     }


    var option = {
        title : {
            text: datas.title,
            x:'right',
            y:'bottom'
        },
        tooltip : {},
        legend: {
            x: 'left',
            data:legendArr

        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series : [
            {
                type: 'graph',
                layout: 'circular',   //force   circular 圆形 与 树状图 转换
                circular: {
                    rotateLabel: true
                },
                symbolSize: 45,           //默认球体大小
                focusNodeAdjacency: true,
                roam: true,
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 12
                        },
                    }
                },
                force: {
                    repulsion: 1000
                },
                itemStyle:{
                    normal: {
                        label: {
                            rotate: true,
                            show: true,
                            textStyle: {
                                color: '#333',
                                fontWeight: 'bold'
                            }
                        }
                    }
                },
                categories: legendArr,
                lineStyle: {
                    normal: {
                        color: '#000',
                        width:1,
                        type:"solid",
                        curveness:0.3
                    }
                },


                // 使用 nodes links 表达和弦图
                data: dataArray,
                links: linksArray
            }
        ]
    };

     var mychart = echarts.init(document.getElementById(styleContent.id));
     mychart.setOption(option);
 }

//日历图
function custom(datas,styleContent){

    var legendArr =[],dataArray =[],dataName = [];
    ~function (){
        for(var i = 0;i < datas.data.length ; i++){
            legendArr.push(datas.data[i].topic);

            for(var j = 0 ; j < datas.data[i].valueSet.length; j++){
                var arr = [];
                arr.push(i,j,datas.data[i].valueSet[j].value);
                dataArray.push(arr);
            }
        }

        for(var n = 0 ; n < datas.data[0].valueSet.length; n++) {
            dataName.push(datas.data[0].valueSet[n].name)
        }
    }();

    function renderItem(params, api) {
        var values = [api.value(0), api.value(1)];
        var coord = api.coord(values);
        var size = api.size([1, 1], values);
        return {
            type: 'sector',
            shape: {
                cx: params.coordSys.cx,
                cy: params.coordSys.cy,
                r0: coord[2] - size[0] / 2,
                r: coord[2] + size[0] / 2,
                startAngle: coord[3] - size[1] / 2,
                endAngle: coord[3] + size[1] / 2
            },
            style: api.style({
                fill: api.visual('color')
            })
        };
    }

    var topicData = dataName;
    var days = legendArr;

    var data = dataArray;
    var maxValue = echarts.util.reduce(data, function (max, item) {
        return Math.max(max, item[2]);
    }, -Infinity);

    option = {
        legend: {
            data: ['Punch Card']
        },
        polar: {},
        tooltip: {
        },
        visualMap: {
            type: 'continuous',
            min: 0,
            max: maxValue,
            top: 'middle',
            dimension: 2,
            range: [110, maxValue],
            calculable: true,
            color:styleContent.colorArray,
            textStyle:{
            	color:styleContent.color
            }
        },
        angleAxis: {
            type: 'category',
            data: topicData,
            boundaryGap: false,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#ddd',
                    type: 'dashed'
                }
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: styleContent.color
                }
            }
        },
        radiusAxis: {
            type: 'category',
            data: days,
            z: 100,
            axisLine: {
                show: false,
                lineStyle: {
                    color: styleContent.color
                }
            }
        },
        series: [{
            name: datas.title,
            type: 'custom',
            coordinateSystem: 'polar',
            itemStyle: {
                normal: {
                    color: '#d14a61'
                }
            },
            renderItem: renderItem,
            data: data
        }]
    };

    var mychart = echarts.init(document.getElementById(styleContent.id));
    mychart.setOption(option);
}

//区域分块折线图
function echartAreaLine(datas,styleContent){

	var data = datas.data[0].valueSet;

	var dataLen = data.length;
	
	if(styleContent.amount){
		dataLen = styleContent.amount
	}
	
	var legendArr =[],dataArray =[],dataName = [];
    ~function (){
        for(var i = 0;i < dataLen ; i++){
        	dataArray.push(data[i].value);
            dataName.push(data[i].name);
        }
        
    }();
    
    var range = styleContent.rangeData;
    var rangeLegend =[],rangeData =[],rangeName = [];
    ~function (){
        for(var i = 0;i < range.length ; i++){
        	rangeData.push(range[i].value);
        	rangeName.push(range[i].name);
        }
        
    }();
    
    console.log(styleContent.rangeData)
    console.log('rangeData',rangeData)
    console.log('rangeName',rangeName)
	
    var seriesItems = [];
    var colorArray = ['rgba(252,4,4,0.5)','rgba(242,65,65,0.3)','rgba(0,153,153,0.5)','rgba(90,189,246,0.5)','rgba(28,113,241,0.5)'];
//    var timeData = ['2011','2012','2013','2014','2015','2016','20117'];
    
    for(var i = 0 ; i < rangeName.length ; i ++){
    	if( i === 0){
    		var arr = [{
                name: rangeName[i],
                yAxis: rangeData[i+1],
                itemStyle: {
                    normal: {
                        color: colorArray[i]
                    }
                },
            }, {
                yAxis:(rangeData[i] < 0) ? (rangeData[i] * 0.8) : (rangeData[i] * 1.1)
            }];
    	}else if(i === rangeName.length -1){
//    		var min = rangeData.sort(function(a,b){
//    			return a-b;
//    		});
    		
    		var min =((rangeData[rangeName.length -1] < 0 ) ? (rangeData[rangeName.length -1] *1.2 ) : (rangeData[rangeName.length -1] * 0.8 )).toFixed(2);
    		
    		console.log('arr',rangeData)
    		var max = ((rangeData[0] < 0) ? (rangeData[0] *0.8) : (rangeData[0] * 1.2)).toFixed(2);
//    		min = min[0] > 0 ? min[0] :  min[0] * 1.1;

    		var arr = [{
                name: rangeName[i],
                yAxis: (rangeData[i] > 0) ? (rangeData[i] * 0.8) : (rangeData[i] * 1.1),
                itemStyle: {
                    normal: {
                        color: colorArray[i]
                    }
                },
            }, {
                yAxis: rangeData[i] 
            }];
    	}else{
    		var arr = [{
                name: rangeName[i],
                yAxis: rangeData[i+1],
                itemStyle: {
                    normal: {
                        color: colorArray[i]
                    }
                },
            }, {
                yAxis: rangeData[i]
            }];
    	}
    	
//    	var arr = [{
//            name: rangeName[i],
//            yAxis: rangeData[i+1],
//            itemStyle: {
//                normal: {
//                    color: colorArray[i]
//                }
//            },
//        }, {
//            yAxis: rangeData[i]
//        }];
    	seriesItems.push(arr);
    	
    }
    console.log('seriesItems',seriesItems)
    
    var timeData = dataName;
    var option = {
        title: {
            text: datas.title,
            x: 'left',
        },
        tooltip: {
            trigger: 'axis',

            axisPointer: {
                animation: false
            }
        },
        legend: {
            data: ['流量'],
            x: 'left'
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        axisPointer: {
            link: {
                xAxisIndex: 'all'
            }
        },
        grid: [{
	          left: '5%',
	          right: '5%'
	      }, {
	          left: '5%',
	          right:'5%'
        }],
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                onZero: true
            },
            axisLabel: {						//x坐标 倾斜30
            	rotate: -40,
            	interval:0,
//            	textStyle: {
//                    color:styleContent.color   //坐标值颜色
//                }
            }, 
            data: timeData
        }, {
            gridIndex: 1
        }],

        yAxis: [{

            type: 'value',
            max: max,
            name: '单位:',
            min: min ,
//            interval: 25,


        }, {
            gridIndex: 1
        }],
        series: [{
            name: '数值',
            type: 'line',
            smooth: false,
            symbol: 'circle',
            symbolSize: 9,
            showSymbol: false,
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                }, {
                    type: 'min',
                    name: '最小值'
                }]
            },
            markArea: {
                silent: true,
                label: {
                    normal: {
                        position: ['10%', '50%']
                    }
                },
                data: seriesItems
            },
//            data: [24, 24, 23, 30, 32, 26, 46]
            data:dataArray

        }]
    };
    var myChart = echarts.init(document.getElementById(styleContent.id));
    myChart.setOption(option);
}

//关系图
function link(data,styleContent){


        var option = {
            backgroundColor: 'rgba(12, 65, 150, 1)',
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series : [
                {
                    type: 'graph',
                    layout: 'none',
                    symbolSize: 50,
                    roam: true,
                    hoverAnimation: true,
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [1, 10],
                    edgeLabel: {
                        normal: {
                            textStyle: {
                                fontSize: 12
                            }
                        }
                    },
                    data: data.data,
                    links: data.links,
                    lineStyle: {
                        normal: {
                            opacity: 1,
                            width: 1,
                            curveness: 0.1
                        }
                    },
                    itemStyle: {
                        color: 'blue'
                    }
                }
            ]
        };

        var myChart = echarts.init(document.getElementById(styleContent.id));
        myChart.setOption(option);

}



