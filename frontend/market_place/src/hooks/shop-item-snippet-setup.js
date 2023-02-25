function shopItemSnippetSetup(item, onChange) {
  return (
    <div
      className="flex flex-col p-4 bg-white rounded-lg shadow-lg"
      onClick={onChange}
    >
      <img
        src={item.images[0]}
        alt="Item Image"
        class="w-96 h-auto rounded-lg mb-2"
      />
      <h2 class="text-lg font-semibold text-gray-800 mb-2">{item.title}</h2>
      <p class="text-gray-600 mb-4">Amount available : {item.amount}</p>
      <p class="text-gray-600 mb-4">Availablity : {item.status}</p>
      <p class="text-gray-600 mb-4">
        Created By : {item.creator || "Market Place"}{" "}
      </p>
      <div class="flex justify-between items-center">
        <span class="text-gray-500 font-semibold">ONLY ${item.price}</span>
      </div>
    </div>
  );
}
export default shopItemSnippetSetup;
