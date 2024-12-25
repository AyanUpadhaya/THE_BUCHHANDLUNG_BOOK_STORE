export default function SomethingWentWrong({
  error = "Something went wrong 🥵",
}) {
  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="card">
        <div className="card-body p-5">
          <h2>{error} </h2>
        </div>
      </div>
    </div>
  );
}
