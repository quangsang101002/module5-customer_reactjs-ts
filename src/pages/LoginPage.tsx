import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { loginAction, logoutAction } from "../store/actions/auth.action";
import authAPI from "../apis/auth/auth/requests/author.api,";
import { LoginRequest } from "../apis/auth/auth/requests/login-request";
import React, { useEffect, useState } from "react";
import { FormEvent } from "react";

function Login() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showError, setShowError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated: boolean = useSelector(
    (state: RootState) => state.authReducer.isAuthenticated
  );

  // const handleLogin = (): void => {
  //   dispatch(loginAction(""));
  // };

  // const handleLogout = (): void => {
  //   dispatch(logoutAction());
  // };
  const handleLoad = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Ngăn trang web tự động tải lại
    try {
      // Rest of your login code
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async () => {
    try {
      const loginData: LoginRequest = {
        username: userName,
        password: password,
        type: "customer",
      };
      const response = await authAPI.login(loginData);

      if (response.token) {
        window.localStorage.setItem("Bearer", response.token);
        navigate("/");
      }
    } catch (error: any) {
      setShowError(error);
    }
  };

  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handlePassWord = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      {/* <div>Login</div>
      {isAuthenticated ? "true" : "false"}
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button> */}
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <h2 className="text-center">Login</h2>
              <form onSubmit={handleLoad}>
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form1Example13"
                    className="form-control form-control-lg mb-3"
                    placeholder="UserName"
                    onChange={handleUserName}
                  />
                  {/* <label className="form-label" htmlFor="form1Example13">
                    UserName
                  </label> */}
                  {showError === "User not found" ? (
                    <small className="mt-4" style={{ color: "red" }}>
                      Người dùng không tồn tại
                    </small>
                  ) : (
                    ""
                  )}
                </div>

                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    className="form-control form-control-lg mb-3"
                    placeholder=" Password"
                    onChange={handlePassWord}
                  />
                  {/* <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label> */}
                  {showError === "Sai mật khẩu" ? (
                    <small className="mt-4" style={{ color: "red" }}>
                      Sai mật khẩu
                    </small>
                  ) : (
                    ""
                  )}
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  {/* Checkbox */}
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="form1Example3"
                      defaultChecked
                    />
                    {/* <label className="form-check-label" htmlFor="form1Example3">
                      {" "}
                      Remember me{" "}
                    </label> */}
                  </div>
                  <a href="#!">Forgot password?</a>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  onClick={handleLogin}
                >
                  Sign in
                </button>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>

                <a
                  className="btn btn-primary btn-lg btn-block"
                  style={{ backgroundColor: "#3b5998" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-facebook-f me-2"></i>Continue with
                  Facebook
                </a>
                <a
                  className="btn btn-primary btn-lg btn-block"
                  style={{ backgroundColor: "#55acee" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-twitter me-2"></i>Continue with Twitter
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
