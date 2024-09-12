import { DatePicker, Space, Table } from "antd";
import Column from 'antd/es/table/Column';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';
import { BsInfoCircle } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { Input } from 'antd';
import { useState } from "react";
 const { Search } = Input;
import Modal from "react-responsive-modal";
 import { useGetBuyerListQuery } from "../../redux/api/apiSlice";
 import baseUrl from '../../baseUrl'
import { PropagateLoader } from "react-spinners";
 
const onSearch = (value, _e, info) => console.log(info?.source, value);

// const data = [
    
//     {
//       key: '1', 
//       sl: '1',
//       buyername: 'JohnTom',
//       email:'tom@yaho.com',
//       TrxID: '#957889',
//       phone:'+9758424',
//        date:'22/04/23',
//        amount:'$324',
//        service:'ui/ux'
//     },
//     {
//       key: '1', 
//       sl: '2',
//       buyername: 'JohnTom',
//       email:'tom@yaho.com',
//       TrxID: '#957889',
//       phone:'+9758424',
//        date:'22/04/23',
//        amount:'$324',
//        service:'developr'
//     },
//     {
//       key: '1', 
//       sl: '3',
//       buyername: 'JohnTom',
//       email:'tom@yaho.com',
//       TrxID: '#957889',
//       phone:'+9758424',
//       date:'22/04/23',
//       amount:'$324',
//       service:'ui/ux'
//     },
//     {
//       key: '1', 
//       sl: '4',
//       buyername: 'JohnTom',
//       email:'tom@yaho.com',
//       TrxID: '#957889',
//       phone:'+9758424',
//        date:'22/04/23',
//        amount:'$324',
//        service:'developr'
//     },
//     {
//       key: '1', 
//       sl: '5',
//       buyername: 'JohnTom',
//       email:'tom@yaho.com',
//       TrxID: '#957889',
//       phone:'+9758424',
//       date:'22/04/23',
//       amount:'$324',
//       service:'ui/ux'
//     },
//     {
//       key: '1', 
//       sl: '6',
//       buyername: 'JohnTom',
//       email:'tom@yaho.com',
//       TrxID: '#957889',
//       phone:'+9758424',
//       date:'22/04/23',
//       amount:'$324',
//       service:'developr'
//     },

// ] 




const BuyerList = () => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const {data:buyers, isLoading, error} = useGetBuyerListQuery()
  console.log(buyers?.data?.attributes?.results);
  const [buyer, setBuyer] = useState()
   
 
  //   buyers?.data?.attributes?.results.map(buyer => setBuyer(buyer))
 
  // console.log(buyer);
  
  const columns = [ 

    {
      title: "#SI",
      dataIndex: "si",
      key: "si",
      render: (text,_,index) =>  index + 1,
    },
      {
        title: "BuyerName",
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
        render: (_, record) => (
          <p>{record?.location}</p>
        )
      },
      
      {
        title: 'date',
        key: 'date',
        dataIndex: 'date',
        render: (_, record) => (
          <p>{record?.createdAt?.split("T")[0] ? record?.createdAt?.split("T")[0] : "N/A"}</p>
        )
  
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
           
              {/* <BsInfoCircle  onClick={() => handleView(record)}  size={18} className="text-[red] cursor-pointer" /> */}
               <button onClick={() => handleViewDetails(record)} className="bg-[#00BF63] px-2 py-1 font-medium rounded hover:bg-sky-400">Details</button>

            
          </Space>
        ),
      },
    ];

    const handleViewDetails = (value) => {
      setBuyer(value);
      // console.log(value)
      onOpenModal(true);
    };

    if (isLoading) {
      return (
        <div className="w-4/12 mx-auto mt-40">
          <PropagateLoader color="#00BF63" size={30} />
        </div>
      );
    } 
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div className='mt-8 mx-6'>
               <h1 className='text-[#333333] font-semibold text-[30px]'>Buyer List</h1>
               <div className='shadow-xl bg-[#FFFFFF]'>
                <div className ='flex justify-between items-center p-4'>
                    <p className=' font-semibold text-[24px]'>All Buyer List</p>
                     <div className='flex justify-center gap-4 items-center'>
                        {/* <input className='h-[36px] border' type="date" placeholder='date' name="date" id="" /> */}
                        {/* <input className='h-[36px] border' type="search" placeholder='User name' name="" id="" /> */}
 
                     </div>
                </div>
                <Table
          pagination={{
            position: ["bottomCenter"],
            // current: currentPage,
            //   pageSize:10,
            //   total:usersAll?.pagination?.Users,
            //   showSizeChanger: false,
            //   onChange: handleChangePage,
          }}
          columns={columns}
          // dataSource={data}
          dataSource = {buyers?.data?.attributes?.results}
        />
         
        {/* className=" w-[444px] h-[490px] bg-[#222222]" */}
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
                src={baseUrl + buyer?.image}
                alt=""
              />
            </div>
             
              <h2 className=" font-medium text-xl text-center">{buyer?.fullName}</h2>
              <h2 className=" font-medium text-center">{buyer?.about}</h2>
              <hr className="text-[#6B6B6B] my-4 w-full" />
            <div className="flex justify-between items-center">
              <p>Join Date</p>
              <p>{buyer?.createdAt?.split("T")[0] ? buyer?.createdAt?.split("T")[0] : "N/A"}</p>

            </div>
            <hr className="text-[#6B6B6B] my-4" />
            <div className="flex justify-between items-center">
              <p>location</p>
              <p>{buyer?.location}</p>
            </div>
            <hr className="text-[#6B6B6B] my-4" />
            <div className="flex justify-between items-center">
              <p>Email</p>
              <p>{buyer?.email}</p>
            </div>
            <hr className="text-[#6B6B6B] my-4" />
            <div className="flex justify-between items-center">
              <p>Language</p>
              <p>{buyer?.language}</p>
            </div>
            <hr className="text-[#6B6B6B] my-4" />
          </div>
        </Modal>
         
               </div>
        </div>
    );
};

export default  BuyerList;