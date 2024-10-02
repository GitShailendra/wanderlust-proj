const User = require("../models/user")

module.exports.renderSignup = (req, res) => {
    res.render("user/signup.ejs");
  }

module.exports.signup = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser,(err)=>{
        if(err) return next(err);
        req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listings");
      })
      
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/listings");
    }
  }

module.exports.renderLogin =  (req, res) => {
    res.render("user/login.ejs");
}

module.exports.login = async (req, res) => {
    req.flash("success","welcome back on Wanderlust!")
    let registeredUrl = res.locals.redirectUrl||"/listings"
    res.redirect(registeredUrl);
}

module.exports.logout =(req,res,next)=>{
    req.logout((err)=>{
      if(err){
         return next(err)
      }
      req.flash("success","you are logged out!")
      res.redirect("/listings");
    });
  
  }