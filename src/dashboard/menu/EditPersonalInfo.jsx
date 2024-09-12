import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, notification } from 'antd';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { LuImagePlus } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { useUpdateProfielPictureMutation, useUpdateProfileInfoMutation } from '../../redux/api/apiSlice';
import baseUrl from '../../baseUrl';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null); // Store the image file
  const user = JSON.parse(localStorage.getItem('user'));
  const id = user?.id;
  const [data, setData] = useState(null);

  // Redux hooks
  const [updateProfileInfo] = useUpdateProfileInfoMutation();
  const [profileImageUpdate, { error }] = useUpdateProfielPictureMutation();

  const personalData = async () => {
    try {
      const response = await fetch(`${baseUrl}/v1/users/${id}`);
      const result = await response.json();
      if (result.code === 200) {
        setData(result.data.attributes.user);
        setImageUrl(result.data.attributes.user.image); // Set the initial image URL
      } else {
        console.error('Failed to fetch user data:', result.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    personalData();
  }, []);

  const handleUploadChange = ({ file }) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result); // Set the preview image URL
    };
    setImageFile(file.originFileObj); // Save the file for uploading
    reader.readAsDataURL(file.originFileObj);
  };

  const handleUpdateProfile = async (values) => {
    try {
      let finalImageUrl = imageUrl; // Default to the existing image URL

      // Upload image only if a new one is selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile); // Ensure this matches the backend field name

        // Handle image upload
        const response = await profileImageUpdate(formData).unwrap();
        finalImageUrl = response.imageUrl; // Assuming the API returns the image URL
        console.log("Profile image updated:", response);
      }

      // Update profile information
      const res = await updateProfileInfo({
        fullName: values.name,
        email: values.email,
        location: values.location,
        image: finalImageUrl, // Use updated or existing image URL
      }).unwrap();
       if(res?.code ==200){
        notification.success({
          message: `${res?.message} successfully`
        })
       }
      console.log('Profile updated successfully:', res);
      navigate('/dashboard/personalinfo');
    } catch (error) {
      notification.error({
        message: `${error?.data?.message}`
      })
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="mx-6 mt-10 mb-16">
      {/* Back Button */}
      <div
        onClick={() => navigate("/dashboard/personalinfo")}
        className="flex items-center cursor-pointer mb-10"
      >
        <MdOutlineKeyboardArrowLeft size={30} />
        <h1 className="text-xl font-medium ml-2">Edit Profile</h1>
      </div>

      {/* Form Container */}
      <div className="p-9 rounded-xl bg-white shadow-md">
        {data && (
          <Form
            layout="vertical"
            autoComplete="off"
            onFinish={handleUpdateProfile}
            initialValues={{
              name: data.fullName,
              email: data.email,
              location: data.location,
            }}
          >
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center w-full lg:w-1/3 border-dotted border">
                <div className="relative w-56 h-56 rounded-full flex justify-center items-center mt-5 bg-gray-50 border">
                  <Upload
                    name="image"
                    showUploadList={false}
                    onChange={handleUploadChange}
                  >
                    <img
                      className="w-44 h-44 rounded-full object-cover"
                      src={imageUrl.startsWith('data:') ? imageUrl : `${baseUrl}${imageUrl}`}
                      alt="Profile"
                    />
                    <Button
                      className="border-none text-md text-blue-500 absolute bottom-6 flex items-center"
                      icon={<LuImagePlus size={20} className="mr-2" />}
                    >
                      Change Picture
                    </Button>
                  </Upload>
                </div>

                <div className="text-center mt-6">
                  <p className="text-lg">{'admin'}</p>
                  <h1 className="text-2xl font-medium">{data.fullName}</h1>
                </div>
              </div>

              {/* Form Fields Section */}
              <div className="flex-1 w-full lg:w-2/3">
                <div className="flex flex-col gap-6">
                  <Form.Item
                    label={<span className="text-lg font-medium">Name</span>}
                    name="name"
                    rules={[{ required: true, message: "Please input your name!" }]}
                  >
                    <Input
                      placeholder="Name"
                      className="p-4 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </Form.Item>

                  <Form.Item
                    label={<span className="text-lg font-medium">Email</span>}
                    name="email"
                    rules={[{ required: true, message: "Please input your email!" }]}
                  >
                    <Input
                      placeholder="Email"
                      className="p-4 rounded-lg border-gray-300 bg-gray-100"
                      disabled
                    />
                  </Form.Item>

                  <Form.Item
                    label={<span className="text-lg font-medium">Location</span>}
                    name="location"
                    rules={[{ required: true, message: "Please input your location!" }]}
                  >
                    <Input
                      placeholder="Location"
                      className="p-4 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              htmlType="submit"
              className="w-full mt-12 h-14 !text-white !bg-[#00BF63] rounded-lg text-lg font-medium"
            >
              Update Profile
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default EditProfilePage;
