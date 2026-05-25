"use client";
import { useState } from "react";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here, e.g., send data to backend API
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Signup successful!"); // Replace with actual success handling
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
