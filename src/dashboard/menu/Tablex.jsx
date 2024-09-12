// import { DatePicker, Modal, Space, Table } from "antd";
// import Column from 'antd/es/table/Column';
// import { HiOutlineCurrencyDollar } from 'react-icons/hi';
// import { BsInfoCircle } from "react-icons/bs";
// import { RxCross2 } from "react-icons/rx";
// import { Input } from 'antd';
// import { TbBackground } from "react-icons/tb";
// import { Variants } from "antd/es/form/hooks/useVariants";
// import { Header } from "antd/es/layout/layout";
// const { Search } = Input;
// const onSearch = (value, _e, info) => console.log(info?.source, value);
 
// const data = [
    
//     {
//       key: '1', 
//       sl: '1',
//       frelancername: 'JohnTom',
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
//       frelancername: 'JohnTom',
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
//       frelancername: 'JohnTom',
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
//       frelancername: 'JohnTom',
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
//       frelancername: 'JohnTom',
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
//       frelancername: 'JohnTom',
//       email:'tom@yaho.com',
//       TrxID: '#957889',
//       phone:'+9758424',
//        date:'22/04/23',
//        amount:'$324',
//        service:'developr'
//     },

// ]

// const columns = [ 

//   {
//     title:"#Sl",
//     dataIndex:"sl",
//     key:"id",
//     // render: (title) => <div style={{ backgroundColor: '#f0f0f0', padding: 8 }}>{title}</div>
//   },
//     {
//       title:  "Frelancer Name" ,
//       dataIndex: "name",
//       key: "name",
//       render: (_, record) => (
//         <div className="flex gap-2 items-center">
//           <img
//             className="w-[34px] h-[34px] rounded-full"
//             src={`https://randomuser.me/api/portraits/men/28.jpg`}
//             alt=""
//           />
//           <p className="font-medium">{record.frelancername}</p>
//         </div>
//       ),
//     },
//     {
//       title:" email", 
//       dataIndex: 'email',
//       key: 'email',
//     },
     
//     {
//       title: "Phone",
//       dataIndex: "phone",
//       key: "amount",
//       render: (_, record) => (
//         <p >{record?.phone}</p>
//       )
//     },
    
//     {
//       title: 'date',
//       key: 'date',
//       dataIndex: 'date',

//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Space size="middle">
         
//             <BsInfoCircle  onClick={() => handleView(record)}  size={18} className="text-[red] cursor-pointer" />
          
          
//         </Space>
//       ),
//     },
//   ];
  
//   // const getRowClassName = (record, index) => {
//   //   if (index % 2 === 0) {
//   //     // Apply a different background color to even rows
//   //    const backgroundColor= "red";
//   //    return 'even-row';
//   //   }
//   //   // Default class for odd rows
//   //   return 'odd-row';
//   // };
    
 
  
// const  Tablex = () => {
//     return (
//         <div className='mt-8 mx-6'>
//                <h1 className='text-[#333333] font-semibold text-[30px]'>Frelancer List</h1>
//                <div className='shadow-xl bg-[#FFFFFF]'>
//                 <div className ='flex justify-between items-center p-4'>
//                     <p className=' font-semibold text-[24px]'>All Freelancer List</p>
//                     <div className='flex justify-center gap-4 items-center'>
//                         <input className='h-[36px] border' type="date" placeholder='date' name="date" id="" />
//                         {/* <input className='h-[36px] border' type="search" placeholder='User name' name="" id="" /> */}
        
//                         <Search
//       placeholder="User name"
//       allowClear className='w-52 h-9'
//       enterButton="Search"
//       size="large"
//       onSearch={onSearch}
//     />
//                      </div>
//                 </div>
//                 <Table  
           
//           pagination={{
//             position: ["bottomCenter"],

//             // current: currentPage,
//             //   pageSize:10,
//             //   total:usersAll?.pagination?.Users,
//             //   showSizeChanger: false,
//             //   onChange: handleChangePage,
//           }}
          
//           columns={columns}
//           dataSource={data}
//           //  rowClassName={getRowClassName}
//         />
//                </div>
//         </div>
//     );
// };

// export default  Tablex;