import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';

interface SkillsChartsProps {}

const SkillsCharts: React.FunctionComponent<SkillsChartsProps> = () => {
    const options = {
        chart: {
            type: 'pie',
        },
        title: {
            text: 'Thống kê sản phẩm bán',
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}%</b>',
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y}%',
                },
                showInLegend: true,
            },
        },
        series: [
            {
                name: 'Languages',
                data: [
                    ['Rau', 65],
                    ['Củ', 20],
                    ['Quả', 10],
                    ['Gạo', 5],
                    ['Thịt', 4],
                    ['Cá', 3],
                    ['Bột', 2],
                    ['Khác', 1],
                ],
            },
        ],
    };
    return (
        <div className="flex justify-between w-full gap-6">
            <div className="bg-white border rounded-sm shadow-lg basis-1/3 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
            <div className="bg-white border rounded-sm shadow-lg basis-2/3 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <div className="bg-white border rounded-sm shadow-lg col-span-full xl:col-span-8 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                    <header className="px-5 py-2 border-b border-slate-100 dark:border-slate-700">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Bảng xếp hạng sản phẩm</h2>
                    </header>
                    <div className="p-7">
                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto dark:text-slate-300">
                                {/* Table header */}
                                <thead className="text-xs uppercase rounded-sm text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
                                    <tr>
                                        <th className="p-2">
                                            <div className="font-semibold text-left">Tên sản phẩm</div>
                                        </th>
                                        <th className="p-2">
                                            <div className="font-semibold text-center">Lượt xem</div>
                                        </th>
                                        <th className="p-2">
                                            <div className="font-semibold text-center">Doanh thu</div>
                                        </th>
                                        <th className="p-2">
                                            <div className="font-semibold text-center">Bán</div>
                                        </th>
                                        <th className="p-2">
                                            <div className="font-semibold text-center">Thêm sau</div>
                                        </th>
                                    </tr>
                                </thead>
                                {/* Table body */}
                                <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
                                    {/* Row */}
                                    <tr>
                                        <td className="p-2">
                                            <div className="flex items-center">
                                                <svg className="mr-2 shrink-0 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                                                    <circle fill="#24292E" cx="18" cy="18" r="18" />
                                                    <path
                                                        d="M18 10.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V24c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z"
                                                        fill="#FFF"
                                                    />
                                                </svg>
                                                <div className="text-slate-800 dark:text-slate-100">Github.com</div>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">2.4K</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-emerald-500">$3,877</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">267</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-sky-500">4.7%</div>
                                        </td>
                                    </tr>
                                    {/* Row */}
                                    <tr>
                                        <td className="p-2">
                                            <div className="flex items-center">
                                                <svg className="mr-2 shrink-0 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                                                    <circle fill="#1DA1F2" cx="18" cy="18" r="18" />
                                                    <path
                                                        d="M26 13.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H10c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z"
                                                        fill="#FFF"
                                                        fillRule="nonzero"
                                                    />
                                                </svg>
                                                <div className="text-slate-800 dark:text-slate-100">Twitter</div>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">2.2K</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-emerald-500">$3,426</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">249</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-sky-500">4.4%</div>
                                        </td>
                                    </tr>
                                    {/* Row */}
                                    <tr>
                                        <td className="p-2">
                                            <div className="flex items-center">
                                                <img
                                                    src={
                                                        'https://cdn.tgdd.vn/Files/2019/11/26/1222471/7-cach-chon-rau-cu-qua-tuoi-ngon-cuc-don-gian-202112311224397887.jpg'
                                                    }
                                                    alt="Rau củ tươi ngon"
                                                    className="mr-2 shrink-0 sm:mr-3 rounded-full w-9 h-9"
                                                />
                                                <div className="text-slate-800 dark:text-slate-100">Google (organic)</div>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">2.0K</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-emerald-500">$2,444</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">224</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-sky-500">4.2%</div>
                                        </td>
                                    </tr>
                                    {/* Row */}
                                    <tr>
                                        <td className="p-2">
                                            <div className="flex items-center">
                                                <svg className="mr-2 shrink-0 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                                                    <circle fill="#4BC9FF" cx="18" cy="18" r="18" />
                                                    <img src="" alt="" />
                                                </svg>
                                                <div className="text-slate-800 dark:text-slate-100">Vimeo.com</div>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">1.9K</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-emerald-500">$2,236</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">220</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-sky-500">4.2%</div>
                                        </td>
                                    </tr>
                                    {/* Row */}
                                    <tr>
                                        <td className="p-2">
                                            <div className="flex items-center">
                                                <svg className="mr-2 shrink-0 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
                                                    <circle fill="#0E2439" cx="18" cy="18" r="18" />
                                                    <path
                                                        d="M14.232 12.818V23H11.77V12.818h2.46zM15.772 23V12.818h2.462v4.087h4.012v-4.087h2.456V23h-2.456v-4.092h-4.012V23h-2.461z"
                                                        fill="#E6ECF4"
                                                    />
                                                </svg>
                                                <div className="text-slate-800 dark:text-slate-100">Indiehackers.com</div>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">1.7K</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-emerald-500">$2,034</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">204</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-sky-500">3.9%</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillsCharts;
