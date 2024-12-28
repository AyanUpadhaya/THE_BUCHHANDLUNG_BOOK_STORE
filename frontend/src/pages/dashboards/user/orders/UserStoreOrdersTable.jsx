import React from "react";
import useOrders from "../../../../hooks/useOrders";
import TickIcon from "../../../../components/dashboard/icons/TickIcon";
import CancelIcon from "../../../../components/dashboard/icons/CancelIcon";
import useLoadUser from "../../../../hooks/useLoadUser";

const UserStoreOrdersTable = ({ orders = [] }) => {
  const { updateOrderStatus, error, statusUpdating } = useOrders();
  const { user } = useLoadUser();

  const handleStatusUpdate = (id, status, storeId) => {
    updateOrderStatus(id, status, storeId);
  };

  function matchUserStoreId(item) {
    return item.store_id === user.store_id;
  }

  return (
    <div>
      <div className="table-responsive rounded">
        <table className="table table-bordered rounded">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Books Ordered</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) =>
              order?.stores?.filter(matchUserStoreId)?.map((store) => (
                <tr key={`${order?._id}-${store?._id}`}>
                  <td>{order?._id}</td>
                  <td>{order?.order_by?.name}</td>
                  <td>
                    {store.books.map((book) => (
                      <div key={book?.book_id?._id}>
                        <strong>Title:</strong> {book?.book_id?.title}
                        <br />
                        <strong>Quantity:</strong> {book?.qty}
                        <br />
                        <strong>Price:</strong> ${book?.price}
                        <hr />
                      </div>
                    ))}
                  </td>
                  <td>€{store?.total_price}</td>
                  <td>{store?.status}</td>
                  <td>{order?.payment_method}</td>
                  <td>{new Date(order?.createdAt).toLocaleDateString()}</td>
                  <td
                    rowSpan={order?.stores?.length}
                    className="d-flex flex-column gap-1 h-full"
                  >
                    <button
                      disabled={
                        store.status == "completed" ||
                        store.status == "cancelled" ||
                        statusUpdating
                      }
                      onClick={() =>
                        handleStatusUpdate(
                          order?._id,
                          "completed",
                          store.store_id
                        )
                      }
                      className="btn btn-sm btn-dark"
                    >
                      <TickIcon />
                    </button>
                    <br />
                    <button
                      disabled={
                        order.status == "completed" ||
                        order.status == "cancelled" ||
                        statusUpdating
                      }
                      onClick={() =>
                        handleStatusUpdate(order?._id, "cancelled")
                      }
                      className="btn btn-sm btn-danger"
                    >
                      <CancelIcon />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserStoreOrdersTable;
