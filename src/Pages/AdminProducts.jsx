import {
  useEffect,
  useState
}
from "react";

import {
  useNavigate
}
from "react-router-dom";

import Navbar
from "../components/Navbar";

import {
  getAllProducts,
  deleteProduct
}
from "../Services/productService";

import {
  FaEdit,
  FaTrash,
  FaSearch
}
from "react-icons/fa";

function AdminProducts() {

  const navigate =
    useNavigate();

  const [products,
    setProducts] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

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

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this product?"
        );

      if (
        !confirmDelete
      ) return;

      try {

        await deleteProduct(
          id
        );

        alert(
          "Product Deleted"
        );

        fetchProducts();

      } catch (error) {

        console.log(error);

        alert(
          "Delete Failed"
        );
      }
    };

  const filteredProducts =
    products.filter(
      (
        product
      ) =>

        product.name
          .toLowerCase()
          .includes(
            search
            .toLowerCase()
          )
    );

  return (

    <>

      <Navbar />

      <div
        className=
        "container py-5"
      >

        {/* HEADER */}

        <div
          className=
          "d-flex justify-content-between align-items-center mb-5"
        >

          <div>

            <h1
              style={{

                fontWeight:
                "700",

                fontSize:
                "3rem"
              }}
            >
              Products
            </h1>

            <p
              style={{
                color:
                "#6e6e73"
              }}
            >
              Manage your
              ecommerce products.
            </p>

          </div>

          <button
            className=
            "btn"
            onClick={() =>
              navigate(
                "/add-product"
              )
            }
            style={{

              background:
              "#0071e3",

              color:
              "white",

              borderRadius:
              "50px",

              padding:
              "14px 28px",

              fontWeight:
              "600",

              border:
              "none"
            }}
          >
            + Add Product
          </button>

        </div>

        {/* SEARCH */}

        <div
          style={{

            background:
            "#fff",

            borderRadius:
            "50px",

            padding:
            "14px 25px",

            boxShadow:
            "0 6px 24px rgba(0,0,0,0.06)",

            marginBottom:
            "40px"
          }}
          className=
          "d-flex align-items-center"
        >

          <FaSearch
            color=
            "#6e6e73"
          />

          <input
            type="text"
            placeholder=
            "Search product..."
            className=
            "form-control border-0 shadow-none ms-3"
            value={
              search
            }
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        {/* PRODUCTS */}

        <div className="row">

          {
            filteredProducts
            .map(
              (
                product
              ) => (

              <div
                key={
                  product.id
                }
                className=
                "col-lg-4 mb-4"
              >

                <div
                  style={{

                    background:
                    "#fff",

                    borderRadius:
                    "35px",

                    padding:
                    "30px",

                    boxShadow:
                    "0 8px 30px rgba(0,0,0,0.06)",

                    height:
                    "100%"
                  }}
                >

                  <img
                    src={`${import.meta.env.VITE_API_URL}/api/products/${product.id}/image`}
                    alt={
                      product.name
                    }
                    style={{

                      width:
                      "100%",

                      height:
                      "220px",

                      objectFit:
                      "contain"
                    }}
                  />

                  <h4
                    className=
                    "mt-4 fw-bold"
                  >
                    {
                      product.name
                    }
                  </h4>

                  <p
                    style={{
                      color:
                      "#6e6e73"
                    }}
                  >
                    {
                      product.brand
                    }
                  </p>

                  <h3
                    style={{
                      color:
                      "#0071e3",

                      fontWeight:
                      "700"
                    }}
                  >
                    ₹
                    {
                      product.price
                    }
                  </h3>

                  <p
                    style={{
                      color:
                      "#6e6e73"
                    }}
                  >
                    Qty:
                    {" "}
                    {
                      product.quantity
                    }
                  </p>

                  <div
                    className=
                    "d-flex gap-3 mt-4"
                  >

                    <button
                      className=
                      "btn w-100"
                      onClick={() =>
                        navigate(
                          `/edit-product/${product.id}`
                        )
                      }
                      style={{

                        background:
                        "#0071e3",

                        color:
                        "white",

                        borderRadius:
                        "50px",

                        padding:
                        "12px",

                        border:
                        "none"
                      }}
                    >

                      <FaEdit
                        className=
                        "me-2"
                      />

                      Edit

                    </button>

                    <button
                      className=
                      "btn w-100"
                      onClick={() =>
                        handleDelete(
                          product.id
                        )
                      }
                      style={{

                        background:
                        "#ff3b30",

                        color:
                        "white",

                        borderRadius:
                        "50px",

                        padding:
                        "12px",

                        border:
                        "none"
                      }}
                    >

                      <FaTrash
                        className=
                        "me-2"
                      />

                      Delete

                    </button>

                  </div>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </>
  );
}

export default
AdminProducts;