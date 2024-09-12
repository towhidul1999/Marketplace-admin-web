import { Button, Form, Input, message } from "antd";
import logo from "../../../public/Logos.png";
import signin from "../../../public/signinP/signinP.png";
import { MdOutlineLock, MdOutlineMailOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
 
import { HiOutlineMailOpen } from "react-icons/hi";
import { IconLock } from "@tabler/icons-react";
import axios from "axios";
import Swal from "sweetalert2";
import baseUrl from '../../baseUrl'

const Login = () => {
   const navigate = useNavigate()
  const onFinish = async (values) => {
    // console.log(values);
    try {
     

      const response = await fetch(`${baseUrl}/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values), // Assuming values contain username and password
      });
     
 

      const data = await response.json();
      // console.log(data);
      // console.log(data.code)
      const token = data.data.attributes.tokens.access.token;
      // console.log(token)
      
      if(data?.code == 200){
        localStorage.setItem('token', token);
        localStorage.setItem('user',  JSON.stringify(data.data.attributes?.user));

        Swal.fire({
          position: "top-center",
          icon: "success",
          title:data?.message,
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/dashboard/home");

      } 
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed...",
        text: error?.response?.data?.message,
        footer: 'Please Enter valid email password',
      });
    }
  };

  return (
    <div className="mt-12 h-[680px] shadow-xl w-[1096px] mx-auto bg-[#FFFFFF] rounded-[8px]">
   
      <div className="md:flex justify-around gap-6 px-10 mt-12 py-4">
        <div className="h-[488px] mt-[100px]">
          <img src={signin} alt="" />
        </div>
        <div className="mt-[20px]">
          <img className="" src={logo} alt="" />
          <h1 className=" mt-7 text-[#222222] font-medium text-2xl">
            Hello,Welcome!
          </h1>
          <p className=" font-poppins w-full text-[16px] font-normal mt-2">
            Please Enter Your Details Below to Continue
          </p>
          <Form
            name="normal_login"
            // className="login-form"
            labelCol={{ span: 22 }}
            wrapperCol={{ span: 40 }}
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
    
          >
            <Form.Item
              name="email"
              label={
                <span className="text-[16px] font-medium">
                  Email
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter Your Email"
                // autoComplete="of"
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
                }}
                required
                bordered={false}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <span className="  text-[16px] font-medium">
                  Password
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                size="large"
                // onChange={handleChange}
                placeholder="Enter Your Password"
                name="current_password"
                prefix={
                  <IconLock
                    className="mr-2 bg-white rounded-full p-[6px]"
                    size={28}
                    color="red"
                  />
                }
                style={{
                  background: "#E6F9EF",
                  height: "52px",
                  outline: "none",
                  marginBottom: "20px",
                }}
                bordered={false}
              />
            </Form.Item>
            <div className="mb-4 text-right">
              <Link className=" text-[#00BF63] text-[14px] font-medium" to = "/forgotpassword"> 
                Forgot password? 
              </Link>
              
            </div>

            <Form.Item>
              <Button
                // type="primary"
                htmlType="submit"
                className="block w-[500px] h-[56px] px-2 py-4 mt-2 !text-white !bg-[#00BF63]"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
          
         
        </div>
      </div>
    </div>
   
  );
};


export default Login;

 

 