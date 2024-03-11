import { CollectedHub } from '@models/staff';

interface HubDetailProps {
    value: CollectedHub;
}

const HubDetail: React.FC<HubDetailProps> = ({ value }) => {
    return (
        <div>
            <h1>Hub Detail</h1>
        </div>
    );
};

export default HubDetail;
