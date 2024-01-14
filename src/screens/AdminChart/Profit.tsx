import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
interface ProfitProps {}

const Profit: React.FunctionComponent<ProfitProps> = () => {
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
    return (
        <div className="flex flex-col bg-white border rounded-sm shadow-lg dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default Profit;
