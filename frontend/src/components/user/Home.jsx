import React from "react";
import { useGetAccountDetailsQuery } from "../../redux/api/accountDetailsApi";
import Loader from "../layout/Loader";
import { useGetHistoryQuery } from "../../redux/api/transactionApi";

const Home = () => {
  const { data, isLoading } = useGetAccountDetailsQuery();
  const { data: transactionData } = useGetHistoryQuery();

  if (isLoading) return <Loader />;
  return (
    <div className="mt-10 p-5">
      <div className="flex gap-5">
        <div className="card bg-neutral text-neutral-content w-full">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Balance</h2>
            <p>
              {data?.accountDetailsExist
                ? data?.accountDetails?.balance
                : "Add acount details"}
            </p>
          </div>
        </div>
        <div className="card bg-neutral text-neutral-content w-full">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Total Transactions</h2>
            <p>{transactionData?.transactions?.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
