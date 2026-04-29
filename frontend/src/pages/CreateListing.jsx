import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Container from "../components/container";
import { Input } from "../components/Input";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Select from "react-select";
import { MarketplaceApi } from "../api/marketplace.api";
import { useUserStore } from "../store/AuthStore";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function CreateListing() {
  const { register, handleSubmit, control, setValue } = useForm();
  const { userData } = useUserStore();
  const navigate = useNavigate();
  const [produces, setProduces] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchProduces = async () => {
      try {
        const data = await MarketplaceApi.getProduces();
        setProduces(data.map(p => ({ value: p.id, label: `${p.name} - ${p.variety}` })));
      } catch (error) {
        console.error("Error fetching produces:", error);
      }
    };
    fetchProduces();
    
    // Prefill fields from userData if available
    if (userData) {
      setValue("email", userData.email);
      setValue("location", userData.location || "");
      setValue("Phone", userData.phone_no || "");
    }
  }, [userData, setValue]);

  const metricsOptions = [
    { value: "Kg", label: "Kilogram (Kg)" },
    { value: "Q", label: "Quintal (Q)" },
  ];

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("produce", data.produce.value);
      formData.append("AskPrice", data.AskPrice);
      formData.append("metrics", data.metrics.value);
      formData.append("Qty_available", data.Qty_available);
      
      if (selectedFile) {
        formData.append("listing_images", selectedFile);
      }
      formData.append("description", data.description || "");

      await MarketplaceApi.createListing(formData);
      toast.success("Listing created successfully!");
      navigate("/farmer/home");
    } catch (error) {
      console.error("Error creating listing:", error.response?.data || error);
      toast.error(error.response?.data?.detail || "Failed to create listing. Please check the details.");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center relative overflow-y-auto ">
      <Header />
      <div className="w-full mt-5 pt-[80px] pb-[55px] flex flex-col items-center">
        <Container className="w-[90%] md:w-[80%] my-5 ">
          <h1 className="text-2xl font-bold mb-4">Create New Produce Listing</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Produce</label>
                <Controller
                  name="produce"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={produces}
                      placeholder="Search Produce..."
                      className="mt-1"
                    />
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Metrics (Unit)</label>
                <Controller
                  name="metrics"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={metricsOptions}
                      placeholder="Select Unit"
                      className="mt-1"
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input 
                label="Asking Price (per unit)" 
                type="number" 
                step="0.01" 
                placeholder="e.g. 250.00"
                {...register("AskPrice", { required: true })} 
              />
              <Input 
                label="Quantity Available" 
                type="number" 
                step="0.01" 
                placeholder="e.g. 50"
                {...register("Qty_available", { required: true })} 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 h-24 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Describe your produce (harvest date, quality, etc.)"
                {...register("description")}
              ></textarea>
            </div>

            <div className="border border-gray-300 rounded-md p-4">
              <h2 className="text-sm font-medium mb-2 text-gray-700">Product Image</h2>
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors">
                {imagePreview ? (
                  <div className="relative w-full flex justify-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-64 object-contain rounded-lg shadow-md"
                    />
                    <button 
                      type="button"
                      onClick={() => { setImagePreview(null); setSelectedFile(null); }}
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full text-xs"
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    <span className="text-sm text-gray-500 font-medium">Click to upload product image</span>
                    <input type="file" hidden onChange={handleImageChange} accept="image/*" />
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <Input label="Your Email" type="email" disabled {...register("email")} />
               <Input label="Your Location" disabled {...register("location")} />
            </div>

            <div className="w-full flex justify-between gap-4 pt-4">
              <button
                type="submit"
                className="bg-black text-white p-3 rounded-md w-full font-bold hover:bg-gray-800 transition-colors"
              >
                Publish Listing
              </button>
              <button
                type="button"
                className="border-2 border-black text-black p-3 rounded-md w-full font-bold hover:bg-gray-100 transition-colors"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
