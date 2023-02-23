import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { ItemsSlice } from "./slices/ItemsSlice";
import {
  fetchItems,
  removeItemToCart,
  returnItemFromCart,
} from "./slices/ItemsSlice";
import {
  useFetchItemsQuery,
  itemsApi,
  usePostPurchasesMutation,
  useGetPurchasesQuery,
} from "./APIs/itemsApi";
import { userSlice, fetchUser } from "./slices/userSLice";
import {
  configSlice,
  setCurrentPath,
  setIsLoggedIn,
} from "./slices/configSlice";
import {
  userApi,
  useFetchUserMutation,
  useAuthUserMutation,
  useAddUserMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  usePostLogoutMutation,
} from "./APIs/userApi";
import {
  cartSlice,
  addItemToCart,
  removeCartItem,
  removeAll
} from "../store/slices/cartSlice";
import {
  purchasedItemsSlice,
  fetchPurchases,
  addPurchase
} from "./slices/purchasedItemsSlice";
import { searchItemsSlice, searchItem } from "./slices/searchItemsSlice";
const store = configureStore({
  reducer: {
    items: ItemsSlice.reducer,
    user: userSlice.reducer,
    cart: cartSlice.reducer,
    config: configSlice.reducer,
    searchItems: searchItemsSlice.reducer,
    purchases: purchasedItemsSlice.reducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(itemsApi.middleware)
      .concat(userApi.middleware),
});
setupListeners(store.dispatch);
export {
  store,
  fetchItems,
  useFetchItemsQuery,
  fetchUser,
  useFetchUserMutation,
  useAuthUserMutation,
  useAddUserMutation,
  useUpdateUserMutation,
  setCurrentPath,
  setIsLoggedIn,
  useGetUserByIdQuery,
  addItemToCart,
  removeItemToCart,
  removeCartItem,
  returnItemFromCart,
  usePostLogoutMutation,
  usePostPurchasesMutation,
  fetchPurchases,
  useGetPurchasesQuery,
  searchItem,
  addPurchase,
  removeAll
};
