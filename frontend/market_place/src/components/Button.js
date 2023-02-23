function Button({ text, onChange, className, children }) {
  return (
    <div>
      <button className={className} onClick={onChange}>
        <div className="flex items-center space-x-2">
          <div>{children}</div>
          <div>{text}</div>
        </div>
      </button>
    </div>
  );
}
export default Button;
