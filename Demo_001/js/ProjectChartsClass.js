function ProjectChartsClass() {
    ProjectChartsClass.chartByYearInit = function (year) {
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

            var myChart = echarts.init(document.getElementById('main'));

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
                    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
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


        }, Common_Error, { ActionName: "slideshowTest" });

    }

    ProjectChartsClass.chartInYearInit = function () {
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

            var myChart = echarts.init(document.getElementById('chartYear'));

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

    ProjectChartsClass.PageInit = function () {
        LoadServiceClass.LoadServiceInterfaceByDLLSetting("news.dll|carouselBase.ProjectCarousel|getLineChartYears", "年相关的筛选条件", false, "", "", {}, function (返回值) {
            var result = eval("(" + 返回值.Result + ")");

            let year_data = document.getElementById("year_data");
            year_data.title = "请选择年份!";

            for (let i = 0; i < result.length; i++) {
                let option = new Option(result[i].年度 + "年", result[i].年度)
                year_data.options.add(option);
            }

            year_data.onchange = function () {
                ProjectChartsClass.chartByYearInit(year_data.options[year_data.selectedIndex].value);
            }
        
            ProjectChartsClass.chartByYearInit(year_data.options[0].value);
        
            ProjectChartsClass.chartInYearInit();

        }, Common_Error, { ActionName: "slideshowTest" });
    }
}

new ProjectChartsClass();

