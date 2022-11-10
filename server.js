const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// const ejs = require("ejs");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
//to specify static files in the express;
app.use(express.static("public"));

// var items = ["Eat Food", "Drink Water"];

mongoose.connect(
  "mongodb+srv://admin-hero:test123@cluster0.gxfyvlz.mongodb.net/todolistdb",
  // "mongodb://127.0.0.1/todolist",
  {
    useNewUrlParser: true,
  }
);
const itemschema = {
  name: {
    type: String,
  },
};
const item = mongoose.model("Item", itemschema);

//creating default values for the database;
const item1 = new item({
  name: "go drink water",
});
const item2 = new item({
  name: "go eat food",
});
const defaultitems = [item1, item2];

//after entering data is send back to the backend server;
app.get("/", (req, res) => {
  //reading from the dbs;
  item.find({}, function (err, result) {
    // console.log(result.length);
    if (result.length == 0) {
      item.insertMany(defaultitems, function (err) {
        if (err) console.log("error is here!!!");
        else console.log("successfully inserted default items");
      });

      //it will redirect to the main
      res.redirect("/");
    } else {
      if (!err) {
        res.render("index", { kindofday: "TODAY", lists: result });
      } else console.log("error in reading data from the db");
    }
  });
});

app.post("/", (req, res) => {
  var data = req.body.newItem;
  const i = new item({
    name: data,
  });
  i.save();
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const delete_id = req.body.checkbox;
  item.deleteOne({ _id: delete_id }, function (err) {
    if (!err) console.log("deleted successfully!!");
  });
  res.redirect("/");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log("server has started successfully...");
});

// uploaded to
// https://infinite-wave-92837.herokuapp.com/
