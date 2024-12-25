export default function Loader({ size = "sm", message = "Loading..." }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="d-flex gap-2">
        <div
          className="spinner-grow"
          style={{ width: " 3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div
          className="spinner-grow"
          style={{ width: " 3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div
          className="spinner-grow"
          style={{ width: " 3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}
