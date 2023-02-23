import { useSelector } from "react-redux";
import SignupPage from "../pages/SignupPage";
import CartPage from "../pages/CartPage";
import UserPage from "../pages/UserPage";
import ShopPage from "../pages/ShopPage";
import LoginPage from "../pages/LoginPage";
import Logout from "../components/Logout";
import PurchasedItemsPage from "../pages/PurchasedItemsPage";
function useRouter() {
  const { currentPath, isLoggedIn } = useSelector((state) => {
    return state.config;
  });
  let content = <ShopPage />;
  switch (currentPath) {
    case "/login":
      content = <LoginPage />;
      break;
    case "/signup":
      content = <SignupPage />;
      break;
    case "/cart":
      content = <CartPage />;
      break;
    case "/shop":
      content = <ShopPage />;
      break;
    case "/logout":
      if (isLoggedIn) content = <Logout />;
      else content = <LoginPage />;
      break;
    case "/user":
      if (isLoggedIn) content = <UserPage />;
      else content = <LoginPage />;
      break;
    case "/purchased":
      if (isLoggedIn) content = <PurchasedItemsPage />;
      else content = <LoginPage />;
      break;
    default:
      break;
  }
  return content;
}
export default useRouter;
