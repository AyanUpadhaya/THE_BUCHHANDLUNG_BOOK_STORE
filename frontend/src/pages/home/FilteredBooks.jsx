import React from "react";
import BookCard from "../../components/cards/book/BookCard";

export default function FilteredBooks({ filteredBooks, categoryName }) {
  return (
    <div key={categoryName} className="mb-5">
      <h3 className="text-dark">{categoryName}</h3>
      <div className="row">
        {filteredBooks[categoryName].map((book) => (
          <BookCard book={book} key={book?._id}></BookCard>
        ))}
      </div>
    </div>
  );
}
