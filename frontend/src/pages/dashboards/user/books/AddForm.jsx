import React from "react";
import CategoryDropdown from "./CategoryDropdown";

const AddForm = ({
  handleSubmit,
  bookDetails,
  handleChange,
  categories,
  handleCategoryChange,
  handleFileChange,
  isBookPosting,
}) => {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-2 max-w-lg mx-auto"
        encType="multipart/form-data"
      >
        <div className="row">
          <div className="col-12 col-md-6">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={bookDetails.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded form-control"
            />
          </div>

          {categories?.length > 0 ? (
            <CategoryDropdown
              categories={categories}
              selectedCategory={bookDetails?.category_id}
              onCategoryChange={handleCategoryChange}
              className="col-12 col-md-6 w-full"
            />
          ) : (
            <div>
              <h4>Please contact admin to create categories</h4>
            </div>
          )}
          <div className="col-12 col-md-6">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              id="author"
              placeholder="Author"
              value={bookDetails.author}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded form-control"
            />
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="language">Language</label>
            <input
              type="text"
              name="language"
              id="language"
              placeholder="language"
              value={bookDetails.language}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded form-control"
            />
          </div>
        </div>
        <div>
          <label htmlFor="about">About</label>
          <textarea
            name="about"
            id="about"
            placeholder="About the Book"
            value={bookDetails.about}
            onChange={handleChange}
            rows="3"
            required
            className="w-full p-2 border rounded form-control"
          ></textarea>
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <label htmlFor="">Published date</label>
            <input
              type="date"
              name="published_date"
              value={bookDetails.published_date}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded form-control"
            />
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="qty">Qty</label>
            <input
              type="number"
              name="qty"
              id="qty"
              placeholder="Quantity"
              value={bookDetails.qty}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded form-control"
            />
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Price"
              value={bookDetails.price}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded form-control"
            />
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="sell_price">Sale Price</label>
            <input
              type="number"
              name="sell_price"
              id="sell_price"
              placeholder="Sell Price"
              value={bookDetails.sell_price}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded form-control"
            />
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              name="tags"
              id="tags"
              placeholder="Tags (comma separated)"
              value={bookDetails.tags}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded form-control"
            />
          </div>
          <div className="col-12 col-md-6">
            <label htmlFor="file">Book cover photo</label>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full p-2 border rounded form-control"
            />
          </div>
        </div>
        <div>
          <button
            disabled={isBookPosting}
            type="submit"
            className="btn btn-primary max-w-max "
          >
            {isBookPosting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddForm;
