import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface OverviewDataProps {}

const OverviewData: React.FunctionComponent<OverviewDataProps> = () => {
    const options = {
        chart: {
            type: 'line',
            width: 300,
            height: 200,
        },
        title: {
            text: '',
        },
        xAxis: {
            visible: false,
        },
        yAxis: {
            visible: false,
        },
        plotOptions: {
            line: {
                marker: {
                    enabled: false,
                },
            },
        },
        series: [
            {
                name: 'Month 1',
                data: [22, 20, 30, 30, 50, 60, 80],
            },
            {
                name: 'Month 2',
                data: [15, 19, 28, 45, 55, 55, 70],
            },
        ],
    };
    return (
        <div className="flex flex-col items-center justify-center bg-white border rounded-sm shadow-lg col-span-full sm:col-span-6 xl:col-span-4 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <div className="flex flex-col items-start justify-start w-full px-5 pt-5">
                <header className="flex items-start justify-between mb-2">
                    {/* Icon */}
                    <img src={'/assets/icons/icon-01.svg'} width="32" height="32" alt="Icon 01" />
                    {/* Menu button */}
                </header>
                <h2 className="mb-2 text-lg font-semibold text-slate-800 dark:text-slate-100">Acme Plus</h2>
                <div className="mb-1 text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">Sales</div>
                <div className="flex items-start">
                    <div className="mr-2 text-3xl font-bold text-slate-800 dark:text-slate-100">$24,780</div>
                    <div className="text-sm font-semibold text-white px-1.5 bg-emerald-500 rounded-full">+49%</div>
                </div>
            </div>
            {/* Chart built with Chart.js 3 */}
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default OverviewData;
