import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { SignInPage, SignUpPage } from "./components";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<ProtectedRoute Component={Layout} />}>
      <Route path="" element={<App />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="sign-in" element={<SignInPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
