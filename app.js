const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

app.set('view engine', 'ejs');

var items = [];
var workItems = [];

app.get("/", function(req, res) {

    const today = new Date();
    
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function(req, res) {
    var item = req.body.newItem;
    if(req.body.List === "Work List") {
        workItems.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }


    res.redirect("/");
})

app.get("/work", function(req, res) {
    res.render("list", {listTitle:"Work List", newListItems:  workItems});
});

app.listen(3000, function() {
    console.log("Server has started at port 3000");
});

