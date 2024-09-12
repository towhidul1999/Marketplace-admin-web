import { Link, useNavigate } from "react-router-dom";
import logo from "../../../public/Logos.png";
import character from "../../../public/forgotpassP/Isometric.png";
import vector from "../../../public/forgotpassP/Vector (1).png";
import { Button, Form, Input, notification } from "antd";
import { HiOutlineMailOpen } from "react-icons/hi";
import { useForgotPasswordMutation } from "../../redux/api/apiSlice";
import { useState } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [forgotpassword, { isLoading }] = useForgotPasswordMutation();

  const handleForgotPassword = async (values) => {
    // console.log("Received values:", values); // Debugging line

    try {
      const res = await forgotpassword(values).unwrap();
      // console.log(res);
      if (res?.code === 200) {
        notification.success({
          message: `${res?.message}`,
          description: "Email verification code sent successfully",
        });
        navigate(`/otp?email=${values?.email}`);
      }
    } catch (error) {
      // console.log(error);
      setError(
        error?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="shadow-xl w-[90%] md:w-[1196px] mx-auto bg-white rounded-lg">
  

      <div className="flex flex-col md:flex-row justify-around gap-4 px-6 md:px-10 py-8 md:py-4">
        {/* Image Section */}
        <div className="hidden md:block mt-4 md:mt-[200px] w-full md:w-[490px] h-[300px] md:h-[460px] mx-auto md:mx-0">
          <img
            src={character}
            alt="Forgot Password"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-[494px] md:mt-[250px] mx-auto md:mx-0">
          <img src={logo} alt="Logo" />
          <div className="mt-5 flex items-center gap-4">
            <img src={vector} alt="Vector Icon" />
            <h1 className="text-[#222222] font-medium text-xl md:text-2xl">
              Forgot Password!
            </h1>
          </div>
          <p className="font-poppins text-[14px] md:text-[16px] font-normal mt-2">
            Enter the email address associated with your account. We'll send
            you an OTP to your email.
          </p>

          <Form
            name="forgot_password"
            layout="vertical"
            onFinish={handleForgotPassword}
            className="mt-5"
          >
            <Form.Item
              name="email"
              label={<span className="text-[16px] mt-5 font-medium">Email</span>}
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter Your Email"
                name="email"
                prefix={
                  <HiOutlineMailOpen
                    className="mr-2 bg-white text-black rounded-full p-[6px]"
                    size={28}
                    color="red"
                  />
                }
                style={{
                  height: "52px",
                  background: "#E6F9EF",
                  outline: "none",
                  marginBottom: "20px",
                  border: "1px solid green",
                }}
              />
            </Form.Item>
            <p className="text-red-500">{error}</p>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-[56px] !text-white !bg-[#00BF63]"
              >
                Send OTP
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
