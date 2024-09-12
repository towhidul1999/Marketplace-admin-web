import { IoIosArrowForward } from "react-icons/io";

import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import logo from "../../../public/Logos.png";

import "./setting.css";
import { MdArrowBack } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import OTPInput from "react-otp-input";
import { Button, Form, Input, notification } from "antd";
import { HiOutlineMailOpen } from "react-icons/hi";
import { IconLock } from "@tabler/icons-react";
import { useChangPasswordMutation } from "../../redux/api/apiSlice";

const Settings = () => {
  const [openMainModal, setOpenMainModal] = useState(false);
  const [error, setError] = useState("");

  const [changePss, { isLoading }] = useChangPasswordMutation();
  const navigate = useNavigate();

  const onCloseMainModal = () => setOpenMainModal(false);

  const openChangePasswordModal = () => {
    setOpenMainModal(true);
  };

  const changePassword = async (values) => {
    console.log("valuuuuuu", values);
    try {
      const res = await changePss(values).unwrap();

      if (res?.code === 200) {
        notification.success({
          message: res?.message,
        });
        navigate("/dashboard/home");
      }
    } catch (error) {
      setError(
        error?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="mt-8 mx-6 ">
      <h1 className=" font-semibold text-[30px]">Settings</h1>
      <div>
        <div
          onClick={openChangePasswordModal}
          className="mt-8 cursor-pointer flex justify-between border rounded border-[#00BF63] items-center w-full h-[75px]"
        >
          <p className="text-[18px] ml-8 font-medium text-[#00BF63]">
            Change Password
          </p>
          <p className="mr-8 bg-[#00BF63] px-2 py-1 rounded cursor-pointer">
            <IoIosArrowForward />
          </p>
        </div>

        <Modal
          classNames={{
            modal: "customModal",
          }}
          open={openMainModal}
          onClose={onCloseMainModal}
          center
        >
          <div className="mx-10 overflow-hidden">
            <div className="mt-8 text-[#FFFFFF]">
              <img className=" h-8 w-50" src={logo} alt="" />
              <div className="flex items-center gap-2 mt-6">
                <p>
                  <MdArrowBack className="h-4 w-4" />
                </p>
                <h1 className="font-medium text-2xl">Change Password</h1>
              </div>
            </div>
            <Form
              name="change_password_form"
              labelCol={{ span: 22 }}
              onFinish={changePassword} // This submits the form
              wrapperCol={{ span: 40 }}
              layout="vertical"
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="oldPassword"
                label={
                  <span className="text-[white] text-[16px] font-medium">
                    Old Password
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Please input your Old password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter old Password"
                  prefix={
                    <IconLock
                      className="mr-2 bg-white rounded-full p-[6px]"
                      size={28}
                      color="red"
                    />
                  }
                  style={{
                    borderBottom: "2px solid #4E4E4E",
                    height: "52px",
                    background: "#F6F6F6",
                    outline: "none",
                    marginBottom: "20px",
                  }}
                  bordered={false}
                />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label={
                  <span className="text-[white] text-[16px] font-medium">
                    New Password
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Please input your New password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Set new password"
                  prefix={
                    <IconLock
                      className="mr-2 bg-white rounded-full p-[6px]"
                      size={28}
                      color="red"
                    />
                  }
                  style={{
                    borderBottom: "2px solid #4E4E4E",
                    height: "52px",
                    background: "#F6F6F6",
                    outline: "none",
                    marginBottom: "20px",
                  }}
                  bordered={false}
                />
              </Form.Item>

              {error && <p className="text-red-400">{error}</p>}

              <Form.Item>
                <Button
                  htmlType="submit"
                  loading={isLoading}
                  className="block w-[350px] mx-auto h-[56px] px-2 py-4 mt-2 !text-white !bg-[#00BF63]"
                >
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>

        {/* ///***************Privacy policy*********** */}

        <div
          onClick={() => navigate("/dashboard/privacy")}
          className="mt-8 cursor-pointer flex justify-between  bg-[#F7F7F7] rounded  items-center w-full h-[75px]"
        >
          <p className="text-[18px] ml-8 font-medium ">Privacy Policy</p>
          <Link
            to="/dashboard/privacy"
            className="mr-8 bg-[#00BF63] px-2 py-1 rounded cursor-pointer"
          >
            <IoIosArrowForward />
          </Link>
        </div>
        <div
          onClick={() => navigate("/dashboard/terms")}
          className="mt-8 flex justify-between cursor-pointer  bg-[#F7F7F7] rounded items-center w-full h-[75px]"
        >
          <p className="text-[18px] ml-8 font-medium">Terms and Condition</p>
          <Link
            to="/dashboard/terms"
            className="mr-8 bg-[#00BF63] px-2 py-1 rounded cursor-pointer"
          >
            <IoIosArrowForward />
          </Link>
        </div>
        <div
          onClick={() => navigate("/dashboard/trustsafety")}
          className="mt-8 cursor-pointer flex justify-between  bg-[#F7F7F7] rounded items-center w-full h-[75px]"
        >
          <p className="text-[18px] ml-8 font-medium">Trust-Safety</p>
          <Link
            to="/dashboard/trustsafety"
            className="mr-8 bg-[#00BF63] px-2 py-1 rounded cursor-pointer"
          >
            <IoIosArrowForward />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;
