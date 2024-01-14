import { Empty } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { useRouter } from 'next/router';
import { ScaleLoader } from 'react-spinners';

import { useTableUtil } from '../../contexts';
interface TableBuilderProps<T extends object> {
    data: T[];
    columns: ColumnsType<T>;
    isLoading: boolean;
    rowKey: string;
    onClickRow?: (record: T) => void;
}

export const TableBuilder = <T extends object>({ data, columns, rowKey, isLoading, onClickRow }: TableBuilderProps<T>) => {
    const { totalItem, page, handleOnChangePage } = useTableUtil();

    return (
        <div>
            <Table
                rowKey={rowKey}
                dataSource={data}
                columns={columns}
                onRow={(record) => {
                    return {
                        onClick: () => onClickRow && onClickRow(record),
                    };
                }}
                locale={{
                    emptyText: <Empty />,
                    cancelSort: 'Hủy sắp xếp',
                    collapse: 'Thu gọn',
                    expand: 'Mở rộng',
                    filterCheckall: 'Chọn tất cả',
                    filterConfirm: 'Xác nhận',
                    filterEmptyText: 'Không có lọc',
                    filterReset: 'Bỏ lọc',
                    filterTitle: 'Bộ lọc',
                    filterSearchPlaceholder: 'Tìm kiếm',
                    selectAll: 'Chọn tất cả',
                    selectInvert: 'Chọn ngược lại',
                    selectionAll: 'Chọn tất cả',
                    selectNone: 'Không chọn',
                    sortTitle: 'Sắp xếp',
                    triggerAsc: 'Sắp xếp tăng dần',
                    triggerDesc: 'Sắp xếp giảm dần',
                }}
                loading={isLoading}
                pagination={{
                    total: totalItem,
                    current: Number(page + 1),
                }}
                onChange={(pagination) => handleOnChangePage((pagination.current || 0) - 1, pagination.pageSize || 10)}
            />
        </div>
    );
};
