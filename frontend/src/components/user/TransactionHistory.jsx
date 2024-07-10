import React from "react";
import { useGetHistoryQuery } from "../../redux/api/transactionApi";
import Loader from "../layout/Loader";

const TransactionHistory = () => {
  const { data, isLoading } = useGetHistoryQuery();

  if (isLoading) return <Loader />;
  return (
    <div>
      <h3>Transactin History</h3>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data?.transactions?.map((transaction, index) => (
              <tr className="bg-base-200">
                <th>{transaction?._id}</th>
                <td>{transaction?.type}</td>
                <td>{transaction?.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
