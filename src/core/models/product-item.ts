export interface ProductItem {
    id: string;
    productId: string;
    farmHubId: string;
    title: string;
    description: string;
    productOrigin: string;
    specialTag: string;
    storageType: string;
    outOfStock: boolean;
    createdAt: string;
    updatedAt: string;
    price: number;
    quantity: number;
    minOrder: number;
    status: string;
    unit: string;
    productImages: productImage[];
}

export interface productImage {
    id: string;
    productItemId: string;
    caption: string;
    imageUrl: string;
    displayIndex: number;
    status: string;
}

export type CreateProductItem = Pick<
    ProductItem,
    'title' | 'description' | 'productOrigin' | 'specialTag' | 'storageType' | 'price' | 'quantity' | 'minOrder' | 'unit'
>;

export interface CreateProductItemInMenu {
    productItemId: string;
    salePrice: number;
    saleQuantity: number;
}
