import { useState, type FC } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../../services/authService";

interface InputFieldsProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
}

const InputFields = ({ username, setUsername, password, setPassword }: InputFieldsProps) => {
  return (
    <div className="flex flex-col mt-6 gap-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-border bg-background rounded-md p-2 text-text"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-border bg-background rounded-md p-2 text-text"
        required
      />
    </div>
  );
};

interface ActionFieldsProps {
  isLoading: boolean;
}

const ActionFields = ({ isLoading }: ActionFieldsProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center mt-4 justify-between">
        <div>
          <input id="remember-checkbox" type="checkbox" />
          <label htmlFor="remember-checkbox" className="ms-2 text-sm font-medium text-text-muted">
            Remember me
          </label>
        </div>
        <Link to="/login/reset" className="text-sm font-medium text-accent hover:underline">
          Forgot password?
        </Link>
      </div>
      <input
        type="submit"
        value={isLoading ? "Logging in..." : "Login"}
        disabled={isLoading}
        className="bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-md mt-4 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
};

const LoginForm: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await login({ username, password });
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err: unknown) {
      console.log(err);
      if (err instanceof Error) {
        setError(err.message || "Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen p-4 sm:p-0 bg-background">
      <div className="bg-surface text-text text-center border border-border rounded-lg py-8 px-12 shadow-lg">
        <h1 className="font-bold text-3xl">Welcome back</h1>
        <p className="text-text-muted max-w-sm mt-4 text-md sm:text-lg">
          Sign in to continue planning your journeys and tracking your favorite routes.
        </p>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mt-4">
              {error}
            </div>
          )}
          <InputFields
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
          <ActionFields isLoading={isLoading} />
        </form>
        <p className="text-text-muted text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-accent hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
