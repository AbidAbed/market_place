import Modal from "./Modal";
import Button from "./Button";
import Notification from "./Notification";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPath,
  setIsLoggedIn,
  usePostLogoutMutation,
} from "../store/storeInterface";
import { useEffect, useState } from "react";
function Logout() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);
  const [postLogoutMutation, postLogoutResult] = usePostLogoutMutation();
  const [notificationContent, setNotificationContent] = useState(<></>);
  function handleCancel(event) {
    event.preventDefault();
    dispatch(setCurrentPath("/shop"));
  }
  function handleLogout(event) {
    event.preventDefault();
    postLogoutMutation(userId);
  }
  useEffect(() => {
    if (!postLogoutResult.isUninitialized && !postLogoutResult.isLoading) {
      if (postLogoutResult.isError) {
        const text = "Error while loggingout";
        setNotificationContent(<Notification text={text} />);
      } else {
        const text = "logged out successfully";
        setNotificationContent(<Notification text={text} />);
        setTimeout(() => {
          dispatch(setCurrentPath("/login"));
          dispatch(setIsLoggedIn(false));
        }, 1000);
      }
    }
  }, [postLogoutResult]);
  return (
    <div className="relative">
      <div>
        <Modal>
          <div>
            <h1 className="text-3xl font-bold mb-4 text-bold">Are youe sure ?</h1>
          </div>
          <div className="absolute flex flex-row space-x-4 fixed bottom-0 right-0 m-8">
            <div>
              <Button text="Logout" onChange={handleLogout} className="mx-2 px-4 my-4 font-bold  
              py-2 bg-yellow-400 text-balck rounded-full shadow-md hover:bg-yellow-600 active:bg-yellow-700 
              focus:outline-none focus:ring focus:ring-yellow-300"/>
            </div>
            <div>
              <Button text="Cancel" onChange={handleCancel} className="mx-2 px-4 my-4 font-bold  py-2 
              bg-yellow-400 text-balck rounded-full shadow-md hover:bg-yellow-600 active:bg-yellow-700 
              focus:outline-none focus:ring focus:ring-yellow-300"/>
            </div>
          </div>
        </Modal>
      </div>
      <div>{notificationContent}</div>
    </div>
  );
}
export default Logout;
