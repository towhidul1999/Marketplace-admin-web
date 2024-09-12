import otpImage from '../../../public/otpImage/Isometric (2).png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import OTPInput from 'react-otp-input';
import { useEmailVerifyMutation } from '../../redux/api/apiSlice';
import { notification } from 'antd';

const OtpVerify = ( ) => {
  const location = useLocation();
  const [error, setError] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
    const [otp, setOtp] = useState('');
     const navigate = useNavigate()

     const [verifyEmail, {isLoading}] = useEmailVerifyMutation()

    const sendOtp = async () => {
     
        try{
          const res = await verifyEmail({otp, email}).unwrap();
        //   console.log(res); 
          if(res?.code == 200){
            notification.success({
              message: `${res?.message}`,

            })
            navigate(`/updatepassword?email=${email}`)
          }

          
        }catch(error){
          setError(
            error?.data?.message || "Something went wrong. Please try again."
          );
          
        }

       
    }
 
    

    return (
        <div className='w-full max-w-[1296px] shadow-xl mt-12 sm:mt-24 mx-auto rounded-[8px] p-4 sm:p-10'>
          
            <div className="flex flex-col sm:flex-row md:justify-around justify-between items-center gap-4 sm:gap-10">
                <div className='w-full sm:w-[480px] flex justify-center sm:justify-start'>
                    <img src={otpImage} alt="OTP Illustration" className='w-[200px] sm:w-[480px] h-auto' />
                </div>
                <div className='w-full sm:w-[494px] mt-4 sm:mt-0'>
                    <h1 className='text-[#222222] font-medium text-2xl sm:text-3xl'>Verify OTP</h1>
                    <p className='font-poppins text-[14px] sm:text-[16px] font-normal mt-2'>
                        We'll send a verification code to your email. Check your inbox and enter the code here.
                    </p>
                    <div className="py-4 sm:py-6">
                        <div className="flex justify-center sm:justify-start items-center gap-2 outline-none focus:border-blue-400 w-full">
                        <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                inputStyle={{
                                    height: "55px",
                                    width: "55px", // Default width for mobile
                                    background: "transparent",
                                    border: "1px solid green",

                                    borderRadius: '10px',
                                    marginRight: "8px",
                                    outline: "none",
                                    // Adjusting width for larger screens
                                    sm: {
                                        width: "80px" // Width for larger screens
                                    }
                                }}
                                renderSeparator={<span className="md:w-6"> </span>}
                                renderInput={(props) => <input {...props} className="sm:w-[60px]" />}
                            />
                        </div> 
                    </div>
                        <p className="text-red-500">{error}</p>
                     
                        <button onClick={sendOtp} className="p-[12px] sm:p-[16px] rounded-[8px] mt-5 text-white bg-[#00BF63] w-full transition duration-300">
                            Verify
                        </button>
                    
                </div>
            </div>
        </div>
    );
};

export default OtpVerify;
