import { FormWrapper, SelectInput, TextInput } from '@components/forms';
import { AreaAPI } from '@core/api/area.api';
import { CreateAreaForm } from '@models/area';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, ModalProps } from 'antd';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface AreaCreateModalProps extends ModalProps {}
const defaultValues = {
    id: '',
    province: '',
    district: '',
    commune: '',
    address: '',
    status: '',
    code: '',
};
const AreaCreateModal: React.FC<AreaCreateModalProps> = ({ ...rest }) => {
    const methods = useForm({
        defaultValues,
    });
    const queryClient = useQueryClient();

    const { errors } = methods.formState;

    const createCategoryMutation = useMutation(async (data: CreateAreaForm) => await AreaAPI.createOne(data), {
        onSuccess: () => {
            methods.reset();
            toast.success('Create success');
            queryClient.invalidateQueries();
            rest.afterClose && rest.afterClose();
        },
        onError: () => {
            toast.error('created fail');
        },
    });
    const onSubmit = async (data: CreateAreaForm) => {
        createCategoryMutation.mutate(data);
    };

    return (
        <FormWrapper methods={methods}>
            <Modal
                {...rest}
                title="Create Collect Hub"
                width={600}
                footer={[
                    <Button key="close" type="default" onClick={rest.onCancel}>
                        Cancel
                    </Button>,
                    <Button key="create" type="primary" onClick={() => methods.handleSubmit(onSubmit)()}>
                        Save
                    </Button>,
                ]}
            >
                <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col w-full gap-2">
                    <TextInput name="address" label="Address" required />
                    <TextInput name="district" label="District" required />
                    <TextInput name="province" label="Province" required />
                    <TextInput name="commune" label="Commune" required />
                    <TextInput name="code" label="Code" required />
                    <SelectInput
                        name="status"
                        label="Status"
                        options={[
                            { value: 'Active', label: 'Active', origin: 'Active' },
                            { value: 'InActive', label: 'InActive', origin: 'InActive' },
                        ]}
                    />
                </form>
            </Modal>
        </FormWrapper>
    );
};

export default AreaCreateModal;
