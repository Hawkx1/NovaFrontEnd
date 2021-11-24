import { Cart } from "./cart";

export interface Product {
    productId: number;
    name: string;
    genre: string;
    price: number;
    rating: string;
    endpoint: string;
    platform: string;
    imageUrl: string;
    cart: Cart;
}
