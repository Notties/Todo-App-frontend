import React from "react";
import { useNavigate } from "react-router-dom";
import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/AxiosSetup";
import { toast } from "react-toastify";

const Login = () => {
  let navigate = useNavigate();
  let email: any = React.useRef();
  let password: any = React.useRef();

  const loginApp = async () => {
    if (email.current.value == "" || password.current.value == "") {
      toast.info("Please fill the information");
      return;
    }
    try {
      const response = await custom_axios.post(ApiConstants.LOGIN, {
        email: email.current.value,
        password: password.current.value,
      });
      localStorage.setItem("token", response.data.token);
      dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (error: any) {
      if (error.response.status == 401) toast.warn(error.response.data.message);
    }

    // navigate("/");
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <span>
              Todo App
            </span>
          </div>
        </div>
        <div>
          {/* @csrf */}

          <div>
            <label htmlFor="username">
              Email
            </label>
            <input
              ref={email}
              name="email"
              v-model="form.email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div>
            <label>
              Password
            </label>
            <input
              ref={password}
              v-model="form.password"
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="current-password"
            />
          </div>
          <div>
            <button onClick={loginApp}>
              Login
            </button>
            <a onClick={() => navigate("/signUp")}>
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;