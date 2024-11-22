import axios from "axios";
import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/help-desk/v1/users/list",
        {
          headers: {
            user_uid: "Userd6cba3",
          },
        }
      );
      if (response.data && response.data.output) {
        setUsers(response.data.output);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="ticket-table">
      <h3>All Users</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
              <th>Mobile Number </th>
              <th>User Type </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email_address}</td>
                <td>{user.mobile_number}</td>
                <td>{user.user_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
