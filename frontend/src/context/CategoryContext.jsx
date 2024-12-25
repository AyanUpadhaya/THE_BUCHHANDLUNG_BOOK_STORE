
import { createContext, useCallback, useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";

export const CategoryContext = createContext(null);

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { axiosInstance, BASE_URL } = useAxios();

  // Fetch all categories

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch categories");
      throw new Error(
        err.response?.data?.message || "Failed to fetch categories"
      );
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]);

  // Create a new category
  const createCategory = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/categories", data);
      setCategories((prevCategories) => [
        ...prevCategories,
        response.data.data,
      ]);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create category");
      throw new Error(
        err.response?.data?.message || "Failed to create category"
      );
    } finally {
      setLoading(false);
    }
  };

  // Update a category
  const updateCategory = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`/categories/${id}`, data);
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === id ? response.data.data : category
        )
      );

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update category");
      throw new Error(
        err.response?.data?.message || "Failed to update category"
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete a category
  const deleteCategory = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.delete(`/categories/${id}`);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete category");

      throw new Error(
        err.response?.data?.error?.message || "Failed to delete category"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories on mount
  useEffect(() => {
    if (categories.length == 0) {
      fetchCategories();
    }
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        error,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
