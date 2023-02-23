import { useEffect, useState } from "react";
import { useGetUserByIdQuery } from "../store/storeInterface";
function SellerInfo({ id }) {
  const { isLoading, data, error } = useGetUserByIdQuery(id);
  const [sellerForm, setSellerForm] = useState(<div></div>);
  useEffect(() => {
    if (!error && !isLoading) {
      const sellerInfo = (
        <>
          <div>
            Seller's name : {data.firstName} {data.lastName}
          </div>
          <div>Seller's phone number : {data.mobileNumber}</div>
        </>
      );
      setSellerForm(sellerInfo);
    }
  }, [isLoading, data]);
  return <div>{sellerForm}</div>;
}
export default SellerInfo;
