import React,{useState} from "react";

import { ApiClient } from "@courseApp/utils/apiClient";
import { UserEndPoints } from "@courseApp/constants/endPoints";

function Register() {
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");

  const handleSignupClick = async () => {
    const registerData = JSON.stringify({
      username: email,
      password: pswd,
    });
    try {
      const response = await ApiClient.post(
        UserEndPoints.adminSignup(),
        registerData
      );
     alert(response.data.message)
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h1>Register to the website</h1>
      <br />
      <input type={"text"} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input type={"password"} onChange={(e) => setPswd(e.target.value)} />
      <br />
      <button onClick={handleSignupClick}>Register</button>
      <br />
      Already a user? <a href="/login">Login</a>
    </div>
  );
}

export default Register;
