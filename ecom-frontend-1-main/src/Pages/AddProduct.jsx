import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  addProduct,
} from "../Services/productService";

import {
  getAllCategories,
} from "../Services/categoryService";

function AddProduct() {
  const navigate =
    useNavigate();

  const [categories,
    setCategories] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);

  const [image,
    setImage] =
    useState(null);

  const [preview,
    setPreview] =
    useState(null);

  const [product,
    setProduct] =
    useState({
      name: "",
      brand: "",
      price: "",
      description: "",
      category: "",
      available: true,
      quantity: "",
      releaseDate: "",
    });

  // ======================
  // FETCH CATEGORIES
  // ======================

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories =
    async () => {
      try {
        const response =
          await getAllCategories();

        setCategories(
          response.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  // ======================
  // HANDLE INPUT
  // ======================

  const handleChange =
    (e) => {
      const {
        name,
        value,
      } = e.target;

      setProduct({
        ...product,
        [name]:
          value,
      });
    };

  // ======================
  // HANDLE IMAGE
  // ======================

  const handleImageChange =
    (e) => {
      const file =
        e.target.files[0];

      if (!file) return;

      setImage(file);

      setPreview(
        URL.createObjectURL(
          file
        )
      );
    };

  // ======================
  // ADD PRODUCT
  // ======================

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(
          true
        );

        const formData =
          new FormData();

        formData.append(
          "name",
          product.name
        );

        formData.append(
          "brand",
          product.brand
        );

        formData.append(
          "price",
          product.price
        );

        formData.append(
          "description",
          product.description
        );

        formData.append(
          "category",
          product.category
        );

        formData.append(
          "available",
          true
        );

        formData.append(
          "quantity",
          product.quantity
        );

        formData.append(
          "releaseDate",
          product.releaseDate
        );

        if (image) {
          formData.append(
            "file",
            image
          );
        }

        await addProduct(
          formData
        );

        alert(
          "Product Added Successfully"
        );

        navigate(
          "/admin-products"
        );
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data ||
            "Failed to add product"
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight:
            "100vh",
          background:
            "linear-gradient(135deg,#020617,#0f172a)",
          color:
            "white",
          paddingBottom:
            "80px",
          position:
            "relative",
          overflow:
            "hidden",
        }}
      >
        {/* BLUE GLOW */}
        <div
          style={{
            position:
              "absolute",
            width:
              "400px",
            height:
              "400px",
            borderRadius:
              "50%",
            background:
              "rgba(37,99,235,0.18)",
            filter:
              "blur(140px)",
            top:
              "-100px",
            left:
              "-100px",
          }}
        />

        {/* HEADER */}
        <section
          style={{
            padding:
              "70px 20px 30px",
          }}
        >
          <div className="container">
            <div className="text-center mb-5">
              <span
                style={{
                  background:
                    "rgba(37,99,235,0.18)",
                  color:
                    "#60a5fa",
                  padding:
                    "10px 18px",
                  borderRadius:
                    "50px",
                  fontWeight:
                    "600",
                }}
              >
                RajMart Admin
              </span>

              <h1
                style={{
                  fontSize:
                    "4rem",
                  fontWeight:
                    "800",
                  marginTop:
                    "25px",
                }}
              >
                Add Product
              </h1>

              <p
                style={{
                  color:
                    "#94a3b8",
                  fontSize:
                    "1.1rem",
                }}
              >
                Add premium
                products to your
                RajMart inventory
              </p>
            </div>

            <div className="row g-4">
              {/* LEFT FORM */}
              <div className="col-lg-8">
                <div
                  style={{
                    background:
                      "rgba(255,255,255,0.08)",
                    backdropFilter:
                      "blur(20px)",
                    border:
                      "1px solid rgba(255,255,255,0.08)",
                    borderRadius:
                      "34px",
                    padding:
                      "35px",
                    boxShadow:
                      "0 15px 35px rgba(0,0,0,0.18)",
                  }}
                >
                  <form
                    onSubmit={
                      handleSubmit
                    }
                  >
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <label className="mb-2 fw-semibold">
                          Product Name
                        </label>

                        <input
                          type="text"
                          name="name"
                          className="premium-input"
                          placeholder="iPhone 16 Pro"
                          value={
                            product.name
                          }
                          onChange={
                            handleChange
                          }
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className="mb-2 fw-semibold">
                          Brand
                        </label>

                        <input
                          type="text"
                          name="brand"
                          className="premium-input"
                          placeholder="Apple"
                          value={
                            product.brand
                          }
                          onChange={
                            handleChange
                          }
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className="mb-2 fw-semibold">
                          Price
                        </label>

                        <input
                          type="number"
                          name="price"
                          className="premium-input"
                          value={
                            product.price
                          }
                          onChange={
                            handleChange
                          }
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className="mb-2 fw-semibold">
                          Quantity
                        </label>

                        <input
                          type="number"
                          name="quantity"
                          className="premium-input"
                          value={
                            product.quantity
                          }
                          onChange={
                            handleChange
                          }
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className="mb-2 fw-semibold">
                          Category
                        </label>

                        <select
                          name="category"
                          className="premium-input"
                          value={
                            product.category
                          }
                          onChange={
                            handleChange
                          }
                          required
                        >
                          <option value="">
                            Select Category
                          </option>

                          {categories.map(
                            (
                              category
                            ) => (
                              <option
                                key={
                                  category.id
                                }
                                value={
                                  category.name
                                }
                              >
                                {
                                  category.name
                                }
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      <div className="col-md-6 mb-4">
                        <label className="mb-2 fw-semibold">
                          Release Date
                        </label>

                        <input
                          type="date"
                          name="releaseDate"
                          className="premium-input"
                          value={
                            product.releaseDate
                          }
                          onChange={
                            handleChange
                          }
                          required
                        />
                      </div>

                      <div className="col-12 mb-4">
                        <label className="mb-2 fw-semibold">
                          Description
                        </label>

                        <textarea
                          rows="5"
                          name="description"
                          className="premium-input"
                          placeholder="Product description..."
                          value={
                            product.description
                          }
                          onChange={
                            handleChange
                          }
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={
                        loading
                      }
                      className="premium-btn"
                    >
                      {loading
                        ? "Adding Product..."
                        : "Add Product"}
                    </button>
                  </form>
                </div>
              </div>

              {/* IMAGE */}
              <div className="col-lg-4">
                <div
                  style={{
                    background:
                      "rgba(255,255,255,0.08)",
                    backdropFilter:
                      "blur(20px)",
                    border:
                      "1px solid rgba(255,255,255,0.08)",
                    borderRadius:
                      "34px",
                    padding:
                      "28px",
                  }}
                >
                  <h3>
                    Product Image
                  </h3>

                  <div
                    style={{
                      marginTop:
                        "20px",
                    }}
                  >
                    {preview ? (
                      <img
                        src={
                          preview
                        }
                        alt="preview"
                        style={{
                          width:
                            "100%",
                          height:
                            "300px",
                          objectFit:
                            "contain",
                          borderRadius:
                            "20px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          height:
                            "300px",
                          display:
                            "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "center",
                          color:
                            "#94a3b8",
                        }}
                      >
                        Upload Image
                      </div>
                    )}

                    <input
                      type="file"
                      className="form-control mt-4"
                      accept="image/*"
                      onChange={
                        handleImageChange
                      }
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <style>{`
          .premium-input{
            width:100%;
            background:
            rgba(255,255,255,0.08);
            border:
            1px solid rgba(255,255,255,0.08);
            color:white;
            border-radius:18px;
            padding:16px 20px;
            outline:none;
          }

          .premium-input:focus{
            border:1px solid #2563eb;
            box-shadow:
            0 0 0 4px
            rgba(37,99,235,0.18);
          }

          .premium-input option{
            background:#0f172a;
            color:white;
          }

          .premium-btn{
            width:100%;
            border:none;
            background:
            linear-gradient(
              135deg,
              #2563eb,
              #3b82f6
            );
            color:white;
            padding:18px;
            border-radius:20px;
            font-weight:700;
          }
        `}</style>
      </div>
    </>
  );
}

export default AddProduct;
