import React, { useState, useEffect, useCallback } from "react";
import BackToPrev from "../../../../components/dashboard/shared/BackToPrev";
import axios from "axios";
import { getToken } from "../../../../utils/getToken";
import useBooks from "../../../../hooks/useBooks";

import { useLocation, useNavigate } from "react-router-dom";
import UpdateBookForm from "./UpdateBookForm";
import { hasStateChanged } from "../../../../utils/hasStateChanged";
import { useGetCategoriesQuery } from "../../../../features/categories/categoriesApi";
import { useUpdateBookMutation } from "../../../../features/books/booksApi";
import useAuth from "../../../../hooks/useAuth";
import { ErrorNotify, SuccessNotify } from "../../../../utils/NotifyContainer";
import { hasEmptyProperties } from "../../../../utils/hasEmptyProperties";

const UserUpdateBooks = ({ onSubmit }) => {
  const { state } = useLocation();
  const { payload, type } = state || {};

  const { data: categories } = useGetCategoriesQuery();
  const [updateBook, { isLoading: isBookPosting }] = useUpdateBookMutation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [bookDetails, setBookDetails] = useState({
    title: payload?.title || "",
    author: payload?.author || "",
    about: payload?.about || "",
    published_date: payload?.published_date || "",
    language: payload?.language || "",
    qty: payload?.qty || 1,
    price: payload?.price || 0,
    sell_price: payload?.sell_price || 0,
    tags: payload?.tags?.join(", ") || "",
    category_id: payload?.category_id?._id || "",
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

    const formData = new FormData();
    // Append the book details as a JSON string
    const bookData = {
      ...bookDetails,
      tags: bookDetails.tags.split(",").map((tag) => tag.trim()), // Convert tags to an array
    };

    if (hasEmptyProperties(bookDetails)) {
      ErrorNotify("Empty data can not be sent");
      return;
    }

    //TODO: check if state has changed then allow update

    // Append the book data object as a string
    formData.append("data", JSON.stringify(bookData));
    // Append the file
    if (coverPhoto) {
      formData.append("file", coverPhoto);
    }

    updateBook({
      formData: formData,
      book_id: payload?._id,
      store_id: user?.store_id,
    })
      .unwrap()
      .then(() => {
        SuccessNotify("Book has been updated");
        navigate("/dashboard/user/books");
      })
      .catch((error) => {
        console.log(error);
        ErrorNotify(error?.response?.data?.message || "Failed to update book");
      });
  };

  return (
    <div className="container mt-2">
      <BackToPrev
        className={"mb-2"}
        path={"/dashboard/user/books"}
        title={"Back"}
      ></BackToPrev>
      <h2>Update Book</h2>

      {/* form */}
      <UpdateBookForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        bookDetails={bookDetails}
        categories={categories}
        handleFileChange={handleFileChange}
        handleCategoryChange={handleCategoryChange}
        isBookPosting={isBookPosting}
      ></UpdateBookForm>
    </div>
  );
};

export default UserUpdateBooks;
