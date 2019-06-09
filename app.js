const bodyParser = require("body-parser"),
		methodOverride = require("method-override"),
		expressSanitizer = require("express-sanitizer"),
		passport = require("passport"),
		passportLocal = require("passport-local"),
		mongoose       = require("mongoose"),
		express        = require("express"),
		app            = express(),
		expressSession = require("express-session"),
		flash = require("connect-flash");

const User = require("./models/user");

const indexRoutes = require("./routes/index"),
blogRoutes = require("./routes/blogs");


// APP CONFIG
// mongoose.connect("mongodb://localhost/blog_app");
mongoose.connect(process.env.DATABASEURL);

app.use(flash());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// AUTH CONFIG

app.use(expressSession({
    secret: "Reading blogs daily is really an wonderful habit",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// RESTFUL ROUTES

app.use("/", indexRoutes);
app.use("/blogs", blogRoutes);


app.listen(process.env.PORT, process.env.IP);

// app.listen(3000);

