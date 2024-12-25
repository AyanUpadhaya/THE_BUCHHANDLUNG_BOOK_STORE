import React from "react";

export default function InputSearch({ searchQuery, setSearchQuery, ...rest }) {
  return (
    <input
      type="text"
      className="form-control form-control-lg rounded-pill"
      placeholder="Search books by name..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      {...rest}
    />
  );
}
