function Search({ onChange, className }) {
  return (
    // <div className="block w-full border-gray-500  bg-gray-100 border-2 text-yellow-500 rounded-full">
    //   <input
    //     onChange={onChange}
    //     placeholder="Search for  item's title"
    //     className="placeholder:italic placeholder:text-black font-bold block bg-transparent w-full
    //     border-4
    //     border-gray-500  bg-gray-100 border-2 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-yellow-400 focus:ring-yellow-500
    //     focus:ring-1 sm:text-sm text-center placeholder-center w-full h-full rounded-full py-2"
    //   />

    // </div>
    <div class="relative">
      <input
        type="text"
        onChange={onChange}
        placeholder="Search"
        class="w-full py-2 pl-10 pr-3 
  text-gray-900 placeholder-gray-500 bg-gray-200 border border-gray-200 rounded-full focus:outline-none 
  focus:ring-2 focus:ring-gray-700 focus:border-transparent"
      />
      <div class="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          class="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-5.2-5.2m-.8-.8c2-2 2-5.2 0-7.2s-5.2-2-7.2 0-2 5.2 0 7.2 5.2 2 7.2 0z"
          />
        </svg>
      </div>
    </div>
  );
}
export default Search;
