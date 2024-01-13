import { useRef } from "react";
import HomeCard from "../component/HomeCard";
import CartFeature from "../component/CartFeature";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useSelector } from "react-redux";
import AllProduct from "../component/AllProduct";

const Home = () => {
 
  const productData = useSelector((state) => state.product.productList);

  const homeProductCartList = productData.slice(1, 5);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable",
    []
  );
 
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };

  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img
              src="https://static-00.iconduck.com/assets.00/bicycle-icon-1024x666-qfwfbsbr.png"
              alt="bikeimg"
              className="h-7"
            />
          </div>
          <h2 className="text-4xl md:text=7xl font-bold py-3">
            The Fastest Delivery in{" "}
            <span className="text-red-600 text">Your Home</span>
          </h2>
          <p className="py-3 text base">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage.
          </p>
          <button className="font-bold bg-red-500 text-slate-200 px-4 py-1 rounded">
            Order Now
          </button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {homeProductCartList[0]
            ? homeProductCartList.map((el) => {
                return (
                  <HomeCard
                    key={el._id+"vegetable"}
                    id={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return <HomeCard loading={"loading..."} key={index+"loading"} />;
              })}
        </div>
      </div>

      <div>
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={prevProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {homeProductCartListVegetables[0]
            ? homeProductCartListVegetables.map((el) => {
                return (
                  <CartFeature
                    key={el._id}
                    id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  
                    />
                );
              })
            : loadingArrayFeature.map((el, index) => (
                <CartFeature loading="loading..." key={index+"cartLoading"} />
              ))}
        </div>
      </div>

    <AllProduct heading={"Your Product"} />      
    </div>
  );
};

export default Home;
