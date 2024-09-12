import { BiSolidUserPlus, BiUserCircle } from "react-icons/bi";
import { CiBag1 } from "react-icons/ci";
import { FaUsers } from "react-icons/fa6";
import { GiGymBag } from "react-icons/gi";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
 
import Piechart from "./Piechart";
import Barcharttwo from "./Barcharttwo";
import { useGetRecentUserQuery, useTotalStatusQuery } from "../redux/api/apiSlice";
import baseUrl from '../baseUrl'

const DashboardHome = () => {
  const {data: totalStatus} = useTotalStatusQuery()
 
  const {data:recentUser, isLoading} = useGetRecentUserQuery()
 
  
  
  return (
    <div className=" mx-6 mt-6 overflow-hidden">
      <h1 className="text-[#222222]  font-medium text-[30px]">Overview</h1>
      <div className="grid sm:grid-cols-3 md:grid-cols-4 grid-cols-1 gap-2 w-full">
        <div className="w-[320px] rounded h-[180px] flex justify-between items-center card bg-[#FFFFFF] shadow-xl">
          <div className="mx-6 h-16 w-16 rounded bg-[#00BF63] flex justify-center items-center">
            <HiOutlineCurrencyDollar className=" text-white w-12 h-12" />
          </div>
          <div className="mx-2 text-center">
            <p className="text-[18px] font-semibold text-[#494949] my-4">
              Total Earnings
            </p>
            <h1 className="text-[34px] font-medium">${totalStatus?.data?.attributes?.totalEarnings}</h1>
          </div>
        </div>
        <div className="w-[320px] rounded h-[180px] flex justify-between items-center card bg-[#FFFFFF] shadow-xl">
          <div className="mx-6 h-16 w-16 rounded bg-[#1BC5BD] flex justify-center items-center">
            <FaUsers className=" text-white w-12 h-12" />
          </div>
          <div className="mx-6 text-center">
            <p className="text-[18px] font-semibold text-[#494949] my-4">
              Total Frelancer
            </p>
            <h1 className="text-[34px] font-medium">{totalStatus?.data?.attributes?.totalFreelancer}</h1>
          </div>
        </div>
        <div className="w-[320px] rounded h-[180px] flex justify-between items-center card bg-[#FFFFFF] shadow-xl">
          <div className="mx-6 h-16 w-16 rounded bg-[#5EE46E] flex justify-center items-center">
          <FaUsers className=" text-white w-12 h-12" />
          </div>
          <div className="mx-6 text-center">
            <p className="text-[18px] font-semibold text-[#494949] my-4">
              Total Buyer
            </p>
            <h1 className="text-[34px] font-medium">{totalStatus?.data?.attributes?.totalBuyer}</h1>
          </div>
        </div>

        <div className="w-[320px] rounded h-[180px] flex justify-between items-center card bg-[#FFFFFF] shadow-xl">
          <div className="mx-6 h-16 w-16 rounded bg-[#5F5CF1] flex justify-center items-center">
            < CiBag1 className=" text-white w-12 h-12" />
          </div>
          <div className="mx-6 text-center">
            <p className="text-[18px] font-semibold text-[#494949] my-4">
              Total Gig
            </p>
            <h1 className="text-[34px] font-medium">{totalStatus?.data?.attributes?.totalGigs}</h1>
          </div>
        </div>
        
      </div>

       
      <div className="flex items-center gap-4 mt-6">
             <div className=' w-[70%] h-[420px] shadow-xl bg-[#FFFFFF]'>
             <Barcharttwo></Barcharttwo>
                  
             </div>
            <div className=" w-[30%] h-[440px]">
             <div className='shadow-xl bg-[#FFFFFF]'>
                 <Piechart></Piechart>  
             </div>

          <div className="flex items-center gap-4 mt-6">
          
             <div className='shadow-xl bg-[#FFFFFF] w-[450px]'>
                   <div className="px-3">
                   <h1 className="text-[20px] font-medium">Recent Users</h1>
                   <hr className="my-2" />
                 

                {
                  recentUser?.data?.attributes?.results?.slice(0,4).map(user =>   <div className="">
                <div className="flex items-center gap-2 pb-2">
                    <img className="w-8 h-8 rounded-full" src= {baseUrl + user?.image} alt="" />
                    <p className="font-normal">{user?.fullName}</p>
                   </div>
                  </div>)
                }

                   
               
                   
                   
                    </div> 
             </div>
      </div>
            </div>
      </div>


       



    </div>
  );
};

export default DashboardHome;
