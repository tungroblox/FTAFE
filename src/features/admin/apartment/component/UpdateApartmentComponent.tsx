import { FormWrapper, SelectInput, TextInput } from '@components/forms';
import { ApartmentAPI } from '@core/api/apartment.api';
import { AreaAPI } from '@core/api/area.api';
import { Apartment, UpdateApartmentForm } from '@models/apartment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, ModalProps } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface UpdateApartmentModalProps extends ModalProps {
    currentValue: Apartment;
}

const defaultValues: UpdateApartmentForm = {
    address: '',
    areaId: '',
    code: '',
    id: '',
    name: '',
    status: '',
};

const UpdateApartmentModal: React.FC<UpdateApartmentModalProps> = ({ currentValue, ...rest }) => {
    const updateApartmentMutation = useMutation(async (data: UpdateApartmentForm) => await ApartmentAPI.updateOne(currentValue.id, data));

    const methods = useForm({
        defaultValues,
    });

    const useAreaQuery = useQuery({
        queryKey: ['areas'],
        queryFn: async () => {
            const res = await AreaAPI.getAll({});
            return res;
        },
    });
    const listArea = useAreaQuery.data || [];

    React.useEffect(() => {
        methods.setValue('code', currentValue.code);
        methods.setValue('id', currentValue.id);
        methods.setValue('areaId', currentValue.areaId);
        methods.setValue('name', currentValue.name);
        methods.setValue('address', currentValue.address);
        methods.setValue('status', currentValue.status);
    }, [currentValue]);

    const queryClient = useQueryClient();

    const onSubmit = (data: UpdateApartmentForm) => {
        updateApartmentMutation.mutateAsync(data, {
            onSuccess: () => {
                rest.afterClose && rest.afterClose();
                toast.success('Update Hub successfully');
                queryClient.invalidateQueries(['apartments']);
            },
            onError: (e) => {
                toast.error('Update Hub failed');
                console.error(e);
            },
        });
    };

    return (
        <FormWrapper methods={methods}>
            <Modal
                {...rest}
                title="Update Station"
                width={600}
                footer={[
                    <Button key="close" type="default" loading={updateApartmentMutation.isLoading} onClick={rest.onCancel}>
                        Cancel
                    </Button>,
                    <Button key="edit" type="primary" loading={updateApartmentMutation.isLoading} onClick={() => methods.handleSubmit(onSubmit)()}>
                        Save
                    </Button>,
                ]}
            >
                <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col w-full gap-2">
                    <TextInput name="name" label="name" required />
                    <TextInput name="address" label="Address" required />
                    <TextInput name="code" label="Code" required />
                    <SelectInput
                        name="areaId"
                        label="Area"
                        options={listArea.map((a) => {
                            return {
                                label: a.address,
                                value: a.id,
                                origin: a.id,
                            };
                        })}
                    />
                    <SelectInput
                        label="Status"
                        name="status"
                        options={[
                            {
                                label: 'Active',
                                value: 'Active',
                                origin: 'active',
                            },
                            {
                                label: 'Inactive',
                                value: 'Inactive',
                                origin: 'inactive',
                            },
                        ]}
                    />
                </form>
            </Modal>
        </FormWrapper>
    );
};
export default UpdateApartmentModal;
