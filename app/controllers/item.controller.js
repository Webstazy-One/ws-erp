const db = require("../models")
const Item = db.item
const Promo = db.promo
const Counter = db.counter
const axios = require('axios')
const { count } = require("../models/user.model")
const { item } = require("../models")
const Brand = db.brand
const Stock = db.stock


exports.create = (req, res) => {

    saveItem = (item) => {

        return item
            .save(item)
            .then((data) => {
                return data
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Item."
                })
            })

    }

    // const sfName = req.body.name.replace(' ', '').replace('.', '').replace('/', '').replace('\\', '').replace('-', '').replace('=', '').replace(' ', '').replace('.', '').replace('/', '').replace('\\', '').replace('-', '').replace('=', '').replace(' ', '').replace('.', '').replace('/', '').replace('\\', '').replace('-', '').replace('=', '').replace(' ', '').replace('.', '').replace('/', '').replace('\\', '').replace('-', '').replace('=', '').replace(' ', '').replace('.', '').replace('/', '').replace('\\', '').replace('-', '').replace('=', '')
    const sfNameLast = req.body.name.replace(/[^\w\s+]/gi, '');
    const sfName = sfNameLast.replace(/\s/g, "");

    const item = new Item({
        barcodePrefix: req.body.barcodePrefix,
        brandName: req.body.brandName,
        name: req.body.name,
        name: req.body.name,
        sfName: sfName,
        desc: req.body.desc,
        tag: req.body.tag,
        price: req.body.price,
        cost: req.body.cost,
        historicalCount: 0,
        disputed: req.body.disputed,
        condition: req.body.condition,
        booked: req.body.booked,
        _active: true

    })

    saveItem(item).then((data) => {

        if (!req.body.barcodePrefix) {

            itemBarcode = data.barcodePrefix = ((data.id.substr(17, 14)))

            Item.findOneAndUpdate({ _id: data.id }, { $set: { barcodePrefix: itemBarcode } })
                .then(data => {

                    if (!data) {
                        res.status(404).send({
                            message: `Cannot update item with barcodePrefix . Maybe item was not found!`
                        })
                    } else {

                        if (data.condition == true) {
                            console.log(data.id)
                            console.log(data.condition)
                            res.send(data)

                        } else {
                            const stock = new Stock({
                                branchCode: "GHOST",
                                itemId: data.id,
                                currentStock: 0
                            })
                            stock
                                .save(stock)
                                .then(data => {
                                    console.log(data)
                                    res.send(data)
                                })
                        }

                    }

                })
                .catch((err) => {
                    res.status(500).send({
                        message: "Error updating item with barcodePrefix"
                    })
                })
        }

    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Error updating barcode prefix"
        })
    })

}



exports.findByBrand = (req, res) => {
    var condition = req.params.br ? {
        brandName: req.params.br,
        _active: true
    } : {}

    Item.find(condition)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving items."
            })
        })
}

exports.findBybarcode = (req, res) => {
    const barcodePrefix = req.params.bc;
    console.log(req.query);
    var condition = barcodePrefix ? {
        barcodePrefix: { $regex: new RegExp(req.params.bc), $options: "i" },
        _active: true
    } : {}

    Item.find(condition)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving items."
            })
        })
}


exports.findByName = (req, res) => {
    //const sfName = req.params.name.replace(' ', '').replace('.', '').replace('/', '').replace('\\', '').replace('-', '').replace('=', '')

    const sfNameLast = req.params.name.replace(/[^\w\s+]/gi, '')
    const sfName = sfNameLast.replace(/\s/g, "")


    var condition = sfName ? {
        //  sfName: req.params.name,
        sfName: { $regex: new RegExp(sfName), $options: "ix" },
        _active: true
    } : {}


    Item.find(condition)
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving items."
            })
        })
}


