import { checkItem } from "./utils";
import { useData } from "./data-context";
import {
  ADD_CART_ITEM,
} from "./data-reducer";
import { useProducts } from "./products-context";
import {
  SORT_BY_PRICE
} from "./products-reducer";
import {useEffect} from "react";


const highToLow = "highToLow";
const lowToHigh = "lowToHigh";

const transformProducts = (state) => {
  useEffect(
    async () => {
      const res = await fetch('https://5fc9346b2af77700165ae514.mockapi.io/products');
      const data = await res.json();
    
      data.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        brand: item.brand,
        description: item.description,
        model: item.model,
        createdAt: item.createdAt
      }))

      state.products = data;
      state.setProducts(data);
    }
  )

  const sortVal = state[SORT_BY_PRICE];
  let sortedProducts = state.products;
  if (sortVal) {
    sortedProducts = state.products.sort((a, b) =>
      sortVal === highToLow ? b.price - a.price : a.price - b.price
    );
  }

  return sortedProducts;
};
export function Products({ setRoute }) {
  const { cartItems, wishlist, dataDispatch } = useData();
  const { productsState, productsDispatch } = useProducts();
  return (
    <>
      <h1> Products</h1>
      <div className="m-1">
        Price:
        <input
          checked={productsState[SORT_BY_PRICE] === highToLow}
          type="radio"
          name={SORT_BY_PRICE}
          id={highToLow}
          onChange={() => {
            productsDispatch({
              type: SORT_BY_PRICE,
              value: highToLow
            });
          }}
        />
        <label htmlFor={highToLow}>High to Low</label>
        <input
          checked={productsState[SORT_BY_PRICE] === lowToHigh}
          style={{ marginLeft: "0.5rem" }}
          type="radio"
          name={SORT_BY_PRICE}
          id={lowToHigh}
          onChange={() => {
            productsDispatch({
              type: SORT_BY_PRICE,
              value: lowToHigh
            });
          }}
        />
        <label htmlFor={lowToHigh}>Low to High</label>
      </div>
      <div
        className="App flex"
        style={{ flexWrap: "wrap", justifyContent: "center"}}
      >
        {productsState.products && transformProducts(productsState).map(
          ({
            id,
            name,
            image,
            price,
            model,
            brand,
            productName,
            description,
            level,
          }) => (
            <div key={id} className="card card--shadow m-1">
              <img  className="img" src={image} alt={productName} />
              <h3> {name} </h3>
              <h4> Brand: {brand} </h4>
              <h4> Model: {model} </h4>
              <div>{price} TL</div>
              <div>{level}</div>
              <button
                className="btn bg-primary m-1"
                onClick={() => {
                  checkItem(cartItems, id)
                    ? setRoute("cart")
                    : dataDispatch({
                        type: ADD_CART_ITEM,
                        item: {
                          id,
                          name,
                          price,
                          model,
                          brand,
                          description,
                          level,
                          image,
                          qty: 1
                        }
                      });
                }}
              >
                {checkItem(cartItems, id) ? "Go to Cart" : "Add to cart"}
              </button>
            </div>
          )
        )}
      </div>
    </>
  );
}
