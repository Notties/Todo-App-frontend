import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getLoginInfo } from "../utils/Logininfo";

const NavBar = () => {
  let navigate = useNavigate();
  const role = getLoginInfo()?.role;

  return (
    <nav>
      <div>
        <div>
          <span>
            Todo App
          </span>
        </div>
      </div>
      <div>
        <div>
          <button onClick={() => navigate("/active")}>
            Active Todos
          </button>
          <br />
          <button onClick={() => navigate("/completed")}>
            Completed
          </button>
          <button
            onClick={() => navigate("/users")}
            style={{ display: role != "ADMIN" ? "none" : "" }}
            >
            Users
          </button>
        </div>

        <div>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;