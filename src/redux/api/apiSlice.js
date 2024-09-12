
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import url from '../../baseUrl';
// http://192.168.10.163:7171
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.cnnctr.com.au/v1' }),// Adjust the base URL to match your API
   tagTypes: ["categories", "blog", "info/privacy","info/terms", "info/trust-safety","withdrawal/single?withdrawalId"],
  endpoints: (builder) => ({

 ///////////Authentication page//////////// 

forgotPassword: builder.mutation({
  query: (email) => ({
    url: "/auth/forgot-password",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: ` Bearer ${localStorage.getItem('token')}`
    },
    body: email
  })
}),

emailVerify: builder.mutation({
  query: ({otp, email}) => ({
    url: "/auth/verify-email",
    method: "POST",
    headers: {
         "Content-Type": "application/json",
      authorization: ` Bearer ${localStorage.getItem('token')}`
    },
    body: {
      oneTimeCode: otp,
      email: email,
    }
  })
}),

resetPassword: builder.mutation({
  query: ({email, password}) => ({
    url: "/auth/reset-password",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
   authorization: ` Bearer ${localStorage.getItem('token')}`
 },
 body: { 
  email,
  password,
}
  })
}), 
changPassword: builder.mutation({
  query: (values) => ({
    url: '/auth/change-password',
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: values, // Send the values directly, without wrapping in another object
  }),
}),


 ///////////Total Status////////////
 totalStatus:builder.query({
  query: () => ({
   url: "/admin/getTotalStatus",
   method: "GET",
   headers : {
    "Content-Type": "application/json",
    authorization: ` Bearer ${localStorage.getItem('token')}`
   }
  }) 
 }),
 /////////Income ratio , ////////////
 getIncomeRatio: builder.query({
  query: (year) => ({
    url: `/admin/getIncomeRatio?year=${year}`,
    method: "GET",
    headers : {
      "Content-Type": "application/json",
      authorization: ` Bearer ${localStorage.getItem('token')}`
     }
  }) 
}),

////******|Earnings************ */
getEarning: builder.query({
  query: ({year, page}) => ({
    url: `/admin/earnings?year=${year}&page=${page}`,
    method:"GET",
    headers:{
      authorization: ` Bearer ${localStorage.getItem('token')}`
    }
  })
}),

///********UserRatio********* */
getUserRatio:builder.query({
  query: (month) => ({
    url: `/admin/getUserRatio?month=${month}`,
    method: "GET",
    headers:{
      authorization: ` Bearer ${localStorage.getItem('token')}`
    }
  })
}),

