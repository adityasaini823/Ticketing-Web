"use client";
import { useState } from "react";
import axios from "axios";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle signup logic here, e.g., send data to backend API
    try{
    const response = await axios.post("/api/users/signup",{
        email,
        password
    })
    console.log(response.body);
    } catch (error) {
      console.error("Error signing up:", error);
      setErrors(error.response.data?.errors[0]?.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit" >Signup</button>
      </div>
      <div>
        <p className="text-danger">{errors}</p>
      </div>
    </form>
  );
};

export default Signup;
