import { useState, type FC, type FormEvent } from "react";
import { Link } from "react-router";

const ResetPassword: FC = () => {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Todo: implement password reset API call
    setEmailSent(true);
  };

  if (emailSent) {
    return (
      <div className="flex justify-center items-center h-screen w-screen p-4 sm:p-0 bg-background">
        <div className="bg-surface text-text text-center border border-border rounded-lg py-8 px-12 shadow-lg max-w-md">
          <h1 className="font-bold text-3xl">Check your email</h1>
          <p className="text-text-muted mt-4 text-md sm:text-lg">
            We've sent you a password reset link. Please check your inbox and
            follow the instructions to reset your password.
          </p>
          <Link
            to="/login"
            className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-md mt-6 transition-colors"
          >
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen p-4 sm:p-0 bg-background">
      <div className="bg-surface text-text text-center border border-border rounded-lg py-8 px-12 shadow-lg max-w-md">
        <h1 className="font-bold text-3xl">Reset your password</h1>
        <p className="text-text-muted mt-4 text-md sm:text-lg">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-6">
            <input
              type="email"
              placeholder="Email"
              className="border border-border bg-background rounded-md p-2 text-text"
              required
            />
          </div>
          <input
            type="submit"
            value="Send reset link"
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-md mt-4 cursor-pointer transition-colors"
          />
        </form>
        <Link
          to="/login"
          className="inline-block text-accent hover:underline text-sm mt-6"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
