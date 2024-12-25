import { useState } from "react";
import { bg, mainlogo } from "../../assets/getAssets";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./Auth.css";
import { ErrorNotify, SuccessNotify } from "../../utils/NotifyContainer";
function Register() {
  //handle submit
  const { user, register, isAuthenticated } = useAuth();
  const [loding, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await register(formData);
      navigate("/login");
      SuccessNotify("Registration successful!");
    } catch (error) {
      ErrorNotify(`${error?.message || "Registration failed"}`);
    } finally {
      setLoading(false);
    }
  };

   let checkValidation =
     formData.confirmPassword !== formData.password ||
     formData.confirmPassword == "" ||
     formData.password == "" ||
     formData.email == "" ||
     formData.name == "" ||
     formData.phone == "" ||
     loding;
  if (isAuthenticated) return <Navigate to={`/dashboard/${user?.role}`} />;

  return (
    <div className="login-container">
      <div
        className="login-background"
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
                      <div>
                        <div className="row">
                          <div
                            data-mdb-input-init
                            className="form-outline col-md-6"
                          >
                            <label className="form-label" htmlFor="firstName">
                              Full Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              aria-describedby="nameHelp"
                              onChange={handleChange}
                              className="form-control form-control-lg"
                            />
                          </div>
                          <div
                            data-mdb-input-init
                            className="form-outline col-md-6"
                          >
                            <label className="form-label" htmlFor="firstName">
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
                        </div>

                        <div data-mdb-input-init className="form-outline">
                          <label className="form-label" htmlFor="firstName">
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
                        <div data-mdb-input-init className="form-outline">
                          <label className="form-label" htmlFor="firstName">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={handleChange}
                            className="form-control form-control-lg"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          {/* phone */}
                          <div data-mdb-input-init className="form-outline">
                            <label htmlFor="phone" className="form-label">
                              Phone
                            </label>
                            <input
                              type="phone"
                              className="form-control form-control-lg"
                              id="phone"
                              name="phone"
                              aria-describedby="phoneHelp"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div className="mt-4 pt-2">
                            <button
                              disabled={checkValidation}
                              data-mdb-ripple-init
                              className="btn btn-success btn-lg"
                              type="submit"
                              value="Submit"
                            >
                              {loding ? "Loading..." : "Register"}
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className="text-center mt-2 text-lg">
                        Already have an account?{" "}
                        <Link to="/login" className="link-info fw-bold">
                          Login
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

export default Register;
