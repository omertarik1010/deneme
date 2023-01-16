import { useData } from "./data-context";
import { ADD_CART_ITEM, REMOVE_WISHLIST_ITEM } from "./data-reducer";

export function Wishlist({ setRoute }) {
  const { wishlist, dataDispatch } = useData();
  return (
    <>
      <h1> Product Wishlist </h1>
      <div
        className="App flex"
        style={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {wishlist.map(
          ({
            id,
            name,
            image,
            price,
            productName,
            level,
          }) => (
            <div key={id} className="card card--shadow m-1">
              <img
                className="img"
                src={image}
                width="100%"
                height="auto"
                alt={productName}
              />
              
              <h3> {name} </h3>
              <h4> Brand: {brand} </h4>
              <h4> Model: {model} </h4>
              <div>{price} TL</div>
              <div>{level}</div>
              <button
                className="btn bg-primary m-1"
                onClick={() => {
                  dataDispatch({
                    type: ADD_CART_ITEM,
                    item: {
                      id,
                      name,
                      price,
                      level,
                      model,
                      brand,
                      image,
                      qty: 1
                    }
                  });
                  dataDispatch({
                    type: REMOVE_WISHLIST_ITEM,
                    id
                  });
                }}
              >
                Add to Cart
              </button>
            </div>
          )
        )}
      </div>
    </>
  );
}
