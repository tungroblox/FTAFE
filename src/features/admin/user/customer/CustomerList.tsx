import { TextInput } from '@components/forms';
import { AvatarUploadInput } from '@components/forms/AvatarUploadInput';
import FormFilterWrapper from '@components/forms/FormFilterWrapper';
import { IV1GetFilterCandidate } from '@core/api/candidate';
import { IV1GetFilterExpert } from '@core/api/expert.api';
// import { expertApi, IV1GetFilterExpert } from '@core/api/expert.api';
// import { ExpertList } from '@models/expert';
import * as React from 'react';

interface CustomerListProps {
    filter: Partial<IV1GetFilterCandidate>;
}

const CustomerList: React.FunctionComponent<CustomerListProps> = ({ filter }) => {
    return (
        <div className="flex flex-col w-full gap-2">
            <FormFilterWrapper<IV1GetFilterExpert> defaultValues={{ ...filter }}>
                <div className="w-56">
                    <TextInput name="name" label="Name" />
                </div>
                <div className="w-56">
                    <TextInput name="email" label="Email" />
                </div>
                <AvatarUploadInput name="image" label="Image" />
            </FormFilterWrapper>
        </div>
    );
};

export default CustomerList;
