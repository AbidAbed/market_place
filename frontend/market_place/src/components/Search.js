function Search({ onChange, className }) {
  return (
    <div className="block w-full border-gray-500  bg-gray-100 border-2 text-yellow-500 rounded-full">
      <input
        onChange={onChange}
        placeholder="Search for  item's title"
        className="placeholder:italic placeholder:text-black font-bold block bg-transparent w-full 
        border-4 
        border-gray-500  bg-gray-100 border-2 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-yellow-400 focus:ring-yellow-500 
        focus:ring-1 sm:text-sm text-center placeholder-center w-full h-full rounded-full py-2"
      />
    </div>
  );
}
export default Search;
