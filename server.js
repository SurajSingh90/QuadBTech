import express from "express";
import mongoose from "mongoose";
import apiRoutes from "./routes/index.js";
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PATH ={
    API:'/api'
}
app.use(PATH.API,apiRoutes)
// import mongoose from "mongoose";


 




mongoose.connect("mongodb://127.0.0.1:27017/QuadTech", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("mongoose connected successfully");
})
.catch((err) => {
  console.error("Error in connection", err);
});

// mongoose.connect("mongodb+srv://singhsuraj90901:suraj@cluster0.naeyti1.mongodb.net/?retryWrites=true&w=majority/QuadTech", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => {
//   console.log("mongoose connected successfully");
// })
// .catch((err) => {
//   console.error("Error in connection", err);
// });


const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log(`Server Runing on port ${PORT}`);
});