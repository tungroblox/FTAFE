import { FormWrapper, SelectInput, TextInput } from '@components/forms';
import { AreaAPI } from '@core/api/area.api';
import { CreateStation, StationAPI } from '@core/api/station.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, ModalProps } from 'antd';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface CreateStationModalProps extends ModalProps {}
const defaultValues = {
    areaId: '',
    code: '',
    name: '',
    description: '',
    image: '',
    address: '',
};
const CreateStationModal: React.FC<CreateStationModalProps> = ({ ...rest }) => {
    const methods = useForm({
        defaultValues,
    });
    const queryClient = useQueryClient();

    const { errors } = methods.formState;

    const createCategoryMutation = useMutation(async (data: CreateStation) => await StationAPI.createOne(data), {
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
    const onSubmit = async (data: CreateStation) => {
        createCategoryMutation.mutate(data);
    };

    const areaQuery = useQuery({ queryKey: ['area'], queryFn: async () => await AreaAPI.getAll() });
    const areaList = areaQuery.data || [];

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
                    <TextInput name="image" label="Image Url" required />
                    <TextInput name="name" label="Name" required />
                    <TextInput name="address" label="Address" required />
                    <TextInput name="description" label="Description" placeholder="Mô tả ..." required />
                    <TextInput name="code" label="Code" required />
                    <SelectInput
                        name="areaId"
                        label={'Area'}
                        options={areaList.map((area) => ({
                            label: area.address,
                            value: area.id,
                            origin: area.id,
                        }))}
                    />
                </form>
            </Modal>
        </FormWrapper>
    );
};

export default CreateStationModal;
