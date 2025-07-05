import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { CartItem } from "@/types";
import { randomUUID } from "expo-crypto";

export type CartContext = {
    items: CartItem[],
    totalPrice: number,
    onAddToCart: (item: CartItem) => void,
    onUpdateQuantity: (cartItemId: string, count: -1 | 1) => void;
    clearCart: () => void;
};

const ShoppingCartContext = createContext<CartContext>({
    items: [],
    totalPrice: 0,
    onAddToCart: () => { },
    onUpdateQuantity: () => { },
    clearCart: () => { }
});

export const useShoppingCart = (): CartContext => useContext(ShoppingCartContext);

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        const totalPrice = items.reduce<number>((acc, currentItem) => acc + (currentItem.product.price * currentItem.quantity), 0);
        setTotalPrice(totalPrice);

    }, [items]);

    const onAddToCart = (newItem: CartItem) => {
        setItems(prevItems => {
            const newProductId = newItem.product.id;
            const targetItemIndex = prevItems.findIndex(item => (newProductId === item.product.id) && (newItem.size === item.size));

            if (targetItemIndex !== -1) {
                const newShoppingCartItems = [...prevItems];
                newShoppingCartItems[targetItemIndex].quantity++;

                return newShoppingCartItems;
            } else {
                return [...prevItems, { ...newItem}];
            }
        });
    };

    const onUpdateQuantity = (cartItemId: string, count: -1 | 1) => {
        setItems(prevItems => {
            let newShoppingCartItems = [...prevItems];

            newShoppingCartItems.some(item => {
                if (item.id === cartItemId) {
                    const newQuantity = item.quantity + count;

                    (newQuantity > 0) && (newQuantity < 11) && (item.quantity = newQuantity);
                    (newQuantity <= 0) && (newShoppingCartItems = prevItems.filter(item => item.id !== cartItemId));

                    return true;
                }
            })

            return newShoppingCartItems;
        });
    };

    const clearCart = (): void => setItems([]);

    return (
        <ShoppingCartContext.Provider value={{ items, totalPrice, onAddToCart, onUpdateQuantity, clearCart }}>
            {children}
        </ShoppingCartContext.Provider>
    )
};

export default CartProvider;