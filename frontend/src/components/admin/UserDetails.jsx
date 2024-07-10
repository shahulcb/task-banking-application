import React from "react";
import { useGetUserDetailsQuery } from "../../redux/api/adminApi";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";

const UserDetails = () => {
  const params = useParams();
  const { data, isLoading } = useGetUserDetailsQuery(params?.id);

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h3 className="my-5 text-lg">User Details</h3>
          <p>Name : {data?.user?.name}</p>
          <p>Email : {data?.user?.email}</p>

          <h3 className="my-5 text-lg">Account Details</h3>

          <p>Account Holder Name : {data?.accountDetails?.accountHolderName}</p>
          <p>Account Number : {data?.accountDetails?.accountNumber}</p>
          <p>Bank Name : {data?.accountDetails?.bankName}</p>
          <p>Branch : {data?.accountDetails?.branch}</p>
          <p>IFSC Code : {data?.accountDetails?.ifscCode}</p>
        </div>
      </div>
      <h3 className="my-5 text-lg">Transaction History</h3>
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

export default UserDetails;
