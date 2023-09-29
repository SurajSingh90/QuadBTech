import mongoose from "mongoose";
const userSchema = new  mongoose.Schema({
  
    user_name: { type: String },
    user_email: { type: String, unique: true },
    user_password: { type: String },
    user_image: { type: String },
    total_orders: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
    // last_logged_in: { type: Date, default: Date.now },
  
})
export default mongoose.model("Users",userSchema)