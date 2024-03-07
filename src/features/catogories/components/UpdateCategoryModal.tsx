import { FormWrapper, SelectInput, TextInput } from '@components/forms';
import { AvatarUploadInput } from '@components/forms/AvatarUploadInput';
import { NumberInput } from '@components/forms/NumberInput';
import { CategoryAPI } from '@core/api/category.api';
import { Category, UpdateCategory } from '@models/category';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, ModalProps } from 'antd';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

//Update Category Modal
interface UpdateCategoryProps extends ModalProps {
    category: Category;
}

const defaultValues = {
    id: '',
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

const UpdateCategoryModal: React.FC<UpdateCategoryProps> = ({ category, ...rest }) => {
    const updateCategoryMutation = useMutation({
        mutationFn: async (data: UpdateCategory) => {
            const res = await CategoryAPI.updateCategory(category.id, data);
            return res;
        },
    });

    const methods = useForm({
        defaultValues,
    });

    React.useEffect(() => {
        methods.setValue('code', category.code);
        methods.setValue('id', category.id);
        methods.setValue('name', category.name);
        methods.setValue('description', category.description);
        methods.setValue('image', category.image);
        methods.setValue('status', category.status);
        methods.setValue('systemPrice', category.systemPrice);
        methods.setValue('minSystemPrice', category.minSystemPrice);
        methods.setValue('maxSystemPrice', category.maxSystemPrice);
        methods.setValue('margin', category.margin);
    }, [category]);

    const queryClient = useQueryClient();

    const onSubmit = (data: Category) => {
        updateCategoryMutation.mutate(data, {
            onSuccess: () => {
                rest.afterClose && rest.afterClose();
                toast.success('Update category successfully');
                queryClient.invalidateQueries();
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
                    <Button key="close" type="default" loading={updateCategoryMutation.isLoading} onClick={rest.onCancel}>
                        Cancel
                    </Button>,
                    <Button key="edit" type="primary" loading={updateCategoryMutation.isLoading} onClick={() => methods.handleSubmit(onSubmit)()}>
                        Save
                    </Button>,
                ]}
            >
                <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col w-full gap-2">
                    <AvatarUploadInput name="image" label="Image" className="col-span-full" />
                    <TextInput name="name" label="Category Name" required />
                    <TextInput name="description" label="Description" placeholder="Mô tả ..." required />
                    <TextInput name="code" label="Code" required />
                    <SelectInput
                        label="Status"
                        name="status"
                        options={[
                            {
                                label: 'Active',
                                value: 'active',
                                origin: 'active',
                            },
                            {
                                label: 'Inactive',
                                value: 'inactive',
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
export default UpdateCategoryModal;
