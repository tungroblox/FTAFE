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
    unit: string;
}
