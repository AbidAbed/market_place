import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  useUpdateUserMutation,
  usePostLogoutMutation,
} from "../store/storeInterface";
import { setCurrentPath, setIsLoggedIn } from "../store/storeInterface";
import UserForm from "../components/DataForm";
import Button from "../components/Button";
function UserPage() {
  const [postLogoutMutatuin, postLogOutResult] = usePostLogoutMutation();
  const user = useSelector((state) => {
    return state.user;
  });
  const [UpdateUserMutation, updateUserResult] = useUpdateUserMutation();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const formData = [
    {
      label: "email",
      text: "Current email",
      type: "email",
      placeholder: user.email,
      required: false,
    },
    {
      label: "newPassword",
      text: "New password (will change password if it's not empty)",
      type: "password",
      minlength: 8,
      required: false,
    },
    {
      label: "password",
      text: "Old password (must be entered for changes)",
      type: "password",
      required: true,
    },
    {
      label: "firstName",
      text: "Your first name",
      type: "text",
      maxlength: 15,
      placeholder: user.firstName,
      required: false,
    },
    {
      label: "lastName",
      text: "Your family's name",
      type: "text",
      maxlength: 15,
      placeholder: user.lastName,
      required: false,
    },
    {
      label: "mobileNumber",
      text: "Your phone number",
      type: "tel",
      pattern: "[0-9]{5}-[0-9]{3}-[0-9]{7}",
      placeholder: user.mobileNumber,
      required: false,
    },
    {
      label: "city",
      text: "City",
      type: "text",
      maxlength: 20,
      placeholder: user.city,
      required: false,
    },
    {
      label: "buildingNumber",
      text: "House's number",
      type: "number",
      maxlength: 20,
      minlength: 1,
      min: 0,
      placeholder: user.buildingNumber,
      required: false,
    },
    {
      label: "street",
      text: "Street",
      type: "text",
      placeholder: user.street,
      required: false,
    },
    {
      body: (
        <div className="flex items-center justify-between mt-6">
          <Button
            className="bg-yellow-600 hover:bg-yellow-800 text-white 
    font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            text="Save changes"
          />
        </div>
      ),
    },
  ];
  function onSubmitForm(event, state) {
    event.preventDefault();
    const filteredState = Object.entries(state)
      .filter(([key, value]) => value !== "")
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
    UpdateUserMutation({ ...user, ...filteredState });
  }
  useEffect(() => {
    if (
      !updateUserResult.isUninitialized &&
      !updateUserResult.isLoading &&
      updateUserResult.error
    ) {
      setErrors(updateUserResult.error.data);
    }
    return () => {
      updateUserResult.reset();
    };
  }, [updateUserResult, setErrors]);

  useEffect(() => {
    if (
      !updateUserResult.isUninitialized &&
      !updateUserResult.isLoading &&
      updateUserResult.isSuccess
    ) {
      dispatch(setIsLoggedIn(false));
      dispatch(setCurrentPath("/login"));
      postLogoutMutatuin();
    }
    return () => {
      updateUserResult.reset();
    };
  }, [updateUserResult]);
  return (
    <UserForm
      formSkeleton={formData}
      errors={errors}
      onChange={onSubmitForm}
      values={user}
    />
  );
}
export default UserPage;
