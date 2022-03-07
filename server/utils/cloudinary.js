const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({ 
  cloud_name: 'wedev', 
  api_key: '697657252623181', 
  api_secret: '6913EYSQSPyOfSwsyKbotLWHpaI' 
});

module.exports = cloudinary;