exports.findOne = (req, res) => {

    let nDate = new Date().toISOString('en-US', {
        timeZone: 'Asia/Calcutta'
    })

    Item.findById(req.params.id)
        .then(itemData => {
            console.log(itemData)
            Promo.find(


                    { appliedto: req.params.id, startDate: { $lt: nDate }, endDate: { $gte: nDate } }


                )
                .then(promoData => {


                        if (!promoData[0] == null) {

                            if (promoData[0].type == "ITEM") {

                                if (promoData[0].calc == "PERCENTAGE") {
                                    console.log("ITEM Percentage")
                                    itemData.disValue = itemData.price * promoData[0].rate,
                                        itemData.actualPrice = itemData.price - itemData.disValue


                                } else if (promoData[0].calc == "FLAT") {
                                    console.log("ITEM FLAT")

                                    itemData.disValue = promoData[0].rate,
                                        itemData.actualPrice = itemData.price - promoData[0].rate
                                }


                            } else if (promoData[0].type == "BRAND") {

                                console.log("BRAND type")

                                if (promoData[0].calc == "PERCENTAGE") {
                                    console.log("BRAND Percentage")
                                    itemData.disValue = itemData.price * promoData[0].rate,
                                        itemData.actualPrice = itemData.price - itemData.disValue


                                } else if (promoData[0].calc == "FLAT") {
                                    console.log("BRAND FLAT")

                                    itemData.disValue = promoData[0].rate,
                                        itemData.actualPrice = itemData.price - promoData[0].rate
                                }



                            }
                        } else {
                            itemData.disValue = 0
                            itemData.actualPrice = itemData.price
                        }


                    }

                ).finally(() => {
                    if (itemData._active == true) {
                        res.send(itemData)
                    } else {
                        res
                            .status(500)
                            .send({ message: "Not Found item with id=" + req.params.id + " " });
                    }

                    //    itemData.disValue = itemData.price * promoData[0].rate
                })

        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving item with id=" + req.params.id + " " + err });
        });
}

exports.findAll = (req, res) => {
    Item.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving ITEM."
            })
        })
}

exports.findAllActive = (req, res) => {
    Item.find({ _active: true })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Item.",
            });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Item.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            const sfNameLast = data.name.replace(/[^\w\s+]/gi, '');
            sfNamef = sfNameLast.replace(/\s/g, "");
            Item.findOneAndUpdate({ _id: id }, { $set: { sfName: sfNamef } })
                .then(data => {

                    if (!data) {
                        res.status(404).send({
                            message: `Cannot update item with sfName`,
                        });
                    } else res.send(true);
                })
                .catch((err) => {
                    res.status(500).send({
                        message: "Error updating item with sfNamef"
                    })
                })

            if (!data) {
                res.status(404).send({
                    message: `Cannot update Item with id=${id}. Maybe Item was not found!`
                });
            } else res.send(true);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Item with id=" + id
            })
        })
}


