import { useEffect, useState, useCallback } from "react";
import { getItems } from "../services/mutations";
import { Product } from "../common/types";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getProducts = useCallback(() => {
    setIsLoading(true);
    getItems(false)
      .then(setProducts)
      .catch((err) => {
        console.error(String(err));
        setError(String(err));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return {
    isLoading,
    error,
    products,
    getProducts,
  };
};

export default useProducts;