import React, { createContext, ReactNode, useState, FC, Dispatch, SetStateAction } from "react";
import { Item } from "../common/types";

const CartContext = createContext<
  [Item[], Dispatch<SetStateAction<Item[]>>] | null
>(null);

type Props = {
  children: ReactNode;
};
export const CartContextProvider: FC<Props> = (props) => (
  <CartContext.Provider value={useState<Item[]>([])}>
    {props.children}
  </CartContext.Provider>
);

export default CartContext;