exports.updatePriceById = (req, res) => {
    const id = req.params.id
    const price = req.params.price

    Item.findOneAndUpdate({ _id: id }, { $set: { price: price } })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot update item with price=${price}. Maybe item was not found!`,
                });
            } else res.send(true);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating item with price=" + price
            })
        })
}

exports.DeleteFromItemId = (req, res) => {
    const Id = req.params.iid

    Item.findByIdAndUpdate({ _id: Id }, { $set: { _active: false } })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot delete item with id=. Maybe item was not found!`
                })
            } else res.send(true)
        })
        .catch((err) => {
            res.status(500).send({
                message: err
            })
        })



    Stock.findOneAndRemove({
            itemId: Id,
            branchCode: "BTTML"
        }, { $set: req.body })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot delete stock BTTML.`
                })
            }
        })

    Stock.findOneAndRemove({
            itemId: Id,
            branchCode: "COLM5"
        }, { $set: req.body })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot delete stock COLM5.`
                })
            }
        })

    Stock.findOneAndRemove({
            itemId: Id,
            branchCode: "OGFSL"
        }, { $set: req.body })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot delete stock OGFSL .`
                })
            }
        })

    Stock.findOneAndRemove({
            itemId: Id,
            branchCode: "LIBPL"
        }, { $set: req.body })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot delete stock LIBPL.`
                })
            }
        })

    Stock.findOneAndRemove({
            itemId: Id,
            branchCode: "WAREH"
        }, { $set: req.body })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot delete stock WAREH.`
                })
            } else res.send(true)
        })



    .catch(() => {


    })


}

exports.hotfix1 = (req, res) => {

    Item.find()
        .then(data => {

        })
        .catch((err) => {
            res.status(500).send({
                message: err
            })
        })
}




exports.findTopItems = (req, res) => {

    const skiplt = parseInt(req.params.skip)
    const skip = (skiplt - 1) * 100
        //console.log(skip)
    Item.find({ _active: true }).sort({ price: -1 }).skip(skip).limit(100)
        .then(data => {

            Item.countDocuments({ _active: true }).exec().then(count => {

                const initItems = {
                    items: data,
                    count: count

                }
                res.send(initItems)
            })

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Item."
            });
        });
};



exports.findBySubcategory = (req, res) => {
    let itemDt = []

    Brand.find({
            subCategory: req.params.subCategory,
            _active: true
        })
        .then((data) => {



            data.forEach(itemEntry => {
                if (!itemEntry.brandName || itemEntry.brandName === null) return
                var condition = itemEntry.brandName ? {
                    brandName: itemEntry.brandName,
                    _active: true
                } : {}

                Item.find(condition)
                    .then((data) => {
                        if (!data[0] || data === null) return
                        itemDt = data

                        // return itemDt
                        console.log(data)

                        res.send(data)
                    }).catch(() => {})


            })


        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving subCategory.",
            });
        });
}


checkItemnameBrandExisted = (req, res, next) => {

    Item.findOne({
        name: req.body.name,
        brandName: req.body.brandName
    }).exec((err, item) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (item) {
            res.status(400).send({ message: "Duplicate Entry !. Item already exists" });
            return;
        }


        next()

    })
}


exports.findByBrandAndName = (req, res) => {

    const brandName = req.params.bName
    const sfNameLast = req.params.bName.replace(/[^\w\s+]/gi, '')
    const sfName = sfNameLast.replace(/\s/g, "")

    const sfbrandar = req.params.bName
    sfbrand = sfbrandar.split(' ')

    Item.find({
            $or: [
                { brandName: { $regex: new RegExp(brandName), $options: "i" } },
                { sfName: { $regex: new RegExp(sfName), $options: "ix" } },

                {
                    brandName: sfbrand[0],
                    sfName: { $regex: new RegExp(sfbrand[1]), $options: "ix" },
                }

            ],

            _active: true
        })
        .then((data) => {
            res.send(data)

        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving items."
            })
        })
}

exports.findItemDisputed = (req, res) => {
    Item.find({ _active: true, disputed: true })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Item.",
            })
        })
}

exports.UpdatedtoResolve = (req, res) => {
    const id = req.params.id


    Item.findOneAndUpdate({ _id: id }, { $set: { disputed: false } })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot resolve item . Maybe item was not found!`,
                });
            } else res.send(true);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error resolving item "
            })
        })
}


