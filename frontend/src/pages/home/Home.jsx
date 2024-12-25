import { useGetBooksQuery } from "../../features/books/booksApi";
import { If, Then, Else } from "react-if";
import FilteredBooks from "./FilteredBooks";
import useFilterBooks from "./useFilterBooks";
import SomethingWentWrong from "../../components/cards/error/SomethingWentWrong";
import InputSearch from "../../components/ui/InputSearch";
import Loader from "../../components/loader/Loader";

function Home() {
  const { data, isLoading, isError } = useGetBooksQuery();
  const { filteredBooks, setSearchQuery, groupedBooks, searchQuery } =
    useFilterBooks(data);

  if (isError) {
    return <SomethingWentWrong></SomethingWentWrong>;
  }

  if (isLoading || !groupedBooks) {
    return <Loader />;
  }

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <InputSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        ></InputSearch>
      </div>

      <If condition={Object.keys(filteredBooks).length > 0}>
        <Then>
          {Object.keys(filteredBooks).map((categoryName) => (
            <FilteredBooks
              key={categoryName}
              filteredBooks={filteredBooks}
              categoryName={categoryName}
            ></FilteredBooks>
          ))}
        </Then>
        <Else>
          <div className="text-center mt-5">
            <h4>No books found</h4>
          </div>
        </Else>
      </If>
    </div>
  );
}

export default Home;
