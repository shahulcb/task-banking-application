import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import AccountDetails from "../models/accountDetails.js";

export const createAccountDetails = catchAsyncErrors(async (req, res, next) => {
  const { accountHolderName, accountNumber, bankName, branch, ifscCode } =
    req.body;
  const accountDetails = await AccountDetails.create({
    user: req?.user?._id,
    accountHolderName,
    accountNumber,
    bankName,
    branch,
    ifscCode,
  });
  res.status(202).json({
    accountDetails,
  });
});

export const deleteAccountDetails = catchAsyncErrors(async (req, res, next) => {
  const accountDetails = await AccountDetails.findOneAndDelete({
    user: req?.user?._id,
    _id: req?.params?.id,
  });
  console.log("🚀 ~ deleteAccountDetails ~ req?.query?.id:", req?.query?.id);
  if (!accountDetails) {
    return next(new ErrorHandler("No account details with this id", 404));
  }
  res.status(200).json({
    success: true,
  });
});

export const getAccountDetails = catchAsyncErrors(async (req, res, next) => {
  let accountDetailsExist = false;
  const accountDetails = await AccountDetails.findOne({ user: req?.user?._id });
  if (accountDetails) {
    accountDetailsExist = true;
  }
  res.status(200).json({
    accountDetails,
    accountDetailsExist,
  });
});
