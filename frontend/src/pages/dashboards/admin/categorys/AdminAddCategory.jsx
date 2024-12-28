import React from "react";
import BackToPrev from "../../../../components/dashboard/shared/BackToPrev";
import { useNavigate } from "react-router-dom";
import { useCreateCategoryMutation } from "../../../../features/categories/categoriesApi";
import { ErrorNotify, SuccessNotify } from "../../../../utils/NotifyContainer";

const AdminAddCategory = () => {
  const [createCategory, { isLoading, isError }] = useCreateCategoryMutation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const categoryName = form.name.value;
    const data = { name: categoryName };
    createCategory(data)
      .unwrap()
      .then(() => {
        SuccessNotify("Category has been created");
        navigate("/dashboard/admin/categorys");
      })
      .catch((error) => {
        ErrorNotify(
          error?.response?.data?.message || "Failed to create category"
        );
      });
  };
  return (
    <div className="py-2">
      <BackToPrev path={"/dashboard/admin/categorys"} title={"Back"} />
      <div className="d-flex flex-column justify-content-between gap-3 p-3 ">
        <div>
          <h2>Add Category</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" className="form-control" name="name" required />
            <br />
            <button disabled={isLoading} className="btn btn-dark">
              {isLoading ? "Submiting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddCategory;
