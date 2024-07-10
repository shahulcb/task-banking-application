import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/user.js";
import AccountDetails from "../models/accountDetails.js";
import Transaction from "../models/transaction.js";

export const getUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({ role: "user" });
  res.status(200).json({
    users,
  });
});

export const activateOrDeactivateUser = catchAsyncErrors(
  async (req, res, next) => {
    const user = await User.findById(req?.params?.id);
    if (!user) {
      return next(new ErrorHandler("User not found with this id", 404));
    }
    user.disabled = !user?.disabled;
    await user.save();
    res.status(202).json({
      user,
    });
  }
);

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req?.params?.id);
  if (!user) {
    return next(new ErrorHandler("User not found with this id", 404));
  }
  const accountDetails = await AccountDetails.findOne({ user: user._id });
  const transactions = await Transaction.find({ user: user._id });
  res.status(202).json({
    user,
    accountDetails,
    transactions,
  });
});
