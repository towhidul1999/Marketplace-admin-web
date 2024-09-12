import { Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { BiArrowFromLeft } from "react-icons/bi";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { TbEdit } from "react-icons/tb";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link, useSubmit } from "react-router-dom";
import baseUrl from "../../baseUrl";

const PersonalInfo = () => {
  const [value, setValue] = useState();
  // console.log(value);
  const [data, setData] = useState();
  // console.log(data?.image);

  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user.id);

  const personalData = async () => {
    try {
      const response = await fetch(`${baseUrl}/v1/users/${user?.id}`);
      const data = await response.json();
      if (data.code === 200) {
        setData(data.data.attributes.user);
      } else {
        console.error("Failed to fetch blogs:", data.message);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    personalData();
  }, []);

  const imageUrl = `${baseUrl}/${data?.image}`;

  return (
    <div className=" mt-8 mx-6">
      <div className="flex items-center justify-between ">
        <Link to="/dashboard/home" className="flex items-center gap-2">
          <FaCircleArrowLeft className=" text-[#00BF63] w-8 h-8" />
          <p className=" font-semibold text-[30px]">Personal Information</p>
        </Link>
        <Link
          to="/dashboard/editpersonalinfo"
          className="flex h-[35px] w-[80px] rounded-[8px] items-center justify-center text-center gap-1 bg-[#00BF63] text-white"
        >
          <TbEdit />
          <button className="  text-white">Edit</button>
        </Link>
      </div>
      <div className="lg:flex md:flex gap-4 shadow-md bg-white p-4 rounded-xl">
        <div className="lg:w-1/3 flex flex-col border border-dotted p-4 justify-center items-center gap-8">
          <img
            className="w-40 h-40 border p-2 rounded-full"
            src={`${baseUrl}${data?.image}`}
            alt="User Profile"
          />
          <div className="flex flex-col justify-center items-center text-center">
            <p className="text-lg md:text-xl">{data?.role}</p>
            <h1 className="text-2xl md:text-3xl font-medium">
              {data?.fullName}
            </h1>
          </div>
        </div>

        <div className="lg:w-2/3 mt-8 lg:mt-0 px-5">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="text-lg md:text-xl font-medium"
                >
                  Name
                </label>
                <Input
                  placeholder="First name"
                  value={data?.fullName}
                  className="p-4 text-lg md:text-xl bg-[#75ffff] text-black rounded w-full mt-3 outline-none"
                  type="text"
                  readOnly
                />
              </div>
            </div>

            <div className="flex-1">
              <label htmlFor="email" className="text-lg md:text-xl font-medium">
                Email
              </label>
              <Input
                placeholder="Email"
                value={data?.email}
                className="p-4 text-lg md:text-xl bg-[#ebf5f5] rounded w-full mt-3 outline-none focus:bg-[#69C0BE] hover:bg-[#69C0BE]"
                type="text"
                readOnly
              />
            </div>

            <div className="flex-1">
              <label htmlFor="phone" className="text-lg md:text-xl font-medium">
                Location
              </label>
              <Input
                placeholder="Phone"
                value={data?.location}
                className="p-4 text-lg md:text-xl bg-[#ebf5f5] rounded w-full mt-3 outline-none focus:bg-[#69C0BE] hover:bg-[#69C0BE]"
                type="text"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
