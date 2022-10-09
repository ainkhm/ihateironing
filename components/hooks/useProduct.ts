import { useEffect, useState, useCallback } from "react";
import { getItem } from "../services/mutations";
import { Product } from "../common/types";

const useProduct = (id?: Product["id"]) => {
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getProduct = useCallback(() => {
    if (!id) return;
    setIsLoading(true);
    getItem(id)
      .then(setProduct)
      .catch((err) => {
        console.error(String(err));
        setError(String(err));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return {
    isLoading,
    error,
    product,
    getProduct,
  };
};

export default useProduct;