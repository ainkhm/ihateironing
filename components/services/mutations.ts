
import { Item, Product } from "../common/types";
import { postQuery, getQuery, deleteQuery, putQuery } from './api'

export const addItem = (data: Pick<Item, "id" | "quantity">) => postQuery("/cart", data);

export const showItems = () =>
getQuery<
  ({
    item_id: Item["id"];
  } & Omit<Item, "id">)[]
>("/cart");

export const resetCart = () => deleteQuery("/cart");

export const deleteItem = (itemId: Item["id"]) =>
deleteQuery(`/cart/${itemId}`);

export const updateItem = (
itemId: Item["id"],
quantity: Item["quantity"]
) => putQuery(`/cart/${itemId}?quantity=${quantity}`);

export const getItems = (favorites: boolean = false) =>
getQuery<Product[]>(`/items?favorites=${favorites}`);

export const getItem = (id: Product["id"]) => getQuery<Product>(`/items/${id}}`);
