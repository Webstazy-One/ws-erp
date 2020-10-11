const dbConfig = require("../config/db.config.js")

const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url

db.item = require("./item.model.js")(mongoose)
db.exchange = require("./exchange.model.js")(mongoose)
db.invoice = require("./invoice.model.js")(mongoose)
db.branch = require("./branch.model.js")(mongoose)
db.purchase = require("./purchase.model.js")(mongoose)
db.tag = require("./tag.model.js")(mongoose)
db.repair = require("./repair.model.js")(mongoose)
db.promo = require("./promo.model.js")(mongoose)
db.stock = require("./stock.model.js")(mongoose)
db.customer = require("./customer.model.js")(mongoose)
db.cust_merge = require("./cust_merge.model.js")(mongoose)
db.brand = require("./brand.model.js")(mongoose)
db.uplog = require("./uplog.model.js")(mongoose)


db.user = require("./user.model")
db.role = require("./role.model")

db.ROLES = ["user", "admin"]

module.exports = db
