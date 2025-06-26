import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem } from "@/types";

export type CartContext = {
    items: CartItem[],
    onAddToCart: (item: CartItem) => void
};

const ShoppingCartContext = createContext<CartContext>({ items: [], onAddToCart: item => { } });

export const useShoppingCart = (): CartContext => useContext(ShoppingCartContext);

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);
    console.log(items);


    const onAddToCart = (item: CartItem) => {
        setItems(prevItems => {
            const newProductId = item.product.id;
            const targetItemIndex = prevItems.findIndex(item => newProductId === item.product.id);

            if (targetItemIndex !== -1) {
                const newShoppingCartItems = [...prevItems];
                newShoppingCartItems[targetItemIndex].quantity++;

                const newSizes = [...newShoppingCartItems[targetItemIndex].sizes, item.sizes[0]]
                newShoppingCartItems[targetItemIndex].sizes = newSizes

                return newShoppingCartItems;
            } else {
                return [...prevItems, item];
            }
        });
    };

    return (
        <ShoppingCartContext.Provider value={{ items, onAddToCart }}>
            {children}
        </ShoppingCartContext.Provider>
    )
};

export default CartProvider;