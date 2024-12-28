import React from "react";
import BackToPrev from "../../../../components/dashboard/shared/BackToPrev";
import { useNavigate, useLocation } from "react-router-dom";
import { useUpdateCategoryMutation } from "../../../../features/categories/categoriesApi";
import { ErrorNotify, SuccessNotify } from "../../../../utils/NotifyContainer";

const AdminUpdateCategory = () => {
  const [updateCategory, { isError, isLoading }] = useUpdateCategoryMutation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { payload, type } = state || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const categoryName = form.name.value;
    if (categoryName == payload?.name) {
      ErrorNotify("No changes made");
      return;
    }

    updateCategory({ updateData: { name: categoryName }, id: payload._id })
      .unwrap()
      .then(() => {
        SuccessNotify("Category has been updated");
        navigate("/dashboard/admin/categorys");
      })
      .catch((error) => {
        ErrorNotify(
          error?.response?.data?.message || "Failed to update category"
        );
      });
  };
  return (
    <div className="py-2">
      <BackToPrev path={"/dashboard/admin/categorys"} title={"Back"} />
      <div className="d-flex flex-column justify-content-between gap-3 p-3 ">
        <div>
          <h2>Update Category</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              defaultValue={payload?.name}
              type="text"
              className="form-control"
              name="name"
            />
            <br />
            <button disabled={loading} className="btn btn-dark">
              {isLoading ? "Submiting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateCategory;
