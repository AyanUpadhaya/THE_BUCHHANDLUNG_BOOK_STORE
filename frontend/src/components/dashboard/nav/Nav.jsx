import useAuth from "../../../hooks/useAuth";
import BarIcon from "../icons/BarIcon";
import DropCircle from "./DropCircle";

const Nav = ({ toggleSidebar }) => {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <div>
      <header className="p-3 text-bg-light shadow-sm">
        <div className="w-full">
          <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-start">
            <div>
              <button
                onClick={toggleSidebar}
                className="btn btn-primary-outline"
                type="button"
              >
                <BarIcon></BarIcon>
              </button>
            </div>
            <div className="ms-auto text-end">
              {isAuthenticated && (
                <DropCircle logout={logout} user={user}></DropCircle>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Nav;
