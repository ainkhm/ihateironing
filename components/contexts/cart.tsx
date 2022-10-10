import React, { createContext, ReactNode, useState, FC, Dispatch, SetStateAction } from "react";
import { Item } from "../common/types";

type Props = {
  children: ReactNode;
};

const CartContext = createContext<
  [Item[], Dispatch<SetStateAction<Item[]>>]
>([[], ()=> {}]);

export const CartContextProvider: FC<Props> = (props) => (
  <CartContext.Provider value={useState<Item[]>([])}>
    {props.children}
  </CartContext.Provider>
);

export default CartContext;