import express from "express";
const router = express.Router()
import * as userctrl from '../controller/user.js'
import * as tokenMid from '../middleware/auth.js'
import { uploadMiddleware } from "../config/images.js";
import { constant as VALIDATION } from "../constant/validationname.js";
import { uservalidation } from "../validation/uservalidation.js";
import user from "../model/user.js";
const PATH ={
    CREATE:'/insert',
    LOGIN:'/login',
    Updates:"/update/:id",
    Delete:"/delete/:id",
    DETAILS:"/details/:id",
    IMAGES:"/image/:id"
}
router.get(PATH.IMAGES,userctrl.userImage)
router.get(PATH.DETAILS,userctrl.userDetails)
router.delete(PATH.Delete,userctrl.deleteUser)
router.post(PATH.LOGIN,userctrl.login)
router.put(PATH.Updates,tokenMid.verfiytoken,uploadMiddleware.uploads, userctrl.updatesUser)
router.post(PATH.CREATE, uploadMiddleware.uploads,uservalidation(VALIDATION.CREATEUSER), userctrl.createsUsers)

export default router