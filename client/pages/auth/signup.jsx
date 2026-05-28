import { useState } from "react";
import axios from "axios";
import { useRequest } from "../../hooks/use-request";
import  Router  from "next/router";
const Signup = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password
    },
    onSuccess: () => Router.push("/")
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
    Router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl">
        
        <div>
          <h1 className="text-center text-3xl font-extrabold tracking-tight text-white">
            Create your account
          </h1>
          <p className="mt-2 text-center text-sm text-zinc-400">
            Welcome to Ticketing! Get started below.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1.5">
                Email Address
              </label>
              <input
                id="email"
                // type="email"
                autoComplete="email"
                required
                className="block w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 sm:text-sm transition-colors"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-300 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                className="block w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-white placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 sm:text-sm transition-colors"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Error Message Container */}
          {errors }

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 shadow-md shadow-orange-600/10 transition-all active:scale-[0.98]"
            >
              Sign Up
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Signup;