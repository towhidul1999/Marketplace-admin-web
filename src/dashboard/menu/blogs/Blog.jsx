
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, notification, Pagination } from 'antd';
import { CiCalendarDate } from "react-icons/ci";
const { Meta } = Card;
import img from '../../../../public/otpImage/Rectangle 34624130.png'
import { Link} from "react-router-dom";
import baseUrl from '../../../baseUrl'
import { useEffect, useState } from 'react'; 
import { useDeleteBlogMutation, useGetBlogsQuery } from '../../../redux/api/apiSlice';
import { MdOutlineDateRange } from 'react-icons/md';
import { PropagateLoader } from 'react-spinners';
import Swal from 'sweetalert2';



const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: blogs, isLoading, error } = useGetBlogsQuery(currentPage)
 
  const [deleteBlog] = useDeleteBlogMutation()


  const handleChangePage = (page) => {
    setCurrentPage(page)
  }
 



  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!"
      });
  
      if (result.isConfirmed) {
        await deleteBlog(id).unwrap();
        Swal.fire({
          title: "Deleted!",
          text: "Your blog post has been deleted.",
          icon: "success",
          timer: 2000,
        });
   
      } 
      // else {
      //   Swal.fire({
      //     title: "Cancelled",
      //     text: "Your blog post is safe!",
      //     icon: "info",
      //     timer: 1000,
      //   });
      // }

    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete the blog post',
      });
      console.error('Failed to delete blog post:', error);
    }
  };
  


  if (isLoading) {
    return (
      <div className="w-4/12 mx-auto mt-40">
        <PropagateLoader color="#00BF63" size={30} />
      </div>
    );
  }  
   
  return (
    <div className="mt-8 mx-6">
      <div className="text-end">
        <Link to='/dashboard/addblog'>
          <button className="text-[18px] font-normal text-white px-4 py-2 rounded bg-[#00BF63]">
            +Add Blog
          </button>
        </Link>
      </div>
      <div

        className="grid md:grid-cols-4 lg:grid-cols-4 sm:grid-cols-2 gap-4 mt-4 z-40">
        {
        blogs?.data?.attributes?.results?.length > 0 ?  (blogs?.data?.attributes?.results.map(blog => <div key={blog._id}>
<Card
  className="border border-[#00BF63] p-2 relative"
  style={{
    height: 450,
    //   width:340,
  }}
  cover={
    <img
      alt="example"
      className="h-52 w-full"
      src={baseUrl + blog.image}
    />
  }
>
  <p className="flex items-center gap-1">
    <MdOutlineDateRange />
    {blog?.createdAt?.split("T")[0] ? blog?.createdAt?.split("T")[0] : "N/A"}
  </p>
  <p className="flex items-center">{blog.title}</p>
  <p className="flex items-center">{blog.author}</p>
  <h className="font-medium text-[16px]">{blog.content}</h>
  <p dangerouslySetInnerHTML={{ __html: blog?.description?.slice(0, 40) }}></p>
  <div className="flex justify-between gap-3 items-center my-2 absolute bottom-0 left-0 right-0 px-8">
    <button
      onClick={() => handleDelete(blog?._id)}
      className="font-normal bg-red-500 text-white text-[18px] rounded px-5 border border-[#00BF63]"
    >
      Delete
    </button>
    <Link to={`/dashboard/editblog/${blog._id}`}>
      <button className="bg-[#00BF63] font-normal text-[18px] px-10 text-white rounded">
        Edit
      </button>
    </Link>
  </div>
</Card>


          </div>)) : <div className="text-center text-[18px] font-medium text-[#333333]">
      No Blog available.
    </div>
        }

      </div>
      <div className='my-5'>
        <Pagination
          align="center"
          defaultCurrent={1}
          pageSize={blogs?.data?.attributes?.limit}
          total={blogs?.data?.attributes?.totalResults}
          // totalResults={blogs?.data?.attributes?.totalPages}
          onChange={handleChangePage}
          showTotal={(total) => `Total ${total} items`}
          showSizeChanger
        />
      </div>

    </div>
  );
};

export default Blog;

