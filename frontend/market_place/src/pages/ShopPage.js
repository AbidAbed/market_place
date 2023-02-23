import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItemToCart, setCurrentPath } from "../store/storeInterface";
import { addItemToCart, searchItem } from "../store/storeInterface";
import Notification from "../components/Notification";
import ItemsList from "../components/ItemsList";
import shopItemShowSetup from "../hooks/shop-item-show-setup";
import shopItemSnippetSetup from "../hooks/shop-item-snippet-setup";
import Search from "../components/Search";
function ShopPage({ className }) {
  const [notificationShow, setNotificationShow] = useState();
  const dispatch = useDispatch();
  let [items, searchItems, { currentPath }] = useSelector((state) => {
    return [state.items, state.searchItems, state.config];
  });
  const [renderedItems, setRendredItems] = useState(items);
  const [content, setContent] = useState(<h1>No items exist</h1>);
  const [isSearching, setIsSearching] = useState(false);
  function handleSearch(event) {
    if (event.target.value) {
      setIsSearching(true);
      if (items.length) {
        dispatch(searchItem({ items: items, title: event.target.value }));
      } else {
        content = <h1>No such items exists</h1>;
      }
    } else {
      setIsSearching(false);
      setRendredItems(items);
    }
  }
  function addToCart(event, id) {
    event.preventDefault();
    const item = items.reduce((acc, curr) => {
      if (curr.id === id) acc = { ...curr };
      return acc;
    }, {});
    let notificationContent = `${item.title} is added to cart successfully`;
    if (item.amount !== 0) {
      dispatch(addItemToCart(item));
    } else {
      notificationContent = "Item is out of stock";
    }
    dispatch(removeItemToCart(item));
    setNotificationShow(
      <Notification
        text={notificationContent}
        onChange={handleNotificationClick}
      />
    );
    setTimeout(() => {
      setNotificationShow(null);
    }, 3000);
  }
  useEffect(() => {
    if (isSearching) {
      setRendredItems(searchItems);
    }
  }, [searchItems, isSearching]);
  useEffect(() => {
    if (!isSearching) setRendredItems(items);
  }, [items]);
  useEffect(() => {
    if (renderedItems.length !== 0) {
      setContent(
        <>
          <ItemsList
            onChange={addToCart}
            parentPath="/shop"
            items={renderedItems}
            buttonText="Add to cart"
            itemShowSetup={shopItemShowSetup}
            itemSnippetSetup={shopItemSnippetSetup}
            clickable={true}
          />
        </>
      );
    } else {
      setContent(<h1 className="text-yellow-400 font-bold">No items exist</h1>);
    }
  }, [renderedItems]);
  function handleNotificationClick(event) {
    dispatch(setCurrentPath("/cart"));
  }
  return (
    <div className="flex flex-col h-screen items-center space-y-4">
      <div>
        {currentPath === "/shop" ? 
        <Search onChange={handleSearch} /> : false}
      </div>
      {content}
      <div>{notificationShow}</div>
    </div>
  );
}

export default ShopPage;
