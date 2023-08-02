import React, { useState } from "react";

import { ApiClient } from "@courseApp/utils/apiClient";
import { UserEndPoints } from "@courseApp/constants/endPoints";
import { setBearerToken } from "@courseApp/utils/tokenHelpers";

function Login() {
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");

  const handleLoginClick = async () => {
    const registerData = {
      username: email,
      password: pswd,
    };
    try {
      const response = await ApiClient.post(
        UserEndPoints.adminLogin(),
        {},
        null,
        registerData
      );
      if (response.status === 200) {
        const { token, message } = response.data;
        await setBearerToken(token);
        alert(message);
      } else {
        alert("Something Went Wrong!");
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div>
      <h1>Login to admin dashboard</h1>
      <br />
      Email - <input type={"text"} onChange={(e) => setEmail(e.target.value)} />
      <br />
      Password -{" "}
      <input type={"password"} onChange={(e) => setPswd(e.target.value)} />
      <br />
      <button onClick={handleLoginClick}>Login</button>
      <br />
      New here? <a href="/register">Register</a>
    </div>
  );
}

export default Login;
