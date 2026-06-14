import {
  useState,
  useEffect,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getProductById,
  updateProduct,
} from "../Services/productService";

import {
  getAllCategories,
} from "../Services/categoryService";

function EditProduct() {
  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const [categories,
    setCategories] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);

  const [preview,
    setPreview] =
    useState(null);

  const [product,
    setProduct] =
    useState({
      name: "",
      brand: "",
      description: "",
      price: "",
      quantity: "",
      releaseDate: "",
      available: true,
      categoryId: "",
      image: null,
    });

  // ======================
  // FETCH PRODUCT
  // ======================

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  const fetchProduct =
    async () => {
      try {
        const response =
          await getProductById(
            id
          );

        const data =
          response.data;

        setProduct({
          name:
            data.name || "",
          brand:
            data.brand || "",
          description:
            data.description ||
            "",
          price:
            data.price || "",
          quantity:
            data.quantity ||
            "",
          releaseDate:
            data.releaseDate ||
            "",
          available:
            data.available ??
            true,
          categoryId:
            data.category?.id ||
            "",
          image: null,
        });

        setPreview(
          `${import.meta.env.VITE_API_URL}/api/products/${id}/image`
        );
      } catch (error) {
        console.log(error);
      }
    };

  // ======================
  // FETCH CATEGORIES
  // ======================

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

  const handleImage =
    (e) => {
      const file =
        e.target.files[0];

      if (!file) return;

      setProduct({
        ...product,
        image: file,
      });

      setPreview(
        URL.createObjectURL(
          file
        )
      );
    };

  // ======================
  // UPDATE PRODUCT
  // ======================

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(
          true
        );

        const productData =
          {
            name:
              product.name,

            brand:
              product.brand,

            description:
              product.description,

            price:
              product.price,

            quantity:
              product.quantity,

            releaseDate:
              product.releaseDate,

            available:
              product.available,

            category: {
              id: Number(
                product.categoryId
              ),
            },
          };

        const formData =
          new FormData();

        formData.append(
          "product",
          JSON.stringify(
            productData
          )
        );

        if (
          product.image
        ) {
          formData.append(
            "imagefile",
            product.image
          );
        }

        await updateProduct(
          id,
          formData
        );

        alert(
          "Product Updated Successfully"
        );

        navigate(
          "/admin-products"
        );
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data ||
            "Failed To Update Product"
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
                Edit Product
              </h1>

              <p
                style={{
                  color:
                    "#94a3b8",
                }}
              >
                Update your
                product details
              </p>
            </div>

            <div className="row g-4">
              {/* FORM */}
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
                        <label>
                          Product Name
                        </label>

                        <input
                          type="text"
                          name="name"
                          className="premium-input"
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
                        <label>
                          Brand
                        </label>

                        <input
                          type="text"
                          name="brand"
                          className="premium-input"
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
                        <label>
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
                        <label>
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
                        <label>
                          Category
                        </label>

                        <select
                          name="categoryId"
                          className="premium-input"
                          value={
                            product.categoryId
                          }
                          onChange={
                            handleChange
                          }
                          required
                        >
                          <option value="">
                            Select
                            Category
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
                                  category.id
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
                        <label>
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
                        <label>
                          Description
                        </label>

                        <textarea
                          rows="5"
                          name="description"
                          className="premium-input"
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
                        ? "Updating..."
                        : "Update Product"}
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

                  {preview && (
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
                        marginTop:
                          "20px",
                      }}
                    />
                  )}

                  <input
                    type="file"
                    className="form-control mt-4"
                    accept="image/*"
                    onChange={
                      handleImage
                    }
                  />
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

export default EditProduct;