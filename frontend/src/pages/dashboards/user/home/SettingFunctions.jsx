// input changes for user details
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
};

// image file selection
const handleImageChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Validate image type and size
  const validTypes = ["image/jpeg", "image/png", "image/jpg"];
  const maxSize = 2 * 1024 * 1024; // 2MB

  if (!validTypes.includes(file.type)) {
    setErrorMessage("Only JPEG or PNG images are allowed.");
    setImgValid(false);
    return;
  }

  if (file.size > maxSize) {
    setErrorMessage("Image size should not exceed 2MB.");
    setImgValid(false);
    return;
  }

  // If valid, update the state
  setPhotoFile(file);
  setErrorMessage("");
  setImgValid(true);
};

// user details form submission
const handleUserDetailsSubmit = async (e) => {
  e.preventDefault();
  // Prepare form data
  const formData = new FormData();

  formData.append(
    "data",
    JSON.stringify({
      name: userDetails.name,
      email: userDetails.email,
      address: userDetails.address,
    })
  );

  try {
    setIsDetailsUpadating(true);

    const response = await axiosInstance.put(`/users/${user._id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setSuccessMessage("User details updated successfully.");
    setUser((prev) => ({
      ...prev,
      name: response?.data?.user?.name,
      email: response?.data?.user?.email,
      address: response?.data?.user?.address,
    }));
    saveUserToLocalStorage({
      ...user,
      ...response?.data?.user,
    });
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response?.data?.message || "An unknown error occurred";
    setErrorMessage(errorMessage);
  } finally {
    setIsDetailsUpadating(false);
  }
};

//user picture update
const handleUserPhoto = async (e) => {
  e.preventDefault();
  // Prepare form data
  const formData = new FormData();

  if (photoFile) {
    formData.append("file", photoFile);
  } else {
    alert("No photo file choosen");
  }

  try {
    setImageUpdating(true);
    const response = await axiosInstance.patch(
      `/users/${user._id}/picture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setSuccessMessage("User Picture updated successfully.");
    if (response?.data?.user) {
      setUser((prev) => ({
        ...prev,
        photoUrl: response?.data?.user?.photoUrl,
      }));
      saveUserToLocalStorage({
        ...user,
        photoUrl: response?.data?.user?.photoUrl,
      });
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An unknown error occurred";
    setErrorMessage(errorMessage);
  } finally {
    setImageUpdating(false);
  }
};

// password form submission
const handlePasswordUpdate = async (e) => {
  e.preventDefault();

  if (passwords.newPassword !== passwords.confirmPassword) {
    setErrorMessage("New password and confirmation do not match.");
    return;
  }

  // Prepare form data
  const formData = new FormData();
  formData.append(
    "data",
    JSON.stringify({
      oldPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
    })
  );

  try {
    setIsPasswordUpadating(true);
    const response = await axiosInstance.put(
      `/users/${user._id}/password`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Explicitly set the content type
        },
      }
    );

    setSuccessMessage("Password updated successfully.");
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An unknown error occurred";
    setErrorMessage(errorMessage);
  } finally {
    setIsPasswordUpadating(false);
  }
};
