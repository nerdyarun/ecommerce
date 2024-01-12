import React, { useState } from "react";
import loginSignupImage from "../assets/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/imagetoBase64";
import { toast } from "react-hot-toast";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;
    const url = `${process.env.REACT_APP_SERVER_DOMAIN}/signup`;
    console.log(url);
    console.log(process.env.REACT_APP_SERVER_DOMAIN);
    try {
      if (firstName && email && password && confirmPassword) {
        if (password === confirmPassword) {
          const res = await fetch(url, {
            method: "POST",
            headers: {
              //'Access-Control-Request-Headers': 'Content-Type, Authorization',
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          const dataResult = await res.json();
          toast(dataResult.message);
          if(dataResult.alert) {
            navigate("/login");
          }
        } else {
          alert("password and confirm password not equal");
        }
      } else {
        alert("please enter require fields");
      }
    } catch (error) {
      console.log("error");
    }
  };

  //console.log(data);
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadProfileImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    //console.log(data);
    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  return (
    <div className="p-3 md:p-4">
      <div
        className="w-full max-w-md bg-white m-auto
      flex items-center flex-col p-4"
      >
        {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto realtive">
          <img
            src={data.image ? data.image : loginSignupImage}
            className="w-full h-full"
            alt="sign up"
          />
          <label htmlFor="profileImage">
            <div
              className="absolute bottom-0 h-1/3 bg-slate-500 
        bg-opacity-50 w-full text-center cursor-pointer"
            >
              <p className="text-sm p-1 text-white">upload</p>
            </div>
            <input
              type={"file"}
              id="profileImage"
              className="hidden"
              accept="image/*"
              onChange={handleUploadProfileImage}
            />
          </label>
        </div>
        <form onSubmit={handleSubmit} className="w-full py-3 flex flex-col">
          <label htmlFor="firstName">First Name</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-500"
            value={data.firstName}
            onChange={handleOnChange}
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-500"
            value={data.lastName}
            onChange={handleOnChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-500"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-500">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-slate-200 border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />
            <span className="flex text-xl" onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-500">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmPassword"
              className="w-full bg-slate-200 border-none outline-none"
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span className="flex text-xl" onClick={handleShowConfirmPassword}>
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            className="max-w-[150px] w-full m-auto bg-red-600
          hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            Sign up
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          {" "}
          Already have account ?{" "}
          <Link to={"/login"} className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
