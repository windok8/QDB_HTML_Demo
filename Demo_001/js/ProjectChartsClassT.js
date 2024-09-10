function ProjectChartsClassM() {
    ProjectChartsClassM.chartByYearInit = function (year) {
        LoadServiceClass.LoadServiceInterfaceByDLLSetting("news.dll|carouselBase.ProjectCarousel|getLineChartData", "获取折线图相关数据", false, "", "", { "year": year }, function (返回值) {
            //成功后的回调
            var Config = eval("(" + 返回值.Result + ")");

            let revenueData = [];
            let costData = [];
            let profitfData = [];
            let status = 0;
            for (let i = 0; i < 12; i++) {

                for (let j = 0; j < Config.length; j++) {
                    if (i + 1 == Config[j].月度) {
                        revenueData.push(Config[j].月度完成产值);
                        costData.push(Config[j].月度工程成本);
                        profitfData.push(Config[j].月度完成产值 / 1.09 - Config[j].月度工程成本);
                        status++;
                    }
                }

                if (status == 0) {
                    revenueData.push(0);
                    costData.push(0);
                    profitfData.push(0);
                } else {
                    status = 0;
                }

            }

            var myChart = echarts.init(document.getElementById('main_m'));

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '项目信息统计'
                },
                tooltip: {},
                legend: {
                    data: ['月度完成产值', '月度工程成本', '利润']
                },
                xAxis: {
                    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                    axisLabel: {
                        interval: 1  // 每个标签都显示，间隔为0
                    }
                },

                yAxis: {},
                series: [
                    {
                        name: '月度完成产值',
                        type: 'bar',
                        data: revenueData
                    },
                    {
                        name: '利润',
                        type: 'bar',
                        data: profitfData,
                        itemStyle: {
                            color: function(params){
                                return '#f36812';
                            }
                        }
                    },
                    {
                        name: '月度工程成本',
                        type: 'bar',
                        data: costData
                    },
                    {
                        name: '利润',
                        type: 'line',
                        data: profitfData
                    },
                    
                ]
            };

            myChart.setOption(option);

            window.onresize = function() {
                myChart.resize(); // 当窗口大小变化时自动调整图表大小
            };


        }, Common_Error, { ActionName: "slideshowTest" });

    }

    ProjectChartsClassM.chartInYearInit = function () {
        LoadServiceClass.LoadServiceInterfaceByDLLSetting("news.dll|carouselBase.ProjectCarousel|getChartInYear", "年相关的筛选条件", false, "", "", {}, function (返回值) {
            var result = eval("(" + 返回值.Result + ")");

            let revenueData = [];
            let costData = [];
            let profitfData = [];
            let xAxis = [];

            for (let i = 0; i < result.length; i++) {
                xAxis.push(result[i].年度);
                revenueData.push(result[i].年度完成产值);
                costData.push(result[i].年度工程成本);
                profitfData.push(result[i].年度完成产值 / 1.09 - result[i].年度工程成本);
            }

            var myChart = echarts.init(document.getElementById('chartYear_m'));

            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '项目信息统计'
                },
                tooltip: {},
                legend: {
                    data: ['年度完成产值', '年度工程成本', '利润']
                },
                xAxis: {
                    data: xAxis
                },
                yAxis: {},
                series: [
                    {
                        name: '年度完成产值',
                        type: 'bar',
                        data: revenueData
                    },
                    {
                        name: '利润',
                        type: 'bar',
                        data: profitfData,
                        itemStyle: {
                            color: function(params){
                                return '#f36812';
                            }
                        }
                    },
                    {
                        name: '年度工程成本',
                        type: 'bar',
                        data: costData
                    },
                    {
                        name: '利润',
                        type: 'line',
                        data: profitfData
                    },
                ]
            };

            myChart.setOption(option);

        }, Common_Error, { ActionName: "slideshowTest" });
    }

    ProjectChartsClassM.PageInit = function () {
        LoadServiceClass.LoadServiceInterfaceByDLLSetting("news.dll|carouselBase.ProjectCarousel|getLineChartYears", "年相关的筛选条件", false, "", "", {}, function (返回值) {
            var result = eval("(" + 返回值.Result + ")");

            let year_data = document.getElementById("year_data_m");
            year_data.title = "请选择年份!";



            /*for (let i = 0; i < result.length; i++) {
                let option = new Option(result[i].年度 + "年", result[i].年度)
                year_data.options.add(option);

            }*/

            // 修改为从最后一个年份开始循环到第一个年份
            for (let i = result.length - 1; i >= 0; i--) {

                let option = new Option(result[i].年度 + "年", result[i].年度);
                year_data.options.add(option);
            }



            year_data.onchange = function () {
                ProjectChartsClassM.chartByYearInit(year_data.options[year_data.selectedIndex].value);
            }
        
            ProjectChartsClassM.chartByYearInit(year_data.options[0].value);
        
            ProjectChartsClassM.chartInYearInit();

        }, Common_Error, { ActionName: "slideshowTest" });
    }
}

new ProjectChartsClassM();

