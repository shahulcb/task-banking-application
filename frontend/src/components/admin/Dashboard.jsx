import React, { useEffect } from "react";
import {
  useActivateOrDeactivateUserMutation,
  useGetUsersQuery,
} from "../../redux/api/adminApi";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { data, isLoading } = useGetUsersQuery();

  const [
    activateOrDeactivateUser,
    { error, isSuccess, data: activateOrDeactivateData },
  ] = useActivateOrDeactivateUserMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success(
        activateOrDeactivateData?.user?.disabled
          ? "User Disabled"
          : "User Enabled"
      );
    }
  }, [error, isSuccess]);

  if (isLoading) return <Loader />;
  return (
    <div>
      <div className="overflow-x-auto my-10">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.users?.map((user, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td className="flex gap-5">
                  <Link className="text-blue-600" to={`users/${user?._id}`}>
                    see full details
                  </Link>
                  {user?.disabled ? (
                    <button
                      className="text-green-600"
                      onClick={() => activateOrDeactivateUser(user?._id)}
                    >
                      Enable
                    </button>
                  ) : (
                    <button
                      className="text-red-600"
                      onClick={() => activateOrDeactivateUser(user?._id)}
                    >
                      Disable
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
