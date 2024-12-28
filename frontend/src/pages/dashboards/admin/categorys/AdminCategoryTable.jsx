import React, { useEffect, useState } from "react";
import { formatToUSDate } from "../../../../utils/formatToUSDate";
import EditIcon from "../../../../components/dashboard/icons/EditIcon";
import TrashIcon from "../../../../components/dashboard/icons/TrashIcon";
import formatToLocaleDateString from "../../../../utils/formatToLocaleDateString";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import getTableIndex from "../../../../utils/getTableIndex";
import SelecLimit from "../../../../components/ui/SelecLimit";

const AdminCategoryTable = ({ navigate, data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const totalPages = Math.ceil(data?.length / rowsPerPage);

   const currentRows = data
     ? [...data].slice(indexOfFirstRow, indexOfLastRow)
     : [];

   //only solution to prevent - currentRows if 0
   useEffect(() => {
     if (currentRows.length < 1) {
       setCurrentPage(1);
     }
   }, [currentRows]);

  const handleNavigate = (item) => {
    navigate(`update`, {
      state: {
        payload: item,
        type: "edit",
      },
    });
  };
  const handleDelete = (id) => {
    deleteCategory(id)
      .then((data) => {
        if (data?.success) {
          alert("Category deleted");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Category Name</th>
            <th scope="col">Created At</th>
            <th scope="col">Updated At</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows && currentRows?.length > 0 ? (
            currentRows.map((item, idx) => (
              <tr key={item?._id}>
                <td scope="row">
                  {getTableIndex(currentPage, rowsPerPage, idx)}
                </td>
                <td>{item?.name}</td>
                <td>{formatToLocaleDateString(item?.createdAt)}</td>
                <td>{formatToLocaleDateString(item?.updatedAt)}</td>
                <td className="d-flex gap-2 align-items-center">
                  <button
                    onClick={() => handleNavigate(item)}
                    className="btn btn-primary"
                  >
                    <EditIcon></EditIcon>
                  </button>
                  <button
                    onClick={() => handleDelete(item?._id)}
                    className="btn btn-danger"
                  >
                    <TrashIcon></TrashIcon>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <>
              <tr>
                <td colSpan="7" className="text-center">
                  No category found.
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      <div
        className={` ${
          data?.length < 1 && "d-none"
        } py-2 d-flex justify-content-center align-items-center gap-1`}
      >
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
          extraClassName="justify-content-end"
        />
        <div>
          <SelecLimit onChangeLimit={setRowsPerPage}></SelecLimit>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryTable;
