import {
  Routes,
  Route
} from "react-router-dom";

// AUTH

import Login
from "./Pages/Login";

import Register
from "./Pages/Register";

// USER PAGES

import Home
from "./components/Home";

import ProductDetails
from "./Pages/ProductDetails";

import Cart
from "./Pages/Cart";

import Checkout
from "./Pages/Checkout";

import MyOrders
from "./Pages/MyOrders";

// ADMIN PAGES

import AdminDashboard
from "./Pages/AdminDashboard";

import AdminProducts
from "./Pages/AdminProducts";

import AddProduct
from "./Pages/AddProduct";

import EditProduct
from "./Pages/EditProduct";

// PROTECTED ROUTE

import ProtectedRoute
from "./Pages/ProtectedRoute";



function App() {

  return (

    <Routes>

      {/* ========================= */}
      {/* PUBLIC ROUTES */}
      {/* ========================= */}

      <Route
        path="/"
        element={
          <Login />
        }
      />

      <Route
        path="/register"
        element={
          <Register />
        }
      />

      {/* ========================= */}
      {/* USER PROTECTED ROUTES */}
      {/* ========================= */}

      <Route
        path="/home"
        element={

          <ProtectedRoute>

            <Home />

          </ProtectedRoute>
        }
      />

      <Route
        path="/product/:id"
        element={

          <ProtectedRoute>

            <ProductDetails />

          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={

          <ProtectedRoute>

            <Cart />

          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={

          <ProtectedRoute>

            <Checkout />

          </ProtectedRoute>
        }
      />

      <Route
        path="/my-orders"
        element={

          <ProtectedRoute>

            <MyOrders />

          </ProtectedRoute>
        }
      />

      {/* ========================= */}
      {/* ADMIN PROTECTED ROUTES */}
      {/* ========================= */}

      <Route
        path="/admin"
        element={

          <ProtectedRoute
            adminOnly={true}
          >

            <AdminDashboard />

          </ProtectedRoute>
        }
      />

      <Route
        path="/admin-products"
        element={

          <ProtectedRoute
            adminOnly={true}
          >

            <AdminProducts />

          </ProtectedRoute>
        }
      />

      <Route
        path="/add-product"
        element={

          <ProtectedRoute
            adminOnly={true}
          >

            <AddProduct />

          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-product/:id"
        element={

          <ProtectedRoute
            adminOnly={true}
          >

            <EditProduct />

          </ProtectedRoute>
        }
      />

      <Route
  path="/orders"
  element={
    <ProtectedRoute>
      <MyOrders />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;