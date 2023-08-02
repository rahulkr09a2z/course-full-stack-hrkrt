import React from "react";
import { ApiClient } from "@courseApp/utils/apiClient";
import { UserEndPoints } from "@courseApp/constants/endPoints";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
  const [email, setEmail] = React.useState("");
  const [pswd, setPswd] = React.useState("");

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
     alert("Registered Successfully!")
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
