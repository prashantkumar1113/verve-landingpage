const express = require("express")
const dotenv = require("dotenv") 
const mongoose = require("mongoose")
const v = require("validator")
const morgan = require("morgan")
const connectDB = require('./config/db')
const exphbs = require('express-handlebars')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)


console.log(v.isEmail("hitanshurami@umasinc.com"))

//Watch from Morgan Part
//Load Config 
dotenv.config({ path: './config/config.env' })



//Passport Config
require('./config/passport')(passport)

const app = express()

//Logging
if(process.env.NODE_ENV === 'dev')
{
    app.use(morgan('dev'))
    console.log("Morgan is logging")
}

//Body Parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//HandleBars
app.engine('.hbs', exphbs.engine({defaultlayout:'main',extname: 'hbs'}))
app.set('view engine','hbs')

//Sessions - express Session Docs
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    //cookie: { secure: true }
  }))

//Passport Middleware - Passport Docs
app.use(passport.initialize())
app.use(passport.session())

//Routes
    //Static Folder
app.use(express.static(path.join(__dirname,'public')))

//Route for whenever /
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/stories',require('./routes/stories'))

//Checking our environment details
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Environment is ${process.env.NODE_ENV} on ${PORT}`))

//Connecting DB
connectDB() 