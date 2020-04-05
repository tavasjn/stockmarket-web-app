const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const path = require("path");
const request = require("request");

const PORT = process.env.PORT || 5000;

// API KEY pk_503f885a86d943f3928788e9ea432964

function call_api(finishedAPI) {
  request(
    "https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_503f885a86d943f3928788e9ea432964",
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }
      if (res.statusCode === 200) {
        // console.log(body);
        finishedAPI(body);
      };
    }
  );
};

//Set handlebars MiddleWare
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

const otherstuff = "hello there this is other stuff";

// Set Handlebar routes
app.get('/', function (req, res) {
    call_api(function(doneAPI) {
        res.render('home', {
            stock: doneAPI
        });
    });
});

app.get("/about.html", function(req, res) {
  res.render("about");
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log("Server Listenting on port " + PORT));
