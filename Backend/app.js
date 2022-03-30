var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");

var indexRouter = require("./routes/indexRoute");
var usersRouter = require("./routes/usersRouter");
var adminRouter = require("./routes/adminRouter");
var adviseeRouter = require("./routes/adviseeRouter");
var advisorRouter = require("./routes/advisorRouter");
var programDRouter = require("./routes/programDirectorRouter");
var courseRouter = require("./routes/courseRouter");
var databaseConnect = require("./models/sequelize");
var router = require("./api/users");

var app = express();
const port = process.env.PORT || 3000;

// Connect to the database
databaseConnect.authenticate().then(() => {
  console.log("Database is good to go");
}).catch((error) =>
console.error("Database cannot connect", error));

// Parse the incoming JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// API for users
app.use("/api/users", require("./api/users"));
app.get("/*", (req, res) => res.sendFile(path.join(__dirname, "/dist/advising-assistant")))

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/dist/advising-assistant")));
app.use(
  cors({
    origin: "*",
  })
);

//app.get('/public', express.static('public'));

app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use("/advisee", adviseeRouter);
app.use("/advisor", advisorRouter);
app.use("/programDirector", programDRouter);
app.use("/courses", courseRouter);
app.use("/api/users", router);
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

/* app.get('', (req, res) => {
  res.sendFile(__dirname + 'index');
}); */

// Find the port
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
