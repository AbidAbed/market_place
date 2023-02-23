import { useGetPurchasesQuery, fetchPurchases } from "../store/storeInterface";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
function useFetchPurchases() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => {
    return state.user.id;
  });
  const { data, error, isLoading, isUninitialized } =
    useGetPurchasesQuery(userId);

  useEffect(() => {
    if (!isLoading && !isUninitialized) {
      if (!error) {
        dispatch(fetchPurchases(data));
      }
    }
  }, [isLoading, data, error]);
}
export default useFetchPurchases;
