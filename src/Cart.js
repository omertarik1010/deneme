import { useData } from "./data-context";
import { DEC_QTY, INC_QTY, REMOVE_CART_ITEM } from "./data-reducer";

const getAmount = (items) => {
  return items.reduce((total, { price, qty }) => total + price * qty, 0);
};
export function Cart() {
  const { cartItems, dataDispatch } = useData();
  return (
    <>
      <h1>Cart</h1>
      <h2> Total: {getAmount(cartItems)}</h2>
      <div
        className="App flex"
        style={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {cartItems.map(
          ({
            id,
            name,
            image,
            model,
            brand,
            price,
            productName,
            level,
            qty
          }) => (
            <div key={id} className="card card--shadow m-1">
              <img
                className="img"
                src={image}
                width="100%"
                height="auto"
                alt={productName}
              />
              <button
                style={{
                  fontSize: "1.1rem",
                  background: "white"
                }}
                className="btn-close btn-lg"
                onClick={() => {
                  dataDispatch({
                    type: REMOVE_CART_ITEM,
                    id
                  });
                }}
              >
                <i className="fa fa-times"></i>
              </button>
              <h3> {name} </h3>
              <h4> Brand: {brand} </h4>
              <h4> Model: {model} </h4>
              <div>{price} TL</div>
              <div>{level}</div>  
              <div>
                <button
                  style={{
                    padding: "0.3em 0.5em",
                    fontSize: "1.1rem"
                  }}
                  className="btn btn--icon icon--transparent mb-1 mt-1
                "
                  onClick={() => {
                    dataDispatch({ type: INC_QTY, id });
                  }}
                >
                  <i className="fa fa-plus"></i>
                </button>
                <span className="ml-sm mr-sm">{qty}</span>
                <button
                  style={{
                    padding: "0.3em 0.5em",
                    fontSize: "1.1rem"
                  }}
                  className="btn btn--icon icon--transparent mb-1 mt-1
                "
                  onClick={() => {
                    dataDispatch({ type: DEC_QTY, id });
                  }}
                >
                  <i className="fa fa-minus"></i>
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}
