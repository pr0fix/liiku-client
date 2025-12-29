import type { FC } from "react";
import { Link } from "react-router";

const InputFields = () => {
  return (
    <div className="flex flex-col mt-6 gap-4">
      <input
        type="email"
        placeholder="Email"
        className="border border-border bg-background rounded-md p-2 text-text"
        required
      />
      <input
        type="text"
        placeholder="Username"
        className="border border-border bg-background rounded-md p-2 text-text"
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-border bg-background rounded-md p-2 text-text"
        required
      />
    </div>
  );
};

const ActionFields = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center mt-4">
        <input id="terms-checkbox" type="checkbox" required />
        <label htmlFor="terms-checkbox" className="ms-2 text-sm font-medium text-text-muted">
          I agree to the{" "}
          <Link to="/terms" className="text-accent hover:underline">
            Terms of Service
          </Link>
        </label>
      </div>
      <input
        type="submit"
        value="Create account"
        className="bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-md mt-4 cursor-pointer transition-colors"
      />
    </div>
  );
};

const SignupForm: FC = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen p-4 sm:p-0 bg-background">
      <div className="bg-surface text-text text-center border border-border rounded-lg py-8 px-12 shadow-lg">
        <h1 className="font-bold text-3xl">Create your account</h1>
        <p className="text-text-muted max-w-sm mt-4 text-md sm:text-lg">
          Join Liiku to discover the best routes, save your favorites, and navigate your city with
          ease.
        </p>
        <form>
          <InputFields />
          <ActionFields />
        </form>
        <p className="text-text-muted text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
