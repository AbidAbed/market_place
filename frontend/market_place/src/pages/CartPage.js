import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPurchase,
  removeAll,
  removeCartItem,
  returnItemFromCart,
  setCurrentPath,
  usePostLogoutMutation,
  usePostPurchasesMutation,
} from "../store/storeInterface";
import ItemsList from "../components/ItemsList";
import cartItemShowSetup from "../hooks/cart-item-show-setup";
import cartItemSnippetSetup from "../hooks/cart-item-snippet-setup";
import Notification from "../components/Notification";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { FaCashRegister } from "react-icons/fa";
function CartPage() {
  const [notificationShow, setNotificationShow] = useState();
  const [postPurchasesMutation, postPurchasesResult] =
    usePostPurchasesMutation();
  const [cartItems, userId, { isLoggedIn }] = useSelector((state) => [
    state.cart,
    state.user.id,
    state.config,
  ]);
  const dispatch = useDispatch();
  function handleRemoveCartItem(event, id) {
    const cartItem = cartItems.reduce((acc, curr) => {
      if (curr.id === id) acc = { ...curr };
      return acc;
    }, {});
    const notificationContent = `${cartItem.title} is removed from cart successfully`;
    dispatch(removeCartItem(cartItem));
    dispatch(returnItemFromCart(cartItem));
    setNotificationShow(<Notification text={notificationContent} />);
    setTimeout(() => {
      setNotificationShow(null);
    }, 3000);
  }
  function handleConfirm(event) {
    event.preventDefault();
    document.body.classList.remove("overflow-hidden");
    if (isLoggedIn) {
      //to do purchasing
      const purchases = { userId };
      const items = cartItems.map((obj) => {
        return { id: obj.id, amountPurchased: obj.amountPurchased };
      });
      purchases.items = [...items];

      postPurchasesMutation(purchases);
    } else {
      dispatch(setCurrentPath("/login"));
    }
    setNotificationShow(<></>);
  }
  function handleCancel(event) {
    setNotificationShow(<></>);
    document.body.classList.remove("overflow-hidden");
  }
  function handlePurchaseClick(event) {
    document.body.classList.add("overflow-hidden");
    setNotificationShow(
      <Modal>
        <div>
          <h1 className="text-3xl font-bold mb-4 text-bold">
            PLEASE CONFIRM YOUR PURCHASE
          </h1>
        </div>
        <div className="absolute flex flex-row space-x-4 fixed bottom-0 right-0 m-8">
          <div>
            <Button
              text="CONFIRM"
              onChange={handleConfirm}
              className="mx-2 px-4 my-4 font-bold  py-2 bg-yellow-400 text-balck rounded-full shadow-md hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-300"
            />
          </div>
          <div>
            <Button
              text="CANCEL"
              onChange={handleCancel}
              className="mx-2 px-4 my-4 font-bold  py-2 bg-yellow-400 text-balck rounded-full shadow-md hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-300"
            />
          </div>
        </div>
      </Modal>
    );
    event.preventDefault();
  }
  useEffect(() => {
    if (
      !postPurchasesResult.isLoading &&
      !postPurchasesResult.isUninitialized
    ) {
      if (!postPurchasesResult.isError) {
        dispatch(addPurchase(postPurchasesResult.data));
        dispatch(removeAll([]));
        dispatch(setCurrentPath("/purchased"));
        const text = `All cart items are purchased , Thank you`;
        setNotificationShow(<Notification text={text} />);
      } else {
        const text = `Error while purchasing  ${postPurchasesResult.error}`;
        setNotificationShow(<Notification text={text} />);
      }
    }
  }, [postPurchasesResult, postPurchasesResult.isLoading]);
  let content = <></>;
  if (cartItems.length !== 0) {
    content = (
      <>
        <div className="flex place-content-center items-center col-span-full">
          <Button
            text="Purchase"
            onChange={handlePurchaseClick}
            className="mx-2 px-4 my-4 font-bold  py-2 bg-yellow-400 text-balck rounded-full shadow-md hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-300"
          >
            <FaCashRegister />
          </Button>
        </div>
        <ItemsList
          onChange={handleRemoveCartItem}
          parentPath="/cart"
          items={cartItems}
          buttonText="Remove item"
          itemShowSetup={cartItemShowSetup}
          itemSnippetSetup={cartItemSnippetSetup}
          clickable={false}
        />
      </>
    );
  } else {
    content = (
      <div className="flex place-content-center items-center col-span-full">
        <h1 className="text-yellow-800 italic">Cart is empty</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-row grid grid-cols-5 gap-4 h-screen items-center  scroll-smooth">
      {content}
      <div>{notificationShow}</div>
    </div>
  );
}
export default CartPage;
