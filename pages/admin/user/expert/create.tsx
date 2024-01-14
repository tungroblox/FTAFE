import { DashboardHeaderLayout } from '@components/layouts';
import { ProtectWrapper } from '@components/wrappers';
import AddExpert from '@features/admin/user/expert/AddExpert';
import { UserRole } from '@models/user';
import * as React from 'react';

interface AddExpertPageProps {}

const AddExpertPage: React.FunctionComponent<AddExpertPageProps> = () => {
    return (
        <ProtectWrapper acceptRoles={[UserRole.ADMIN]}>
            <DashboardHeaderLayout title="Create Expert">
                <AddExpert />
            </DashboardHeaderLayout>
        </ProtectWrapper>
    );
};

export default AddExpertPage;
