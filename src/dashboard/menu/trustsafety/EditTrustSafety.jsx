import JoditEditor from 'jodit-react';
import React, { useEffect, useRef, useState } from 'react';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import {Link, useNavigate } from 'react-router-dom';
import baseUrl from '../../../baseUrl'
import { Button, Form, notification } from 'antd';
import Swal from 'sweetalert2';
import { useAddTrustSafetyMutation, useGetTrustSafetyQuery } from '../../../redux/api/apiSlice';
import { PropagateLoader } from 'react-spinners';

const EditTrustSafety = () => {


  const {data: trustsafety, isLoading, error} = useGetTrustSafetyQuery()
  console.log(trustsafety);
  const [addTrustSafety] = useAddTrustSafetyMutation()
  console.log(addTrustSafety);
 const editor = useRef(null); 
  const [content, setContent] = useState(trustsafety?.data?.attributes[0]?.content); 
  const navigate = useNavigate(); 
 
  

  const dataContent  = {
    content:content
  }
    const handleEditTrustSafety = async () => { 
         try{
          await addTrustSafety(dataContent).unwrap();
          notification.success({
            message:'Success',
            description: "Update Successfully"
          })
          navigate("/dashboard/trustsafety");
         }
         catch{
          notification.error({
            message:'Error',
            description: "Update Failed"
          })
         }
      }
      if (isLoading) {
        return (
          <div className="w-4/12 mx-auto mt-40">
            <PropagateLoader color="#00BF63" size={30} />
          </div>
        );
      } 
      if (error) return <p>Error: {error.message}</p>;
    
    return (
        <div className="mt-8 mx-6">
        <Link to ='/dashboard/trustsafety' className="flex items-center gap-2">
      <FaCircleArrowLeft className=" text-[#00BF63] w-8 h-8" />
        <p className=" font-semibold text-[30px]">Edit Trust&Safety</p>
      </Link>
      <Form
     labelCol={{ span: 22 }}
     wrapperCol={{ span: 40 }}
     layout="vertical"
     initialValues={{
       remember: true,
       
     }}
     onFinish = {handleEditTrustSafety}
      > 
      <div className="mt-6">
        <JoditEditor 
          ref={editor}
          value={content} 
          onChange={(newContent) => {
            setContent(newContent)
          }}
        />
      </div>
      <div className="text-right mt-6">
          <Form.Item>
            <Button
              htmlType="submit"
              className=" h-[55px] w-[380px] bg-[#00BF63] rounded-[8px] text-white"
            >
              Update Trust&Safety
            </Button>
          </Form.Item>
        </div>
      </Form>
       
    </div>
    );
};

export default EditTrustSafety;