 import { createBrowserRouter } from "react-router-dom";
 import baseUrl from '../baseUrl'
import BuyerList from "../dashboard/menu/BuyerList";
import DashboardHome from "../dashboardHome/DashboardHome";
import DashboardLayout from "../dashboard/layout/DashboardLayout"
import FrelancerList from "../dashboard/menu/FrelancerList";
import Earnings from "../dashboard/menu/Earnings";
import Category from "../dashboard/menu/Category";
import Blog from "../dashboard/menu/blogs/Blog";
import Settings from "../dashboard/menu/Settings";
import OtpVerify from "../dashboard/auth/OtpVerify";
import UpdatePassword from "../dashboard/auth/UpdatePassword";
import Forgotpassword from "../dashboard/auth/Forgotpassword";
import ErrorPage from "./ErrorPage";
import Notification from "../dashboard/menu/Notification";
import PersonalInfo from "../dashboard/menu/PersonalInfo";
import Privacy from "../dashboard/menu/privacyPolicy/Privacy";
import TermCondition from "../dashboard/menu/termcondition/TermCondition";
import Addblog from "../dashboard/menu/blogs/Addblog";
import EditBlog from "../dashboard/menu/blogs/EditBlog";
import EditPersonalInfo from "../dashboard/menu/EditPersonalInfo";
import EditPrivacyPolicy from "../dashboard/menu/privacyPolicy/EditPrivacyPolicy";
import EditTermCondition from "../dashboard/menu/termcondition/EditTermCondition";
import TrustSafety from "../dashboard/menu/trustsafety/TrustSafety";
import EditTrustSafety from "../dashboard/menu/trustsafety/EditTrustSafety";
import AdminRoute from "./AdminRoute";
import Withdraw from "../dashboard/menu/withdraw";
import DetailWithdraw from "../dashboard/menu/DetailWithdraw";
import Login from "../dashboard/auth/Login";
 
 
 
 


export const router = createBrowserRouter([

    {
       path:'/',
       element:<Login></Login>,
       errorElement: <ErrorPage></ErrorPage>,
    },
        {
            path:'/',
            element:<Login></Login>
        },
           {
               path:'forgotpassword',
               element:<Forgotpassword></Forgotpassword>               
           },
        {
            path:'otp',
            element:<OtpVerify></OtpVerify>
        },
        {
            path:'updatepassword',
            element:<UpdatePassword></UpdatePassword>
        },
        
      
    

    {
        path: 'dashboard',
        element:<AdminRoute><DashboardLayout></DashboardLayout></AdminRoute>,
        children:[
            {
                   path:'home',
                   element:<AdminRoute><DashboardHome></DashboardHome></AdminRoute>
                },
                {
                    path:'frelancer',
                    element:<FrelancerList></FrelancerList>
                },
                {
                    path:'buyerlist',
                    element:<BuyerList></BuyerList>
                },
                {
                    path:'earnings',
                    element:<Earnings></Earnings>,
                     
                },
                {
                    path:'withdraw',
                    element: <Withdraw></Withdraw>
                     
                },
                  
                {
                    path:'category',
                    element:<Category></Category>,
                    
                },

                {
                    path:'withdrawDetails/:id',
                    element:<DetailWithdraw></DetailWithdraw>
                },
                 
                {
                    path:'blog',
                    element:<Blog></Blog>
                },
                {
                    path:'addblog',
                    element:<Addblog></Addblog>
                },
                {
                    path:'editblog/:id',
                    element:<EditBlog></EditBlog>,
                    loader: ({params}) => fetch(`${baseUrl}/v1/blog/${params.id}`)
                },
                {
                    path:'setting',
                    element:<Settings></Settings>
                },
                {
                    path:'notification',
                    element:<Notification></Notification>
                },
                {
                    path:'personalinfo',
                    element:<PersonalInfo></PersonalInfo>
                },
                {
                    path:'editpersonalinfo',
                    element:<EditPersonalInfo></EditPersonalInfo>
                },
                {
                    path:'privacy',
                    element:<Privacy></Privacy>
                },
                {
                    path:'editprivacypolicy',
                    element:<EditPrivacyPolicy></EditPrivacyPolicy>
                },
                {
                    path:'terms',
                    element:<TermCondition></TermCondition>
                },
                {
                    path:'editTermconditon',
                    element:<EditTermCondition></EditTermCondition>
                },
                {
                    path:'trustsafety',
                    element:<TrustSafety></TrustSafety>
                }, 
                {
                    path:'editsafetytrust',
                    element:<EditTrustSafety></EditTrustSafety>
                },
                
                

        ]
    }
])