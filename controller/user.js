// import cloudinary from "../config/images.js";
import { uploadMiddleware } from "../config/images.js";
import userModel from "../model/user.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken'

export const createsUsers = async (req, res) => {
  try {
   
    const errors = validationResult(req);
    console.log("validation ",errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({
          message: errors.array()[0].msg,
        });
      } 
      const findEmail = await userModel.findOne({user_email:req.body.user_email})
      if(findEmail){
         return res.status(401).json({message:"Email is allready use."})
 
      }
    let obj = {
      user_name: req.body.user_name,

      user_email: req.body.user_email,
      total_orders: req.body.total_orders,
      user_password: bcrypt.hashSync(req.body.user_password, 12),
      user_image: req.file.path,
    //   created_at :req.created_at 
    };
    let imageUrl = await uploadMiddleware.cloudinary.v2.uploader.upload(obj.user_image);
    obj.user_image = imageUrl.secure_url;

    const result = await userModel.create(obj);
    res.status(200).json({ message: "User create sccessfull.", staus: true ,result});
  } catch (error) {
    console.log("erorrr",error);
    return res
      .status(500)
      .json({ message: "Internal server error.", status: false,error });
  }
};

export const login = async(req,res)=>{
    try{
     const findEmail = await userModel.findOne({user_email:req.body.user_email})
     if(!findEmail){
        return res.status(404).json({message:"Email not found."})

     }
     const validpassword = bcrypt.compareSync(
        req.body.user_password,
        findEmail.user_password
      );
     
      
      if (!validpassword) {
        res.status(400).send({ msg: "password is wrong" });
        return;
      }
      const token = jwt.sign({ id: findEmail._id }, "sdjhsbvchgdsvcghsdhdsvhgdsgcd");
      return res.send({
        id: findEmail._id,
        name: findEmail.user_name,
        email: findEmail.user_email,
        acesstoken: token,
      });
    }

    catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const updatesUser = async(req,res)=>{
    const id = req.params.id
    const userData = await userModel.findOne({_id:id})
    if (!userData) {
        return res.status(404).json({ msg: "User not found." });
      }
    userData.user_name = req.body.user_name?req.body.user_name:userData.user_name
    userData.user_email = req.body.user_email?req.body.user_email:userData.user_email
    if (req.body.user_password) {
        const hashedPassword = await bcrypt.hash(req.body.user_password, 12);
        userData.user_password = hashedPassword;
      } else {
        userData.user_password = userData.user_password;
      }
    userData.total_orders = req.body.total_orders?req.body.total_orders:userData.total_orders

    if (req.file) {
        const uploadResult = await uploadMiddleware.cloudinary.v2.uploader.upload(req.file.path);
         userData.user_image = uploadResult.secure_url;
      }
      const updateData = await userData.save();
    res.status(200).send({
      message: "Users updates sceessfull",
      BlogsUpdate: updateData,
    });

  
}

export const deleteUser = async(req,res)=>{
    const id = req.params.id
    const removeUser = await userModel.findOneAndDelete({_id:id})
    if(!removeUser){
        return res.status(401).json({message:"user not found"})

    }
    res.status(200).json({message:"User deleted successfull",removeUser})
}

export const userDetails = async(req,res)=>{
    const id = req.params.id
    const user = await userModel.findOne({_id:id})
    if(!user){
        return res.status(401).json({message:"user not found"})

    }
    res.status(200).json({message:"User details successfull",user})
}


export const userImage = async(req,res)=>{
    const id = req.params.id
    const user = await userModel.findOne({_id:id})
    if(!user){
        return res.status(401).json({message:"user  not found"})

    }

    res.status(200).json({message:"User details successfull",image:user.user_image})
}
