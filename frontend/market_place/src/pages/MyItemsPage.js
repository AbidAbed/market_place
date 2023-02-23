import { useSelector } from "react-redux";
import Button from "../components/Button";
import Item from "../components/Item";
import { useState, useEffect } from "react";
import DataForm from "../components/DataForm";
function MyItemsPage() {
  const [renderedItems, setRenderedItems] = useState([]);
  const [errors, setErrors] = useState({});
  const [createdItemsIds, { currentPath }] = useSelector((state) => {
    return [state.user.createdItems, state.config];
  });

  useEffect(() => {
    if (currentPath === "/myitems") {
      const initialRenderedItems = createdItemsIds.map((item) => {
        return (
          <Item
            id={item.id}
            onChange={(event) => handleEditItem(event, item.id)}
          >
            <Button
              text="Edit"
              onChange={(event) => handleEditItem(event, item.id)}
            />
          </Item>
        );
      });
      setRenderedItems(initialRenderedItems);
    }
  }, [currentPath]);

  if (createdItemsIds.length !== 0 && renderedItems.length === 0) {
    const initialRenderedItems = createdItemsIds.map((item) => {
      return (
        <Item id={item.id} onChange={(event) => handleEditItem(event, item.id)}>
          <Button
            text="Edit"
            onChange={(event) => handleEditItem(event, item.id)}
          />
        </Item>
      );
    });
    setRenderedItems(initialRenderedItems);
  }
  function handleSubmitEditItem(event) {}
  function handleEditItem(event, id) {
    const [createdItem] = createdItemsIds.filter((obj) => obj.id === id);
    const formData = [
      {
        label: "title",
        text: "Product title or name (will apear in the market)",
        placeholder: createdItem.title,
        required: false,
      },
      {
        label: "price",
        text: "Price (per unit)",
        placeholder: createdItem.price,
        required: false,
      },
      {
        label: "images",
        text: "Images of the product (at least one is required)",
        placeholder: createdItem.title,
        required: false,
      },
      {
        label: "description",
        text: "Write the product description",
        placeholder: createdItem.description,
        required: false,
      },
      {
        label: "status",
        text: "Availabilty",
        placeholder: createdItem.status,
        required: false,
      },
      {
        label: "amount",
        text: "Amount to sell",
        placeholder: createdItem.amount,
        required: false,
      },
      {
        label: "arrivalData",
        text: "Estimated date of arrival",
        placeholder: createdItem.arrivalData,
        required: false,
      },
      {
        label: "clients",
        text: "This item info",
        placeholder: createdItem.title,
        required: false,
      },
    ];
    setRenderedItems(
      <DataForm
        formSkeleton={formData}
        errors={errors}
        onChange={handleSubmitEditItem}
      />
    );
  }
  function handleSubmitAddItem(event) {}
  function handleAddItem(event) {
    const formData = [
      {
        label: "title",
        text: "Product title or name (will apear in the market)",
        required: true,
      },
      {
        label: "price",
        text: "Price (per unit)",
        required: true,
      },
      {
        label: "images",
        text: "Images of the product (at least one is required)",
        required: true,
      },
      {
        label: "description",
        text: "Write the product description",
        required: true,
      },
      {
        label: "status",
        text: "Availabilty",
        required: true,
      },
      {
        label: "amount",
        text: "Amount to sell",
        required: true,
      },
      {
        label: "arrivalData",
        text: "Estimated date of arrival",
        required: true,
      },
      {
        label: "clients",
        text: "This item info",
        required: false,
      },
    ];
    setRenderedItems(
      <DataForm
        formSkeleton={formData}
        errors={errors}
        onChange={handleSubmitAddItem}
      />
    );
  }
  return (
    <div>
      <div>{renderedItems}</div>
      <div>
        <Button text="Add item" onChange={handleAddItem} />
      </div>
    </div>
  );
}
export default MyItemsPage;
