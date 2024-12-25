const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    order_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //stores are which stores from where the user ordered books
    stores: [
      {
        store_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Store",
          required: true,
        },
        books: [
          {
            book_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Book",
              required: true,
            },
            qty: { type: Number, required: true },
            price: { type: Number, required: true }, // Price per book
          },
        ],
        total_price: { type: Number, required: true }, // Total price for books in this store
        status: {
          type: String,
          enum: ["pending", "completed", "cancelled"],
          default: "pending",
        },
      },
    ],
    overall_total_price: { type: Number, required: true }, // Total price for all stores
    payment_method: { type: String, default: "Cash on Delivery" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
