import { FormWrapper, SelectInput, TextInput } from '@components/forms';
import { AvatarUploadInput } from '@components/forms/AvatarUploadInput';
import { CollectedHubAPI, UpdateCollectedHub } from '@core/api/collected-hub.api';
import { CollectedHub } from '@models/staff';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, ModalProps } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

//Update Category Modal
interface UpdateCollectedHubModalProps extends ModalProps {
    currentValue: CollectedHub;
}

const defaultValues: UpdateCollectedHub = {
    id: '',
    name: '',
    description: '',
    image: '',
    code: '',
    status: '',
    address: '',
};

const UpdateCollectedHubModal: React.FC<UpdateCollectedHubModalProps> = ({ currentValue, ...rest }) => {
    const updateHubMutation = useMutation({
        mutationFn: async (data: UpdateCollectedHub) => {
            const res = await CollectedHubAPI.update(currentValue.id, data);
            return res;
        },
    });

    const methods = useForm({
        defaultValues,
    });

    React.useEffect(() => {
        methods.setValue('code', currentValue.code);
        methods.setValue('id', currentValue.id);
        methods.setValue('name', currentValue.name);
        methods.setValue('address', currentValue.address);
        methods.setValue('description', currentValue.description);
        methods.setValue('image', currentValue.image);
        methods.setValue('status', currentValue.status);
    }, [currentValue]);

    const queryClient = useQueryClient();

    const onSubmit = (data: UpdateCollectedHub) => {
        updateHubMutation.mutateAsync(data, {
            onSuccess: () => {
                rest.afterClose && rest.afterClose();
                toast.success('Update Hub successfully');
                queryClient.invalidateQueries(['collected-hub-list']);
            },
        });
    };

    return (
        <FormWrapper methods={methods}>
            <Modal
                {...rest}
                title="Update Category"
                width={600}
                footer={[
                    <Button key="close" type="default" loading={updateHubMutation.isLoading} onClick={rest.onCancel}>
                        Cancel
                    </Button>,
                    <Button key="edit" type="primary" loading={updateHubMutation.isLoading} onClick={() => methods.handleSubmit(onSubmit)()}>
                        Save
                    </Button>,
                ]}
            >
                <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col w-full gap-2">
                    <AvatarUploadInput name="image" label="Image" className="col-span-full" />
                    <TextInput name="name" label="Name" required />
                    <TextInput name="address" label="Address" required />
                    <TextInput name="description" label="Description" placeholder="Mô tả ..." required />
                    <TextInput name="code" label="Code" required />
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
export default UpdateCollectedHubModal;
