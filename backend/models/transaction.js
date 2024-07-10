import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
