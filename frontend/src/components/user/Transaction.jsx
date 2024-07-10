import React, { useEffect, useState } from "react";
import { useCreateTransactionMutation } from "../../redux/api/transactionApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("deposit");
  const [amount, setAmount] = useState("");
  const [createTransaction, { error, isSuccess }] =
    useCreateTransactionMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(
        type === "deposit" ? amount + "deposited" : amount + "withdraw"
      );
      navigate("/");
    }
  }, [error, isSuccess]);
  const handleSubmit = (e) => {
    e.preventDefault();
    createTransaction({ type, amount });
  };
  return (
    <div className="flex gap-3 p-2 ">
      <input
        type="radio"
        name="type"
        className="radio"
        defaultChecked
        onChange={() => setType("deposit")}
      />
      <p>Deposit</p>
      <input
        type="radio"
        name="type"
        className="radio"
        onChange={() => setType("withdraw")}
      />
      <p>Withdraw</p>
      {type === "deposit" && (
        <div className="card bg-base-100 shadow-xl flex-1">
          <div className="card-body">
            <h2 className="card-title">Deposit Amount</h2>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <input
                type="number"
                className="input input-bordered w-full"
                onChange={(e) => setAmount(e.target.value)}
              />
              <button className="btn btn-primary">Deposit</button>
            </form>
          </div>
        </div>
      )}

      {type === "withdraw" && (
        <div className="card bg-base-100 shadow-xl flex-1">
          <div className="card-body">
            <h2 className="card-title">Withdraw Amount</h2>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <input
                type="number"
                className="input input-bordered w-full"
                onChange={(e) => setAmount(e.target.value)}
              />
              <button className="btn btn-primary">Withdraw</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
