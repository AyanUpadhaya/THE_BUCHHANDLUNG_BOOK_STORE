import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import useAuth from "../../../hooks/useAuth";
import { logotext, sidebarlogo, smalllogo } from "../../../assets/getAssets";
import DashboardIcon from "../icons/DashboardIcon";
import ProfileIcon from "../icons/ProfileIcon";
import StoreIcon from "../icons/StoreIcon";
import BookIcon from "../icons/BookIcon";
import OrderIcon from "../icons/OrderIcon";
import PurchaseIcon from "../icons/PurchaseIcon";
import SettingsIcon from "../icons/SettingsIcon";
import CategoryIcon from "../icons/CategoryIcon";

export default function Sidebar({ showSidebar }) {
  const location = useLocation();
  const { user } = useAuth();

  function isActive(path, location) {
    return path.includes(location.pathname)
      ? "active bg-secondary"
      : "text-white";
  }

  const renderSiderbarLinks = (role, isActive, showSidebar) => {
    switch (role) {
      case "user":
        return (
          <ul className="nav nav-pills flex-column mb-auto d-flex flex-column gap-2">
            {/* home */}
            <li className="nav-item">
              <Link
                to={`/dashboard/${role}`}
                className={`nav-link d-flex align-items-center fs-5 gap-1 link-text ${isActive(
                  ["/dashboard/user"],
                  location
                )}`}
                aria-current="page"
              >
                <DashboardIcon></DashboardIcon>
                <span className={showSidebar ? "block" : "hidden"}>
                  Dashboard
                </span>
              </Link>
            </li>
            {/* my orders */}
            <li>
              <Link
                to={`/dashboard/${role}/purchase_history`}
                className={`nav-link d-flex align-items-center fs-5 gap-1 link-text ${isActive(
                  ["/dashboard/user/purchase_history"],
                  location
                )}`}
                aria-current="page"
              >
                <PurchaseIcon></PurchaseIcon>
                <span className={showSidebar ? "block" : "hidden"}>
                  My Orders
                </span>
              </Link>
            </li>

            {/* store */}
            <li>
              <Link
                to={`/dashboard/${role}/store`}
                className={`nav-link d-flex align-items-center fs-5 gap-1 link-text ${isActive(
                  [
                    "/dashboard/user/store",
                    "/dashboard/user/store/add",
                    "/dashboard/user/store/details",
                    "/dashboard/user/store/update",
                  ],
                  location
                )}`}
                aria-current="page"
              >
                <StoreIcon></StoreIcon>
                <span className={showSidebar ? "block" : "hidden"}>Store</span>
              </Link>
            </li>

            {/* store orders */}
            <li className={`${!user.is_store_owner && "d-none"}`}>
              <Link
                to={`/dashboard/${role}/orders`}
                className={`nav-link d-flex align-items-center fs-5 gap-1 link-text ${isActive(
                  ["/dashboard/user/orders"],
                  location
                )}`}
                aria-current="page"
              >
                <OrderIcon></OrderIcon>
                <span className={showSidebar ? "block" : "hidden"}>
                  Store orders
                </span>
              </Link>
            </li>
            {/* books */}
            <li>
              <Link
                to={`/dashboard/${role}/books`}
                className={`nav-link d-flex align-items-center fs-5 gap-1 link-text ${isActive(
                  [
                    "/dashboard/user/books",
                    "/dashboard/user/books/add",
                    "/dashboard/user/books/details",
                    "/dashboard/user/books/update",
                  ],
                  location
                )}`}
                aria-current="page"
              >
                <BookIcon></BookIcon>
                <span className={showSidebar ? "block" : "hidden"}>Books</span>
              </Link>
            </li>

            {/* Settings */}
            <li>
              <Link
                to={`/dashboard/${role}/settings`}
                className={`nav-link d-flex align-items-center fs-5 gap-1 link-text ${isActive(
                  ["/dashboard/user/settings"],
                  location
                )}`}
                aria-current="page"
              >
                <SettingsIcon></SettingsIcon>
                <span className={showSidebar ? "block" : "hidden"}>
                  Settings
                </span>
              </Link>
            </li>
          </ul>
        );
        break;
      case "admin":
        return (
          <ul className="nav nav-pills flex-column mb-auto d-flex flex-column gap-2">
            {/* home */}
            <li className="nav-item">
              <Link
                to={`/dashboard/${role}`}
                className={`nav-link d-flex align-items-center fs-5 gap-1 link-text ${isActive(
                  "/dashboard/admin",
                  location
                )}`}
                aria-current="page"
              >
                <DashboardIcon></DashboardIcon>
                <span className={showSidebar ? "block" : "hidden"}>
                  Dashboard
                </span>
              </Link>
            </li>

            {/* books */}
            <li>
              <Link
                to={`/dashboard/${role}/books`}
                className={`nav-link d-flex align-items-center fs-5 gap-1 link-text ${isActive(
                  ["/dashboard/admin/books"],
                  location
                )}`}
                aria-current="page"
              >
                <BookIcon></BookIcon>
                <span className={showSidebar ? "block" : "hidden"}>Books</span>
              </Link>
            </li>
            {/* categorys */}
            <li>
              <Link
                to={`/dashboard/${role}/categorys`}
                className={`nav-link d-flex align-items-center fs-5 gap-1 link-text ${isActive(
                  [
                    "/dashboard/admin/categorys",
                    "/dashboard/admin/categorys/add",
                    "/dashboard/admin/categorys/update",
                  ],
                  location
                )}`}
                aria-current="page"
              >
                <CategoryIcon></CategoryIcon>
                <span className={showSidebar ? "block" : "hidden"}>
                  Categories
                </span>
              </Link>
            </li>
            {/* users */}
            <li>
              <Link
                to={`/dashboard/${role}/users`}
                className={`nav-link d-flex align-items-center fs-5 gap-1 link-text ${isActive(
                  ["/dashboard/admin/users"],
                  location
                )}`}
                aria-current="page"
              >
                <ProfileIcon></ProfileIcon>
                <span className={showSidebar ? "block" : "hidden"}>Users</span>
              </Link>
            </li>
            {/* Stores */}
            <li>
              <Link
                to={`/dashboard/${role}/stores`}
                className={`nav-link d-flex align-items-center fs-5 gap-1 link-text ${isActive(
                  ["/dashboard/admin/stores"],
                  location
                )}`}
                aria-current="page"
              >
                <StoreIcon></StoreIcon>
                <span className={showSidebar ? "block" : "hidden"}>Store</span>
              </Link>
            </li>
          </ul>
        );
        break;
    }
  };

  // /dashboard/admin
  return (
    <div
      className={`${
        showSidebar ? "w-280" : "w-80"
      } duration-300 d-flex flex-column flex-shrink-0 p-3 text-bg-success h-full shrink-0`}
    >
      <Link
        to={"/"}
        className=" w-full d-flex align-items-center  mb-3 mb-md-0 me-md-auto text-white text-decoration-none block h-44"
      >
        <div style={{ width: "60px", height: "44px" }}>
          <img  src={sidebarlogo} alt="" />
        </div>
        <div className={`${showSidebar ? "block" : "hidden"}   pt-2 ms-2`}>
          <h5 className="text-white text-lg font-semibold">The <br /> Bucchandlung</h5>
        </div>
      </Link>
      <hr />
      <div>{renderSiderbarLinks(user?.role, isActive, showSidebar)}</div>
    </div>
  );
}
