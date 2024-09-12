import { Outlet } from "react-router-dom"; 
 import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
 
 
const Layout = () => {
    return (
        <div>
             <div className="flex p-4 min-h-screen">
      <div className="fixed bg-[#00BF63] w-[200px] left-3"> 
      <Sidebar></Sidebar>
      <h1>connotr</h1>
      </div> 
      <div className="flex flex-col flex-1 overflow-hidden">
        
        <div className=" fixed ml-[300px] z-30  w-[calc(100%-300px)]">
         <Header></Header>
        </div>

        <div className="overflow-y-auto ml-8 h-full flex-1 pt-[80px] pl-[280px]">
          <Outlet />
        </div>
      </div>
       
    </div>
        </div>
    );
};

export default Layout;

 