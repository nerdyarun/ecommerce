import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartFeature from "../component/CartFeature";
import FilterProduct from "../component/FilterProduct";

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];
  
  //const [dataFilter, setDataFilter] = useState(productData);
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);
    
  const loadingArrayFeature = new Array(10).fill(null);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category)
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };
  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>
      <div
        className="flex gap-4 justify-center overflow-scroll
    scrollbar-none"
      >
        {categoryList[0] ? (
          categoryList.map((el) => {
            return (
              <FilterProduct
                category={el}
                key={el}
                isActive={el.toLowerCase() === filterby.toLowerCase()}
                onClick={() => handleFilterProduct(el)}
              />
            );
          })
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>loading</p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-4 my-4">
        {dataFilter[0] ? dataFilter.map((el) => {
          return (
            <CartFeature
              key={el._id}
              id={el._id}
              image={el.image}
              name={el.name}
              category={el.category}
              price={el.price}
            />
          )
        })
        : loadingArrayFeature.map((el,index) => (
          <CartFeature loading="loading..." key={index+"allProduct"}/>
        ))
        }
      </div>
    </div>
  );
};

export default AllProduct;
