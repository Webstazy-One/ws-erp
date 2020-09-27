const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

app.use(cors())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

const db = require("./app/models")
const Role = db.role
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database Sucessfully!")
    initial()
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err)
    process.exit()
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save((err) => {
        if (err) {
          console.log("error", err)
        }

        console.log("added 'admin' to roles collection");
      });


      new Role({
        name: "override"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      
        console.log("added 'override' to roles collection")
      });
      
      new Role({
        name: "overrideUser"
      }).save(err => {
        if (err) {
          console.log("error", err)
        }
      
        console.log("added 'overrideUser' to roles collection")
      })
    }
  })
}

require("./app/routes/item.routes")(app)
require("./app/routes/exchange.routes")(app)
require("./app/routes/invoice.routes")(app)
require("./app/routes/branch.routes")(app)
require("./app/routes/purchase.routes")(app)
require("./app/routes/customer.routes")(app)
require("./app/routes/stock.routes")(app)
require("./app/routes/brand.routes")(app)
require("./app/routes/promo.routes")(app)
require("./app/routes/cust_merge.routes")(app)
require("./app/routes/tag.routes")(app)
require("./app/routes/repair.routes")(app)

require("./app/routes/auth.routes")(app)
require("./app/routes/user.routes")(app)
require("./app/routes/report.routes")(app)
//require("./app/routes/log.routes")(app)
//require("./app/routes/goodreceivednote.routes")(app)

app.use(express.static('dist'))

app.get("/", (req, res) => {
 res.sendFile(__dirname + '/dist/index.html')
})

app.get("/*", (req, res) => {
 res.sendFile(__dirname + '/dist/index.html')
})

const PORT = process.env.PORT || 8089;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
