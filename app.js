require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const sass = require("node-sass");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const { use } = require("passport");

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "sh clinic",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

var appointmentData;
mongoose.connect(
  "mongodb+srv://hclinic-23:saksham123@cluster0.vcbpx.mongodb.net/userDB?retryWrites=true&w=majority", (err, db)=>{
   db.collection('appointments').collection.find().toArray(function(err, data){
     appointmentData = data;
   });
});

const userSchema = new mongoose.Schema({
  adminUsername: String,
  adminPassword: String,
  username: String,
  patientPassword: String,
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const appointmentSchema = new mongoose.Schema({
  patientName: String,
  patientPhone: String,
  patientEmail: String,
  bookingDate: String,
  patientSex: String,
  patientAge: String,
});

const Appointment = new mongoose.model("Appointment", appointmentSchema);

app.get("/", (req, res) => {
  res.render("home");
});

app.get('/about', (req,res)=>{
  res.render('about');
});

app.get('/contact', (req,res)=>{
  res.render('contact');
});

app.get('/gallery', (req,res)=>{
  res.render('gallery');
});

app.get("/admin", (req, res) => {
  res.render("admin-login");
});

app.get("/admin-register", (req, res) => {
  res.render("register");
});

app.get("/admin-dashboard", (req, res) => {
  Appointment.find(
    {
      patientName: { $ne: null },
      patientPhone: { $ne: null },
      patientEmail: { $ne: null },
      bookingDate: { $ne: null },
      patientAge: { $ne: null },
      patientSex: { $ne: null },
    },
    function (err, foundAppointment) {
      if (err) {
        console.log(err);
      } else {
        if (foundAppointment) {
          if (req.isAuthenticated()) {
            res.render("admin-page", {
              patientWithAppointment: foundAppointment,
            });
          } else {
            res.redirect("/admin");
          }
        }
      }
    }
  );
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/admin");
});

app.get('/admin-success', (req,res)=>{
  if(req.isAuthenticated()){
    res.render('admin-success');
  }else {
    res.redirect('/admin-register');
    prompt('failed registering new admin')
  }
});

app.get('/data', (req,res)=>{
  res.json({
   appointmentData: appointmentData
  })
})

app.post("/appointment", (req, res) => {
  const newAppointment = new Appointment({
    patientName: req.body.patient_name,
    patientPhone: req.body.patient_phone,
    patientEmail: req.body.patient_email,
    bookingDate: req.body.appointment_date,
    patientAge: req.body.patient_age,
    patientSex: req.body.appointment_time,
  });
  newAppointment.save((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.post("/register", (req, res) => {
  
});

app.post("/login", (req, res) => {
  res.redirect('/');
});

app.post("/admin-register", (req, res) => {
  User.register(
    { username: req.body.username },
    req.body.password,
    (err, User) => {
      if (err) {
        console.log(err);
        res.redirect("/admin-register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/admin-success");
        });
      }
    }
  );
});

app.post("/admin-login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/admin-dashboard");
      });
    }
  });
});


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, '0.0.0.0' ,()=>{
  console.log("server started at port "+ port);
});
