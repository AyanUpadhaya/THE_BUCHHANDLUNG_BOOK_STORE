import useAuth from "../../../../hooks/useAuth";
import UserOwnerDashboard from "./UserOwnerDashboard";

function UserHome() {
  const { user } = useAuth();

  return (
    <div>
      <div className="w-100 h-100">
        <div className="d-flex flex-column justify-content-between gap-3 ">
          {/* head */}
          <div className="d-flex justify-content-between gap-3 align-items-center">
            <div>
              <h2>Dashboard</h2>
            </div>
          </div>
          {/* table */}
          <UserOwnerDashboard user={user}></UserOwnerDashboard>
        </div>
      </div>
    </div>
  );
}

export default UserHome;
