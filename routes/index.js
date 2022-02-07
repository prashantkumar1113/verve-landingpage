const express = require('express')
const router = express.Router()
const { ensureAuth,ensureGuest} = require('../middleware/auth')
const Email = require('../models/Email')
const Story = require('../models/Story')

// @desc Landing Page
//@route GET /
router.get('/',(req, res)=>{
    res.render('home')
})

// @desc    Process add form
// @route   POST /index
router.post('/', async (req, res) => {
    try {
      console.log(req.body)
      await Email.create(req.body)
      res.redirect('/')
    } catch (err) {
      console.error(err)
      res.render('error/500')
    }
  })

// @desc Login Page
//@route GET /
router.get('/login',ensureGuest,(req, res)=>{
    res.render('login',{
        layout:'login',
    }) //The second argument overrides the default template of main.hbs and sets it to login.hbs
})

// @desc Dashboard
//@route GET /dashboard
router.get('/dashboard',ensureAuth,async (req, res)=>{
    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        
    console.log(req.user)
    res.render('dashboard',{
        name:req.user.firstName,
        layout:'login',
    })
}catch(err){
    console.error(err)
    res.render('error/500')
}
})


module.exports = router