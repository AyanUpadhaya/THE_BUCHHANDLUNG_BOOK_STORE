import React from "react";
import { useNavigate } from "react-router-dom";

export default function BookCard({ book }) {
  const navigate = useNavigate();
  const truncate = (text) => {
    return text.length > 34 ? text.slice(0, 34) + "..." : text;
  };
  return (
    <div key={book._id} className="mb-2">
      <div className="card">
        <img
          src={book.cover_photo}
          className="card-img-top"
          alt={book.title}
          style={{ height: "300px" }}
        />
        <div className="card-body card-body-x">
          <div className="text-section">
            <h5 className="card-title fw-bold truncate">{book.title}</h5>
            <p className="card-text">Author: {book.author}</p>
          </div>
          <div className="cta-section d-flex ">
            <p className="card-text">€{book.price}</p>
            <button
              onClick={() => navigate(`book_details/${book._id}`)}
              className="btn btn-dark"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
