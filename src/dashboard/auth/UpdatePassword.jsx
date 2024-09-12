import { Button, Form, Input, notification } from "antd";
import logo from "../../../public/Logos.png";
import updateImage from "../../../public/Isometric (3).png";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useResetPasswordMutation } from "../../redux/api/apiSlice";
 


const UpdatePassword = () => {
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const [reset, {isLoading}] = useResetPasswordMutation()

  const handlePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const handleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  const validateConfirmPassword = (rule, value) => {
    const { newPassword } = form.getFieldsValue();
    if (value && value !== newPassword) {
      return Promise.reject('Passwords do not match!');
    }
    return Promise.resolve();
  };

  const resetPassword = async(values) => {
    // Handle form submission
    // console.log('Received values:', values.confirmPassword);
    try{
      const res = await reset({email, password: values.confirmPassword}).unwrap();
      // console.log(res);
      if(res?.code == 200){
        notification.success({
          message: `${res?.message}`
        })
      }
      navigate('/');
    }catch(error){
      notification.error({
        message:`${error?.data?.message}` || "something went wrong"
      })
    }

     
    
  };

  return (
    <div className="mt-20 h-[780px] shadow-xl w-[1296px] mx-auto bg-[#FFFFFF] rounded-[8px]">
     
      <div className="flex justify-around gap-4 px-10 mt-12 py-4">
        <div className="h-[488px] mt-[100px]">
          <img src={updateImage} alt="Update Password" />
        </div>
        <div className="mt-[150px]">
          <h1 className="text-[#222222] font-medium text-2xl">Update Password</h1>
          <Form
            form={form}
            layout="vertical"
            className="mt-5"
            onFinish={resetPassword}
          >
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[{ required: true, message: 'Please input your new password!' }]}
            >
              <Input.Password
                className="w-[494px] mb-4  bg-[#E6F9EF] h-12 rounded-[6px]"
                placeholder="New password"
                iconRender={visible => (
                  visible
                    ? <EyeOutlined onClick={handlePasswordVisibility} />
                    : <EyeInvisibleOutlined onClick={handlePasswordVisibility} />
                )}
              />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                { required: true, message: 'Please confirm your new password!' },
                { validator: validateConfirmPassword },
              ]}
            >
              <Input.Password
                className="w-[494px] mb-4 bg-[#E6F9EF] h-12 rounded-[6px]"
                placeholder="Confirm Password"
                iconRender={visible => (
                  visible
                    ? <EyeOutlined onClick={handleConfirmPasswordVisibility} />
                    : <EyeInvisibleOutlined onClick={handleConfirmPasswordVisibility} />
                )}
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
             className="w-full h-[56px] text-white !bg-[#00BF63]"
            >
              Update Password
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
