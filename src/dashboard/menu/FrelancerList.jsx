import { DatePicker, Space, Table } from "antd";
import Column from "antd/es/table/Column";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { BsInfoCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { Input } from "antd";
import { TbBackground } from "react-icons/tb";
// import { Variants } from "antd/es/form/hooks/useVariants";
import { Header } from "antd/es/layout/layout";
import { useState } from "react";
import Modal from "react-responsive-modal";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useGetFrelancerListQuery } from "../../redux/api/apiSlice";
const { Search } = Input;
import baseUrl from '../../baseUrl'
import { PropagateLoader } from "react-spinners";

const onSearch = (value, _e, info) => console.log(info?.source, value);
 
const FrelancerList = (id) => {
  const {data:frelancers, isLoading, error} = useGetFrelancerListQuery()
  // const {data: user} = useGetUserByIdQuery(id)
  console.log(frelancers?.data?.attributes?.results);
  const [frelancer, setFrelancer] = useState()
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  // console.log(frelancers);
  const [currentPage, setCurrentPage] = useState(1)
  
   
  const handleChangePage = (page) =>{
    setCurrentPage(page)
  }


const columns = [ 

  {
    title: "#SI",
    dataIndex: "si",
    key: "si",
    render: (text,_,index) =>  index + 1,
  },
    {
      title:  "FrenancerName",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <img
            className="w-[34px] h-[34px] rounded-full"
            src={baseUrl + record?.image}
            alt=""
          />
          <p className="font-medium">{record?.fullName}</p>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
     
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      // render: (_, record) => (
      //   <p>{record?.phone}</p>
      // )
    },
    
    {
      title: 'ratings',
      key: 'ratings',
      dataIndex: 'ratings',
      render: (_, record) => (
        <p>{record?.review?.rating}</p>
      )

    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
         
            {/* <BsInfoCircle  onClick={() => handleView(record)}  size={18} className="text-[red] cursor-pointer" /> */}
            {/* <BsInfoCircle  size={18} onClick={() => handleView(record)} className="text-[red] cursor-pointer" /> */}
            <button onClick={() => handleView(record)} className="bg-[#00BF63] px-2 py-1 font-medium rounded hover:bg-sky-400">Details</button>
          
          
        </Space>
      ),
    },
  ];

  const handleView = (value) => {
    setFrelancer(value);
    console.log(value)
    onOpenModal(true);
  };
  if (isLoading) {
    return (
      <div className="w-4/12 mx-auto mt-40">
        <PropagateLoader color="#00BF63" size={30} />
      </div>
    );
  } 

  if (error) {
    <h1>Not data........{error}</h1>
  }
  return (
    <div className="mt-8 mx-6">
      <h1 className="text-[#333333] font-semibold text-[30px]">
        Frelancer List
      </h1>
      <div className="shadow-xl bg-[#FFFFFF]">
        <div className="flex justify-between items-center p-4">
          <p className=" font-semibold text-[24px]">All Freelancer List</p>
          <div className="flex justify-center gap-4 items-center">
            <input
              className="h-[36px] border"
              type="date"
              placeholder="date"
              name="date"
              id=""
            />
            {/* <input className='h-[36px] border' type="search" placeholder='User name' name="" id="" /> */}
 
          </div>
        </div>

        <Table
          pagination={{
            position: ["bottomCenter"],

            current: currentPage,
              pageSize:8,
              total:frelancer?.data?.attributes?.totalPage,
              showSizeChanger: true,
              onChange: handleChangePage,
          }}
          columns={columns}
          dataSource={frelancers?.data?.attributes?.results}
        
          //  rowClassName={getRowClassName}
        />
        <Modal
          //  className={`modal:customModal h-[600px]`}

          classNames={{
            modal: "customModal",
          
          }}
          open={open}
          onClose={onCloseModal}
          center
        >
          <div className="mt-[60px] text-[#FFFFFF] h-[590px] w-[444px]">
            <div className="w-[140px] mx-auto">
              <img
                className=" h-[140px] w-[140px] rounded-full"
                src={baseUrl + frelancer?.image}
                alt=""
              />
            </div>
             
              <h2 className=" font-medium text-xl text-center">{frelancer?.fullName}</h2>
              <h2 className=" font-medium text-center">{frelancer?.about}</h2>
              <hr className="text-[#6B6B6B] my-4 w-full" />
            <div className="flex justify-between items-center">
              <p>Join Date</p>
              <p>{frelancer?.createdAt?.split("T")[0] ? frelancer?.createdAt?.split("T")[0] : "N/A"}</p>

            </div>
            <hr className="text-[#6B6B6B] my-4" />
            <div className="flex justify-between items-center">
              <p>Intro</p>
              <p>{frelancer?.intro}</p>
            </div>
            <hr className="text-[#6B6B6B] my-4" />
            <div className="flex justify-between items-center">
              <p>Email</p>
              <p>{frelancer?.email}</p>
            </div>
            <hr className="text-[#6B6B6B] my-4" />
            <div className="flex justify-between items-center">
              <p>Language</p>
              <p>{frelancer?.language}</p>
            </div>
            <hr className="text-[#6B6B6B] my-4" />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default FrelancerList;
