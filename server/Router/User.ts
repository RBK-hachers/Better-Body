import express, { Request, Response } from "express";
import { UserModel } from "../database/user";
import mongoose from "mongoose";
import IUser from "../database/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const router = express.Router();

// get all users
router.get("/api/user", async (req: Request, res: Response) => {
  const user = await UserModel.find({});
  return res.send(user);
});


//sign up 
router.post('/api/user/signup', async (req:Request, res:Response) => {

        const names =req.body.name;
        const img=req.body.img;
        const email = req.body.email;
        const password = req.body.password;
        
const salt = await bcrypt.genSalt(10);
const newpassword = await bcrypt.hash(password, salt);

const newUser = await new UserModel({
    _id: new mongoose.Types.ObjectId(),
    name:names,
    img:img,
    email:email,
    password: newpassword,
   
})
newUser
.save()
.then((result) => {
  console.log("user added successfully");
  res.json(result.name + " is added successfully");
})
.catch((error) => {
  console.log(error);
  res.json(error);
});
})


// //log in
router.post('/api/user/login',async (req:Request, res:Response) => {

  const password :any = req.body.password;
const email= req.body.email; 


UserModel.findOne({email:email},async (err:any, user:IUser) => {

if (err){
  console.log(err)
}

const isPasswordValid = await bcrypt.compare(password, user.password)
if (isPasswordValid){
const token=jwt.sign(
  {userId:user._id,userName:user.name,userEmail:user.email,userImage:user.img},'RANDOM_TOKEN_SECRET',{expiresIn:'24h'})

 return res.json({userId:user._id,userName:user.name,userEmail:user.email,userImage:user.img,token:token,connected:200})

}else{
  console.log("wrong password")
  return res.json({userId:"",userName:"",userEmail:"",userImage:"",token:"",connected:0})

}
}) 
})





export {router as userRouter}