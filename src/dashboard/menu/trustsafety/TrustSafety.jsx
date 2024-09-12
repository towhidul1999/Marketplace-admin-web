import React, { useEffect, useState } from 'react';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import baseUrl from '../../../baseUrl'
import { useGetTrustSafetyQuery } from '../../../redux/api/apiSlice';
import { PropagateLoader } from 'react-spinners';


const TrustSafety = () => {

  const { data: trustsafety, isLoading, error } = useGetTrustSafetyQuery()
  // console.log(trustsafety);
    const navigate = useNavigate();
 
    if (isLoading) {
      return (
        <div className="w-4/12 mx-auto mt-40">
          <PropagateLoader color="#00BF63" size={30} />
        </div>
      );
    } 
  if (error) return <p>Error: {error.message}</p>;

    return (
        <div className=" mt-8 mx-6">
        <Link to ='/dashboard/setting' className="flex items-center gap-2">
        <FaCircleArrowLeft className=" text-[#00BF63] w-8 h-8" />
          <p className=" font-semibold text-[30px]">Trust & Safety</p>
        </Link>
        <div className='mt-4'>
          <p dangerouslySetInnerHTML={{__html:trustsafety?.data?.attributes[0]?.content}}>
            
          </p>
        </div>
        <div className=" text-right mt-16"> 
      <button onClick={() => navigate("/dashboard/editsafetytrust")} className=" h-[55px] w-[480px] bg-[#00BF63] rounded-[8px] text-white">Edit</button>
      </div>
      </div>
    );
};

export default TrustSafety;