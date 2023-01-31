/** @format */

const express = require("express");
const date = require(__dirname + "/date.js");
const app = express();


let items = ["Eat Food", "Buy Food", "Cook Food"];
let workItems = [];

app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {

  let day = date.getDate();
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", (req, res) => {
  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", (req, res) => {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", (req, res) => {
  res.render("about");
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});
