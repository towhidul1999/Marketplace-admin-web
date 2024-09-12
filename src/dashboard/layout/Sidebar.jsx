import { NavLink, useNavigate, } from "react-router-dom";
import logo from '../../../public/signinP/Logo.png'
import { FaUsersLine } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import { HiLogout, } from "react-icons/hi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { TbLogs } from "react-icons/tb";
import { CiSettings } from "react-icons/ci";
import Swal from "sweetalert2";
import { PiHandWithdraw } from "react-icons/pi";
 
import toast from "react-hot-toast";

const Sidebar = () => {

  const navigate = useNavigate(); 
  
  const handleLogOut = () => {
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to logout from heare!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,I want!"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
       
          Swal.fire({
            title: "LogOut!",
            text: "User has been logout success.",
            icon: "success",
            timer: 2000
          }); 
          navigate('/')
      }
    });
  };

 


  return (
    <div className="w-[300px] flex flex-col justify-between bg-[#00BF63] h-[400px] min-h-screen rounded-l-md">
      <div className="">
        <div className="p-[32px]">
          <img onClick={() => navigate('/dashboard/home')} className="cursor-pointer" src={logo} alt="" />
          <hr className="w-full mt-4 text-[#54D496] mr-12" />
        </div>
        <div className="ml-5">
          <ul>
            <li>
              <NavLink
                to="/dashboard/home"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "flex text-[#3BA6F6]  cursor-pointer items-center text-[18px] font-medium p-[10px] bg-[white] m-[6px] rounded-lg "
                    : isActive
                      ? "flex text-[#00BF63]  cursor-pointer items-center text-[18px] font-medium p-[10px] bg-[#FFFFFF]  m-[6px] rounded-lg"
                      : "flex text-[white]  cursor-pointer items-center text-[18px] font-medium p-[10px] m-[6px] rounded-lg"
                }
              >
                <div className="flex justify-start items-center gap-2">
                  <BiSolidDashboard width={10} height={10} /> Dashboard
                </div>
              </NavLink>
            </li>
            <NavLink
              to="/dashboard/frelancer"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-[#3BA6F6]  cursor-pointer items-center text-[18px] font-medium p-[10px] bg-[white] m-[6px] rounded-lg "
                  : isActive
                    ? "flex text-[#00BF63] cursor-pointer items-center text-[18px] font-medium p-[10px] bg-[#FFFFFF]  m-[6px] rounded-lg"
                    : "flex text-[white]  cursor-pointer items-center text-[18px] font-medium p-[10px] m-[6px] rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
                < FaUsersLine width={25} height={25} /> Freelancer List
              </div>
            </NavLink>

            <NavLink
              to="/dashboard/buyerlist"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-[#3BA6F6] p-[10px] m-[6px] cursor-pointer items-center font-medium  bg-[white] rounded-lg "
                  : isActive
                    ? "flex text-[#00BF63] p-[10px] m-[6px] cursor-pointer items-center font-medium  bg-[#FFFFFF]  rounded-lg"
                    : "flex text-[white] p-[10px] m-[6px] cursor-pointer items-center font-medium   rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
                 <FaUsersLine width={25} height={25} /> Buyer List
              </div>
            </NavLink>

            <NavLink
              to="/dashboard/earnings"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-[#3BA6F6]   cursor-pointer items-center text-[18px] font-medium p-[10px] m-[6px] bg-[white]  rounded-lg "
                  : isActive
                    ? "flex text-[#00BF63]   cursor-pointer items-center text-[18px] font-medium p-[10px] m-[6px] bg-[#FFFFFF]   rounded-lg"
                    : "flex text-[white]  cursor-pointer items-center text-[18px] font-medium p-[10px] m-[6px]  rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
                < AiOutlineSafetyCertificate width={25} height={25} /> Earnings
              </div>
            </NavLink>

            <NavLink
              to="/dashboard/withdraw"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-[#3BA6F6]   cursor-pointer items-center text-[18px] font-medium p-[10px] m-[6px] bg-[white]  rounded-lg "
                  : isActive
                    ? "flex text-[#00BF63]   cursor-pointer items-center text-[18px] font-medium p-[10px] m-[6px] bg-[#FFFFFF]   rounded-lg"
                    : "flex text-[white]  cursor-pointer items-center text-[18px] font-medium p-[10px] m-[6px]  rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
              <PiHandWithdraw height={25} width={25} /> Withdraw
              </div>
            </NavLink>



            <NavLink
              to="/dashboard/category"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-[#3BA6F6] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium  bg-[white]  rounded-lg "
                  : isActive
                    ? "flex text-[#00BF63] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium  bg-[#FFFFFF]   rounded-lg"
                    : "flex text-[white] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium   rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
                < MdCategory width={25} height={25} /> Category
              </div>
            </NavLink>

            <NavLink
              to="/dashboard/blog"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-[#3BA6F6] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium  bg-[white]  rounded-lg "
                  : isActive
                    ? "flex text-[#00BF63] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium  bg-[#FFFFFF]   rounded-lg"
                    : "flex text-[white] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium   rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
                <TbLogs width={25} height={25} /> Blogs
              </div>
            </NavLink>

            <NavLink
              to="/dashboard/setting"
              className={({ isActive, isPending }) =>
                isPending
                  ? "flex text-[#3BA6F6] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium  bg-[white]  rounded-lg "
                  : isActive
                    ? "flex text-[#00BF63] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium  bg-[#FFFFFF]   rounded-lg"
                    : "flex text-[white] p-[10px] m-[6px] cursor-pointer items-center text-[18px] font-medium   rounded-lg"
              }
            >
              <div className="flex justify-start items-center gap-2">
                < CiSettings width={25} height={25} /> Settings
              </div>
            </NavLink>
          </ul>
        </div> 
      <div className="mb-[40px] mt-6">
        <div onClick={handleLogOut}
          className="flex items-center ml-[18px] cursor-pointer gap-2 text-[#FFFFFF] font-medium"
        >
          <HiLogout width={25} height={25} />
          <span className="text-[20px] ">Log Out</span>
        </div>

      </div>
      </div>
    </div>
  );
};

export default Sidebar;