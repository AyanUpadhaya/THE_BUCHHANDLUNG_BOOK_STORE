import React, { useState } from "react";
import AdminCategoryTable from "./AdminCategoryTable";
import Loader from "../../../../components/loader/Loader";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../../../features/categories/categoriesApi";
import SomethingWentWrong from "../../../../components/cards/error/SomethingWentWrong";
import RequestLoader from "../../../../components/modals/RequestLoader";
import { ErrorNotify, SuccessNotify } from "../../../../utils/NotifyContainer";
import { useNavigate } from "react-router-dom";

const AdminCategorys = () => {
  const [isAscending, setIsAscending] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  //sort by timestamp
  const sortByTime = (a, b) => {
    if (isAscending) {
      return a.timestamp - b.timestamp;
    } else {
      return b.timestamp - a.timestamp;
    }
  };

  //search filter

  const filterBySearch = (data, searchValue) => {
    if (searchValue.trim().length > 0) {
      return data?.name?.toLowerCase().startsWith(searchValue?.toLowerCase());
    } else {
      return true;
    }
  };
  const {
    data: categories,
    isLoading,
    error,
    isError,
  } = useGetCategoriesQuery();

  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const handleDelete = (id) => {
    deleteCategory(id)
      .unwrap()
      .then(() => {
        SuccessNotify("Category deleted");
      })
      .catch((error) => {
        console.log(error);
        ErrorNotify(error?.data?.message || "Failed to delete category");
      });
  };

  const filteredData =
    categories &&
    [...categories]
      ?.sort(sortByTime)
      ?.filter((item) => filterBySearch(item, searchValue));

  if (isError) {
    return <SomethingWentWrong></SomethingWentWrong>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-100 h-100">
      <div className="d-flex flex-column justify-content-between gap-3 ">
        <div className="d-flex justify-content-between gap-3 align-items-center">
          <div>
            <h2>Categories </h2>
          </div>
          <div>
            <button
              onClick={() => navigate("add")}
              className="btn btn-md btn-success"
            >
              +Add
            </button>
          </div>
        </div>

        <div>
          <div className="w-full d-flex justify-content-between gap-2 mb-3">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search..."
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
          </div>
          <AdminCategoryTable
            data={filteredData}
            handleDelete={handleDelete}
          ></AdminCategoryTable>

          {isDeleting && <RequestLoader></RequestLoader>}
        </div>
      </div>
    </div>
  );
};

export default AdminCategorys;
