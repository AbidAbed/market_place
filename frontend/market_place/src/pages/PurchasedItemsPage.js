import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function PurchasedItemsPage() {
  const [purchases, userId] = useSelector((state) => [
    state.purchases,
    state.user.id,
  ]);

  console.log(purchases);
  let content = <></>;

  if (purchases.length) {
    content = purchases.map((purchase) => {
      return (
        <div
          key={purchase.id}
          className="border-gray-500  bg-gray-100 border-2 p-4 rounded-md mb-4"
        >
          <div className="font-bold mb-2">
            <h1>Purchase Date: {purchase.purchaseDate}</h1>
          </div>
          <div className="mb-2">Total Cost: {purchase.purchaseCost}$</div>
          <div>Arrival Status: {purchase.arrivalStatus}</div>
        </div>
      );
    });
  } else {
    content = <h1 className="text-center">No purchases have been made</h1>;
  }

  return <div className="container mx-auto px-4">{content}</div>;
}

export default PurchasedItemsPage;
