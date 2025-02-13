require("dotenv").config()
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require('multer')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", 
    format: async (req, file) => "jpeg", 
    public_id: (req, file) => {
      const fileNameWithoutExtension = file.originalname.split(".")[0]
      const timestamp = Date.now()
      return `${fileNameWithoutExtension}_${timestamp}`
    }
  },
})

const allowedMimeTypes = ['image/svg', 'image/jpeg', 'image/png', 'image/gif'];

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Only .svg, .jpeg, .png, .gif files are allowed"), false)
    }
  }
})

module.exports = { upload, storage, cloudinary }