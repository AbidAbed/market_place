import { useFetchItemsQuery, fetchItems } from "../store/storeInterface";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
function useFetchItems() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useFetchItemsQuery();
  useEffect(() => {
    if (!(error || isLoading)) {
      dispatch(fetchItems(data));
    }
  }, [isLoading]);
}
export default useFetchItems;
