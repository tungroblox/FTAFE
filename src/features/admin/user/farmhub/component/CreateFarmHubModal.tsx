import { FormWrapper, TextInput } from '@components/forms';
import { AvatarUploadInput } from '@components/forms/AvatarUploadInput';
import { FarmHubAPI } from '@core/api/farmhub';
import { CreateFarmHubForm } from '@models/farmhub';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, ModalProps } from 'antd';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface CreateFarmHubModalProps extends ModalProps {}
const defaultValues = {
    name: '',
    code: '',
    description: '',
    image: '',
    address: '',
};
const CreateFarmHubModal: React.FC<CreateFarmHubModalProps> = ({ ...rest }) => {
    const methods = useForm({
        defaultValues,
    });
    const queryClient = useQueryClient();

    const { errors } = methods.formState;

    const createCategoryMutation = useMutation(async (data: CreateFarmHubForm) => await FarmHubAPI.createFarmHub(data), {
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
    const onSubmit = async (data: CreateFarmHubForm) => {
        Object.keys(data).forEach((fieldName) => {
            const key = fieldName as keyof CreateFarmHubForm;

            if (data[key] === '') {
                methods.setError(key, { type: 'manual', message: `${key} không được để trống` });
            }
        });

        // Check if any errors were set
        if (Object.keys(methods.setError).length !== 0) {
            // If errors were set, stop submission
            return;
        }
        createCategoryMutation.mutate(data);
    };
    return (
        <FormWrapper methods={methods}>
            <Modal
                {...rest}
                title="Create FarmHub"
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
                    <AvatarUploadInput name="image" label="Image Url" path="farm-hub" />
                    <TextInput name="name" label="Name" required />
                    <TextInput name="address" label="Address" required />
                    <TextInput name="description" label="Description" placeholder="Mô tả ..." required />
                    <TextInput name="code" label="Code" required />
                </form>
            </Modal>
        </FormWrapper>
    );
};

export default CreateFarmHubModal;
