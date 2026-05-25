"use client";
import { useState } from "react";
import axios from "axios";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle signup logic here, e.g., send data to backend API
    const response = await axios.post("api/user/signup",{
        email,
        password
    })
    console.log(response.body);
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
    </form>
  );
};

export default Signup;
