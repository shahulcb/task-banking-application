import React, { useEffect, useState } from "react";
import {
  useAddAccountDetailsMutation,
  useDeleteAccountDetailsMutation,
  useGetAccountDetailsQuery,
} from "../../redux/api/accountDetailsApi";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";

const AccountDetails = () => {
  const { data, isLoading } = useGetAccountDetailsQuery();
  const [addAccountDetails, { error, isSuccess }] =
    useAddAccountDetailsMutation();

  const [
    deleteAccountDetails,
    { error: deleteError, isSuccess: deleteIsSuccess },
  ] = useDeleteAccountDetailsMutation();
  const [accountData, setAccountData] = useState({
    accountHolderName: "",
    accountNumber: "",
    bankName: "",
    branch: "",
    ifscCode: "",
  });
  const { accountHolderName, accountNumber, bankName, branch, ifscCode } =
    accountData;

  const onChange = (e) => {
    setAccountData({ ...accountData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Account Details added");
    }
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (deleteIsSuccess) {
      toast.success("Account Details deleted");
    }
  }, [error, isSuccess, deleteError, deleteIsSuccess]);

  useEffect(() => {
    if (data?.accountDetailsExist) {
      setAccountData({ ...data?.accountDetails });
    }
  }, [data]);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      accountHolderName,
      accountNumber,
      bankName,
      branch,
      ifscCode,
    };
    addAccountDetails(data);
  };
  const handleDelete = (id) => {
    deleteAccountDetails(id);
  };
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col items-center">
      <h2 className="my-4">Account Details</h2>
      {!data?.accountDetailsExist ? (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Add account details
        </button>
      ) : (
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <p>Account Holder Name : {accountHolderName}</p>
            <p>Account Number : {accountNumber}</p>
            <p>Bank Name : {bankName}</p>
            <p>Branch : {branch}</p>
            <p>IFSC Code : {ifscCode}</p>
          </div>
          <button
            onClick={() => handleDelete(data?.accountDetails?._id)}
            className="btn btn-error btn-sm"
          >
            Delete
          </button>
        </div>
      )}

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              id="close"
            >
              ✕
            </button>
          </form>
          <p className="my-3">Account Details</p>
          <form className="flex gap-3 flex-col" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Account Holder Name"
              className="input input-bordered w-full"
              name="accountHolderName"
              value={accountHolderName}
              onChange={onChange}
            />
            <input
              type="text"
              placeholder="Account Number"
              className="input input-bordered w-full"
              name="accountNumber"
              value={accountNumber}
              onChange={onChange}
            />
            <input
              type="text"
              placeholder="Bank Name"
              className="input input-bordered w-full"
              name="bankName"
              value={bankName}
              onChange={onChange}
            />
            <input
              type="text"
              placeholder="Branch"
              className="input input-bordered w-full"
              name="branch"
              value={branch}
              onChange={onChange}
            />
            <input
              type="text"
              placeholder="IFSC Code"
              className="input input-bordered w-full"
              name="ifscCode"
              value={ifscCode}
              onChange={onChange}
            />
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AccountDetails;
