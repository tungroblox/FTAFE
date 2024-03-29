import { DashboardHeaderLayout } from '@components/layouts';
import { ProtectWrapper } from '@components/wrappers';
import { ModalProvider } from '@context/modalContext';
import { TableUtilProvider } from '@context/tableUtilContext';
import { IV1GetFilterCandidate } from '@core/api/candidate';
import { UserRole } from '@models/user';
import { NextPage } from 'next';

interface PageProps {
    filter: Partial<IV1GetFilterCandidate>;
}

const Page: NextPage<PageProps> = ({ filter }) => {
    return (
        <ProtectWrapper acceptRoles={[UserRole.FARM_HUB]}>
            <ModalProvider>
                <TableUtilProvider>
                    <DashboardHeaderLayout title="Farm Hub Management">
                        {/* <FarmHubList /> */}
                        <></>
                    </DashboardHeaderLayout>
                </TableUtilProvider>
            </ModalProvider>
        </ProtectWrapper>
    );
};

// Page.getInitialProps = async (ctx): Promise<PageProps> => {
//     return {
//         filter: objectHelper.getObjectWithDefault<Partial<IV1GetFilterCandidate>>(ctx.query, {
//             ...defaultPagingProps,
//             name: '',
//             email: '',
//         }),
//     };
// };
export default Page;
