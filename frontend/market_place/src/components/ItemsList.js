import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPath } from "../store/storeInterface";
import { BsFillCartPlusFill } from "react-icons/bs";
import { BsCartX } from "react-icons/bs";
import Button from "../components/Button";
import Item from "../components/Item";
import DataForm from "../components/DataForm";
function ItemsList({
  className,
  onChange,
  parentPath,
  items,
  buttonText,
  itemShowSetup,
  clickable,
  itemSnippetSetup,
}) {
  const [renderedItems, setRenderedItems] = useState([]);
  const { currentPath } = useSelector((state) => {
    return state.config;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if (items.length && currentPath === parentPath) {
      const initialRenderedItems = items.map((obj) => (
        <div
          key={obj.id}
          className="hover:bg-gray-300 text-black font-bold border-gray-500  bg-gray-200 border-2 
          rounded px-8 pt-6 pb-8 mb-4 py-2 px-4 rounded transition duration-500 ease-in-out 
          cursor-pointer italic  p-4 hover:shadow-2xl"
        >
          <Item
            item={obj}
            onChange={
              clickable
                ? (event) => handleItemClick(event, obj.id)
                : (event) => onChange(event, obj.id)
            }
            itemSnippetSetup={itemSnippetSetup}
          >
            <Button
              text={buttonText}
              onChange={(event) => onChange(event, obj.id)}
              className="mx-2 px-4 my-4 py-2 hover:bg-yellow-600 active:bg-yellow-700 
              focus:outline-none focus:ring focus:ring-yellow-300 bg-yellow-600 hover:bg-yellow-800 
              text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {clickable ? <BsFillCartPlusFill /> : <BsCartX />}
            </Button>
          </Item>
        </div>
      ));
      setRenderedItems(initialRenderedItems);
    }
  }, [currentPath, items]);

  function handleItemClick(event, id) {
    event.preventDefault();
    const [item] = items.filter((obj) => obj.id === id);
    dispatch(setCurrentPath(`${currentPath}/${id}`));
    setRenderedItems([
      <DataForm
        key={id}
        formSkeleton={itemShowSetup(item)}
        onChange={onFormSubmit}
      />,
    ]);
    function onFormSubmit(event, state) {
      onChange(event, id);
      dispatch(setCurrentPath(parentPath));
    }
  }
  return <>{renderedItems}</>;
}

export default ItemsList;
