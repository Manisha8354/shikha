import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNav from './AdminNav';
import AdminSidebar from './AdminSidebar';
const API_URL = import.meta.env.VITE_API_URL
const EditPopup = () => {
    const { id } = useParams(); // Assuming the product ID is in the URL
    const navigate = useNavigate();
    const [data, setData] = useState({
        heading: '',
        detail: '',
        status: '',
    });


    // Fetch product details when component loads
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/viewPopup`);
                const data = response.data[0];

                // Populate form with product data
                setData({
                    heading: data.heading,
                    detail: data.detail,
                    status: data?.status,
                });

            } catch (error) {
                console.error(error);
            }
        };

        fetchProductDetails();
    }, [id]);



    const handleSubmit = async (e) => {
        e.preventDefault();

    
        try {
            await axios.put(`${API_URL}/updatePopup/${id}`, data);

            // Navigate to product list after update
            navigate('/admin/popup');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        <AdminNav/>
        <AdminSidebar/>
        <div className="absolute flex flex-col items-center w-[80%] left-[20%] top-20">
            <h1 className="text-2xl font-bold mb-4 text-center">Update Popup</h1>
            <form onSubmit={handleSubmit}>
                {/* Product Title */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Popup Heading</label>
                    <input
                        type="text"
                        value={data.heading}
                        onChange={(e)=>setData({...data, heading:e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Product Name */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Popup Details</label>
                    <textarea
                        type="text"
                        value={data.detail}
                        onChange={(e)=>setData({...data, detail:e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="10"
                        required
                    />
                </div>

                {/* Product Rating */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Popup Status</label>
                    <select
                        onChange={(e)=>setData({...data, status:e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option>on</option>
                        <option>off</option>
                    </select>
                </div>

               
                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </div>
        </>
    );
};

export default EditPopup;
