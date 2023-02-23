function shopItemSnippetSetup(item, onChange) {
  return (
    <div onClick={onChange}>
      <div>{item.title}</div>
      <div>
        <img src={item.images[0]} />
      </div>
      <div>Amount purchased : {item.amountPurchased}</div>
      <div>Created By : {item.creator}</div>
      <div>Totall price : {item.price * item.amountPurchased}$</div>
    </div>
  );
}
export default shopItemSnippetSetup
