import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginForm from "./components/auth/Login.tsx";
import ResetPassword from "./components/auth/ResetPassword.tsx";
import SignupForm from "./components/auth/Signup.tsx";
import Terms from "./components/auth/Terms.tsx";
import Layout from "./components/Layout.tsx";

const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute(
    "data-theme",
    prefersDark ? "dark" : "light"
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/login/reset" element={<ResetPassword />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>
);
