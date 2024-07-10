import mongoose from "mongoose";

const accountDetailsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    accountHolderName: {
      type: String,
    },
    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    ifscCode: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AccountDetails", accountDetailsSchema);
