import { useContext, useCallback, useEffect, useState } from "react";
import {
  resetCart,
  showItems,
  updateItem,
  addItem,
  deleteItem,
} from "../services/mutations";
import { Item, Product } from "../common/types";
import CartContext from "../contexts/cart";

const mapCartItems = (
  data: Awaited<ReturnType<typeof showItems>>
): Item[] =>
  data.map((d) => ({
    id: d.item_id,
    name: d.name,
    price: d.price,
    image: d.image,
    quantity: d.quantity,
  }));

const useCart = () => {
    
  const [cartItems, setCartItems] = useContext(CartContext)!;
  const [isLoading, setIsLoading] = useState(false)!;

  useEffect(() => {
    setIsLoading(true);
    showItems()
      .then((cartData) => {
        setCartItems(mapCartItems(cartData));
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const updateItemApi = (
    id: Item["id"],
    quantity: Item["quantity"]
  ) => {
    setIsLoading(true);
    updateItem(id, quantity)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const addItemApi = (Item: Item) => {
    setIsLoading(true);
    addItem(Item)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const deleteItemApi = (id: Item["id"]) => {
    setIsLoading(true);
    deleteItem(id)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const addCartItem = useCallback(
    (product: Product) =>
      setCartItems((oldCartItems) => {
        const foundedItemIndex = oldCartItems.findIndex(
          (item) => item.id === product.id
        );

        if (foundedItemIndex > -1) {
          const copyOfOldCartItems = [...oldCartItems];
          const foundedItem = oldCartItems[foundedItemIndex];
          const newCartItem = {
            ...foundedItem,
            quantity: foundedItem.quantity + 1,
          };
          updateItemApi(newCartItem.id, newCartItem.quantity);

          copyOfOldCartItems[foundedItemIndex] = newCartItem;

          return copyOfOldCartItems;
        }

        const newCartItem = { ...product, quantity: 1 };

        addItemApi(newCartItem);

        return oldCartItems.concat({ ...product, quantity: 1 });
      }),
    []
  );

  const removeCartItem = useCallback(
    (id: Item["id"], allQty: boolean = false) =>
      setCartItems((oldCartItems) => {
        if (allQty) {
          deleteItemApi(id);
          return oldCartItems.filter((oldCartItem) => id !== oldCartItem.id);
        }
        const newCartItems: Item[] = [];
        oldCartItems.forEach((oldCartItem) => {
          if (oldCartItem.id === id) {
            if (oldCartItem.quantity > 1) {
              const newCartItem = {
                ...oldCartItem,
                quantity: oldCartItem.quantity - 1,
              };
              newCartItems.push(newCartItem);
              updateItemApi(newCartItem.id, newCartItem.quantity);
            } else {
              deleteItemApi(id);
            }
          } else {
            newCartItems.push(oldCartItem);
          }
        });
        return newCartItems;
      }),
    []
  );

  const clearCart = useCallback(() => {
    resetCart().then(() => setCartItems([]));
  }, []);

  return {
    cartItems,
    isLoading,
    addCartItem,
    removeCartItem,
    clearCart,
  };
};

export default useCart;