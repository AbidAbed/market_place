import SellerInfo from "../components/SellerInfo";
import Images from "../components/Images";
import Button from "../components/Button";
function shopItemShowSetup(item) {
  return [
    {
      text: `${item.title}`,
      body: <></>,
    },
    {
      text: `ONLY ${item.price}$`,
      body: <></>,
    },
    {
      body: <Images data={item.images} />,
    },
    {
      text: `Description : ${item.description}`,
      body: <></>,
    },
    {
      text: `Availablity : ${item.status}`,
      body: <></>,
    },
    {
      text: `Amount available :${item.amount}`,
      body: <></>,
    },
    {
      text: `Estimated date of arrival : ${item.arrivalData}`,
      body: <></>,
    },
    {
      body: <SellerInfo id={item.creatorId} />,
    },
    {
      body: (
        <div className="flex items-center justify-between mt-6">
          <Button
            className="bg-yellow-600 hover:bg-yellow-800 text-white 
          font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            text="Add to cart"
          />
        </div>
      ),
    },
  ];
}
export default shopItemShowSetup;
