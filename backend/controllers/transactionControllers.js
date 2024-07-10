import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import Transaction from "../models/transaction.js";
import AccountDetails from "../models/accountDetails.js";

export const createTransaction = catchAsyncErrors(async (req, res, next) => {
  const { amount, type } = req?.body;
  const accountDetails = await AccountDetails.findOne({ user: req?.user?._id });
  if (!accountDetails) {
    return next(new ErrorHandler("Account details not found", 404));
  }
  if (type === "deposit") {
    accountDetails.balance += Number(amount);
  }
  if (type === "withdraw") {
    if (amount > accountDetails.balance) {
      return next(new ErrorHandler("insufficient amount", 401));
    }
    accountDetails.balance -= Number(amount);
  }
  await accountDetails.save();
  const transaction = await Transaction.create({
    user: req?.user?._id,
    amount,
    type,
  });
  res.status(200).json({
    success: true,
  });
});

export const getTransactionHistory = catchAsyncErrors(
  async (req, res, next) => {
    const transactions = await Transaction.find({ user: req?.user?._id });
    res.status(200).json({
      transactions,
    });
  }
);
