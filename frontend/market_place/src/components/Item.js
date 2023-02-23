function Item({ onChange, children, itemSnippetSetup, item }) {
  const rendredItem = itemSnippetSetup(item, onChange);
  return (
    <div>
      <div>{rendredItem}</div>
      <div>{children}</div>
    </div>
  );
}
export default Item;
