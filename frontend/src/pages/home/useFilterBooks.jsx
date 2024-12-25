import { useState, useEffect } from "react";

export default function useFilterBooks(data) {
  const [groupedBooks, setGroupedBooks] = useState({});
  const [filteredBooks, setFilteredBooks] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const groupByCategory = (data) => {
    return data.reduce((acc, book) => {
      const categoryName = book.category_id.name;
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(book);
      return acc;
    }, {});
  };

  // Group books by category whenever data changes
  useEffect(() => {
    if (data?.length > 0) {
      const grouped = groupByCategory(data);
      setGroupedBooks(grouped);
    } else {
      setGroupedBooks({});
    }
  }, [data]);

  // Filter books based on search query and groupedBooks
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredBooks(groupedBooks);
    } else {
      const result = Object.keys(groupedBooks).reduce((acc, categoryName) => {
        const filtered = groupedBooks[categoryName].filter((book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filtered.length > 0) {
          acc[categoryName] = filtered;
        }
        return acc;
      }, {});
      setFilteredBooks(result);
    }
  }, [groupedBooks, searchQuery]);

  return { filteredBooks, setSearchQuery, groupedBooks, searchQuery };
}
