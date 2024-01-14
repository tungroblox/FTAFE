import React from 'react';

interface TopExpertProps {}

const TopExpert: React.FunctionComponent<TopExpertProps> = () => {
    const SAMPLE_EXPERT = [
        {
            id: '0',
            image: '/assets/images/customer/avatar-1.png',
            name: 'Alex Shatov',
            email: 'alexshatov@gmail.com',
            location: '🇺🇸',
            spent: '$2,890.66',
        },
        {
            id: '1',
            image: '/assets/images/customer/avatar-2.png',
            name: 'Philip Harbach',
            email: 'philip.h@gmail.com',
            location: '🇩🇪',
            spent: '$2,767.04',
        },
        {
            id: '2',
            image: '/assets/images/customer/avatar-3.png',
            name: 'Mirko Fisuk',
            email: 'mirkofisuk@gmail.com',
            location: '🇫🇷',
            spent: '$2,996.00',
        },
        {
            id: '3',
            image: '/assets/images/customer/avatar-4.png',
            name: 'Olga Semklo',
            email: 'olga.s@cool.design',
            location: '🇮🇹',
            spent: '$1,220.66',
        },
        {
            id: '4',
            image: '/assets/images/customer/avatar-5.png',
            name: 'Burak Long',
            email: 'longburak@gmail.com',
            location: '🇬🇧',
            spent: '$1,890.66',
        },
    ];

    return (
        <div className="bg-white border rounded-sm shadow-lg dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Top Expert Of The Month</h2>
            </header>
            <div className="p-3">
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        {/* Table header */}
                        <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Name</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Email</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Revenues</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-center">Country</div>
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
