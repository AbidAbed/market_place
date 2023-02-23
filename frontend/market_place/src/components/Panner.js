import Button from "./Button";
import classNames from "classnames";
import { useSelector } from "react-redux";
import img from "../logo.png";

function Panner({ className, pages, onChange }) {
  const { currentPath } = useSelector((state) => state.config);
  let buttonStyle =
    "mx-2 px-4 my-4 py-2 rounded-full" +
    " shadow-md hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none" +
    " focus:ring focus:ring-yellow-300 font-bold";
  const renderedComponents = pages.map((obj, index) => {
    const style = classNames(
      {
        "bg-yellow-800 text-yellow-300 ": currentPath === obj.path,
        "bg-yellow-500 ": currentPath !== obj.path,
      },
      buttonStyle
    );
    return (
      <div className={style} key={obj.path}>
        <Button
          onChange={(event) => {
            onChange(obj.path, event);
          }}
          text={obj.page}
        >
          {obj.icon}{" "}
        </Button>
      </div>
    );
  });
  return (
    <div className="flex flex-row border-none place-content-center items-center">
      <div> 
        <img src={img} className="left-0 w-96 h-auto"/>
      </div>
      {renderedComponents}
      <div id="searchDiv"></div>
    </div>
  );
}
export default Panner;
