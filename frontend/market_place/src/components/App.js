import { useEffect } from "react";
import { fetchUser, useAuthUserMutation } from "../store/storeInterface";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPath, setIsLoggedIn } from "../store/storeInterface";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsShop } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import useRouter from "../hooks/use-router";
import usePannerOptions from "../hooks/use-panner-options";
import Panner from "./Panner";
import useFetchPurchases from "../hooks/use-fetch-purchases";
import useFetchItems from "../hooks/use-fetch-items";
//import useAuthUserCallBack from "../hooks/use-auth-user";
//hook that post on backend and checks if user is autharized to set login to true
function App() {
  const { isLoggedIn, currentPath } = useSelector((state) => {
    return state.config;
  });
  useFetchPurchases();
  useFetchItems();
  const accessiblePages = usePannerOptions();
   const pagesConfig = [
    { page: "Shop", path: "/shop", icon: <BsShop /> },
    { page: "cart", path: "/cart", icon: <AiOutlineShoppingCart /> },
    {
      page: "purchased items",
      path: "/purchased",
      icon: <CiDeliveryTruck />,
    },
  ];
  const [authUser, result] = useAuthUserMutation();
  const dispatch = useDispatch();

 
  const pages = pagesConfig.concat(accessiblePages);

  function handlePathChange(path, event) {
    event.preventDefault();
    dispatch(setCurrentPath(path));
  }

  useEffect(() => {
    authUser();
    window.history.pushState({}, "", "/shop");
    const handlePopState = () => {
      dispatch(setCurrentPath(window.location.pathname));
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (
      !(
        currentPath === "/shop" ||
        currentPath === "/login" ||
        currentPath === "/signup" ||
        currentPath === "/cart" ||
        /^(\/shop|\/cart|\/purchased)\/\d+$/.test(currentPath)
      )
    ) {
      authUser();
      if (!isLoggedIn) {
        dispatch(setCurrentPath("/login"));
        window.history.pushState({}, "", "/login");
      } else {
        window.history.pushState({}, "", currentPath);
      }
    } else {
      window.history.pushState({}, "", currentPath);
    }
  }, [currentPath]);

  useEffect(() => {
    if (!result.isUninitialized && !result.isLoading) {
      if (result.error) {
        dispatch(setIsLoggedIn(false));
      } else {
        dispatch(setIsLoggedIn(true));
        dispatch(fetchUser(result.data.data));
      }
    }
  }, [result]);
  let content = useRouter();
  return (
    <div className="space-y-4">
      <Panner onChange={handlePathChange} pages={pages} />
      <div>{content}</div>
    </div>
  );
}

export default App;
