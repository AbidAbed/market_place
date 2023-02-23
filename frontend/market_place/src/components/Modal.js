import classNames from "classnames";
import ReactDOM from "react-dom";
function Modal({ children, className }) {
  const styling = classNames(
    className,
    "absolute insert-0 bg-gray-300 opacity-80"
  );
  return ReactDOM.createPortal(
    <div>
      <div className="h-96 w-1/2 text-2xl fixed m-auto inset-0 p-10 bg-gray-100 rounded-lg shadow-lg 
      text-black font-bold text-gray-700 leading-relaxed border-2 border-gray-500 p-6 shadow-lg">
        {children}
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}
export default Modal;
