import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure VITE_STRIPE_PUBLISHABLE_KEY is correctly set in your environment
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ✅ Inner component that uses Stripe hooks
// UPDATED PROPS: Now receives cabinetId, kakou, and orderId
const CheckoutForm = ({ clientSecret, amount, cabinetid, slotNum, rentOrderId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    // console.log("cabinetid in CheckoutForm:", cabinetid);
    // console.log("rentOrderId in CheckoutForm:", rentOrderId);
    // console.log("slotNum in CheckoutForm:", slotNum);

    const [paymentStatus, setPaymentStatus] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setSubmitting(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: window.location.href },
            redirect: "if_required",
        });

        console.log(paymentIntent, "Payment");


        if (error) {
            console.error("Payment Error:", error.message);
            setPaymentStatus("error");
        } else if (paymentIntent?.status === "succeeded") {
            setPaymentStatus("success");

            // UPDATED NAVIGATION: Pass the required details to PaymentSuccess
            navigate("/paymentSuccess", {
                state: {
                    cabinetid: cabinetid,
                    rentOrderId: rentOrderId,
                    slotNum: slotNum,
                }
            });
        }

        setSubmitting(false);
    };

    useEffect(() => {
        if (paymentStatus === "success") {
            console.log("Payment succeeded! Redirecting...");
        }
    }, [paymentStatus]);

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-4 bg-gray-100 rounded-md mb-4">
                <PaymentElement options={{ layout: "tabs" }} />
            </div>
            <button
                type="submit"
                disabled={!stripe || submitting}
                className="w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-md disabled:opacity-50"
            >
                {submitting ? "Processing…" : "Pay Now"}
            </button>

            {/* Messages */}
            {paymentStatus === "success" && (
                <div className="mt-6 text-center text-green-600">
                    <h3 className="text-lg font-semibold">Payment Successful!</h3>
                    <p>Redirecting to power bank release screen...</p>
                </div>
            )}
            {paymentStatus === "error" && (
                <div className="mt-6 text-center text-red-600">
                    <h3 className="text-lg font-semibold">Payment Failed</h3>
                    <p>There was an issue processing your payment. Please try again.</p>
                </div>
            )}
        </form>
    );
};

// ✅ Outer wrapper
const StripeElementsOnly = () => {
    const location = useLocation();

    // UPDATED DESTRUCTURING: Receive the new parameters from Stripe component
    const {
        response: clientSecret,
        amount,
        cabinetid, // <--- New
        slotNum,   // <--- New
        rentOrderId // <--- New
    } = location.state || {};

    // Basic check for required payment info
    if (!clientSecret || !cabinetid || !rentOrderId || !slotNum) {
        return <div>Error: Missing payment or device details.</div>;
    }

    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">
                Confirm your payment of €{amount}
            </h2>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
                {/* PASS THE NEW PARAMETERS TO THE CHECKOUT FORM */}
                <CheckoutForm
                    clientSecret={clientSecret}
                    amount={amount}
                    cabinetid={cabinetid} // <--- Passed down
                    slotNum={slotNum}     // <--- Passed down
                    rentOrderId={rentOrderId} // <--- Passed down
                />
            </Elements>
        </div>
    );
};

export default StripeElementsOnly;