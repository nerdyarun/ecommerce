import React from "react";

function CartFeature({ image, name, category, price, loading }) {
  return (
    <div
      className="w-full min-w-[200px] bg-white hover:shadow-lg 
    cursor-pointer drop-shadow-lg py-5 px-4 flex flex-col"
    >
      {image ? (
        <>
          <div className="h-28 flex flex-col justify-center items-center">
            <img src={image} alt="cagegory-images" className="h-full" />
          </div>
          <h3 className="font-semibold text-slate-600 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">{name}</h3>
          <p className=" text-slate-500 font-medium">{category}</p>
          <p className=" font-bold">
            <span className="text-red-500">₹</span>
            <span>{price}</span>
          </p>
          <button className="bg-yellow-500 py-1 mt-2-rounded">Add Cart</button>
        </>
      ) : (
        <div className="min-h-[160px] flex justify-center items-center">
         <p>{loading}</p>
          </div>
      )}
    </div>
  );
}

export default CartFeature;
