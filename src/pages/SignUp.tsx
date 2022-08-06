import React from "react";
import { useNavigate } from "react-router-dom";
import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/AxiosSetup";
import { toast } from "react-toastify";

const SignUp = () => {
  let navigate = useNavigate();
  let firstName: any = React.useRef();
  let lastName: any = React.useRef();
  let password: any = React.useRef();
  let confirmPassword: any = React.useRef();
  let email: any = React.useRef();

  const register = async () => {
    if ((firstName.current.value && lastName.current.value && email.current.value && password.current.value && confirmPassword.current.value) == '') {
      toast.info("Please fill the information!!!");
      return;
    }
    if (password.current.value != confirmPassword.current.value) {
      toast.info("Password does not match!!!");
      return;
    }

    const response = await custom_axios.post(ApiConstants.USER.SIGN_UP, {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
    });
    console.log(response.data);
    toast.success("Account Created Sucessfully!!!");
    navigate("/login");
  };

  return (
    <div>
      {/* Container */}
      <div>
        <div>
          {/* Row */}
          <div>
            {/* Col */}
            <div>
              
            </div>
            {/* Col */}
            <div>
              <h3>Create an Account!</h3>
              <form>
                <div>
                  <div>
                    <label>
                      First Name
                    </label>
                    <input
                      ref={firstName}
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <label>
                      Last Name
                    </label>
                    <input
                      ref={lastName}
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div>
                  <label>
                    Email
                  </label>
                  <input
                    ref={email}
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <div>
                    <label>
                      Password
                    </label>
                    <input
                      ref={password}
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                  <div>
                    <label>
                      Confirm Password
                    </label>
                    <input
                      ref={confirmPassword}
                      id="c_password"
                      type="password"
                      placeholder="******************"
                    />
                  </div>
                </div>
                <div>
                  <button onClick={register} type="button">
                    Register Account
                  </button>
                </div>
                <hr/>
                <div></div>
                <div>
                  <a
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Already have an account? Login!
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;