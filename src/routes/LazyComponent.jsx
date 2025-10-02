import { Suspense, lazy } from "react";
import Loading from "../components/loading/Loading";

const componentMap = {
  // login
  "/login": lazy(() => import("../pages/Auth/Login")),
  "/signup": lazy(() => import("../pages/Auth/SignUp")),
  // "/forget-password": lazy(() => import("../pages/Auth/ForgetPassword")),
  // "/reset-password": lazy(() => import("../pages/Auth/ResetPassword")),
  // "/verify-otp": lazy(() => import("../pages/Auth/OtpScreen")),

  // dashboard
  "/": lazy(() => import("../pages/stripe/Stripe")),
  "/paymentSuccess": lazy(() => import("../pages/stripe/PaymentSuccess")),
  "/StripeElementsOnly": lazy(() => import("../stripewrapper/StripeWrapper")),
  // "/editUserDetail/:id": lazy(() =>import("../pages/dashboard/editUserDetail")),

  // // associate stack
  // "/associate": lazy(() => import("../pages/associate/AssociateStack")),
  // "/associateDetail/:id": lazy(() =>
  //   import("../pages/associate/associateDetail")
  // ),
  // "/editProfileAssociate/:id": lazy(() =>
  //   import("../pages/associate/editProfileAssociate")
  // ),

};

const LazyComponent = ({ path }) => {
  const Component = componentMap[path];
  if (!Component) {
    return <div>Component not found</div>;
  }
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
};

export default LazyComponent;
