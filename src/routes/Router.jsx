import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../layout/Layout";
import LazyComponent from "./LazyComponent";
import NetworkErrorFallback from "../pages/error/ErrorScreen";
import PrivateRoute from "../routes/PrivateRoute";
import PublicRoute from "../routes/PublicRoute";
import AuthLayout from "../pages/Auth/AuthLayout/AuthLayout";
import StripeWrapper from "../stripewrapper/StripeWrapper";
export const router = createBrowserRouter([

  // Public Routes
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "/auth",
        element: <LazyComponent path="/login" />,
      },
      // {
      //   path: "login",
      //   element: <LazyComponent path="/login" />,
      // },
      {
        path: "signup",
        element: <LazyComponent path="/signup" />,
      },
      // {
      //   path: "forget-password",
      //   element: <LazyComponent path="/forget-password" />,
      // },
      // {
      //   path: "reset-password",
      //   element: <LazyComponent path="/reset-password" />,
      // },
      // {
      //   path: "verify-otp",
      //   element: <LazyComponent path="/verify-otp" />,
      // },
    ]
  },

  // Private Routes
  {
    path: "/",
    element: (
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    ),
    errorElement: <NetworkErrorFallback />,
    children: [
      //  dashboard route
      {
        path: "/",
        element: <LazyComponent path="/" />,
      },
      {
        path: "StripeElementsOnly",
        element: <StripeWrapper path="/StripeElementsOnly" />,
      },
      {
        path: "paymentSuccess",
        element: <LazyComponent path="/paymentSuccess" />,
      },
      // {
      //   path: "watchlist",
      //   element: <LazyComponent path="/watchlist" />,
      // },
      // {
      //   path: "application",
      //   element: <LazyComponent path="/application" />,
      // },
      // {
      //   path: "recommanded",
      //   element: <LazyComponent path="/recommanded" />,
      // },
      // {
      //   path: "settings",
      //   element: <LazyComponent path="/settings" />,
      // },
      // {
      //   path: "activeOrder",
      //   element: <LazyComponent path="/activeOrder" />,
      // },
      // {
      //   path: "faqs",
      //   element: <LazyComponent path="/faqs" />,
      // },
      {
        path: "/*",
        element: <LazyComponent path="/" />,
      },
    ],
  },
]);
