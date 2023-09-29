import {body} from "express-validator";
import {constant as validation} from "../constant/validationname.js";

export const uservalidation  = (method)=>{
    let error = []
    switch(method){
        case validation.CREATEUSER:{
            error = [
                body("user_name", "Please enter your user name").not().isEmpty(),
                
                
                body("user_password", "Please enter your passwords").not().isEmpty(),
        
                body("user_email", "Please enter your email").isEmail().not().isEmpty(),
                body("user_image").custom((value, { req }) => {
                    if (!req.file) {
                      throw new Error("No file uploaded");
                    }
                    if (!req.file.mimetype.startsWith("image/")) {
                      throw new Error("File must be an image");
                    }
                    return true;
                  }),
            ]
            break;
        }
    }
    return error
}