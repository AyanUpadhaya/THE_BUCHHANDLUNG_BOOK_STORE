import { createBrowserRouter } from "react-router-dom";
import WebsiteLayout from "../layouts/WebsiteLayout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import DashboardlLayout from "../layouts/DashboardlLayout";
import AdminHome from "../pages/dashboards/admin/home/AdminHome";
import UserHome from "../pages/dashboards/user/home/UserHome";
import UserProfile from "../pages/dashboards/user/profile/UserProfile";
import PrivateRoute from "./PrivateRoute";
import RedirectToDashboard from "../utils/RedirectToDashboard";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import AdminUsers from "../pages/dashboards/admin/users/AdminUsers";
import AdminStores from "../pages/dashboards/admin/stores/AdminStores";
import AdminAddCategory from "../pages/dashboards/admin/categorys/AdminAddCategory";
import AdminCategorys from "../pages/dashboards/admin/categorys/AdminCategorys";
import AdminBooks from "../pages/dashboards/admin/books/AdminBooks";
import AdminUpdateCategory from "../pages/dashboards/admin/categorys/AdminUpdateCategory";
import { CategoryProvider } from "../context/CategoryContext";
import Cart from "../pages/cart/Cart";
import UserBooks from "../pages/dashboards/user/books/UserBooks";
import UserAddBooks from "../pages/dashboards/user/books/UserAddBooks";
import UserUpdateBooks from "../pages/dashboards/user/books/UserUpdateBooks";
import UserPurchase from "../pages/dashboards/user/purchase/UserPurchase";
import UserStore from "../pages/dashboards/user/store/UserStore";
import UserAddStore from "../pages/dashboards/user/store/UserAddStore";
import UserUpdateStore from "../pages/dashboards/user/store/UserUpdateStore";
import UserStoreOrders from "../pages/dashboards/user/orders/UserStoreOrders";
import UserSettings from "../pages/dashboards/user/settings/UserSettings";
import { StoreProvider } from "../context/StoreContext";
import UserStoreDetails from "../pages/dashboards/user/store/UserStoreDetails";
import { BookProvider } from "../context/BookContext";
import BookDetails from "../pages/dashboards/user/books/BookDetails";
import PublicBookDetails from "../pages/bookdetails/PublicBookDetails";
import { CartProvider } from "../context/CartContext";
import LoginRoute from "./LoginRoute";
import { OrderProvider } from "../context/OrderContext";
import Signup from "../pages/auth/Signup";
import AdminProfile from "../pages/dashboards/admin/profile/AdminProfile";

const router = createBrowserRouter([
  //website
  {
    path: "/",
    element: (
      <CartProvider>
        <WebsiteLayout></WebsiteLayout>
      </CartProvider>
    ),
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "book_details/:book_id",
        element: <PublicBookDetails></PublicBookDetails>,
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "cart",
        element: (
          <LoginRoute>
            <Cart></Cart>
          </LoginRoute>
        ),
      },
    ],
  },

  //dashboard
  // if user access dashboard route then redirect to role based dashboard
  {
    path: "/dashboard",
    element: <RedirectToDashboard></RedirectToDashboard>,
  },
  //role based dashboard for user and admin
  {
    path: "/dashboard/*",
    element: <DashboardlLayout></DashboardlLayout>,
    children: [
      //admin routes
      {
        path: "admin",
        element: (
          <PrivateRoute role={"admin"}>
            <AdminHome></AdminHome>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/profile",
        element: (
          <PrivateRoute role={"admin"}>
            <AdminProfile></AdminProfile>
          </PrivateRoute>
        ),
      },

      {
        path: "admin/users",
        element: (
          <PrivateRoute role={"admin"}>
            <AdminUsers></AdminUsers>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/books",
        element: (
          <PrivateRoute role={"admin"}>
            <BookProvider>
              <AdminBooks></AdminBooks>
            </BookProvider>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/stores",
        element: (
          <PrivateRoute role={"admin"}>
            <StoreProvider>
              <AdminStores></AdminStores>
            </StoreProvider>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/categorys",
        element: (
          <PrivateRoute role={"admin"}>
            <AdminCategorys></AdminCategorys>,
          </PrivateRoute>
        ),
      },
      {
        path: "admin/categorys/add",
        element: (
          <PrivateRoute role={"admin"}>
            <AdminAddCategory></AdminAddCategory>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/categorys/update",
        element: (
          <PrivateRoute role={"admin"}>
            <AdminUpdateCategory></AdminUpdateCategory>
          </PrivateRoute>
        ),
      },

      //user options
      //general
      {
        path: "user",
        element: (
          <PrivateRoute role={"user"}>
            <UserHome></UserHome>
          </PrivateRoute>
        ),
      },
      {
        path: "user/profile",
        element: (
          <PrivateRoute role={"user"}>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
      },
      // books
      {
        path: "user/books",
        element: (
          <PrivateRoute role={"user"}>
            <BookProvider>
              <UserBooks></UserBooks>,
            </BookProvider>
          </PrivateRoute>
        ),
      },
      {
        path: "user/books/add",
        element: (
          <PrivateRoute role={"user"}>
            <BookProvider>
              <UserAddBooks></UserAddBooks>,
            </BookProvider>
          </PrivateRoute>
        ),
      },
      {
        path: "user/books/update",
        element: (
          <PrivateRoute role={"user"}>
            <BookProvider>
              <UserUpdateBooks></UserUpdateBooks>,
            </BookProvider>
          </PrivateRoute>
        ),
      },
      {
        path: "user/books/details",
        element: (
          <PrivateRoute role={"user"}>
            <BookProvider>
              <BookDetails></BookDetails>,
            </BookProvider>
          </PrivateRoute>
        ),
      },
      // user purchase history
      {
        path: "user/purchase_history",
        element: (
          <PrivateRoute role={"user"}>
            <UserPurchase></UserPurchase>
          </PrivateRoute>
        ),
      },
      // store
      {
        path: "user/store",
        element: (
          <PrivateRoute role={"user"}>
            <StoreProvider>
              <UserStore></UserStore>
            </StoreProvider>
          </PrivateRoute>
        ),
      },
      {
        path: "user/store/details",
        element: (
          <PrivateRoute role={"user"}>
            <StoreProvider>
              <UserStoreDetails></UserStoreDetails>
            </StoreProvider>
          </PrivateRoute>
        ),
      },
      {
        path: "user/store/add",
        element: (
          <PrivateRoute role={"user"}>
            <UserAddStore></UserAddStore>
          </PrivateRoute>
        ),
      },
      {
        path: "user/store/update",
        element: (
          <PrivateRoute role={"user"}>
            <StoreProvider>
              <UserUpdateStore></UserUpdateStore>
            </StoreProvider>
          </PrivateRoute>
        ),
      },
      // store orders
      {
        path: "user/orders",
        element: (
          <PrivateRoute role={"user"}>
            <OrderProvider>
              <UserStoreOrders></UserStoreOrders>
            </OrderProvider>
          </PrivateRoute>
        ),
      },
      //settings
      {
        path: "user/settings",
        element: (
          <PrivateRoute role={"user"}>
            <UserSettings></UserSettings>
          </PrivateRoute>
        ),
      },
      ,
    ],
  },
]);

export default router;
