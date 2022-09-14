const multer = require('multer')
const path = require('path')

const storage =  multer.diskStorage({
  destination: (req, file, imagesStore) => {
    imagesStore(null, 'public/images')
  },
  filename: (req, file, imagesStore) => {
    imagesStore(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage})

module.exports = {
  upload
}

