import { useSelector } from "react-redux";
function useSearchItemById(id) {
  const [item] = useSelector((state) => {
    return state.items.filter((obj) => obj.id === id);
  });
  return item;
}
export default useSearchItemById