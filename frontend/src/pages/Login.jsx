import { useState } from "react";
import { login } from "../services/auth.js";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");

      await login({
        username,
        password,
      });
    } catch (e) {
      setError(e.response?.data?.message ?? "Login failed");
    }
  }

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80"
      >
        <h1 className="text-2xl font-bold">
          Iniciar sesión
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

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full pr-12"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && (
          <i className="text-red-700 text-sm">
            {error}
          </i>
        )}

        <button
          type="submit"
          className="link-button rounded-lg bg-[#632b91] px-2.5 py-2 font-semibold text-white transition"
        >
          Acceder
        </button>
      </form>
    </div>
  );
}