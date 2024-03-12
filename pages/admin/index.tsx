import { ProtectWrapper } from '@components/wrappers';
import { UserRole } from '@models/user';
import * as React from 'react';
import AdminChart from 'src/screens/AdminChart';

interface DashboardAdminPageProps {}

const DashboardAdminPage: React.FunctionComponent<DashboardAdminPageProps> = () => {
    return (
        <React.Fragment>
            <ProtectWrapper acceptRoles={[UserRole.ADMIN]}>
                <AdminChart />
            </ProtectWrapper>
        </React.Fragment>
    );
};

export default DashboardAdminPage;
