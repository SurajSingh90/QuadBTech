import express from "express";
const  router = express.Router()
import userRoutes from "./user.js";
const PATH ={
    USERS:'/user',
}
router.use(PATH.USERS,userRoutes)
export default router