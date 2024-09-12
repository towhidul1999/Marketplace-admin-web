 
import { useNavigate } from "react-router-dom";
import { Badge} from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { useGetNotificationQuery } from "../../redux/api/apiSlice";
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '##E6F9EF',
       
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);
// import SearchBox from "../SearchBox/SearchBox";

const Header = () => {
  const {data: notification} = useGetNotificationQuery()
  // console.log(notification?.data?.attributes?.results?.length);
  
  const navigate = useNavigate();
  return (
    <div className=" flex justify-end shadow-xl mb-[24px] p-[16px] bg-[#00BF63]">
     

      <div className="flex gap-5">
        {/* <Dropdown overlay={menu} placement="bottomRight" arrow> */}
        <div
          onClick={(e) => navigate("/dashboard/notification")}
          className="relative flex items-center "
        >
          <Badge style={{ backgroundColor: "red ", marginTop: "10px", marginRight: '5px' }} count={notification?.data?.attributes?.results?.length}>
            <IoIosNotificationsOutline
              style={{ cursor: "pointer" }}
              className={` bg-primary w-[52px] h-[52px] text-[#Ffffffff] border-2 border-[#Fff] rounded-full p-2 `}
            />
          </Badge>
        </div>
        {/* </Dropdown> */}
        <div
          onClick={() => navigate("/dashboard/personalinfo")}
          className="flex items-center cursor-pointer mr-[30px] bg-primary text-white rounded-full p-1"
        >
          <FaRegUser className="text-[#Ffff] border-2 border-[#Fffff] rounded-full p-2 w-[52px] h-[52px]" />
        </div>
      </div>
    </div>
  );
};

export default Header;
