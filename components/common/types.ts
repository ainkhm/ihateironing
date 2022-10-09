export type Product = {
    id: number;
    name: string;
    price: number;
    image?: string;
  };
  
  export type Item = Product & { quantity: number };