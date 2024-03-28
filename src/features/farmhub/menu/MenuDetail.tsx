import { useQueryGetProductItemByMenuId } from '@hooks/api/farmhub.hook';
import { Menu } from '@models/menu';
import { Badge, Descriptions } from 'antd';
import { PlusIcon } from 'lucide-react';
import moment from 'moment';
import React from 'react';

interface MenuDetailProps {
    menu?: Menu;
}

const MenuDetail: React.FunctionComponent<MenuDetailProps> = ({ menu }: MenuDetailProps) => {
    const [openCreateModalState, setOpenCreateModalState] = React.useState<boolean>(false);
    const { data: productItemByMenuId, isFetched } = useQueryGetProductItemByMenuId(menu?.id as string);

    return (
        <>
            <div className="flex flex-col w-full gap-4">
                <Descriptions
                    labelStyle={{
                        fontWeight: 'bold',
                    }}
                    bordered
                    title={'Thông tin liên quan đến sản phẩm'}
                    className="p-4 bg-white rounded-lg"
                    extra={
                        <button
                            onClick={() => {
                                setOpenCreateModalState(!openCreateModalState);
                            }}
                            className="flex items-center gap-1 px-3 py-1 text-white duration-300 hover:text-white hover:bg-primary/90 bg-primary"
                        >
                            <PlusIcon className="w-5 h-5 text-white" />
                            <span>
                                <strong>Thêm Sản Phẩm V</strong>
                            </span>
                        </button>
                    }
                >
                    <Descriptions.Item label="Menu" span={3}>
                        {menu?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Mã Tag" span={1}>
                        {menu?.tag}
                    </Descriptions.Item>

                    <Descriptions.Item label="Trạng thái" span={1}>
                        <Badge status={menu?.status === 'Active' ? 'processing' : 'error'} text={menu?.status} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo" span={1}>
                        {moment(menu?.createdAt).format('DD/MM/YYYY')}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export default MenuDetail;
