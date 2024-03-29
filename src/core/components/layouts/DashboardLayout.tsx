import {
    AreaChartOutlined,
    DatabaseOutlined,
    FieldTimeOutlined,
    FolderOpenOutlined,
    HomeOutlined,
    MenuFoldOutlined,
    MenuOutlined,
    MenuUnfoldOutlined,
    OrderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { routes } from '@core/routes';
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { useLogoutMutation } from '@hooks/api/auth.hook';
import { UserRole } from '@models/user';
import { Person, PersonCheck, SignOut } from 'akar-icons';
import { Button, Dropdown, Layout, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import { useStoreUser } from '../../store';
import { CommonSeo } from '../commons';

const { Sider, Content } = Layout;

const menuAdminList: ItemType[] = [
    {
        icon: <AreaChartOutlined />,
        label: 'Dashboard',
        key: routes.admin.home(),
    },
    {
        icon: <UserOutlined />,
        label: 'User',
        key: 'user',
        children: [
            {
                key: routes.admin.user.customer.list(),
                label: 'Customer',
            },
            {
                label: 'FarmHub',
                key: routes.admin.user.farm_hub.list(),
            },
            {
                label: 'Station',
                key: routes.admin.user.station.list(),
            },
            {
                label: 'Collected Hub',
                key: routes.admin.user.collected_hub_staff.list(),
            },
        ],
    },

    {
        icon: <UserOutlined />,
        label: 'Bán Sản Phẩm',
        key: 'Menu',
        children: [
            {
                key: routes.admin.category.list(),
                label: 'Chuyên mục',
            },
            {
                label: 'Sản phẩm',
                key: routes.admin.product.list(),
            },
            {
                label: 'Đơn hàng',
                key: routes.admin.order.list(),
            },
            {
                label: 'Menu',
                key: routes.admin.menu.list(),
            },
        ],
    },
    // {
    //     icon: <UserOutlined />,
    //     label: 'Lịch sử',
    //     key: 'history',
    //     children: [
    //         {
    //             key: routes.admin.category.list(),
    //             label: 'Nhật ký hoạt động',
    //         },
    //         {
    //             label: 'Biến động số dư',
    //             key: routes.admin.product.list(),
    //         },
    //         {
    //             label: 'Lịch sử nạp VNPAY',
    //             key: routes.admin.order.list(),
    //         },
    //         {
    //             label: 'Lịch sử nạp ',
    //             key: routes.admin.menu.list(),
    //         },
    //     ],
    // },
    {
        icon: <AreaChartOutlined />,
        label: 'Area',
        key: routes.admin.area(),
    },
    {
        icon: <HomeOutlined />,
        label: 'Apartment',
        key: routes.admin.apartment(),
    },
    {
        icon: <FieldTimeOutlined />,
        label: 'Business day',
        key: routes.admin.businessDay(),
    },
];

const menuUndefined: ItemType[] = [];
const menuStaffList: ItemType[] = [
    {
        icon: <AreaChartOutlined />,
        label: 'Tình trạng hàng hóa',
        key: routes.staff.home(),
    },
];
const menuFarmHubList: ItemType[] = [
    {
        icon: <AreaChartOutlined />,
        label: 'Dashboard',
        key: routes.farmhub.home(),
    },
    {
        icon: <DatabaseOutlined />,
        label: 'Danh sách sản phẩm',
        key: 'product',
        children: [
            {
                key: routes.farmhub.businessDay.list(),
                label: 'Ngày bán',
                icon: <FolderOpenOutlined />,
            },
            {
                label: 'Sản phẩm',
                key: routes.farmhub.product.list(),
                icon: <ArchiveBoxIcon className="w-4 h-4 text-jacarta-700 dark:text-white" strokeWidth={2} />,
            },
            {
                label: 'Đơn hàng',
                key: routes.farmhub.order.list(),
                icon: <OrderedListOutlined />,
            },
            {
                label: 'Menu',
                key: routes.farmhub.menu.list(),
                icon: <MenuOutlined />,
            },
        ],
    },
];
interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const [collapsed, setCollapsed] = React.useState(false);
    const router = useRouter();
    const user = useStoreUser();

    const { mutationLogout } = useLogoutMutation();
    const [isOpen, setIsOpen] = React.useState(false);
    const notifications: any[] = [];

    React.useEffect(() => {
        window.addEventListener('scroll', (_) => setIsOpen(false));
    }, []);

    return (
        <>
            <CommonSeo title="Dashboard" />
            <div className="relative root">
                <Layout hasSider>
                    <Sider
                        width={256}
                        theme="light"
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        className="!fixed top-0 bottom-0 left-0 flex flex-col h-screen overflow-auto shadow-lg"
                    >
                        <div className="flex flex-col justify-between w-full bg-white ">
                            <div className="flex flex-col">
                                <Link href={routes.home()}>
                                    <div className="flex items-center justify-center w-full px-2 pb-4 transition-all duration-500 ease-in-out bg-white cursor-pointer logo">
                                        {collapsed ? (
                                            <div className="flex items-center justify-center">
                                                <img
                                                    src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/7a3ec529632909.55fc107b84b8c.png"
                                                    className="w-12 h-12 fade-in"
                                                    alt="LivelyCV"
                                                />
                                            </div>
                                        ) : (
                                            <img src={'/assets/images/logo/logo-new.png'} className="object-cover h-12 fade-in" alt="LivelyCV" />
                                        )}
                                    </div>
                                </Link>
                                <Menu
                                    mode="inline"
                                    onClick={({ key }) => {
                                        router.push(key);
                                    }}
                                    defaultSelectedKeys={[router.pathname]}
                                    items={
                                        user.roleName === UserRole.ADMIN
                                            ? menuAdminList
                                            : user.roleName === UserRole.FARM_HUB
                                            ? menuFarmHubList
                                            : user.roleName === UserRole.COLLECTED_STAFF
                                            ? menuStaffList
                                            : menuUndefined
                                    }
                                />
                            </div>
                        </div>
                    </Sider>
                    <Layout
                        className={clsx('duration-300', {
                            'ml-20': collapsed,
                            'ml-64': !collapsed,
                        })}
                    >
                        <div className="flex items-center justify-between h-16 p-2 space-x-8 bg-white">
                            <Button
                                onClick={() => setCollapsed(!collapsed)}
                                type="primary"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                size="middle"
                            />
                            <div className="flex gap-5 ">
                                <Dropdown
                                    trigger={['hover']}
                                    placement="bottomLeft"
                                    overlay={
                                        <Menu
                                            className="min-w-[140px]"
                                            items={[
                                                {
                                                    label: (
                                                        <Link href={`${routes.user.detail()}`}>
                                                            <div className="flex items-center justify-start w-full gap-2 px-1 py-2 space-x-2 transition-colors cursor-pointer dark:hover:bg-jacarta-600 hover:text-primary/80 focus:text-accent hover:bg-jacarta-50 rounded-xl">
                                                                <Person strokeWidth={2} size={24} />
                                                                Profile
                                                            </div>
                                                        </Link>
                                                    ),
                                                    key: 'profile',
                                                },

                                                {
                                                    label: (
                                                        <div className="flex items-center justify-start w-full gap-2 px-1 py-2 space-x-2 transition-colors cursor-pointer dark:hover:bg-jacarta-600 hover:text-primary/80 focus:text-accent hover:bg-jacarta-50 rounded-xl">
                                                            <SignOut strokeWidth={2} size={24} />
                                                            Sign out
                                                        </div>
                                                    ),
                                                    key: 'logout',
                                                    onClick: () => mutationLogout(),
                                                },
                                            ]}
                                        />
                                    }
                                >
                                    <div className="flex items-center justify-center gap-2 duration-300 cursor-pointer text-jacarta-700 ">
                                        <button className="flex items-center gap-2 hover:scale-105" onClick={() => setIsOpen(false)}>
                                            <span className="text-base font-semibold capitalize whitespace-nowrap">
                                                {user.firstName + ' ' + user.lastName}
                                            </span>
                                            <PersonCheck strokeWidth={2} className="w-6 h-6 text-jacarta-700 dark:text-white " />
                                        </button>
                                    </div>
                                </Dropdown>
                                {/* {user.isLogin && user.type === UserRole.ADMIN && (
                                    <div className="relative z-50 pr-8 noti-history xl:pr-12">
                                        <button className="flex items-center gap-2 hover:scale-105 noti-button" onClick={() => setIsOpen(!isOpen)}>
                                            {isOpen ? (
                                                <BellAlertIcon className="w-6 h-6 text-primary-700 dark:text-white noti-button" />
                                            ) : (
                                                <Badge count={notifications?.length || 0}>
                                                    <BellIcon className="w-6 h-6 text-jacarta-700 dark:text-white noti-button" />
                                                </Badge>
                                            )}
                                        </button>
                                        {isOpen && (
                                            <div className="!right-5 !top-[95%] !left-auto min-w-[14rem] whitespace-nowrap rounded-xl bg-white transition-all will-change-transform before:absolute before:-top-3 before:h-3 before:w-full lg:absolute lg:grid lg:!translate-y-4 lg:py-4 lg:px-2 lg:shadow-2xl !z-[9999] overflow-y-auto w-[450px] h-[600px] custom-scrollbar_notihistory">
                                                <div className="flex flex-col gap-2 pl-4 pr-2">
                                                    <h3 className="text-xl font-bold">Notifications History</h3>
                                                    <div className="flex items-center justify-between">
                                                        <span className="pb-1.5 text-base font-semibold text-black">Before that</span>
                                                        <Button
                                                            type="link"
                                                            style={{
                                                                fontSize: '14px',
                                                                fontWeight: 700,
                                                                lineHeight: '16px',
                                                                textDecoration: 'underline',
                                                            }}
                                                            onClick={() => {
                                                                setIsOpen(false);
                                                                router.push(routes.expert.notification.list());
                                                            }}
                                                        >
                                                            View All
                                                        </Button>
                                                    </div>
                                                    {Boolean(notifications?.length) ? (
                                                        notifications?.map((item, idx) => (
                                                            <div
                                                                className={`flex flex-col gap-1 rounded-md px-2 ${
                                                                    idx % 2 === 0 ? 'bg-[#eeeaf9]' : 'bg-white'
                                                                }`}
                                                                key={item.id}
                                                            >
                                                                <span className="text-base font-semibold text-black capitalize">{item.title}</span>
                                                                <span className="px-3 text-sm">{item.body}</span>
                                                                <span className="px-3 text-xs">{moment(item.createdAt).fromNow()}</span>
                                                                <hr className="h-px my-2 bg-gray-300 border-0 dark:bg-gray-700" />
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <Empty
                                                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                                                            description={<span className="text-gray-900">No notification</span>}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )} */}
                            </div>
                        </div>
                        <Content>
                            <div className="min-h-screen">{children}</div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        </>
    );
};
