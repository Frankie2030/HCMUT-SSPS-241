// import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "./slices/apiSlice";
// import authReducer from "./slices/authSlice";

// const store = configureStore({
//   reducer: { [apiSlice.reducerPath]: apiSlice.reducer, auth: authReducer },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
//   devTools: true,
// });

// export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import { buyingLogApi } from "./slices/buyingLogApiSlice";
// import authReducer from "./slices/authSlice";

// const store = configureStore({
//   reducer: {
//     [buyingLogApi.reducerPath]: buyingLogApi.reducer, // Add the reducer
//     auth: authReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(buyingLogApi.middleware), // Add middleware
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice"; // Your RTK Query API slice
import authReducer from "./slices/authSlice";
import { buyingLogApi } from "./slices/buyingLogApiSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [buyingLogApi.reducerPath]: buyingLogApi.reducer, // Add buyingLogApi reducer
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware) // Add api middleware
      .concat(buyingLogApi.middleware), // Add buyingLogApi middleware
  devTools: true,
});

export default store;
