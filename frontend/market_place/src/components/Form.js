import classNames from "classnames";

function Form({ formData, className, onChange, errors }) {
  const renderedForm = formData.map((obj, index) => {
    return (
      <div className="mb-4">
        <label
          className={classNames(
            "block text-black font-bold italic mb-2",
            obj.className
          )}
        >
          {obj.text}
        </label>
        {obj.body}
        {obj.label && errors[obj.label] && (
          <p className="text-red-500 text-xs italic mt-1">{errors[obj.label]}</p>
        )}
      </div>
    );
  });

  return (
    <div className="flex justify-center items-center px-4 py-4">
      <form className="border-gray-500  bg-gray-100 border-2 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(event) => onChange(event)}>
        {renderedForm}
      </form>
    </div>
  );
}

export default Form;
