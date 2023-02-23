import { useSelector } from "react-redux";
import { BiLogIn } from "react-icons/bi";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineWavingHand } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
function usePannerOptions() {
  const [{ email }, { isLoggedIn }] = useSelector((state) => {
    return [state.user, state.config];
  });
  if (isLoggedIn) {
    return [
      { page: "logout", path: "/logout", icon: <BiLogOut /> },
      { page: `Profile | ${email || ""}`, path: "/user", icon: <CgProfile /> },
    ];
  } else {
    return [
      { page: "login", path: "/login", icon: <BiLogIn /> },
      { page: "signup", path: "/signup", icon: <MdOutlineWavingHand /> },
    ];
  }
}
export default usePannerOptions;
