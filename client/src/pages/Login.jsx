import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Spinner } from "flowbite-react";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiURL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);

      await fetch(apiURL + "/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success === false) {
            setLoading(false);
            return setErrorMessage(res.message);
          }
          setLoading(false);

          navigate("/");
        });
    } catch (err) {
      setErrorMessage(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="text-sm block mb-2 font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="text-sm block mb-2 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="ml-2">Loading...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        {errorMessage && (
          <Alert color="failure" className="mt-4">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
