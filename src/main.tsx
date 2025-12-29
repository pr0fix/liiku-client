import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginForm from "./components/auth/Login.tsx";
import ResetPassword from "./components/auth/ResetPassword.tsx";
import SignupForm from "./components/auth/Signup.tsx";
import Terms from "./components/auth/Terms.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/login/reset" element={<ResetPassword />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
