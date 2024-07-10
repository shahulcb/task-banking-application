import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { adminApi } from "./api/adminApi";
import { accountDetailsApi } from "./api/accountDetailsApi";
import { transactionApi } from "./api/transactionApi";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [accountDetailsApi.reducerPath]: accountDetailsApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      adminApi.middleware,
      accountDetailsApi.middleware,
      transactionApi.middleware,
    ]),
});
