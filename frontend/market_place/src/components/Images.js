function Images({ data }) {
  const renderedData = data.map((obj,index) => {
    return (
      <div key={index} className="px-2 mx-2 py-2 my-2 border border-yellow-800">
        <img src={obj} className="w-96 h-auto"/>
      </div>
    );
  });
  return <div className="flex justify-center flex-row grid grid-cols-5
   gap-4 items-center  scroll-smooth">{renderedData}</div>;
}
export default Images;
