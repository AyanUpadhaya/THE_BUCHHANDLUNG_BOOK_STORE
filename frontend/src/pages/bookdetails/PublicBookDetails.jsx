import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackToPrev from "../../components/dashboard/shared/BackToPrev";
import useCart from "../../hooks/useCart";
import { useGetSingleBookQuery } from "../../features/books/booksApi";
import Loader from "../../components/loader/Loader";
import SomethingWentWrong from "../../components/cards/error/SomethingWentWrong";

const PublicBookDetails = () => {
  const { book_id } = useParams();

  const { cart, addToCart } = useCart();

  const {
    data: book,
    error,
    isError,
    isLoading,
  } = useGetSingleBookQuery(book_id);

  if (isLoading) return <Loader></Loader>;

  if (isError) return <SomethingWentWrong></SomethingWentWrong>;

  return (
    <div className="container mt-4 py-4">
      <BackToPrev className={"mb-2"} path={"/"} title={"Back"}></BackToPrev>

      <div className="row">
        <div className="col-md-4">
          <img
            src={book?.cover_photo}
            className="img-fluid rounded-start"
            alt={book?.title}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{book?.title}</h5>
            <br />
            <div>
              <button
                disabled={cart.includes(book._id)}
                onClick={() => addToCart(book._id)}
                className="btn btn-success custom-bg"
              >
                {cart.includes(book._id) ? "Added to Cart" : "Add to Cart "}
              </button>
            </div>
            <br />
            <p className="card-text">
              <strong>Author:</strong> {book?.author}
              <br />
              <strong>Category:</strong> {book?.category_id?.name || "N/A"}
              <br />
              <strong>Published Date:</strong>{" "}
              {book?.published_date
                ? new Date(book?.published_date).toLocaleDateString()
                : "N/A"}
              <br />
              <strong>Language:</strong> {book?.language}
            </p>
            <p className="card-text">
              <strong>About:</strong> {book?.about}
            </p>
            <p className="card-text">
              <strong>Quantity:</strong> {book?.qty}
              <br />
              <strong>Tags:</strong> {book?.tags?.join(", ")}
            </p>

            <p className="card-text">
              <strong>Price:</strong> €{book?.price}
              <br />
              <strong>Sell Price:</strong> €{book?.sell_price}
            </p>

            <p className="card-text">
              <small className="text-muted">
                Created on {new Date(book?.createdAt).toLocaleDateString()}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicBookDetails;
