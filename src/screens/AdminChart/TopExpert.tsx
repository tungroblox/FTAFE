import React from 'react';

interface TopExpertProps {}

const TopExpert: React.FunctionComponent<TopExpertProps> = () => {
    const SAMPLE_EXPERT = [
        {
            id: '0',
            image: '/assets/images/customer/avatar-1.png',
            name: 'Đồng Xanh Nông Trại',
            email: 'dongxanh@gmail.com',
            location: 'Q9',
            spent: '2,890,000,666VNĐ',
        },
        {
            id: '1',
            image: '/assets/images/customer/avatar-2.png',
            name: 'Cánh Đồng Mùa Vàng',
            email: 'muavang@gmail.com',
            location: 'Q8',
            spent: '2,767,000,064VNĐ',
        },
        {
            id: '2',
            image: '/assets/images/customer/avatar-3.png',
            name: 'Hòa Bình Nông Nghiệp',
            email: 'hoabinh@gmail.com',
            location: 'Q12',
            spent: '2,767,000,064VNĐ',
        },
        {
            id: '3',
            image: '/assets/images/customer/avatar-4.png',
            name: 'Mộc Lan Nông Trại',
            email: 'moclan@gmail.com',
            location: 'Hóc Môn',
            spent: '2,767,000,064VNĐ',
        },
        {
            id: '4',
            image: '/assets/images/customer/avatar-5.png',
            name: 'Phượng Hoàng Nông Vườn',
            email: 'phuonghoang@gmail.com',
            location: 'Bình Dương',
            spent: '2,767,000,064VNĐ',
        },
    ];

    return (
        <div className="bg-white border rounded-sm shadow-lg dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Bảng xếp hạng FarmHub</h2>
            </header>
            <div className="p-3">
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        {/* Table header */}
                        <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Tên</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Email</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Doanh thu</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center">Vị trí</div>
                                </th>
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                            {SAMPLE_EXPERT.map((expert) => {
                                return (
                                    <tr key={expert.id}>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 mr-2 shrink-0 sm:mr-3">
                                                    <img className="rounded-full" src={expert.image} width="40" height="40" alt={expert.name} />
                                                </div>
                                                <div className="font-medium text-slate-800 dark:text-slate-100">{expert.name}</div>
                                            </div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-left">{expert.email}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="font-medium text-left text-green">{expert.spent}</div>
                                        </td>
                                        <td className="p-2 whitespace-nowrap">
                                            <div className="text-lg text-center">{expert.location}</div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TopExpert;
