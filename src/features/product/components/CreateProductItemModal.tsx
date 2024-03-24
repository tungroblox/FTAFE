import { FormWrapper, SelectInput, TextInput } from '@components/forms';
import { CategoryAPI } from '@core/api/category.api';
import { ProductItemAPI } from '@core/api/product-item.api';
import { CreateProductItem } from '@models/product-item';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, ModalProps } from 'antd';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface CreateProductItemModalProps extends ModalProps {}
const defaultValues = {
    title: '',
    description: '',
    productOrigin: '',
    specialTag: '',
    storageType: '',
    price: 1,
    quantity: 1,
    minOrder: 1,
    unit: '',
};

const CreateProductItemModal: React.FC<CreateProductItemModalProps> = ({ ...rest }) => {
    const methods = useForm({
        defaultValues,
    });

    const queryClient = useQueryClient();
    const router = useRouter();
    const { id } = router.query;
    const createProductItemMutation = useMutation(async (data: CreateProductItem) => await ProductItemAPI.createProductItem(data, id as string), {
        onSuccess: (res) => {
            methods.reset();
            toast.success('Thêm thành công');
            queryClient.invalidateQueries();
            rest.afterClose && rest.afterClose();
            rest.onCancel && rest.onCancel;
        },
        onError: (error) => {
            toast.error('Thêm thất bại');
        },
    });

    const getAllCategoriesQuery = useQuery({
        queryFn: async () => await CategoryAPI.getAllCategories(),
        queryKey: ['categories'],
    });
    const categoryList = getAllCategoriesQuery.data?.payload || [];

    const onSubmit = async (data: CreateProductItem) => createProductItemMutation.mutate(data);

    return (
        <FormWrapper methods={methods}>
            <Modal
                {...rest}
                title="Tạo sản phẩm mới"
                width={600}
                footer={[
                    <Button key="close" type="default" onClick={rest.onCancel}>
                        Trở lại
                    </Button>,
                    <Button key="create" type="primary" onClick={() => methods.handleSubmit(onSubmit)()}>
                        Tạo
                    </Button>,
                ]}
            >
                <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col w-full gap-2">
                    <TextInput name="title" label="Tên sản phẩm" placeholder="Tên sản phẩm ..." required />
                    <TextInput name="description" label="Mô tả sản phẩm" placeholder="Mô tả ..." required />
                    <TextInput name="productOrigin" label="Nơi sản xuất" placeholder="Nơi sản xuất ..." required />
                    <TextInput name="specialTag" label="Tag đặc biệt" required />
                    <TextInput name="storageType" label="Lữu trữ" required />
                    <TextInput name="price" label="Giá" required type="number" min={1} step={0.1} />
                    <TextInput name="quantity" label="Số lượng" required type="number" min={1} />
                    <TextInput name="minOrder" label="Đơn hàng tối thiểu" required type="number" min={0} />
                    <SelectInput
                        label="Đơn vị"
                        name="unit"
                        options={[
                            { value: 'kg', label: 'Kg', origin: 'kg' },
                            { value: 'g', label: 'G', origin: 'G' },
                            { value: 'l', label: 'L', origin: 'L' },
                            { value: 'ml', label: 'Ml', origin: 'Ml' },
                            { value: 'cái', label: 'Cái', origin: 'Cái' },
                            { value: 'hộp', label: 'Hộp', origin: 'Hộp' },
                            { value: 'chai', label: 'Chai', origin: 'Chai' },
                            { value: 'Vỉ', label: 'Vỉ', origin: 'Vỉ' },
                        ]}
                    />
                </form>
            </Modal>
        </FormWrapper>
    );
};

export default CreateProductItemModal;
