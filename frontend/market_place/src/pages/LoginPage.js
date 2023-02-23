import { useEffect, useState } from "react";
import { useFetchUserMutation } from "../store/APIs/userApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../store/storeInterface";
import { setCurrentPath, setIsLoggedIn } from "../store/storeInterface";
import Button from "../components/Button";
import UserForm from "../components/DataForm";
import Notification from "../components/Notification";
function LoginPage() {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [notificationContent, setNotificationContent] = useState(<></>);
  const [fetchUserMutation, result] = useFetchUserMutation();
  const formData = [
    {
      text: "Please Enter Your Email",
      label: "email",
      type: "email",
      required: true,
      readOnly: false,
    },
    {
      text: "Please Enter Your Password",
      label: "password",
      type: "password",
      required: true,
      readOnly: false,
    },
    {
      body: (
        <div className="flex items-center justify-between mt-6">
          <Button
            className="bg-yellow-600 hover:bg-yellow-800 text-white 
      font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            text="Login"
          />
        </div>
      ),
    },
  ];

  function handleFormSubmit(event, state) {
    event.preventDefault();
    const { email, password } = state;
    fetchUserMutation({ email, password });
    setNotificationContent(null);
  }
  /*why useEffect?
    it's wrong to rerender when the user didn't interact with the page, if you do so
    and rerender a component outside an eventhandler , this might cause the current 
    rendring component to rerender while it's rendering which might lead to infinte rendring 
    just a note i struggled  with this to find the solution :((
   */
  useEffect(() => {
    let text = "";
    if (!result.isUninitialized && !result.isLoading) {
      if (result.isSuccess) {
        text = `Welcome , ${result.data.email}`;
        setTimeout(() => {
          dispatch(fetchUser(result.data));
          dispatch(setIsLoggedIn(true));
          dispatch(setCurrentPath("/shop"));
        }, 2000);
      } else {
        setErrors(result.error.data);
        text = `Error While logging in`;
      }
      setNotificationContent(<Notification text={text} />);
    }
    return () => {
      result.reset();
    };
  }, [result]);

  return (
    <div className="relative">
      <div>
        <UserForm
          formSkeleton={formData}
          onChange={handleFormSubmit}
          errors={errors}
        />
      </div>
      {notificationContent}
    </div>
  );
}
export default LoginPage;
