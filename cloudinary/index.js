const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');

cloudinary.config({
    cloud_name: 'djul6ji5g',
    api_key: '372186682862111',
    api_secret: process.env.CLOUDINARY_SECRET
})
const multer = require('multer');

const {CloudinaryStorage} = require('multer-storage-cloudinary');
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
      folder: 'surf-shop',
      format: async (req, file) => 'png',
      public_id: (req,file) => file.originalname.replace(/\.jpeg|\.jpg|\.png/ig, '') + crypto.randomBytes(16).toString('hex')
  }
  
 
});

module.exports = {
	cloudinary,
	storage
}