import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { bg, mainlogo } from "../../assets/getAssets";
import useAuth from "../../hooks/useAuth";
import "./Auth.css";
import { ErrorNotify, SuccessNotify } from "../../utils/NotifyContainer";

function Login() {
  const { login, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login(formData);
      SuccessNotify("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      ErrorNotify(error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !formData.email || !formData.password || loading;

  if (isAuthenticated) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return (
    <div className="login-container">
      <div
        className="login-background w-100 h-100"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "blur(2px)",
        }}
      ></div>
      <div className="login-content">
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-9 col-xl-7">
                <div
                  className="card shadow-2-strong card-registration"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body p-4 p-md-5 h-100">
                    <div className="d-flex justify-content-center mb-3">
                      <img src={mainlogo} className="img-fluid" alt="" />
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div data-mdb-input-init className="form-outline">
                          <label className="form-label" htmlFor="email">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            aria-describedby="emailHelp"
                            onChange={handleChange}
                            className="form-control form-control-lg"
                          />
                        </div>

                        <div data-mdb-input-init className="form-outline">
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>

                      <div className="mt-4 pt-2">
                        <button
                          disabled={isDisabled}
                          data-mdb-ripple-init
                          className="btn btn-success btn-lg"
                          type="submit"
                          value="Submit"
                        >
                          {loading ? "Loading..." : "Login"}
                        </button>
                      </div>
                      <p className="text-center mt-5 text-lg">
                        Don't have an account?{" "}
                        <Link to="/register" className="link-info fw-bold">
                          Register
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
