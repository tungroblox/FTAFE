import { FarmHub } from '@models/user';
import { Badge, Button, Descriptions, Image } from 'antd';
import Link from 'next/link';
import * as React from 'react';

interface FarmHubDetailProps {
    farmHub: FarmHub;
}

const FarmHubDetail: React.FunctionComponent<FarmHubDetailProps> = ({ farmHub }) => {
    // const [openUpdateModal, setOpenUpdateModal] = React.useState<boolean>(false);
    return (
        <>
            <div className="flex flex-col w-full gap-4">
                <Descriptions
                    labelStyle={{
                        fontWeight: 'bold',
                    }}
                    bordered
                    title={'Basic Information'}
                    className="p-4 bg-white rounded-lg"
                    extra={
                        <Link href={`${farmHub?.id}/edit`}>
                            <Button>Update</Button>
                        </Link>
                        // <Button type="primary" onClick={() => setOpenUpdateModal(!openUpdateModal)}>
                        //     Update
                        // </Button>
                    }
                >
                    <Descriptions.Item label="Avatar" span={1}>
                        <Image
                            height={80}
                            width={80}
                            className="rounded overflow-hidden"
                            alt={farmHub?.name}
                            // src={farmHub?.image ? farmHub?.image : stringHelper.convertTextToAvatar(farmHub.name)}
                            src="https://farmhubagro.com.ng/wp-content/uploads/2023/05/cropped-farm-hub-logo-removebg-original.png"
                        />
                    </Descriptions.Item>

                    <Descriptions.Item label="FarmHub's name" span={3}>
                        {farmHub?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status" span={1}>
                        {farmHub?.code}
                    </Descriptions.Item>

                    <Descriptions.Item label="Address" span={2}>
                        {farmHub?.address}
                    </Descriptions.Item>

                    <Descriptions.Item label="Status" span={1}>
                        <Badge status={farmHub?.status === 'Active' ? 'processing' : 'error'} text={farmHub?.status} />
                    </Descriptions.Item>
                    <Descriptions.Item label="Created at" span={2}>
                        {farmHub?.createdAt}
                    </Descriptions.Item>
                </Descriptions>
                {/* <UpdateUserModal
                    currentValue={{
                        avatar: farmHub?.image,
                        fullName: farmHub?.name,
                        id: farmHub?.id,
                        phone: farmHub?.address,
                    }}
                    open={openUpdateModal}
                    afterClose={() => setOpenUpdateModal(false)}
                    onCancel={() => {
                        setOpenUpdateModal(false);
                        toast.success('Cancel updated');
                    }}
                /> */}
            </div>
        </>
    );
};

export default FarmHubDetail;
