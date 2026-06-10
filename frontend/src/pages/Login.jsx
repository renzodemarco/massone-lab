import { useState } from "react";
import { login } from "../services/auth.js";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");

      const payload = await login({
        username,
        password
      });

      localStorage.setItem("token", payload.token);

      window.location.reload();
    } catch (e) {
      setError(
        e.response?.data?.message ??
        "Login failed"
      );
    }
  }

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80"
      >
        <h1 className="text-2xl font-bold">
          Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="border p-2 rounded"
        />

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}