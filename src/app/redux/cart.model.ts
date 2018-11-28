export interface ICart {
    data: Array<ICartItem>;
}

export interface ICartItem {
    id: number;
    item: string;
    quantity: number;
    price: number;
}
