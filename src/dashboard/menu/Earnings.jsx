import { Space, Table } from "antd";
import Column from "antd/es/table/Column";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { BsInfoCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { Input } from "antd";
const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);
import "./custom.css";
import Modal from "react-responsive-modal";
import { useState } from "react";
import { useGetEarningQuery } from "../../redux/api/apiSlice";
import baseUrl from '../../baseUrl'

 

const Earnings = () => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [earnings, setEarning] = useState()
  console.log(earnings);
  
  const {
    data: earning,
    isLoading,
    error,
  } = useGetEarningQuery({ year: 2024, page: currentPage });

  console.log("Earning Data:", earning?.data?.attributes?.results);

  const columns = [
    {
      title: "S:N",
      dataIndex: "TrxID",
      key: "si",
      render: (text,_,index) => index + 1,
    },
   
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) =>  (
         
        <div className="flex gap-2 items-center">
          <img
            className="w-[34px] h-[34px] rounded-full"
            src={baseUrl + record?.clientId?.image}
            alt=""
          />
          <p className="font-medium">{record?.clientId?.fullName}</p>
        </div>
      )
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <p>{record?.clientId?.createdAt?.split("T")[0] ? record?.clientId?.createdAt?.split("T")[0] : "N/A"}</p>
      )
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (_, record) => <p>{record?.data?.object?.amount_total / 100}</p>,
    },

    {
      title: "Category name",
      key: "service",
      dataIndex: "service",
      render: (_, record) => (
        <p>{record?.gigId?.categoriesId?.name}</p>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <BsInfoCircle
            onClick={() =>  handleViewDetails(record)}
            size={18}
            className="text-[red] cursor-pointer"
          />
        </Space>
      ),
    },
  ];
  const handleViewDetails = (value) => {
    setEarning(value);
    // console.log(value)
    onOpenModal(true);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
    console.log(page);
  };
  return (
    <div className="mt-6 mx-6">
      <div className="w-[380px] rounded h-[132px] flex items-center card bg-[#FFFFFF] shadow-xl">
        <div className="mx-6 h-16 w-16 rounded  flex justify-center items-center">
          <HiOutlineCurrencyDollar className=" text-[#00BF63] w-[65px] h-[65px]" />
        </div>
        <div className="mx-6 text-center">
          <p className="text-[18px] font-semibold text-[#494949]">
            Total Earnings
          </p>
          <h1 className="text-[44px] font-medium">
            {" "}
            ${earning?.data?.attributes?.totalEarnings}
          </h1>
        </div>
      </div>

      <div className="shadow-xl mt-8 bg-[#FFFFFF]">
        <div className="flex justify-between items-center p-4">
          <p className=" font-semibold text-[24px]">All Earning List</p>
          {/* <div className='flex justify-center gap-4 items-center'>
                        <input className='h-[36px] border' type="date" placeholder='date' name="date" id="" />
                        {/* <input className='h-[36px] border' type="search" placeholder='User name' name="" id="" /> */}

          {/* <Search
      placeholder="User name"
      allowClear className='w-52 h-9'
      enterButton="Search"
      size="large"
      onSearch={onSearch} */}
          {/* /> */}
          {/* </div> */}
        </div>

        <Table
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
            pageSize: 8,
            // total:usersAll?.pagination?.Users,
            total: earning?.data?.attributes?.totalPage,
            showSizeChanger: true,
            onChange: handleChangePage,
          }}
          columns={columns}
          dataSource={earning?.data?.attributes?.results}

          // className="custom-table"
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
          <div className="mt-[100px] h-[490px] w-[444px]">
            <h1 className="font-medium text-[16px] text-xl text-center my-4 text-white">
              Transaction Details
            </h1>
            <hr className="text-[#6B6B6B] my-4 w-full" />
            <div className="flex justify-between items-center text-white">
              <p>Join Date</p>
              <p>{earnings?.clientId?.createdAt?.split("T")[0] ? earnings?.clientId?.createdAt?.split("T")[0] : "N/A"}</p>
            </div>
            <hr className="text-[#6B6B6B] my-4" />
            <div className="flex justify-between items-center text-white">
              <p>Name</p>
              <p>{earnings?.clientId?.fullName}</p>
            </div>
            <hr className="text-[#6B6B6B] my-4" />
            <div className="flex justify-between items-center text-white">
              <p>Email</p>
              <p>{earnings?.clientId?.email}</p>
            </div>
            <hr className="text-[#6B6B6B] my-4" />
            <div className="flex justify-between items-center text-white">
              <p>Transaction Amount</p>
              <p>{earnings?.data?.object?.amount_total / 100}</p>
            </div>
        
             
            <hr className="text-[#6B6B6B] my-4" />
            <div className="flex justify-between items-center text-white">
              <p>Status</p>
              <p>{earnings?.status}</p>
            </div>
            <hr className="text-[#6B6B6B] my-4" />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Earnings;
