import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminDashboard from "./pages/AdminView/AdminDashboard";
import AdminProducts from "./pages/AdminView/AdminProducts";
import AdminOrders from "./pages/AdminView/AdminOrders";
import AdminFeatures from "./pages/AdminView/AdminFeatures";
import AdminLayout from "./components/AdminView/AdminLayout";
import ShoppingLayout from "./components/ShoppingView/ShoppingLayout";
import Error from "./pages/404page/Error";
import ShoppingHome from "./pages/ShoppingView/ShoppingHome";
import ShoppingListings from "./pages/ShoppingView/ShoppingListings";
import ShoppingAccounts from "./pages/ShoppingView/ShoppingAccounts";
import ShoppingCheckout from "./pages/ShoppingView/ShoppingCheckout";
import CheckAuth from "./components/Common/CheckAuth";
import Unauth from "./pages/UnauthPage/Unauth";

function App() {
  const isAuthenticated = false;
  const user = null;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* login routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />}></Route>
          <Route path="register" element={<AuthRegister />}></Route>
        </Route>

        {/* admin routes */}

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* shopping routes */}

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listings" element={<ShoppingListings />} />
          <Route path="accounts" element={<ShoppingAccounts />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
        </Route>
        <Route path="*" element={<Error />} />
        <Route path="/unauth-page" element={<Unauth />} />
      </Routes>
    </div>
  );
}

export default App;
