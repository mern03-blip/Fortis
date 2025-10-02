import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Divider, Form, Input, message, Row } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { FiLock, FiMail } from "react-icons/fi";
// Assume your Firebase config exports 'auth' and 'db'
import { auth, db } from "../../firebase/config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Make sure these image paths are correct
import { User, Mail } from "../../assets/image";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm(); // Use form hook for potential form clearing

  // The onFinish handler is called when the form is submitted successfully
  const onFinish = async (values) => {
    // console.log("Form Submitted:", values);
    setLoading(true);

    try {
      // 1. Create User with Email and Password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;

      // 2. Save Additional User Data to Firestore
      // Use the user's UID as the document ID in a 'users' collection
      await setDoc(doc(db, "users", user.uid), {
        fullName: values.fullName,
        email: values.email,
        createdAt: new Date(),
      });

      // 3. Success Feedback and Navigation
      message.success(
        `Welcome, ${values.fullName}! Account created successfully. Please log in.`
      );
      form.resetFields(); // Clear the form
      navigate("/auth"); // Navigate to your login/auth page

    } catch (error) {
      // 4. Error Handling
      let errorMessage = "An unknown error occurred during signup.";

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already in use. Please log in or use a different email.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "The email address is not valid.";
      } else if (error.code === 'auth/weak-password') {
        // This case is unlikely due to your strong Ant Design validation, but included for completeness.
        errorMessage = "Password is too weak. Please use a stronger password.";
      } else {
        // Log the full error for debugging
        console.error("Firebase Sign Up Error:", error);
      }

      message.error(errorMessage);

    } finally {
      setLoading(false);
    }
  };

  return (
    // Main container to center the form card on the page
    <div className="w-full min-h-screen flex items-center justify-center  font-custom">
      <div className="w-[80%]  p-6 my-4">
        {/* Heading Section */}
        <div className="mb-8 text-start">
          <h1 className="font-b6 text-text3 text-blackColor">Sign Up</h1>
          <p className="mt-2 font-b5 text-h3 text-blackColor">
            Enter your details to get access.
          </p>
        </div>

        {/* Ant Design Form */}
        <Form
          form={form} // Attach the form instance
          name="signup"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* Full Name Field */}
          <Form.Item
            name="fullName"
            required={false}
            label={<span className="font-b5 text-h4 text-blackColor">Full Name</span>}
            rules={[
              { required: true, message: "Please enter your full name!" },
              {
                pattern: /^[A-Za-z\s'-]{1,50}$/, // Added \s for spaces
                message:
                  "Full name must only contain letters, spaces, optional hyphens or apostrophes, and be 1–50 characters long",
              },
            ]}
          >
            <Input
              prefix={<img src={User} alt="User Icon" className="mr-2 text-mainColor" />}
              placeholder="Enter name"
              size="large"
              className="h-12 rounded-custom border-custom text-h4 placeholder-primaryTextColor focus:border-mainColor focus:ring-1 focus:ring-mainColor"
            />
          </Form.Item>

          {/* Email Field */}
          <Form.Item
            name="email"
            required={false}
            label={<span className="font-b5 text-h4 text-blackColor">Email</span>}
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email address" },
              { max: 254, message: "Email must not exceed 254 characters" },
            ]}
          >
            <Input
              prefix={<FiMail className="text-mainColor text-lg mr-2" />}
              placeholder="Enter email"
              size="large"
              className="h-12 rounded-custom border-custom text-h4 placeholder-primaryTextColor focus:border-mainColor focus:ring-1 focus:ring-mainColor"
            />
          </Form.Item>

          {/* Password Field */}
          <Form.Item
            name="password"
            required={false}
            label={<span className="font-b5 text-h4 text-blackColor">Password</span>}
            rules={[
              { required: true, message: "Please enter your password" },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{6,128}$/,
                message:
                  "Password must include uppercase, lowercase, number, special character",
              },
            ]}
          >
            <Input.Password
              prefix={<FiLock className="mr-2 size-5 text-mainColor" />}
              placeholder="**********"
              size="large"
              className="h-12 rounded-custom border-custom text-h4 placeholder-primaryTextColor focus:border-mainColor focus:ring-1 focus:ring-mainColor"
              iconRender={(visible) =>
                visible ? (
                  <EyeTwoTone twoToneColor="#28A745" style={{ color: "#28A745", fontSize: "24px" }} />
                ) : (
                  <EyeInvisibleOutlined style={{ color: "#28A745", fontSize: "24px" }} />
                )
              }
            />
          </Form.Item>

          {/* Confirm Password Field */}
          <Form.Item
            name="confirmPassword"
            required={false}
            label={<span className="font-b5 text-h4 text-blackColor">Confirm Password</span>}
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<FiLock className="mr-2 size-5 text-mainColor" />}
              placeholder="**********"
              size="large"
              className="h-12 rounded-custom border-custom text-h4 placeholder-primaryTextColor focus:border-mainColor focus:ring-1 focus:ring-mainColor"
              iconRender={(visible) =>
                visible ? (
                  <EyeTwoTone twoToneColor="#28A745" style={{ color: "#28A745", fontSize: "24px" }} />
                ) : (
                  <EyeInvisibleOutlined style={{ color: "#28A745", fontSize: "24px" }} />
                )
              }
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item className="!mt-6">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-[100%]  h-[60px] flex justify-center rounded-custom bg-mainColor text-whiteColor font-b7 text-h2  border-none"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        {/* Footer Link */}
        <p className="mt-10 text-center text-text1 text-gray-400">
          Already have an account?{" "}
          <Link to="/auth" className="text-mainColor font-b6">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;