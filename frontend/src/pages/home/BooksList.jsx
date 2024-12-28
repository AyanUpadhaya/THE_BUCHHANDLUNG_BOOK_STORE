import React from "react";
import BookCard from "../../components/cards/book/BookCard";

export default function BooksList({data}) {
  return (
    <div className="row">
      {data.map((book) => (
        <div className="col-md-4">
          <BookCard book={book} key={book?._id}></BookCard>
        </div>
      ))}
    </div>
  );
}
