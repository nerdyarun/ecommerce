import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import {setDataProduct} from './redux/productSlice';
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch()
  const productData = useSelector((state) => state.product)
  useEffect(() => {
  (async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`);
      const resData = await res.json();
      dispatch(setDataProduct(resData));
    } catch (error) {
      console.error("Fetch error:", error);
    }
  })();
}, []);
 
  return (
    <>
    <Toaster />
    <div>
      <Header />
      <main className="pt-16 bg-slate-100 min-w[calc(100vh)]">
        <Outlet />
      </main>
    </div>
    </>
  );
}

export default App;
