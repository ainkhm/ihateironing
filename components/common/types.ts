export type Product = {
    description?: string;
    id: number;
    name: string;
    price: number;
    image?: string;
  };
  
  export type Item = Product & { quantity: number };