exports.findDisputedAndRealItem = (req, res) => {



    Item.find({
            $or: [{ '_id': req.params.id1 },
                { '_id': req.params.id2 }
            ]
        })
        .then((data) => {
            let brandNamear = []
            let namear = []
            let sfNamear = []
            let descar = []
            let pricear = []
            let costar = []
            let barcodePrefixar = []
            let tagar = []

            brandNamear.push(data[0].brandName, data[1].brandName)
            namear.push(data[0].name, data[1].name)
            sfNamear.push(data[0].sfName, data[1].sfName)
            descar.push(data[0].desc, data[1].desc)
            pricear.push(data[0].price, data[1].price)
            costar.push(data[0].cost, data[1].cost)
            barcodePrefixar.push(data[0].barcodePrefix, data[1].barcodePrefix)
            tagar.push(data[0].tag, data[1].tag)


            let item = {
                brandName: brandNamear,
                name: namear,
                sfName: sfNamear,
                desc: descar,
                price: pricear,
                cost: costar,
                barcodePrefix: barcodePrefixar,
                tag: tagar
            }
            res.send(item)
            console.log(brandNamear[0])
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Item.",
            })
        })
}



exports.UpdateDisputedToRealItem = (req, res) => {
    const id2 = req.params.id2
    const id1 = req.params.id1
    Item.find({
            $or: [{ '_id': req.params.id1 },
                { '_id': req.params.id2 }
            ]
        })
        .then((data) => {
            let brandNamear = []
            let namear = []
            let sfNamear = []
            let descar = []
            let pricear = []
            let costar = []
            let barcodePrefixar = []
            let tagar = []

            brandNamear.push(data[0].brandName, data[1].brandName)
            namear.push(data[0].name, data[1].name)
            sfNamear.push(data[0].sfName, data[1].sfName)
            descar.push(data[0].desc, data[1].desc)
            pricear.push(data[0].price, data[1].price)
            costar.push(data[0].cost, data[1].cost)
            barcodePrefixar.push(data[0].barcodePrefix, data[1].barcodePrefix)
            tagar.push(data[0].tag, data[1].tag)


            let item = {
                brandName: brandNamear,
                name: namear,
                sfName: sfNamear,
                desc: descar,
                price: pricear,
                cost: costar,
                barcodePrefix: barcodePrefixar,
                tag: tagar
            }


            if (brandNamear[0] == brandNamear[1]) {
                brandNamefnl = brandNamear[1]
            } else {
                brandNamefnl = brandNamear[0]
            }
            if (namear[0] == namear[1]) {
                namefnl = namear[1]
            } else {
                namefnl = namear[0]
            }

            if (sfNamear[0] == sfNamear[1]) {
                sfNamefnl = sfNamear[1]
            } else {
                sfNamefnl = sfNamear[0]
            }

            if (descar[0] == descar[1]) {
                descfnl = descar[1]
            } else {
                descfnl = descar[0]
            }

            if (pricear[0] == pricear[1]) {
                pricefnl = pricear[1]
            } else {
                pricefnl = pricear[0]
            }

            if (costar[0] == costar[1]) {
                costfnl = costar[1]
            } else {
                costfnl = costar[0]
            }

            if (barcodePrefixar[0] == barcodePrefixar[1]) {
                barcodePrefixfnl = barcodePrefixar[1]
            } else {
                barcodePrefixfnl = barcodePrefixar[0]
            }

            if (tagar[0] == tagar[1]) {
                tagfnl = tagar[1]
            } else {
                tagfnl = tagar[0]
            }



            Item.findOneAndUpdate({ _id: id2 }, {
                    $set:

                    {
                        brandName: brandNamefnl,
                        name: namefnl,
                        sfName: sfNamefnl,
                        desc: descfnl,
                        price: pricefnl,
                        cost: costfnl,
                        barcodePrefix: barcodePrefixfnl,
                        tag: tagfnl

                    },

                })
                .then(data => {

                    if (!data) {
                        res.status(404).send({
                            message: `Cannot merge items. Maybe items were not found!`,
                        });
                    } else res.send(true);
                })
                .catch((err) => {
                    res.status(500).send({
                        message: "Error merging item with "
                    })
                })

        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Item.",
            })
        })

    Item.findByIdAndUpdate({ _id: id1 }, { $set: { _active: false } })
        .then(data => {

            if (!data) {
                res.status(404).send({
                    message: `Cannot delete item with id=. Maybe item was not found!`
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err
            })
        })



}