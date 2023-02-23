function Input({
  label,
  onChange,
  value,
  className,
  type,
  required,
  minlength,
  maxlength,
  min,
  max,
  pattern,
  placeholder,
  readOnly
}) {
  return (
    <input
      onChange={(event) => {
        onChange(event, label);
      }}
      value={value}
      className="shadow appearance-none border rounded w-full py-2 px-3 
      text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type={type}
      required={required}
      minLength={minlength}
      maxLength={maxlength}
      min={min}
      max={max}
      pattern={pattern}
      placeholder={placeholder}
      readOnly={readOnly}
    ></input>
  );
}
export default Input;
