"use client";
import { useAuth } from "@/context/AuthContext";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
import {
  PersonOutlineOutlined,
  DeliveryDiningOutlined,
  StorefrontOutlined,
  EmailOutlined,
  PolicyOutlined,
  ShareOutlined,
  InsertLinkOutlined,
} from "@mui/icons-material";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getUserDocRef } from "@/app/firebase";

const Profile = () => {
  const [selectedMenu, setSelectedMenu] = useState("account");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const { user } = useAuth();

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(getUserDocRef(user.uid));
          if (userDoc.exists()) {
            setFormData({
              firstName: userDoc.data().firstName || "",
              lastName: userDoc.data().lastName || "",
              email: userDoc.data().email || user?.email || "",
              phoneNumber: userDoc.data().phoneNumber || "",
              birthDate: userDoc.data().birthDate || "",
              gender: userDoc.data().gender || "",
              address: userDoc.data().address || "",
              city: userDoc.data().city || "",
              state: userDoc.data().state || "",
              zipCode: userDoc.data().zipCode || "",
            });
          } else {
            // Initialize document with default values if it doesn't exist
            await setDoc(getUserDocRef(user.uid), {
              firstName: "",
              lastName: "",
              email: user?.email || "",
              phoneNumber: "",
              birthDate: "",
              gender: "",
              address: "",
              city: "",
              state: "",
              zipCode: "",
              createdAt: new Date(),
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setSnackbar({
            open: true,
            message: "Failed to load profile data",
            severity: "error",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;

    try {
      await updateDoc(getUserDocRef(user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        birthDate: formData.birthDate,
        gender: formData.gender,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        updatedAt: new Date(),
      });
      alert("Profile updated successfully!");
      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setSnackbar({
        open: true,
        message: "Failed to update profile",
        severity: "error",
      });
    } finally {
      setLoading(false);
      alert("Profile updated successfully!");
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const menuItems = [
    {
      id: "account",
      icon: <PersonOutlineOutlined />,
      label: "Account Details",
    },
    {
      id: "address",
      icon: <DeliveryDiningOutlined />,
      label: "Delivery Addresses",
    },
    {
      id: "preferences",
      icon: <StorefrontOutlined />,
      label: "Shop Preferences",
    },
    { id: "email", icon: <EmailOutlined />, label: "Email Preferences" },
    { id: "privacy", icon: <PolicyOutlined />, label: "Privacy" },
    { id: "visibility", icon: <ShareOutlined />, label: "Profile Visibility" },
    { id: "linked", icon: <InsertLinkOutlined />, label: "Linked Accounts" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <div className="w-64 p-6 bg-white shadow-sm">
          <h1 className="text-2xl font-medium mb-6 text-gray-800">Settings</h1>
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setSelectedMenu(item.id)}
                  className={`flex items-center w-full p-3 rounded-lg transition-all ${
                    selectedMenu === item.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <CircularProgress />
              </div>
            ) : selectedMenu === "account" ? (
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                  Account Details
                </h2>

                <form className="space-y-5 text-black" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                      required
                    />

                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                    />

                    <TextField
                      fullWidth
                      label="Date of Birth"
                      name="birthDate"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={formData.birthDate}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                    />
                  </div>

                  <div className="pt-2  ">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Gender
                    </label>
                    <RadioGroup
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      row
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio size="small" />}
                        label="Male"
                        className="mr-4"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio size="small" />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio size="small" />}
                        label="Other"
                      />
                    </RadioGroup>
                  </div>

                  <div className="pt-4">
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                    />
                    <TextField
                      fullWidth
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                    />
                    <TextField
                      fullWidth
                      label="Zip Code"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button
                      type="submit"
                      variant="contained"
                      className="bg-black hover:bg-gray-800"
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  {menuItems.find((item) => item.id === selectedMenu)?.label}
                </h2>
                <p className="text-gray-500">
                  This section is under development.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity as "success" | "error"}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;
