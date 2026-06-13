import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../Services/productService";
import { addToCart } from "../Services/cartService";

function Home() {

  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts =
    async () => {

      try {

        const response =
          await getAllProducts();

        setProducts(
          response.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  const handleAddToCart =
    async (productId) => {

      try {

        await addToCart(
          2,
          productId,
          1
        );

        alert(
          "Added to Cart"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to add cart"
        );
      }
    };

  return (
    <div>

      <h1>
        RajMart Products 🛒
      </h1>

      <Link to="/cart">
        <button>
          Go To Cart
        </button>
      </Link>

      <br />
      <br />

      {
        products.length === 0
        ? (
          <h2>
            No Products Found
          </h2>
        )
        : (
          products.map(
            (product) => (

            <div
              key={product.id}
              style={{
                border:
                  "1px solid black",
                padding: "10px",
                margin: "10px"
              }}
            >

              <h2>
                {product.name}
              </h2>

              <p>
                {product.description}
              </p>

              <h3>
                ₹{product.price}
              </h3>

              <p>
                Brand:
                {" "}
                {product.brand}
              </p>

              <p>
                Quantity:
                {" "}
                {product.quantity}
              </p>

              <button
                onClick={() =>
                  handleAddToCart(
                    product.id
                  )
                }
              >
                Add To Cart
              </button>

            </div>
          ))
        )
      }

    </div>
  );
}

export default Home;