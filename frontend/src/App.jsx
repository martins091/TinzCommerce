// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import AutoLogoutHandler from './components/AutoLogoutHandler';

import Home from './pages/home/Home';
import About from './pages/about/About';
import Cart from './pages/cart/Cart';
import Product from './pages/products/Product';
import Signin from './pages/signin/Signin';
import Signup from './pages/signup/SignUp';
import ForgotPassword from './pages/forgotPassword/ForgotPassword';
import ResetPassword from './pages/resetPassword/ResetPassword';
import UnauthorizedPage from './pages/unauthorized/Unauthorized';
import Profile from './pages/profile/Profile';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import NotFound from './pages/notFound/NotFound';
import ProductDetails from './pages/products/productDetials';

function App() {
  return (
    <Router>
      {/* ✅ Use hook-triggering component inside Router, but outside Routes */}
      <AutoLogoutHandler />

      <Header />

      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Product />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="*" element={<NotFound />} />

        {/* 🔐 Private Routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* 🔐 Admin Route */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
