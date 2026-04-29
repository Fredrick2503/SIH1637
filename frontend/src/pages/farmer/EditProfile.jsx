import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Container from "../../components/container";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";
import { AuthApi } from "../../api/auth.api";
import { useUserStore } from "../../store/AuthStore";
import toast from "react-hot-toast";

function EditProfile() {
  const navigate = useNavigate();
  const { userData, setlogin } = useUserStore();
  
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    about: "",
    tagline: "",
    farmName: "",
    farmArea: "",
    organizationName: "",
    organizationType: "",
    phone_no: ""
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await AuthApi.getProfile();
        setFormData({
          first_name: profile.first_name || "",
          last_name: profile.last_name || "",
          about: profile.about || "",
          tagline: profile.tagline || "",
          farmName: profile.farmName || "",
          farmArea: profile.farmArea || "",
          organizationName: profile.organizationName || "",
          organizationType: profile.organizationType || "",
          phone_no: profile.phone_no || ""
        });
        if (profile.profileImg) {
          setImagePreview(profile.profileImg);
        }
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load profile data");
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });
    
    if (imageFile) {
      data.append("profileImg", imageFile);
    }

    try {
      const updatedProfile = await AuthApi.updateProfile(data);
      // Update store
      setlogin(updatedProfile, useUserStore.getState().tokens);
      toast.success("Profile updated successfully!");
      navigate(-1);
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="w-screen h-screen flex items-center justify-center">Loading...</div>;

  const isFarmer = userData?.role === "producer";

  return (
    <div className="w-screen h-screen flex flex-col items-center relative overflow-y-auto " style={{ scrollbarWidth: "none" }}>
      <Header />
      <div className="w-full pt-[80px] pb-[55px] flex flex-col items-center">
        <Container className="w-[90%] md:w-[60%] lg:w-[50%] mt-8 mb-12 shadow-xl p-8 rounded-2xl bg-white">
          <h1 className="text-3xl font-bold mb-8 text-center">Edit Your Profile</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-md">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-gray-800 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <input type="file" hidden onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-2">Click to change profile picture</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">First Name</label>
                <Input name="first_name" value={formData.first_name} onChange={handleInputChange} label="First Name" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Last Name</label>
                <Input name="last_name" value={formData.last_name} onChange={handleInputChange} label="Last Name" />
              </div>
            </div>

            <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-600">Phone Number</label>
                <Input name="phone_no" value={formData.phone_no} onChange={handleInputChange} label="Phone Number" />
            </div>

            {isFarmer ? (
              <>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600">Farm Name</label>
                  <Input name="farmName" value={formData.farmName} onChange={handleInputChange} label="Farm Name" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600">Farm Area (Acres)</label>
                  <Input name="farmArea" type="number" value={formData.farmArea} onChange={handleInputChange} label="Farm Area" />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600">Organization Name</label>
                  <Input name="organizationName" value={formData.organizationName} onChange={handleInputChange} label="Organization Name" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-600">Organization Type</label>
                  <Input name="organizationType" value={formData.organizationType} onChange={handleInputChange} label="e.g. Retailer, Hotel, Wholesaler" />
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600">Tagline</label>
              <Input name="tagline" value={formData.tagline} onChange={handleInputChange} label="Short professional tagline" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-600">About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                placeholder="Tell us about yourself or your business"
                className="w-full border border-gray-300 rounded-md p-3 min-h-[120px] focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                disabled={submitting}
                type="submit"
                className="flex-1 bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all disabled:bg-gray-400"
              >
                {submitting ? "Saving Changes..." : "Save Profile"}
              </button>
              <button
                type="button"
                className="flex-1 border-2 border-black text-black py-3 rounded-xl font-bold hover:bg-gray-50 transition-all"
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

export default EditProfile;
