"use client";
import { useAuth } from "@/context/AuthContext";
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
  SaveOutlined,
  CheckCircleOutlined,
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
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getUserRealtimeData,
  setUserRealtimeData,
  updateUserRealtimeData,
} from "@/app/firebase";

// Define the form data type
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const Profile = () => {
  const [selectedMenu, setSelectedMenu] = useState("account");
  const [formData, setFormData] = useState<FormData>({
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
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });
  const [hasChanges, setHasChanges] = useState(false);
  // Fix: Properly type initialData to match FormData structure
  const [initialData, setInitialData] = useState<FormData>({
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

  const { user, isOnline } = useAuth();

  // Fetch user data from Realtime Database
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          setLoading(true);
          const userData = await getUserRealtimeData(user.uid);

          if (userData) {
            const profileData: FormData = {
              firstName: userData.firstName || "",
              lastName: userData.lastName || "",
              email: userData.email || user?.email || "",
              phoneNumber: userData.phoneNumber || "",
              birthDate: userData.birthDate || "",
              gender: userData.gender || "",
              address: userData.address || "",
              city: userData.city || "",
              state: userData.state || "",
              zipCode: userData.zipCode || "",
            };
            setFormData(profileData);
            setInitialData(profileData);
          } else {
            // Initialize with default values if no data exists
            const defaultData: FormData = {
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
            };
            setFormData(defaultData);
            setInitialData(defaultData);

            // Create initial profile in database
            await setUserRealtimeData(user.uid, {
              ...defaultData,
              createdAt: Date.now(),
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setSnackbar({
            open: true,
            message: isOnline
              ? "Failed to load profile data"
              : "You're offline. Some data may not be available.",
            severity: isOnline ? "error" : "warning",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user, isOnline]);

  // Check for changes
  useEffect(() => {
    const dataChanged =
      JSON.stringify(formData) !== JSON.stringify(initialData);
    setHasChanges(dataChanged);
  }, [formData, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;

    if (!isOnline) {
      setSnackbar({
        open: true,
        message: "You're offline. Changes cannot be saved right now.",
        severity: "warning",
      });
      return;
    }

    try {
      setSaving(true);

      // Update user data in Realtime Database
      await updateUserRealtimeData(user.uid, {
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
      });

      setInitialData({ ...formData });
      setHasChanges(false);

      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setSnackbar({
        open: true,
        message: "Failed to update profile. Please try again.",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setFormData({ ...initialData });
    setHasChanges(false);
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
        <div className="w-64 p-6 bg-white shadow-sm border-r">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your account</p>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedMenu(item.id)}
                className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
                  selectedMenu === item.id
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          {/* Connection Status
          <div className="mt-8 p-3 rounded-lg bg-gray-50">
            <div className="flex items-center text-sm">
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  isOnline ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span className={isOnline ? "text-green-700" : "text-red-700"}>
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>
            {!isOnline && (
              <p className="text-xs text-gray-600 mt-1">
                Changes will sync when you're back online
              </p>
            )}
          </div> */}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <CircularProgress size={40} />
                <span className="ml-3 text-gray-600">Loading profile...</span>
              </div>
            ) : selectedMenu === "account" ? (
              <Card className="shadow-sm">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <Typography
                      variant="h4"
                      className="font-semibold text-gray-900 mb-2"
                    >
                      Account Details
                    </Typography>
                    <Typography variant="body2" className="text-gray-600">
                      Update your personal information and account settings
                    </Typography>
                  </div>

                  <Divider className="mb-8" />

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Personal Information Section */}
                    <div>
                      <Typography variant="h6" className="mb-4 text-gray-800">
                        Personal Information
                      </Typography>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField
                          fullWidth
                          label="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          variant="outlined"
                          disabled={saving || !isOnline}
                        />
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          variant="outlined"
                          disabled={saving || !isOnline}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          variant="outlined"
                          required
                          disabled={saving || !isOnline}
                        />
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          variant="outlined"
                          placeholder="+1 (555) 123-4567"
                          disabled={saving || !isOnline}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <TextField
                          fullWidth
                          label="Date of Birth"
                          name="birthDate"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          value={formData.birthDate}
                          onChange={handleChange}
                          variant="outlined"
                          disabled={saving || !isOnline}
                        />
                        <div className="flex flex-col">
                          <Typography
                            variant="body2"
                            className="mb-2 text-gray-700 font-medium"
                          >
                            Gender
                          </Typography>
                          <RadioGroup
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            row
                          >
                            <FormControlLabel
                              value="male"
                              control={
                                <Radio
                                  size="small"
                                  disabled={saving || !isOnline}
                                />
                              }
                              label="Male"
                              className="mr-4"
                            />
                            <FormControlLabel
                              value="female"
                              control={
                                <Radio
                                  size="small"
                                  disabled={saving || !isOnline}
                                />
                              }
                              label="Female"
                              className="mr-4"
                            />
                            <FormControlLabel
                              value="other"
                              control={
                                <Radio
                                  size="small"
                                  disabled={saving || !isOnline}
                                />
                              }
                              label="Other"
                            />
                          </RadioGroup>
                        </div>
                      </div>
                    </div>

                    <Divider />

                    {/* Address Information Section */}
                    <div>
                      <Typography variant="h6" className="mb-4 text-gray-800">
                        Address Information
                      </Typography>

                      <TextField
                        fullWidth
                        label="Street Address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        variant="outlined"
                        className="mb-6"
                        disabled={saving || !isOnline}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        <TextField
                          fullWidth
                          label="City"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          variant="outlined"
                          disabled={saving || !isOnline}
                        />
                        <TextField
                          fullWidth
                          label="State"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          variant="outlined"
                          disabled={saving || !isOnline}
                        />
                        <TextField
                          fullWidth
                          label="Zip Code"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          variant="outlined"
                          disabled={saving || !isOnline}
                        />
                      </div>
                    </div>

                    <Divider />

                    {/* Action Buttons */}
                    <Box className="flex justify-between items-center pt-4">
                      <div className="flex items-center space-x-4">
                        {hasChanges && (
                          <Button
                            type="button"
                            variant="outlined"
                            onClick={handleReset}
                            disabled={saving || !isOnline}
                            className="text-gray-600 border-gray-300 hover:border-gray-400"
                          >
                            Reset Changes
                          </Button>
                        )}
                      </div>

                      <Button
                        type="submit"
                        variant="contained"
                        disabled={saving || !hasChanges || !isOnline}
                        className="bg-black hover:bg-gray-800 min-w-[140px]"
                        startIcon={
                          saving ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : hasChanges ? (
                            <SaveOutlined />
                          ) : (
                            <CheckCircleOutlined />
                          )
                        }
                      >
                        {saving
                          ? "Saving..."
                          : hasChanges
                          ? "Save Changes"
                          : "Saved"}
                      </Button>
                    </Box>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      {menuItems.find((item) => item.id === selectedMenu)?.icon}
                    </div>
                    <Typography
                      variant="h5"
                      className="font-semibold text-gray-900 mb-2"
                    >
                      {
                        menuItems.find((item) => item.id === selectedMenu)
                          ?.label
                      }
                    </Typography>
                    <Typography variant="body1" className="text-gray-600">
                      This section is under development and will be available
                      soon.
                    </Typography>
                  </div>

                  <Button
                    variant="outlined"
                    onClick={() => setSelectedMenu("account")}
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    Return to Account Details
                  </Button>
                </CardContent>
              </Card>
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
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;
