 

import React, { CSSProperties, useEffect, useState } from "react";
import { Button, Card, Form, Input, Select, notification, Pagination, message } from "antd";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-responsive-modal";
import { useAddCategoryMutation, useDeleteCategoriesMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from "../../redux/api/apiSlice";
import baseUrl from "../../baseUrl";
import { ClipLoader, PacmanLoader, RiseLoader } from "react-spinners";
import Swal from "sweetalert2";
// import 'antd/dist/antd.css';

const { Option } = Select;
  

// const override: CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };

const Category = () => {
  const [currentPage, setCurrentPage] = useState(1)
  
  const { data: categories, isLoading, error } = useGetCategoriesQuery(currentPage);
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoriesMutation();
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [editCategory, setEditCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [updateImage, setUpdateImage] = useState(null);
  const navigate = useNavigate();

  

  const handleChangePage = (page) => {
    setCurrentPage(page)
    console.log(page);
  }

  const closeEditModal = () => {
    setOpenEditModal(false);
    setUpdateImage(null);
    editForm.resetFields();
  };

  const openAddCategoryModal = () => setAddCategoryModal(true);
  const closeAddCategoryModal = () => {
    setAddCategoryModal(false);
    setImage(null);
    form.resetFields();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpdateImageChange = (e) => {
    const file = e.target.files[0];
    setUpdateImage(file);
  };


  const handleEditModal = (id) => {
    setLoading(true);
    fetch(`${baseUrl}/v1/categories/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEditCategory(data?.data?.attributes?.categories);
        setOpenEditModal(true);
        editForm.setFieldsValue({
          name: data?.data?.attributes?.categories?.name,
          type: data?.data?.attributes?.categories?.type,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };


  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('name', values?.name);
    formData.append('type', values?.type);
    formData.append('image', image);

    try {
      await addCategory(formData).unwrap();
      console.log(addCategory);
      notification.success({
        message: 'Success',
        description: 'Category Created Successfully',
      });
      closeAddCategoryModal();
      navigate("/dashboard/category");
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to create category',
      });
      console.error('Failed to create category:', error);
    }
  };

  const handleUpdate = async (values) => {
    const formData = new FormData();
    formData.append("name", values?.name);
    formData.append("type", values?.type);
    if (updateImage) {
      formData.append("image", updateImage);
    }

    try {
      await updateCategory({ id: editCategory.id, formData }).unwrap();
      notification.success({
        message: 'Success',
        description: 'Category Updated Successfully',
      });
      closeEditModal();
      navigate("/dashboard/category");
    } catch (error) {
      console.error('Failed to update category:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to update category',
      });
    }
    setLoading(false);
  };

  
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
       await deleteCategory(id).unwrap();
        Swal.fire({
          title: "Deleted!",
          text: "Your Category post has been deleted.",
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
  
// const [showLoader, setShowLoader] = useState(true)
//   useEffect(() => { 
//     const timer = setTimeout(() => {
//       setShowLoader(false);
   
//     }, 800);
 
//     return () => clearTimeout(timer);
//   }, []); 
 
          if (isLoading) {
            return (
              <div className="w-4/12 mx-auto mt-40">
                <RiseLoader color="#00BF63" size={30} />
              </div>
            );
          } 
       
          if (error) {
            return <p>Error loading categories: {error.message}</p>;
          }
  

  return (
    <div>
      <div className="mt-8 mx-6">
        <div className="text-end">
          <button
            onClick={openAddCategoryModal}
            className="text-[18px] font-normal text-white px-4 py-2 rounded bg-[#00BF63]"
          >
            +Add Category
          </button>
        </div>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-2 mt-4">
          {categories?.data?.attributes?.results?.map((category) => (
            <div key={category?.id}>
              <Card
                className="border border-[#00BF63] p-2 mb-3"
                style={{ height: 300, width: 340 }}
                cover={<img alt="example" className="h-44 w-32" src={baseUrl + category?.image} />}
              >
                <h className="font-medium text-[16px]">{category?.name}</h>
                <p>{category.type}</p>
                <div className="flex justify-between gap-3 items-center">
                  <button onClick={() => handleDelete(category?.id)} className="font-normal text-[18px] rounded px-4 border border-[#00BF63]">
                    Delete
                  </button>
                  <button
                    onClick={() => handleEditModal(category?.id)}
                    className="bg-[#00BF63] font-normal text-[18px] px-6 text-white rounded"
                  >
                    Edit
                  </button>
                </div>
              </Card>
            </div>
          ))}
        </div>
       <div className="my-4">

        <Pagination 
        align="center"
        defaultCurrent={1}
        pageSize={categories?.data?.attributes?.limit}
        total={categories?.data?.attributes?.totalResults}
        totalResults={categories?.data?.attributes?.totalPages}
        onChange={handleChangePage}
        showTotal={(total) => `Total ${total} items`}
        showSizeChanger
        
        />
       </div>
        
       

        <Modal
          classNames={{ modal: "customModal", height: "600px" }}
          open={addCategoryModal}
          onClose={closeAddCategoryModal}
          center
        >
          <div className="mt-[10px] mx-10 text-[#FFFFFF] bg-opacity-40">
            <div className="flex items-center gap-2 my-6">
              <Link to="/dashboard/category">
                <IoIosArrowBack className=" bg-[#00BF63] text-[24px] rounded-md text-white" />
              </Link>
              <h1 className="font-medium text-2xl">Add a new category</h1>
            </div>

            <Form form={form} name="createCategory" onFinish={onFinish} layout="vertical">
              <Form.Item
                label= { <span className="text-white">Category Name</span>}
                name="name"
                rules={[{ required: true, message: 'Please input the category name!' }]}
              >
               <Input
                  size="large"
                  placeholder="Write Category name"
                  type="text"
                  style={{ height: "48px", background: "#E6F9EF", outline: "none", }}
                  required
                  
                />
              </Form.Item>
              <Form.Item
                label= { <span className="text-white">Category Type</span>}
                name="type"
                rules={[{ required: true, message: 'Please select the category type!' }]}
              >
                <Select className=" h-12" placeholder="Select a category type">
                  <Option value="online">online</Option>
                  <Option value="offline">offline</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="image"
                label={<span className="text-white text-[16px] font-medium">Upload Image</span>}
                rules={[{ required: true, message: 'Please upload an image!' }]}
              >
                <input
                  onChange={handleImageChange}
                  placeholder="Upload Image"
                  name="image"
                  type="file"
                  className="border-none w-[360px] bg-[#E6F9EF] h-12  pt-3 pl-3 rounded-[6px]"
                />
              </Form.Item>
              <Form.Item>
                <Button className=" bg-[#00BF63] w-[360px] h-12" htmlType="submit" loading={loading}>
                  {loading ? 'Creating...' : 'Create Category'}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>

        <Modal
          classNames={{ modal: "customModal", height: "600px" }}
          open={openEditModal}
          onClose={closeEditModal}
          center
        >
          <div className="mt-[30px] mx-10 text-[#FFFFFF] bg-opacity-40">
            <div className="flex items-center gap-2 mt-6">
              <Link to="/dashboard/category">
                <IoIosArrowBack className=" bg-[#00BF63] text-[24px] rounded-md text-white" />
              </Link>
              <h1 className="font-medium text-2xl">Update category</h1>
            </div>

            <Form
              form={editForm}
              name="editCategory"
              labelCol={{ span: 22 }}
              wrapperCol={{ span: 40 }}
              layout="vertical"
              onFinish={handleUpdate}
              initialValues={{
                name: editCategory?.name,
                type: editCategory?.type,
              }}
            >
              <Form.Item
                name="name"
                label={<span className="text-[16px] text-white font-medium">Category Name</span>}
                rules={[{ required: true, message: 'Please input the category name!' }]}
              >
                <Input
                  size="large"
                  placeholder="Write Category name"
                  type="text"
                  defaultValue={editCategory?.name}
                  style={{ height: "48px", background: "#E6F9EF", outline: "none", }}
                  required
                 
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-[16px] text-white font-medium">Category Type</span>}
                name="type"
                rules={[{ required: true, message: 'Please select the category type!' }]}
              >
                <Select className="h-12" placeholder="Select a category type" defaultValue={editCategory?.type}>
                  <Option value="online">online</Option>
                  <Option value="offline">offline</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="image"
                label={<span className="text-white text-[16px] font-medium">Upload Image</span>}
                // rules={[{ required: true, message: 'Please upload an image!' }]}
              >
                <input
                  onChange={handleUpdateImageChange}
                  placeholder="Upload Image"
                  name="image"
                  type="file"
                  className="w-[360px] border-none bg-[#E6F9EF] h-12 pt-4 pl-4 rounded-[6px]"
                />
              </Form.Item>

              <Form.Item>
              <Button className=" bg-[#00BF63] w-[360px] h-12" htmlType="submit" loading={loading}>
                  {loading ? 'Creating...' : 'Update Category'}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Category;
