import { useState, useEffect } from "react";
import { useAddUserMutation } from "../store/storeInterface";
import { setCurrentPath, setIsLoggedIn } from "../store/storeInterface";
import Button from "../components/Button";
import UserForm from "../components/DataForm";
import Notification from "../components/Notification";
import { useDispatch } from "react-redux";
function SignupPage() {
  const [errors, setErrors] = useState({});
  const [addUserMutation, result] = useAddUserMutation();
  const dispatch = useDispatch();
  const [notificationContent, setNotificationContent] = useState(<></>);
  const formData = [
    {
      label: "email",
      text: "Please enter a valid email",
      type: "email",
      placeholder: "example@example.com",
      required: true,
      readOnly: false,
    },
    {
      label: "password",
      text: "Please enter a secure password",
      type: "password",
      minlength: 8,
      placeholder: "W2@%3wg4F56eRE8",
      required: true,
      readOnly: false,
    },
    {
      label: "firstName",
      text: "Your first name",
      type: "text",
      maxlength: 15,
      placeholder: "Person",
      required: true,
      readOnly: false,
    },
    {
      label: "lastName",
      text: "Your family's name",
      type: "text",
      maxlength: 15,
      placeholder: "Family",
      required: true,
      readOnly: false,
    },
    {
      label: "mobileNumber",
      text: "Your active mobile phone number",
      type: "tel",
      pattern: "[0-9]{5}-[0-9]{3}-[0-9]{7}",
      placeholder: "00123-456-7890123",
      required: true,
      readOnly: false,
    },
    {
      label: "city",
      text: "City you are currently living in",
      type: "text",
      maxlength: 20,
      placeholder: "City",
      required: true,
      readOnly: false,
    },
    {
      label: "buildingNumber",
      text: "House's number",
      type: "number",
      maxlength: 20,
      minlength: 1,
      min: 0,
      placeholder: "123",
      required: true,
      readOnly: false,
    },
    {
      label: "street",
      text: "Street you are currently living in",
      type: "text",
      placeholder: "example street",
      required: true,
      readOnly: false,
    },
    {
      body: (
        <div className="flex items-center justify-between mt-6">
          <Button
            className="bg-yellow-600 hover:bg-yellow-800 text-white 
    font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            text="Signup"
          />
        </div>
      ),
    },
  ];
  function handleFormSubmit(event, state) {
    event.preventDefault();
    addUserMutation(state);
    setNotificationContent(null);
  }

  useEffect(() => {
    let text = "";
    if (!result.isUninitialized && !result.isLoading) {
      if (!result.error) {
        setTimeout(() => {
          dispatch(setIsLoggedIn(false));
          dispatch(setCurrentPath("/login"));
        }, 2000);
        text = `Account is created successfully`;
      } else {
        setErrors(result.error.data);
        text = `Error While signing up`;
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
          onChange={handleFormSubmit}
          errors={errors}
          formSkeleton={formData}
        />
      </div>
      {notificationContent}
    </div>
  );
}
export default SignupPage;
