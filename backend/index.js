import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

const __dirname = path.resolve();
const app = express();
app.use(express.json({ limit:"10mb"}));
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 8000

console.log(process.env.PORT);
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Connected with database"))
.catch((err) => console.log(err));

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    confirmPassword: String,
    image:String
});

const userModel = mongoose.model("user", userSchema);

//api
app.get("/", (req, res) =>{
    res.send("Server is running");
});

app.post("/login", async (req, res) =>{
    const {email} = req.body
    const result = await userModel.findOne({ email:email});
   
    if(result) {
        const dataSend = {
            _id: result._id,
            firstName: result.firstName,
            lastName:result.lastName,
            email: result.email,
            password: result.password,
            confirmPassword: result.confirmPassword,
            image: result.image
          }
       
        res.send( { message: "User logged-in successfully", alert: true, data: dataSend});   
    } else {
         res.send({ message: "Email is not available, please sign up", alert: false});
    }
});

app.post("/signup", async (req, res) =>{
    const {email} = req.body
    const result = await userModel.findOne({ email:email}).exec();
   
    if(result) {
        const dataSend = {
            _id: result._id,
            firstName: result.firstName,
            lastName:result.lastName,
            email: result.email,
            password: result.password,
            confirmPassword: result.confirmPassword,
            image: result.image
          }
         res.send( { message: "Email id already registered", alert: false, data:dataSend});   
    } else {
        const data = userModel(req.body)
        const save = data.save()
        res.send({ message: "Successfully sign up", alert: true});
    }
});

// product section
const schemaProduct = mongoose.Schema({
    name: String,
    category:String,
    image:String,
    price:String,
    description:String,
});

const productModel = mongoose.model("product", schemaProduct);

//save product in data api

app.post("/uploadProduct", async(req, res) => {
  console.log(req.body);
  const data = await productModel(req.body)
  const datasave = await data.save();
  res.send({message: "Upload Successfully"});
});

app.get("/product", async (req, res) => {
    const data = await productModel.find({});
    res.send(JSON.stringify(data));
});

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
res.sendFile(path.join(__dirname, 'frontend','dist','index.html')));
});

app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`));