///*******Recent Users************ */
getRecentUser:builder.query({
  query: () => ({
    url: '/admin/recentUsers',
    method: "GET",
    headers: {

      authorization: ` Bearer ${localStorage.getItem('token')}`
    }
    
 
  })
}),


    // Category api intigration >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//////////

    getCategories: builder.query({
      query: (page) => `/categories?page=${page}&limit=8`, 
      providesTags: ["categories"]
    }),  

    addCategory: builder.mutation({
         query: (formData) => ({
            url:'/categories',
            method:"POST",
            body: formData,
            headers: {
                authorization: ` Bearer ${localStorage.getItem('token')}`
            }
         }),
         invalidatesTags: ["categories"]

}), 

    updateCategory: builder.mutation({
      query: ( {id, formData} ) => ({ 
        url: `/categories?categoryId=${id}`,
        method: 'PATCH',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body:  formData, 
      }),
      invalidatesTags:["categories"]
    }), 

    deleteCategories: builder.mutation({
      query: (id) => ({ 
        url: `/categories/${id}`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        },
        method: 'DELETE',
      }),
      invalidatesTags:["categories"]
    }),



    //   Blogs data Intigration >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/////
    getBlogs: builder.query({
        query: (page) => `/blog?page=${page}&limit=6`, 
        providesTags: ["blog"]
      }), 
    addBlogs: builder.mutation({
      query: (newBlogs) => ({
        url:'/blog',
        method:"POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: newBlogs,
      }),
      invalidatesTags:["blog"]
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url:`/blog/${id}`,
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        method: 'DELETE',
      }),
      invalidatesTags:['blog']
    }),
    updateBlog: builder.mutation({
      query: ({_id, formData}) => ({
        url: `/blog/${_id}`,
        method: 'PATCH',
        headers: {
          authorization:`Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      }),
      invalidatesTags:['blog']
    }),



      // Privacy data gettt >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>/////
      getPrivacy: builder.query({
        query: () => '/info/privacy',
            providesTags: ['info/privacy'], 
      }),

    addPrivacy: builder.mutation({
      query: (privacy) => ({
        url: '/info/privacy',
        method:'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: privacy,
      }),
      invalidatesTags: ["info/privacy"],
    }),



  //  Term & conditon data get >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>///////

  getTermConditon: builder.query({
    query: () => '/info/terms', 
    providesTags: ["info/terms"]
  }), 

  addTermCondition: builder.mutation({
    query: (privacy) => ({
      url: '/info/terms',
      method:'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: privacy,
    }),
    invalidatesTags: ["info/terms"],
  }),

// ********************trus&safty Api get >>>>>>>>>>>>>>>>>>>>>>>>>>>>******************/// 
getTrustSafety: builder.query({
  query: () => "/info/trust-safety",
  providesTags: ['info/trust-safety']
}),
addTrustSafety: builder.mutation({
  query: (trustSafery) => ({
    url: '/info/trust-safety',
    method:"POST",
    headers: {
      authorization:`Bearer ${localStorage.getItem('token')}`
    },
    body: trustSafery,
  }),
  invalidatesTags: ["info/trust-safety"]
}),

// BuyerList Api get****************************/////////
getBuyerList: builder.query({
 query: () => '/users?role=buyer'
}),

////**********FrelancerList Api get *************/////
getFrelancerList: builder.query({
  query: () => '/users?role=freelancer'
}),

 ///***********Notification api get */

 getNotification: builder.query({
  query: ( ) => ({
    url: '/notification/admin',
    method:'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    },
    // body: privacy,
  }), 
}),

////***************Withdraw api get */
 getWithdrawUser: builder.query({
  providesTags: ['withdrawal'],
  query: ( ) => ({
    url: '/withdrawal',
    method:'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    },
    // body: privacy,
  }), 
  invalidatesTags:['withdrawal']
}),

 getSingleWithdrawUser: builder.query({
  query: (id) => ({
    url: `/withdrawal/single?withdrawalId=${id}`,
    method:'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    },
    // body: privacy,
  }), 
  invalidatesTags:['withdrawal/single?withdrawalId']
}),

withdrawCancelById: builder.mutation({
  query: (id) => ({
    url:`/withdrawal/${id}`,
    method:'PATCH',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    },
    // body:
  }),
  invalidatesTags:['withdrawal']
}),

withdrawPostById: builder.mutation({
  query: (id) => 
    {
      // console.log("iddddddddddddddddddddddddddddddddddddddd",id);
      return {
    url:`/withdrawal/${id}`,
    method:'POST',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    },
    // body:
      }
  },
invalidatesTags: ["withdrawal"] 
}),

// *****************Profile***************/////

updateProfileInfo: builder.mutation({
  query: (profileInfo) => ({
    url: '/users/profile',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: profileInfo,
  }),
}),
// Update profile picture
updateProfielPicture: builder.mutation({
  query: (formData) => ({
    url: '/users/profile-image',
    method: 'POST',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    
    },
    body: formData,
  }),
}),

// ********************************/////
 
 
  }), 
});

 export const {
     useUpdateProfielPictureMutation,
     useUpdateProfileInfoMutation,
      useForgotPasswordMutation,
      useEmailVerifyMutation,
      useResetPasswordMutation,
      useChangPasswordMutation,
      useGetCategoriesQuery,
      useAddCategoryMutation,
      useUpdateCategoryMutation,
      useDeleteCategoriesMutation,
      useGetBlogsQuery,
      useAddBlogsMutation,
      useDeleteBlogMutation,
      useUpdateBlogMutation,
      useGetPrivacyQuery,
      useAddPrivacyMutation,
      useGetTermConditonQuery,
      useAddTermConditionMutation,
      useGetTrustSafetyQuery,
      useAddTrustSafetyMutation,
      useGetBuyerListQuery,
      useGetFrelancerListQuery,
      useGetNotificationQuery,
      useGetWithdrawUserQuery,
      useGetSingleWithdrawUserQuery,
      useWithdrawCancelByIdMutation,
      useWithdrawPostByIdMutation,
      useTotalStatusQuery,
      useGetIncomeRatioQuery,
      useGetEarningQuery,
      useGetUserRatioQuery,
      useGetRecentUserQuery,
      
 } = apiSlice;