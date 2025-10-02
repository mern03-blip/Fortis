import axios from 'axios';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const location = useLocation();
    // RECEIVE THE CABINET ID, KAKOU (SLOT), AND ORDER ID
    const { cabinetid, slotNum, rentOrderId } = location.state || {};

    // console.log("Cabinetid:", cabinetid);
    // console.log("SlotNum:", slotNum);
    // console.log("rentOrderId:", rentOrderId);

    const navigate = useNavigate();

    const handleEjectPowerBank = async () => {
        // Validate that we have all the required parameters
        if (!cabinetid || !slotNum || !rentOrderId) {
            console.error("Missing device information. Cannot eject power bank.");
            alert("Failed to eject: Missing device details.");
            return;
        }

        try {
            // Use the received values as parameters in the eject API
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/cabinet/eject`,
                null, // no body
                {
                    params: {
                        cabinetid: cabinetid, // The cabinet ID
                        rentOrderId: rentOrderId,   // The rentOrderId
                        slotNum: slotNum,      // The slot number
                    },
                }
            );

            console.log("Eject Power Bank Response:", response.data);
            console.log("Power bank ejected successfully! Please collect your device.");
            // alert("Power bank ejected successfully! Please collect your device.");
            // Example: navigate back to a home or status screen
            navigate('/'); 

        } catch (error) {
            console.error("Error ejecting power bank:", error);
            console.log("Failed to eject power bank. Try again!");
            alert("Ejection failed. Please try again or contact support.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 sm:p-10 text-center border border-green-100">

                <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-green-100">
                        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                </div>

                <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
                    Payment Confirmed!
                </h1>

                <p className="text-lg text-gray-600 mb-6">
                    Thank you for your purchase. Your order is being process.
                </p>

                <div className="space-y-4">
                    <button
                        onClick={handleEjectPowerBank}
                        className="w-full inline-flex items-center bg-mainColor justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2  transition duration-150 ease-in-out"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;

