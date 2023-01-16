import { createContext, useContext, useEffect, useReducer, useState, setState } from "react";
import {
  productsReducer,
  ONLY_FAST_DELIVERY
} from "./products-reducer";



const ProductsContext = createContext({});
let products = [];
export const ProductsProvider = ({ children }) => {
  let [products, setProducts] = useState([]);

  const [state, dispatch] = useReducer(productsReducer, {
    products, setProducts
  });
  return (
    <ProductsContext.Provider
      value={{
        productsState: state,
        productsDispatch: dispatch
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
async function getProducts () {

}

export const useProducts = () => useContext(ProductsContext);
