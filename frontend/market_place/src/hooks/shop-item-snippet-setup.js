function shopItemSnippetSetup(item, onChange) {
  return (
    <div onClick={onChange}>
      <div>{item.title}</div>
      <div className="border-gray-500  bg-gray-100 border-2 w-128 h-128">
        <img src={item.images[0]} />
      </div>
      <div>
        <div>Amount available : {item.amount}</div>
        <div>Availablity : {item.status}</div>
      </div>
      <div>Created By : {item.creator}</div>
      <div>ONLY {item.price}$</div>
    </div>
  );
}
export default shopItemSnippetSetup;
