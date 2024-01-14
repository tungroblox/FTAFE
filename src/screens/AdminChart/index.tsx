import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import WelcomeBanner from './WelcomeBanner';
import OverviewData from './OverviewData';
import Profit from './Profit';
import RealtimeChart from './RealtimeChart';
import SkillsCharts from './SkillsCharts';
import TopExpert from './TopExpert';

interface AdminChartProps {}
const options = {
    chart: {
        type: 'column',
    },
    title: {
        text: 'Profit Comparison 2022-2023',
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yAxis: {
        title: {
            text: 'Profit (MIL.VND)',
        },
        labels: {
            format: '{value}$',
        },
    },
    series: [
        {
            name: '2022',
            data: [150, 220, 180, 240, 280, 320, 280, 250, 220, 180, 150, 200],
        },
        {
            name: '2023',
            data: [180, 240, 280, 320, 280, 250, 220],
        },
    ],
};

const options3 = {
    chart: {
        type: 'column',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 50,
            viewDistance: 25,
        },
    },
    title: {
        text: 'Number of Visitors and Subscribers',
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yAxis: {
        title: {
            text: 'Number',
        },
    },
    zAxis: {
        title: {
            text: null,
        },
    },
    plotOptions: {
        column: {
            depth: 25,
            zIndex: 1,
        },
        line: {
            depth: 25,
            zIndex: 2,
        },
    },
    series: [
        {
            name: 'Visitors',
            data: [500, 600, 800, 1000, 900, 700],
            zIndex: 1,
        },
        {
            name: 'Subscribers',
            type: 'line',
            data: [100, 200, 300, 400, 500, 600],
            zIndex: 2,
        },
    ],
};

const AdminChart: React.FunctionComponent<AdminChartProps> = () => {
    return (
        <div className="flex flex-col gap-10 p-10">
            {/* <HighchartsReact highcharts={Highcharts} options={options3} /> */}
            <WelcomeBanner />
            <div className="grid grid-cols-12 gap-6">
                <OverviewData />
                <OverviewData />
                <OverviewData />
            </div>
            <div className="flex justify-between gap-6">
                <Profit />
                <RealtimeChart />
            </div>
            <SkillsCharts />
            <TopExpert />
        </div>
    );
};

export default AdminChart;
