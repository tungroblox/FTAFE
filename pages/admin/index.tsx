import * as React from 'react';
import AdminChart from 'src/screens/AdminChart';

interface DashboardAdminPageProps {}

const DashboardAdminPage: React.FunctionComponent<DashboardAdminPageProps> = () => {
    return (
        <React.Fragment>
            <AdminChart />
        </React.Fragment>
    );
};

export default DashboardAdminPage;
