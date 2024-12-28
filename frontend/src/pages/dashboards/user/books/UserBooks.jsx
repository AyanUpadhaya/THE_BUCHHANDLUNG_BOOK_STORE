import React from "react";
import UserBooksTable from "./UserBooksTable";
import { useNavigate } from "react-router-dom";
import useBooks from "../../../../hooks/useBooks";
import Loader from "../../../../components/loader/Loader";
import SomethingWentWrong from "../../../../components/cards/error/SomethingWentWrong";
import useAuth from "../../../../hooks/useAuth";
import {
  useDeleteBookMutation,
  useGetStoreBooksQuery,
} from "../../../../features/books/booksApi";
import RequestLoader from "../../../../components/modals/RequestLoader";
import { ErrorNotify, SuccessNotify } from "../../../../utils/NotifyContainer";

const UserBooks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    data: storeBooks,
    isError,
    isLoading,
  } = useGetStoreBooksQuery(user?.store_id);

  const [deleteBook, { isLoading: isDeleting, isError: isDeleteError }] =
    useDeleteBookMutation();

  const handleDeleteBook = (book_id) => {
    deleteBook({ book_id, store_id: user?.store_id })
      .unwrap()
      .then(() => {
        SuccessNotify("Book has been created");
        navigate("/dashboard/user/books");
      })
      .catch((error) => {
        ErrorNotify(error?.response?.data?.message || "Failed to delete book");
      });
  };

  if (isError) {
    return <SomethingWentWrong></SomethingWentWrong>;
  }

  if (isLoading) {
    return <Loader />;
  }

 

  return (
    <div className="w-100 h-100">
      <div className="d-flex flex-column justify-content-between gap-3 ">
        {/* head */}
        <div className="d-flex justify-content-between gap-3 align-items-center">
          <div>
            <h2>Books {storeBooks && storeBooks?.length}</h2>
          </div>
          <div>
            <button onClick={() => navigate("add")} className="btn btn-success">
              + Add Book
            </button>
          </div>
        </div>
        {/* table */}
        <div>
          <UserBooksTable
            handleDeleteBook={handleDeleteBook}
            data={storeBooks}
          ></UserBooksTable>
          {isDeleting && <RequestLoader></RequestLoader>}
        </div>
      </div>
    </div>
  );
};

export default UserBooks;
