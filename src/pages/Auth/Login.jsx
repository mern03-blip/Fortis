import { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../firebase/config/firebase"; 
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;

    setLoading(true);

    try {
      // 1. Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 👇 FIX: Get the actual Firebase ID Token (JWT)
      const idToken = await user.getIdToken();
      // console.log("Firebase ID Token:", idToken);


      // 2. Success: Set the ID Token and navigate
      // The ID token is long, unique, signed by Google, and expires after 1 hour.
      localStorage.setItem("token", idToken);
      // localStorage.setItem("user_uid", user.uid); 

      message.success("Login successful!");
      navigate("/");

    } catch (error) {
      // 3. Enhanced Error Handling
      let errorMessage = "Login failed. Please check your email and password.";

      switch (error.code) {
        case "auth/invalid-email":
        case "auth/user-not-found":
          errorMessage = "No user found with this email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Access temporarily blocked due to too many failed attempts.";
          break;
        default:
          console.error("Firebase Login Error:", error);
          break;
      }

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const preventCopyPaste = (e) => {
    e.preventDefault();
    message.warning("Copy/Paste is disabled for security reasons.");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center font-custom">
      <div className="w-[80%]  p-6">
        {/* Heading */}
        <Title level={3} className="!m-0 !text-text3 !font-b6 text-blackColor">
          Login
        </Title>
        <p className="text-h3 text-blackColor font-b5 mt-1">
          Enter your details to get access.
        </p>

        <Form layout="vertical" onFinish={onFinish} validateTrigger="onChange" className="mt-6">
          {/* Email Field */}
          <Form.Item
            label={<span className="font-b5 text-h4 text-blackColor">Email</span>}
            name="email"
            required={false}
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email address" },
              { max: 254, message: "Email must not exceed 254 characters" },
            ]}
          >
            <Input
              size="large"
              placeholder="Enter email"
              className="w-[100%] rounded-custom border border-custom h-12"
              prefix={<FiMail className="text-mainColor text-lg mr-2" />}
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            label={<span className="font-b5 text-h4 text-blackColor">Password</span>}
            name="password"
            required={false}
            rules={[
              { required: true, message: "Please enter your password" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{6,128}$/,
                message:
                  "Password must include uppercase, lowercase, number, special character,",
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="********"
              className="w-[100%] rounded-custom border border-custom h-12"
              prefix={<FiLock className="text-mainColor text-[20px] mr-2" />}
              iconRender={(visible) =>
                visible ? (
                  <EyeTwoTone twoToneColor="#28A745" style={{ fontSize: "24px" }} />
                ) : (
                  <EyeInvisibleOutlined style={{ color: "#28A745", fontSize: "24px" }} />
                )
              }
              onCopy={preventCopyPaste}
              onPaste={preventCopyPaste}
            />
          </Form.Item>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-[100%] h-[60px] flex justify-center rounded-custom bg-mainColor text-whiteColor font-b7 text-h2 border-none"
          >
            Login
          </Button>

          {/* Signup Link */}
          <p className="mt-10 text-center text-text1 text-gray-400">
            Don’t have an account?{" "}
            <Link to="/auth/signup" className="text-mainColor font-b6">
              Signup
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
