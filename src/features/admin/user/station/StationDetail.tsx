import { TableBuilder, TableHeaderCell } from '@components/tables';
import { StationAPI } from '@core/api/station.api';
import { Staff, Station } from '@models/staff';
import { useQuery } from '@tanstack/react-query';
import { convertTextToAvatar } from '@utils/string.helper';
import { Badge, Descriptions, Image } from 'antd';
interface StationsDetailProps {
    value: Station;
}

const StationsDetail: React.FC<StationsDetailProps> = ({ value }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['station-staff'],
        queryFn: async () => await StationAPI.getStaff(value.id),
    });
    const staffList: Staff[] = data?.payload;
    console.log('staffList:', staffList);

    return (
        <div className="flex flex-col w-full gap-4">
            <Descriptions
                labelStyle={{
                    fontWeight: 'bold',
                }}
                bordered
                title={'Basic Information'}
                className="p-4 bg-white rounded-lg"
            >
                <Descriptions.Item label="Avatar" span={1}>
                    <Image
                        height={80}
                        width={80}
                        className="rounded overflow-hidden"
                        src={value && value.image ? value.image : convertTextToAvatar(value ? value.name : '')}
                        alt={value && value.name ? value.name : ''}
                    />
                </Descriptions.Item>
                <Descriptions.Item label="description" span={3}>
                    {value?.description}
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={1}>
                    {value?.code}
                </Descriptions.Item>

                <Descriptions.Item label="Status" span={1}>
                    <Badge status={value?.status === 'Active' ? 'processing' : 'error'} text={value?.status} />
                </Descriptions.Item>
                <Descriptions.Item label="Created at" span={2}>
                    {value?.createdAt}
                </Descriptions.Item>
            </Descriptions>
            <Descriptions
                labelStyle={{
                    fontWeight: 'bold',
                }}
                bordered
                title={'Staff'}
                className="p-4 bg-white rounded-lg"
            >
                <div className="flex flex-col w-full gap-2">
                    <TableBuilder<Staff>
                        rowKey="id"
                        isLoading={isLoading}
                        data={staffList}
                        columns={[
                            {
                                title: () => <TableHeaderCell key="avatar" sortKey="avatar" label="avatar" />,
                                width: 400,
                                key: 'firstName',
                                render: ({ ...props }: Staff) => (
                                    <Image
                                        height={80}
                                        width={80}
                                        className="rounded overflow-hidden"
                                        src={
                                            props.avatar
                                                ? props.avatar
                                                : 'https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg'
                                        }
                                        alt={props.firstName}
                                    />
                                ),
                            },
                            {
                                title: () => <TableHeaderCell key="firstName" sortKey="firstName" label="firstName" />,
                                width: 400,
                                key: 'firstName',
                                render: ({ ...props }: Staff) => <p>{props.firstName}</p>,
                            },
                            {
                                title: () => <TableHeaderCell key="lastName" sortKey="lastName" label="lastName" />,
                                width: 400,
                                key: 'lastName',
                                render: ({ ...props }: Staff) => <p>{props.lastName}</p>,
                            },
                            {
                                title: () => <TableHeaderCell key="email" sortKey="email" label="email" />,
                                width: 400,
                                key: 'email',
                                render: ({ ...props }: Staff) => <p>{props.email}</p>,
                            },
                            {
                                title: () => <TableHeaderCell key="phoneNumber" sortKey="phoneNumber" label="phoneNumber" />,
                                width: 400,
                                key: 'phoneNumber',
                                render: ({ ...props }: Staff) => <p>{props.phoneNumber}</p>,
                            },
                        ]}
                    />
                </div>
            </Descriptions>
        </div>
    );
};

export default StationsDetail;
