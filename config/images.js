import cloudinary from "cloudinary";
import multer from "multer";
cloudinary.config({ 
    cloud_name: 'diikkro7d', 
    api_key: '239452981338756', 
    api_secret: 'p-awQ1RaRfroojLtOupOQ93gxBw'
})




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({
  storage: storage,
}).single("user_image");

export const uploadMiddleware  = {
  uploads,
  cloudinary

}
