import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../../../../features/books/booksApi";
import { useGetCategoriesQuery } from "../../../../features/categories/categoriesApi";
import { ErrorNotify, SuccessNotify } from "../../../../utils/NotifyContainer";
import useAuth from "../../../../hooks/useAuth";
import BackToPrev from "../../../../components/dashboard/shared/BackToPrev";
import AddForm from "./AddForm";

const UserAddBooks = ({ onSubmit }) => {
  const { data: categories } = useGetCategoriesQuery();
  const navigate = useNavigate();
  const [createBook, { isLoading: isBookPosting, isSuccess, isError, error }] =
    useCreateBookMutation();
  const { user } = useAuth();
  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    about: "",
    published_date: "",
    language: "",
    qty: 1,
    price: 0,
    sell_price: 0,
    tags: "",
    category_id: "",
    store_id: user?.store_id,
    created_by: user?._id,
  });

  const handleCategoryChange = (categoryId) => {
    setBookDetails((prev) => ({ ...prev, category_id: categoryId }));
  };

  const [coverPhoto, setCoverPhoto] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverPhoto(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookDetails.qty < 1) {
      ErrorNotify("Qty can not be less than one");
      return;
    }
    if (bookDetails.price == 0 || bookDetails.sell_price == 0) {
      ErrorNotify("price can not be zero");
      return;
    }
    // Append the book details as a JSON string
    const bookData = {
      ...bookDetails,
      tags: bookDetails.tags.split(",").map((tag) => tag.trim()), // Convert tags to an array
    };
    const formData = new FormData();
    // Append the book data object as a string
    formData.append("data", JSON.stringify(bookData));
    // Append the file
    if (coverPhoto) {
      formData.append("file", coverPhoto);
    }

    createBook(formData)
      .unwrap()
      .then(() => {
        SuccessNotify("Book has been created");
        navigate("/dashboard/user/books");
      })
      .catch((error) => {
        ErrorNotify(error?.response?.data?.message || "Failed to create book");
      });
  };

  return (
    <div className="container mt-2">
      <BackToPrev
        className={"mb-2"}
        path={"/dashboard/user/books"}
        title={"Back"}
      ></BackToPrev>
      <h2>Create Book</h2>

      {/* form */}
      <AddForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        bookDetails={bookDetails}
        categories={categories}
        handleFileChange={handleFileChange}
        handleCategoryChange={handleCategoryChange}
        isBookPosting={isBookPosting}
      ></AddForm>
    </div>
  );
};

export default UserAddBooks;
