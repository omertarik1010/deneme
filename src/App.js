import { useState } from "react";
import { Cart } from "./Cart";
import { Products } from "./Products";
import "./styles.css";

export default function App() {
  const [route, setRoute] = useState("products");
  return (
    <div className="App mt-1">
      <button
      style={{
        width:"8em"
      }} 
        className={route === "products" ? "btn bg-primary" : "btn bg-secondary"}
        onClick={() => {
          setRoute("products");
        }}
      >
        Products
      </button>
      <button 
      style={{
        width:"8em"
      }} 
        className={
          route === "cart" ? "btn bg-primary ml-1" : "btn bg-secondary ml-1"
        }
        onClick={() => {
          setRoute("cart");
        }}
      >
        Cart
      </button>
       
      {route === "cart" && <Cart />}
      {route === "products" && <Products setRoute={setRoute} />}
    </div>
  );
}
