// config/cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Tu Cloud Name
    api_key: process.env.CLOUDINARY_API_KEY,       // Tu API Key
    api_secret: process.env.CLOUDINARY_API_SECRET   // Tu API Secret
});

module.exports = cloudinary;