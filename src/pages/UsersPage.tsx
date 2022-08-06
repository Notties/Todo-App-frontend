import React from "react";
import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/AxiosSetup";
import NavBar from "../components/NavBar";
import { getLoginInfo } from "../utils/Logininfo";
import { toast } from "react-toastify";

interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
  role: string;
}

const UsersPage = () => {
  const [users, setUsers] = React.useState<UserModel[]>([]);

  const getAllUsers = async () => {
    const role = getLoginInfo()?.role;
    if (role != null && role == "ADMIN") {
      const response = await custom_axios.get(ApiConstants.USER.FIND_ALL, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUsers(response.data);
    } else {
      toast.info("For hidden Resource");
    }
  };

  React.useEffect(() => {
    if (users.length == 0) getAllUsers();
  }, []);
  return (
    <div>
      <NavBar></NavBar>
      <h1>Users</h1>
      {/* This is an example component */}
      <div>
        <div>
          <div>
            <div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>
                        First Name
                      </th>
                      <th>
                        Last Name
                      </th>
                      <th>
                        Email
                      </th>
                      <th>
                        Active
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => {
                      return (
                        <tr key={user.id}>
                          <td>
                            {user.firstName}
                          </td>
                          <td>
                            {user.lastName}
                          </td>
                          <td>
                            {user.email}
                          </td>
                          <td>
                            <button
                              hidden={user.role == "ADMIN" ? true : false}
                              onClick={async () => {
                                const response = await custom_axios.delete(
                                  ApiConstants.USER.DELETE(user.id),
                                  {
                                    headers: {
                                      Authorization:
                                        "Bearer " + localStorage.getItem("token"),
                                    },
                                  }
                                ); 
                                getAllUsers();
                                toast.success("User Deleted Sucessfully!!");
                              }}
                              >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
