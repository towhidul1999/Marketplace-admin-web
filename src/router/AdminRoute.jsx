import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({children}) => {
     const location = useLocation();
     const user = JSON.parse(localStorage.getItem('user'));
    //  console.log(user);

     if(user){
          return children;
     }
     return <Navigate to="/" state={{from:location}} replace/>
}

export default AdminRoute;