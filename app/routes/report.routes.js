const reports = require("../controllers/report.controller.js")

module.exports = app => {
    const report = require("../controllers/report.controller.js")

    var router = require("express").Router()

    router.get("/sales/branch/timerange/:startDate/:endDate", reports.salesByBranch)
    

    router.get("/revenue/branch/timerange/:dateTimeBefore/:dateTimeAfter", reports.revenueByBranch)
    

    router.get("/profit/timerange/:startDate/:endDate", reports.profitByBranch)

    router.get("/sales/brand/timerange/:startDate/:endDate", report.salesByBrands)

    router.get("/sales/brand/timerange/:brandName/:startDate/:endDate", report.getSalesBySelectedBrands)

    router.get("/revenue/brand/timerange/:startDate/:endDate", reports.revenueByBrand)

    router.get("/details/timerange/:startDate/:endDate", report.getDetailsOfPurchases)

    router.get("/stockCreation/timerange/:startDate/:endDate", report.getDetailsOfProductCreation)

    router.get("/stockes/timerange/:startDate/:endDate", report.getCurrentStock)

    router.get("/details/brand/timerange/:brandName/:startDate/:endDate", report.getDetailsOfPurchasesByBrand)

     router.get("/stockCreation/brand/timerange/:brandName/:startDate/:endDate", report.getDetailsOfProductCreationByBrand)

     router.get("/stockes/brand/timerange/:brandName/:startDate/:endDate", report.getCurrentStockByBrand)

  router.get("/details/branch/timerange/:branchCode/:startDate/:endDate", report.getDetailsOfPurchasesByBranch)

     router.get("/stockCreation/branch/timerange/:branchCode/:startDate/:endDate", report.getDetailsOfProductCreationByBranch)

     router.get("/stockes/branch/timerange/:branchCode/:startDate/:endDate", report.getCurrentStockByBranch)

router.get("/details/branch/brand/timerange/:branchCode/:brandName/:startDate/:endDate", report.getDetailsOfPurchasesByBrandInBranch)

    router.get("/stockCreation/branch/brand/timerange/:branchCode/:brandName/:startDate/:endDate", report.getDetailsOfProductCreationByBrandInBranch)

    router.get("/stockes/branch/brand/timerange/:branchCode/:brandName/:startDate/:endDate", report.getCurrentStockByBrandInBranch)

    router.get("/sales/item/", report.salesByItems)

    router.get("/salesCount/item/:itemId", report.salesByOneItem)

    router.get("/stock/branch/:branchCode/", report.getAllBrandByBranch)

    router.get("/stock/branch/brand/:branchCode/:brand", report.getBrandByBranch)

    // // router.get("/sales/branch/timerange", reports.findByDateRange)		

    //  router.get("/sales", report.findByBranchCode)
    // router.get("/sales/brand/timerange/:startDate/:endDate", report.salesByBrand)

    app.use('/api/report', router)
}