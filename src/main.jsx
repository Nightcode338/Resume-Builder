import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";


const VITE_CLERK_PUBLISHABLE_KEY =
  "pk_test_ZGlzdGluY3QtZGFuZS02LmNsZXJrLmFjY291bnRzLmRldiQ";

console.log(VITE_CLERK_PUBLISHABLE_KEY);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
