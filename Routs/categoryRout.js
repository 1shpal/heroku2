
const express = require('express');

const router = express.Router();
const { body } = require('express-validator');

const category = require('../model/category');
const categoryController= require('../controller/categoryController');

const multer = require('multer');

var storage = multer.diskStorage(
    {
        destination: '../public/images',
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);

        }
    });

var upload = multer({ storage: storage });

router.post('/add-category', upload.single('categoryImage'),
    body('categoryName').not().isEmpty(),
    categoryController.addCategory
);
router.get('/delete/:_id',categoryController.delete);
router.get('/list',categoryController.categorylist)
router.post("/update", upload.single('categoryImage'),
    body('categoryName').not().isEmpty(),
    body("categoryId").not().isEmpty()
    , categoryController.update
);

module.exports = router;