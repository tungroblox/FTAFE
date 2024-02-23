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
                                                <img
                                                    src={
                                                        'https://cdn.discordapp.com/attachments/1210447037456195595/1210447075930669096/gao-st25-chinh-phuc-nguoi-tieu-dung-my.png?ex=65ea97af&is=65d822af&hm=a98e4669f1579f2cea900e5a93cbd9f81f6963741ff1c16679a7dab05a4bbe15&'
                                                    }
                                                    alt="Rau củ tươi ngon"
                                                    className="mr-2 shrink-0 sm:mr-3 rounded-full w-9 h-9"
                                                />
                                                <div className="text-slate-800 dark:text-slate-100">Gạo</div>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">178.2K</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-emerald-500">1,892,000,666VNĐ</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">14.3K</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-sky-500">4.2%</div>
                                        </td>
                                    </tr>
                                    {/* Row */}
                                    <tr>
                                        <td className="p-2">
                                            <div className="flex items-center">
                                                <img
                                                    src={
                                                        'https://cdn.discordapp.com/attachments/1210447037456195595/1210447468005695488/20200423_052100_072261_khoailang.png?ex=65ea980d&is=65d8230d&hm=b2ba607df7e8f9d5432ec35cb762c01a9e7fa8e1ebd336b81edd4cbbf3dd2d0b&'
                                                    }
                                                    alt="Rau củ tươi ngon"
                                                    className="mr-2 shrink-0 sm:mr-3 rounded-full w-9 h-9"
                                                />
                                                <div className="text-slate-800 dark:text-slate-100">Khoai lang</div>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">178.2K</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-emerald-500">1,892,000,666VNĐ</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">14.3K</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-sky-500">4.2%</div>
                                        </td>
                                    </tr>
                                    {/* Row */}
                                    <tr>
                                        <td className="p-2">
                                            <div className="flex items-center">
                                                <img
                                                    src={
                                                        'https://cdn.discordapp.com/attachments/1210447037456195595/1210447664261496913/tac-dung-it-biet-cua-cu-den-do.png?ex=65ea983c&is=65d8233c&hm=ea06288b0a51d2da804fbaf229cbc8cb5209419679f0b7ce074e65452f713ebc&'
                                                    }
                                                    alt="Rau củ tươi ngon"
                                                    className="mr-2 shrink-0 sm:mr-3 rounded-full w-9 h-9"
                                                />
                                                <div className="text-slate-800 dark:text-slate-100">Củ dền</div>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">178.2K</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-emerald-500">1,892,000,666VNĐ</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">14.3K</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-sky-500">4.2%</div>
                                        </td>
                                    </tr>
                                    {/* Row */}
                                    <tr>
                                        <td className="p-2">
                                            <div className="flex items-center">
                                                <img
                                                    src={
                                                        'https://cdn.discordapp.com/attachments/1210447037456195595/1210447838706671638/images2582519_1_mi.png?ex=65ea9865&is=65d82365&hm=d2768a7aa7f1bed3e190b1d3e9de6f907b926a191b58bedb7ffed1b0eada3c39&'
                                                    }
                                                    alt="Rau củ tươi ngon"
                                                    className="mr-2 shrink-0 sm:mr-3 rounded-full w-9 h-9"
                                                />
                                                <div className="text-slate-800 dark:text-slate-100">Củ sắn</div>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">178.2K</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-emerald-500">1,892,000,666VNĐ</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">14.3K</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-sky-500">4.2%</div>
                                        </td>
                                    </tr>
                                    {/* Row */}
                                    <tr>
                                        <td className="p-2">
                                            <div className="flex items-center">
                                                <img
                                                    src={
                                                        'https://cdn.discordapp.com/attachments/1210447037456195595/1210448021884510238/cach-nau-khoai-mi-nuoc-cot-dua-an-la-nghien-202110301731027561.png?ex=65ea9891&is=65d82391&hm=4887f1ed18bd5f32dc6ae19731a5dc28d9f4be855b8a0c41e086ab4bb1efc6bc&'
                                                    }
                                                    alt="Rau củ tươi ngon"
                                                    className="mr-2 shrink-0 sm:mr-3 rounded-full w-9 h-9"
                                                />
                                                <div className="text-slate-800 dark:text-slate-100">Khoai mì</div>
                                            </div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">178.2K</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-emerald-500">1,892,000,666VNĐ</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center">14.3K</div>
                                        </td>
                                        <td className="p-2">
                                            <div className="text-center text-sky-500">4.2%</div>
                                        </td>
                                    </tr>
                                    {/* <tr>
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
                                    </tr> */}
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
