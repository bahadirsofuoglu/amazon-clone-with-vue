const express = require('express');
const router = express.Router()
const Product = require('../models/product.js')
const upload = require('../middlewares/upload-photo')




// POST create
router.post('/products', upload.single('photo'), async(req, res) => {
  try {

    let product = new Product()
    product.owner = req.body.ownerID
    product.category = req.body.categoryID
    product.title = req.body.title
    product.description = req.body.description
    product.photo = req.file.location
    product.price = req.body.price
    product.stockQuantity = req.body.stockQuantity
    
    await product.save();

    res.json({
      status: true,
      msg: 'Successfuly create new Product!!'
    })

  } catch(err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// Get all product

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find()
    .populate("owner category")
    .populate("reviews","rating").exec()
    
    res.json({
      success: true,
      products: products
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})


// Get a single product


router.get('/products/:id', async (req, res) => {
  try {

    const product = await Product.findOne({
      _id: req.params.id
    }).populate('owner category')
      .populate('reviews','rating')
      .exec()
    res.json({
      success: true,
      product: product
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

// Put

router.put('/products/:id', upload.single('photo'),async (req, res) => {
  try {

    const product = await Product.findOneAndUpdate({
      _id: req.params.id},
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          category: req.body.categoryID,
          photo: req.file.location,
          description: req.body.description,
          stockQuantity:req.body.stockQuantity,
          owner: req.body.ownerID
        }
      },
      {
        upsert:true
      }
    
    )
    res.json({
      success: true,
      updatedProduct: product
    })

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})


// Delete

router.delete('/products/:id', async (req, res) => {
  try {

    const deletedProduct = await Product.findOneAndDelete({
      _id: req.params.id
    })
    if (deletedProduct) {
      res.json({
        success: true,
        message: 'Successfully deleted'
      })
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})



module.exports = router