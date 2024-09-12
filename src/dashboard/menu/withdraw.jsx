
import { Space, Table } from "antd"; 
import { Link } from "react-router-dom";
import { useGetWithdrawUserQuery } from "../../redux/api/apiSlice";
import baseUrl from '../../baseUrl'
import { useState } from "react";
import { PropagateLoader } from "react-spinners";
 
 


 const Withdraw = () => { 

const {data:withdraws, isLoading, error} = useGetWithdrawUserQuery()
const [ currentPage, setCurrentPage] = useState(1)
 
// console.log(withdraws?.data?.attributes?.results);

const columns = [ 

  {
    title:'AccountNumber',
    dataIndex:"accountNumber",
    key:"id",
   
  },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <img
            className="w-[34px] h-[34px] rounded-full"
            src={baseUrl+ record?.userId?.image}
            alt=""
          />
          <p className="font-medium">{record.userId?.fullName}</p>
        </div>
      ),
    },
    {
      title: 'AccountType',
      dataIndex: 'accountType',
      key: 'account',
    },
     
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <p style={{ 
          color: record?.status === 'Failed' ? 'red' : record?.status === 'Pending' ? 'orange' : record?.status === 'Completed' ? 'green' : 'black',fontWeight: 500, }}>
          {record?.status}
        </p>
      ),
    },
    
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'createdAt',
      render: (_, record) => (
        <p>{record?.createdAt?.split("T")[0] ? record?.createdAt?.split("T")[0] : "N/A"}</p>

      )

    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        
            <Link to = {`/dashboard/withdrawDetails/${record?._id}`}> 
            <button className="px-2 py-1 bg-green-500 font-medium rounded">View Details</button>
            </Link> 
        
      ),
    },
  ];
  const handleChangePage = (page) => {
    setCurrentPage(page);
    console.log(page);
  };

  if (isLoading) {
    return (
      <div className="w-4/12 mx-auto mt-40">
        <PropagateLoader color="#00BF63" size={30} />
      </div>
    );
  } 
    return (
        <div className='mt-6 mx-6'> 
          
        <div className='shadow-xl mt-8 bg-[#FFFFFF]'>
                <div className ='flex justify-between items-center p-4'>
                    <p className=' font-semibold text-[24px]'>All withdraw List</p>
                     <div className='flex justify-center gap-4 items-center'>
                         {/* <input className='h-[36px] border' type="search" placeholder='User name' name="" id="" /> */}
         
                     </div>
                </div>
      
   <Table
          pagination={{
            position: ["bottomCenter"],
            current: currentPage,
              pageSize:8,
              // total:usersAll?.pagination?.Users,
            total:withdraws?.data?.attributes?.totalPage,
              showSizeChanger: true,
              onChange: handleChangePage,
              
          }}
          columns={columns}
          dataSource={withdraws?.data?.attributes?.results}
          // dataSource={data}
           
          // className="custom-table"
        /> 
               </div>
        </div>
    );
};

export default Withdraw;




 