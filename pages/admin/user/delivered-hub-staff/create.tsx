import { DashboardHeaderLayout } from '@components/layouts';
import AddExpert from '@features/admin/user/expert/AddExpert';
import * as React from 'react';

interface AddExpertPageProps {}

const AddExpertPage: React.FunctionComponent<AddExpertPageProps> = () => {
    return (
        // <ProtectWrapper acceptRoles={[UserRole.ADMIN]}>
        <DashboardHeaderLayout title="Create Expert">
            <AddExpert />
        </DashboardHeaderLayout>
        // </ProtectWrapper>
    );
};

export default AddExpertPage;
