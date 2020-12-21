const dotenv = require('dotenv').config();

const createError = require('http-errors');
const engine = require('ejs-mate');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const methdoOverride  = require('method-override')
//const seedPosts = require('./seeds');

//seedPosts()

const bodyParser = require('body-parser')
const passport = require('passport');
const User = require('./models/user');
const session = require('express-session')

//require routes 
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const posts = require('./routes/posts')
const reviews = require('./routes/reviews');


const app = express();

//connect to the database 
mongoose.connect(
  process.env.MONGO_URI, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex : true});


const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'))
db.once('open', ()=> {
  console.log('we are connected');
})

//setup public assest dir 
app.use(express.static('public'))
// use ejs-locals for all ejs templates 
app.engine('ejs',engine)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methdoOverride('_method'))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,

}))
app.use(passport.initialize());
app.use(passport.session())
// configure passport and sessions 


passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
// set local variables midleware to set the title 
app.use(function(req,res,next){
 req.user = {
    '_id':'5fd0d422c1a35a4c70ac26ff',
    'username': 'alex'
  }

  //req.locals.currentUser =req.user;
  res.locals.title = 'Surf shop';
  //get the succes message
  res.locals.success = req.session.success || '';
  delete req.session.success 
  // get the error messages
  res.locals.error = req.session.error || '';
  delete req.session.error;
  // go to the next middleware function in the chain. 
  next();
})


// mount routes 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts',posts)
app.use('/posts/:id/reviews',reviews)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
 /* res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');*/
 
  req.session.error = err.message;
  res.redirect('back')
});



module.exports = app;
