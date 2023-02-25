function shopItemSnippetSetup(item, onChange) {
  return (
     <div
     className="flex flex-col p-4 bg-white rounded-lg shadow-lg"
     onClick={onChange}
   >
     <img
       src={item.images[0]}
       alt="Item Image"
       class="rounded-lg mb-2 w-96 h-auto"
     />
     <h2 class="text-lg font-semibold text-gray-800 mb-2">{item.title}</h2>
     <p class="text-gray-600 mb-4">Amount purchased : {item.amountPurchased}</p>
     <p class="text-gray-600 mb-4">Created By : {item.creator}</p>
     <div class="flex justify-between items-center">
       <span class="text-gray-500 font-semibold">Totall price : ${item.price * item.amountPurchased}</span>
     </div>
   </div>
  );
}
export default shopItemSnippetSetup
