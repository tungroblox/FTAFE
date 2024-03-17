import { FormWrapper, SelectInput, TextInput } from '@components/forms';
import { AvatarUploadInput } from '@components/forms/AvatarUploadInput';
import { NumberInput } from '@components/forms/NumberInput';
import { CategoryAPI } from '@core/api/category.api';
import { CreateCategory } from '@models/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, ModalProps } from 'antd';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface CreateCategoryModalProps extends ModalProps {}
const defaultValues = {
    name: '',
    description: '',
    image: '',
    code: '',
    status: '',
    displayIndex: 0,
    systemPrice: 0,
    minSystemPrice: 0,
    maxSystemPrice: 0,
    margin: 0,
};
const CreateCategoryModal: React.FC<CreateCategoryModalProps> = ({ ...rest }) => {
    const methods = useForm({
        defaultValues,
    });
    const queryClient = useQueryClient();

    const { errors } = methods.formState;

    const createCategoryMutation = useMutation(async (data: CreateCategory) => await CategoryAPI.createCategory(data), {
        onSuccess: (res) => {
            methods.reset();
            toast.success('Create success');
            queryClient.invalidateQueries(['categories']);
            rest.afterClose && rest.afterClose();
        },
        onError: (error) => {
            toast.error('created fail');
        },
    });
    const onSubmit = async (data: CreateCategory) => {
        createCategoryMutation.mutate(data);
    };
    return (
        <FormWrapper methods={methods}>
            <Modal
                {...rest}
                title="Create Category"
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
                    {/* <AvatarUploadInput name="image" label="Image" className="col-span-full" /> */}

                    {/* <TextInput name="image" label="Image Url" required /> */}
                    <AvatarUploadInput name="image" label="Avatar" path="categories" />
                    <TextInput name="name" label="Category Name" required />
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
                    <NumberInput name="displayIndex" label="displayIndex" required />
                    <NumberInput name="systemPrice" label="systemPrice" required />
                    <NumberInput name="minSystemPrice" label="minSystemPrice" required />
                    <NumberInput name="maxSystemPrice" label="maxSystemPrice" required />
                </form>
            </Modal>
        </FormWrapper>
    );
};

export default CreateCategoryModal;
