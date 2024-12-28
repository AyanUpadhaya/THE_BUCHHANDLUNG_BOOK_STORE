import { useGetBooksQuery } from "../../features/books/booksApi";
import { If, Then, Else } from "react-if";
import SomethingWentWrong from "../../components/cards/error/SomethingWentWrong";
import Loader from "../../components/loader/Loader";
import BooksList from "./BooksList";

function Home() {
  const { data, isLoading, isError } = useGetBooksQuery();

  if (isError) {
    return <SomethingWentWrong></SomethingWentWrong>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <h3>Featured</h3>
      </div>

      <If condition={data.length > 0}>
        <Then>{data && <BooksList data={data}></BooksList>}</Then>
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
