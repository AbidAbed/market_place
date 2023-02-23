import SellerInfo from "../components/SellerInfo";
import Images from "../components/Images";
import Button from "../components/Button";
function cartItemShowSetup(item) {
  return [
    {
      text: `${item.title}`,
      body: <></>
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
    { body: <Button text="Remove item" /> },
  ];
}
export default cartItemShowSetup;
