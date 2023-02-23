import Input from "../components/Input";
function useCreateFormBody(data, onChange, state) {
  const formData = data.map((obj) => {
    const props = {
      value: state[obj.label],
      className: obj.className,
      label: obj.label,
      type: obj.type,
      required: obj.required,
      minlength: obj.minlength,
      maxlength: obj.maxlength,
      min: obj.min,
      max: obj.max,
      pattern: obj.pattern,
      placeholder: obj.placeholder,
      readOnly: obj.readOnly,
      onChange: (event) => onChange(event, obj.label),
    };
    return {
      label: obj.label,
      text: obj.text,
      body: obj.body || <Input {...props} />,
      className: obj.classNameText,
    };
  });
  return formData;
}

export default useCreateFormBody;
