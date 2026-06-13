import { useEffect, useState }
from "react";

import {
  getCart,
  removeCartItem
}
from "../Services/cartService";

function Cart() {

  const [cartItems,
    setCartItems] =
    useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart =
    async () => {

      try {

        const response =
          await getCart(2);

        setCartItems(
          response.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  const handleRemove =
    async (id) => {

      try {

        await removeCartItem(
          id
        );

        alert(
          "Removed from cart"
        );

        fetchCart();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to remove"
        );
      }
    };

  const totalPrice =
    cartItems.reduce(
      (total, item) =>
        total +
        item.product.price *
        item.quantity,
      0
    );

  return (
    <div>

      <h1>
        My Cart 🛒
      </h1>

      {
        cartItems.length === 0
        ? (
          <h2>
            Cart is Empty
          </h2>
        )
        : (
          cartItems.map(
            (item) => (

            <div
              key={item.id}
              style={{
                border:
                  "1px solid black",
                margin: "10px",
                padding: "10px"
              }}
            >

              <h2>
                {
                  item.product
                  .name
                }
              </h2>

              <p>
                {
                  item.product
                  .description
                }
              </p>

              <h3>
                ₹
                {
                  item.product
                  .price
                }
              </h3>

              <p>
                Quantity:
                {" "}
                {item.quantity}
              </p>

              <button
                onClick={() =>
                  handleRemove(
                    item.id
                  )
                }
              >
                Remove
              </button>

            </div>
          ))
        )
      }

      <h2>
        Total:
        ₹{totalPrice}
      </h2>

    </div>
  );
}

export default Cart;