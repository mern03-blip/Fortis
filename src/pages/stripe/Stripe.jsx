import React, { useEffect, useState } from 'react';
import { Button, Typography, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title, Text, Link } = Typography;

const Stripe = () => {
    const navigate = useNavigate();
    const [minutes, setMinutes] = useState(60); // default 60 minutes
    const [amount, setAmount] = useState(1); // default €1

    // NEW STATE to store the best device details
    const [bestDeviceDetails, setBestDeviceDetails] = useState({
        cabinetid: "",
        rentOrderId: "",
        slotNum: 0,
    });

    // NEW STATE to store shop details
    const [shopDetails, setShopDetails] = useState({
        name: "Loading Shop...",
        address: "Loading Address...",
    });

    const queryParams = new URLSearchParams(location.search);
    // const deviceId = queryParams.get("deviceId");
    const deviceId = "1739494993"; // Hardcoded device ID for fetching info


    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/auth")
    };


    const fetchDeviceInfo = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/deviceInfo?deviceId=${deviceId}`
            );
            console.log("Device Info Response:", response.data);

            // Extract Shop Details first
            const shopAddressData = response.data.shopAddress;
            if (shopAddressData) {
                setShopDetails({
                    name: shopAddressData.cdbShopPName || "Shop Name Not Available",
                    address: shopAddressData.cdbShopPAddress || "Shop Address Not Available",
                });
            }

            // Extract Device List
            const devices = response.data.batteryList?.data;

            if (devices && devices.length > 0) {
                // Find the device with the highest pcheckResult
                const bestDevice = devices.reduce((best, current) => {
                    // Radix must be 10 for both conversions
                    const currentCheckResult = parseInt(current.pcheckResult, 10) || 0;
                    const bestCheckResult = parseInt(best.pcheckResult, 10) || 0;

                    return currentCheckResult > bestCheckResult ? current : best;
                }, devices[0]); // Start comparison with the first device

                // Store the selected device's information
                setBestDeviceDetails({
                    cabinetid: bestDevice.pcabinetid,
                    rentOrderId: bestDevice.porderid,
                    slotNum: bestDevice.pkakou,
                });

                //Console log for verification
                // console.log("Best Device Selected:", {
                //     cabinetid: bestDevice.pcabinetid,
                //     rentOrderId: bestDevice.porderid,
                //     slotNum: bestDevice.pkakou,
                // });

            } else {
                console.log("No device data found.");
            }

        } catch (error) {
            console.error("Error fetching device info:", error);
            setShopDetails({ name: "Error Loading", address: "Please refresh" }); // Handle error case for shop info
        }
    };

    useEffect(() => {
        if (deviceId) fetchDeviceInfo();

    }, [deviceId]);


    const handleMinutesChange = (value) => {
        setMinutes(value);
        // 1 euro = 60 minutes
        const calculatedAmount = (value / 60).toFixed(2);
        setAmount(calculatedAmount);
    };

    const handlePayment = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/createPayment`,
                {
                    amount: Math.round(amount * 100), // Stripe takes amount in cents
                    currency: "eur",
                }
            );

            console.log("Payment API Response:", response.data);

            navigate("/StripeElementsOnly", {
                state: {
                    response: response.data.clientSecret,
                    amount: amount,
                    // PASS THE BEST DEVICE DETAILS TO THE NEXT COMPONENT
                    cabinetid: bestDeviceDetails.cabinetid,
                    slotNum: bestDeviceDetails.slotNum,
                    rentOrderId: bestDeviceDetails.rentOrderId,
                }
            });
        } catch (error) {
            console.error("Payment API Error:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-between p-4 bg-white">
            {/* Header */}
            <header className="w-full flex justify-between items-center py-4">
                <div className="flex items-center space-x-2">
                    <span className="text-xl sm:text-2xl font-b5 text-mainColor">FORTIS</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        className='bg-mainColor text-whiteColor font-b5 text-sm md:text-base px-auto h-[40px] w-[auto]'
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center flex-grow text-center px-4">
                <div className="max-w-xs md:max-w-sm lg:w-md">
                    <img src="https://app.chargenow.top/static/img/img_welecome.bbe3bee0.png" alt="Power Bank" className="w-full h-auto object-contain" />
                </div>
                <Title level={2} className="text-2xl md:text-3xl text-gray-800 mt-8 mb-6">Release your power bank</Title>

                {/* Displaying Shop Name */}
                <div className='text-xl md:text-2xl text-gray-800 font-semibold'>
                    {shopDetails.name}
                </div>
                {/* Displaying Shop Address */}
                <div className='text-sm md:text-base text-gray-600 mt-1'>
                    {shopDetails.address}
                </div>

                {/* Input for minutes */}
                <div className="flex flex-col items-center space-y-2 my-4">
                    <Text className="text-base md:text-lg text-gray-700">Select minutes</Text>
                    <InputNumber
                        min={60}
                        step={30}
                        value={minutes}
                        onChange={handleMinutesChange}
                        className="w-40"
                    />
                    <Text className="text-base text-gray-800 font-semibold">
                        Amount: €{amount}
                    </Text>
                </div>
            </main>

            <footer className="w-full flex flex-col items-center pb-4">
                <Button
                    type="primary"
                    size="large"
                    className="w-full h-[80px] py-3 px-6 rounded-lg font-semibold text-lg md:text-xl shadow-lg"
                    onClick={handlePayment}
                    style={{ backgroundColor: '#28A745', borderColor: '#28A745', height: 'auto' }}
                >
                    CONFIRM PAYMENT
                </Button>

                <Text className="text-xs md:text-sm text-gray-500 mt-4 text-center px-4">
                    By continuing, you agree to our{' '}
                    <Link href="#" className="text-blue-500 hover:text-blue-700">Privacy Policy</Link> and{' '}
                    <Link href="#" className="text-blue-500 hover:text-blue-700">Terms and Conditions</Link>.
                </Text>
            </footer>
        </div>
    );
};

export default Stripe;