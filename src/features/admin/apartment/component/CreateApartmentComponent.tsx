import { FormWrapper, SelectInput, TextInput } from '@components/forms';
import { ApartmentAPI } from '@core/api/apartment.api';
import { AreaAPI } from '@core/api/area.api';
import { CreateApartmentForm, UpdateApartmentForm } from '@models/apartment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, ModalProps } from 'antd';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface CreateApartmentModalProps extends ModalProps {}
const defaultValues: CreateApartmentForm = {
    id: '',
    address: '',
    status: '',
    code: '',
    areaId: '',
    name: '',
};
const CreateApartmentModal: React.FC<CreateApartmentModalProps> = ({ ...rest }) => {
    const methods = useForm({
        defaultValues,
    });
    const queryClient = useQueryClient();

    const { errors } = methods.formState;

    const createCategoryMutation = useMutation(async (data: UpdateApartmentForm) => await ApartmentAPI.createOne(data), {
        onSuccess: () => {
            methods.reset();
            toast.success('Create success');
            queryClient.invalidateQueries(['apartments']);
            rest.afterClose && rest.afterClose();
        },
        onError: () => {
            toast.error('created fail');
        },
    });
    const onSubmit = async (data: CreateApartmentForm) => {
        createCategoryMutation.mutate(data);
    };
    const useAreaQuery = useQuery({
        queryKey: ['areas'],
        queryFn: async () => {
            const res = await AreaAPI.getAll({});
            return res;
        },
    });
    const listArea = useAreaQuery.data || [];
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

export default CreateApartmentModal;
