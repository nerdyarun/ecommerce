import React, { useState } from 'react'
import {BsCloudUpload} from 'react-icons/bs'
import { ImagetoBase64 } from "../utility/imagetoBase64";
import { toast } from "react-hot-toast";

function Newproduct() {
  const [data, setData] = useState({
    name:"",
    category:"",
    image:"",
    price:"",
    description:""
  });
  
  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setData((preve) => {
       return {
        ...preve,
        [name]: value
       }
    });
  }

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    
    console.log(data);
    setData((preve) => {
      return {
       ...preve,
        image: data
      }
   });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const {name, image, category, price} = data;
  if (name && image && category && price) {
     const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`,
      {
         method: "POST",
         headers: {
          "content-type" : "application/json"
         },
         body: JSON.stringify(data)      
     })
     const fetchRes = await fetchData.json();
     toast(fetchRes.message);
     setData(() => {
      return{ name:"",
      category:"",
      image:"",
      price:"",
      description:""}
     });

    } else {
     toast("Fill required fileds.");
    }
  }

  return (
    <div className='p-4'>
      <form onSubmit={handleSubmit} className='m-auto w-full max-w-md shadow flex 
      flex-col p-3'>
        <label htmlFor='name'>Name</label>
        <input type={"text"} name="name" 
        className='bg-slate-200 p-1 my-1'
        onChange={handleOnChange} value={data.name}
        />

        <label htmlFor='category'>Category</label>
        <select className='bg-slate-200 p-1 my-1' name="category" onChange={handleOnChange} value={data.category}
        id='category'>
          <option value={"other"}>Select A Category</option>
          <option value={"fruits"}>Fruits</option>
          <option value={"vegetable"}>Vegatable</option>
          <option value={"icecream"}>Icrecream</option>
          <option value={"dosa"}>Dosa</option>
          <option value={"pizza"}>Pizza</option>
          <option value={"rice"}>Rice</option> 
          <option value={"cake"}>Cake</option>
          <option value={"burger"}>Burger</option>
          <option value={"paneer"}>Paneer</option>
          <option value={"sandwich"}>Sandwich</option>
        </select>

        <label htmlFor='image'>Image
          <div className='h-40 w-full bg-slate-300 rounded flex items-center justify-center cursor-pointer'>
            {
             data.image ? <img src={data.image} className='h-full'/> :
             <span className='text-4xl'><BsCloudUpload/></span>
            }            
           <input type={"file"} accept="image/*" id="image"
            className='hidden' 
            onChange={uploadImage}/>
          </div>
        </label>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type={"text"} name="price" 
        onChange={handleOnChange} value={data.price}
        className='bg-slate-200 p-1 my-1'/>

        <label htmlFor='description'>Description</label>
        <textarea rows={2} className='bg-slate-200 p-1 my-1 resize-none'
        name="description" onChange={handleOnChange} value={data.description}
        ></textarea>
        <button className='bg-red-500 hover:bg-red-600
        text-white text-lg font-medium my-2 drop-shadow-sm'>Save</button>

      </form>
    </div>
  )
}

export default Newproduct